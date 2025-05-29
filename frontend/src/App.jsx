import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import AddProduct from './pages/AddProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import Catalog from "./pages/Catalog";
import ProductDetails from './pages/ProductDetails';
import Profile from "./pages/Profile";
import CartIcon from './components/CartIcon';

function App() {
  return (
    <div className="min-h-screen bg-[#fceaeb]">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <CartIcon />
      </Router>
    </div>
  );
}

export default App;
