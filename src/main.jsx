import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import App from './App.jsx'
import './index.css'
import { ThemeProvider, ThemeContext } from './components/context/ThemeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <ThemeProvider>
          <App />
      </ThemeProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
