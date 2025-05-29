import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import {AuthProvider} from "./context/AuthContext.jsx";
import {NotificationProvider} from "./components/Notification";
import {ThemeProvider} from "./context/ThemeContext.jsx";
import { CartProvider } from './context/CartContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <ThemeProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ThemeProvider>
      </NotificationProvider>
    </AuthProvider>
  </React.StrictMode>
);
