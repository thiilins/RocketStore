import Home from '@pages/Home'
import Cart from '@pages/Cart'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '@/Layout/Header'
import Layout from '../Layout/index'

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRoutes
