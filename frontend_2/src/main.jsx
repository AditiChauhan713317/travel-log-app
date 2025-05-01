import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { LogsProvider } from './LogsContext.jsx'
import { CreateContextProvider } from './CreateContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
      <LogsProvider>
        <CreateContextProvider>
          <BrowserRouter>
              <App />
          </BrowserRouter>
        </CreateContextProvider>
      </LogsProvider>
    
  </StrictMode>,
)
