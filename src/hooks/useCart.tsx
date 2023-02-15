import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { toast } from 'react-toastify'
import { useProduct } from '@contexts/ProductContext'
import { IProductCartProps } from '@/types/products'
import usePersistedState from '@/hooks/usePersistedState'

interface ICartProviderProps {
  children: ReactNode
}

interface IUpdateProductAmount {
  productId: number
  amount: number
}

interface ICartContextData {
  cart: IProductCartProps[]
  addProduct: (productId: number) => Promise<void>
  removeProduct: (productId: number) => void
  updateProductAmount: ({ productId, amount }: IUpdateProductAmount) => void
}

const CartContext = createContext<ICartContextData>({} as ICartContextData)
export function CartProvider({ children }: ICartProviderProps): JSX.Element {
  const { getProduct, getStock } = useProduct()

  const [cart, setCart] = usePersistedState<IProductCartProps[]>('Cart', [])

  const addProduct = async (productId: number) => {
    try {
      const updatedCart = [...cart]
      const productExists = updatedCart.find(
        product => product.id === productId
      )
      const stock = getStock(productId)
      const stockAmount = stock.amount
      const currentAmount = productExists ? productExists.amount : 0
      const newAmount = currentAmount + 1

      if (newAmount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque')
        return
      }

      if (productExists) {
        productExists.amount = newAmount
      } else {
        const addProduct = getProduct(productId)
        const newProduct = { ...addProduct, amount: 1 }
        updatedCart.push(newProduct)
      }
      setCart(updatedCart)
    } catch {
      toast.error('Erro na adição do produto')
    }
  }

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart]
      const productIndex = updatedCart.findIndex(
        product => product.id === productId
      )
      if (productIndex >= 0) {
        updatedCart.splice(productIndex, 1)
        setCart(updatedCart)
      } else {
        throw Error()
      }
    } catch {
      toast.error('Erro na remoção do produto')
    }
  }
  /**
   *
   * Atualizar Quantidade (Função)
   *
   *
   */
  const updateProductAmount = async ({
    productId,
    amount
  }: IUpdateProductAmount) => {
    try {
      if (amount <= 0) {
        return
      }
      const stock = getStock(productId)
      const stockAmount = stock.amount
      if (amount > stockAmount) {
        toast.error('Quantidade solicitada fora de estoque')
        return
      }
      const updatedCart = [...cart]
      const productExists = updatedCart.find(
        product => product.id === productId
      )
      if (productExists) {
        productExists.amount = amount
        setCart(updatedCart)
        return
      } else {
        throw Error()
      }
    } catch {
      toast.error('Erro na alteração de quantidade do produto')
    }
  }

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): ICartContextData {
  const context = useContext(CartContext)
  return context
}
