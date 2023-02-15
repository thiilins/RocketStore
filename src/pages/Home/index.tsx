import React, { useState, useEffect } from 'react'
import { MdAddShoppingCart } from 'react-icons/md'
import { ProductList } from './styles'
import { useProduct } from '@contexts/ProductContext'
import { formatPrice } from '@/utils/format'
import { useCart } from '@hooks/useCart'
import { IProductProps } from '@/types/products'

interface IProductFormatted extends IProductProps {
  priceFormatted: string
}

interface ICartItemsAmount {
  [key: number]: number
}

const Home: React.FC = () => {
  const { products: ProductData } = useProduct()
  const [products, setProducts] = useState<IProductFormatted[]>([])
  const { addProduct, cart } = useCart()
  const cartItemsAmount = cart.reduce((sumAmount, product) => {
    const newSumAmount = { ...sumAmount }
    newSumAmount[product.id] = product.amount
    return newSumAmount
  }, {} as ICartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      const data = ProductData.map((product: IProductProps) => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }))
      setProducts(data)
    }
    loadProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  return (
    <ProductList>
      {products.map(product => {
        return (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            <strong>{product.title}</strong>
            <span>{product.priceFormatted}</span>
            <button
              type="button"
              data-testid="add-product-button"
              onClick={() => handleAddProduct(product.id)}>
              <div data-testid="cart-product-quantity">
                <MdAddShoppingCart size={16} color="#FFF" />
                {cartItemsAmount[product.id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        )
      })}
    </ProductList>
  )
}

export default Home
