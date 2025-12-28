import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from "./context/CartContext.jsx"
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import './index.css'
import TopBar from './components/user/TopBar.jsx'
import Navbar from './components/user/Navbar.jsx'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
       <QueryClientProvider client={queryClient}>
          <TopBar/>
          <Navbar/>
          <App />
        </QueryClientProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
)
