export interface IStockProps {
  id: number
  amount: number
}
export interface IProductProps {
  id: number
  title: string
  price: number
  image: string
}
export interface IDataProps {
  stock: IStockProps[]
  products: IProductProps[]
}
export interface IProductCartProps {
  id: number
  title: string
  price: number
  image: string
  amount: number
}
