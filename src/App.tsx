import React from 'react'
import { ToastContainer } from 'react-toastify'
import Routes from '@/routes'
import GlobalStyles from '@styles/global'
import { CartProvider } from '@/hooks/useCart'
import { ProductProvider } from '@contexts/ProductContext'
function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <React.StrictMode>
          <GlobalStyles />
          <Routes />
          <ToastContainer autoClose={3000} />
        </React.StrictMode>
      </CartProvider>
    </ProductProvider>
  )
}

export default App
