import Home from '@pages/Home'
import Cart from '@pages/Cart'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '@/Layout/Header'

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
