import React from 'react'
import Header from './Header'
import { Container } from './styles'
interface IProps {
  children: React.ReactNode
}
const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  )
}

export default Layout
