import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'
import { EmployeeContextProvider } from './app/context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EmployeeContextProvider>
      <App />
    </EmployeeContextProvider>
  </React.StrictMode>,
)
