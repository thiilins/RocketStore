import { useState } from 'react'
import { IProductProps, IStockProps } from '@/types/products'
import _ from 'lodash'
import React, { createContext, useContext, useCallback } from 'react'
import ProductData from '@/db/products'
import StockData from '@/db/stock'
interface IProductContext {
  changeStock: (id: number, newValue: number) => void
  getStock: (id: number) => IStockProps
  getProduct: (id: number) => IProductProps
  products: IProductProps[]
  stock: IStockProps[]
}

const ProductContext = createContext<IProductContext>({} as IProductContext)
interface IProductProvider {
  children: React.ReactNode
}

const ProductProvider: React.FC<IProductProvider> = ({ children }) => {
  const [products, setProducts] = useState<IProductProps[]>(ProductData)
  const [stock, setStock] = useState<IStockProps[]>(StockData)
  const changeStock = useCallback(
    (id: number, newValue: number) => {
      const nStock = [...stock]
      const product = nStock.find(item => item.id === id)
      product!.amount = newValue
      setStock(nStock)
    },
    [stock]
  )
  const getStock = useCallback(
    (id: number) => {
      const nStock = [...stock]
      const product = nStock.find(item => item.id === id)
      return product!
    },
    [stock]
  )
  const getProduct = useCallback(
    (id: number) => {
      const nProducts = [...products]
      const product = nProducts.find(item => item.id === id)
      return product!
    },
    [products]
  )
  return (
    <ProductContext.Provider
      value={{
        products,
        stock,
        changeStock,
        getProduct,
        getStock
      }}>
      {children}
    </ProductContext.Provider>
  )
}

function useProduct(): IProductContext {
  return useContext(ProductContext)
}

export { ProductProvider, useProduct }
