import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { AuthProvider } from "./context/AuthContext.jsx";
import { NotificationProvider } from "./components/Notification";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
        <NotificationProvider>
            <App />
        </NotificationProvider>
    </AuthProvider>
  </React.StrictMode>
)
