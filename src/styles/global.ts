import { createGlobalStyle } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    min-width: 100vw;
    min-height: 100vh;
    background: #191920 url("/assets/background.svg") no-repeat center top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  #root {
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }

  button {
    cursor: pointer;
  }
`
