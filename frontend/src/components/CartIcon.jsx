import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartIcon() {
  const { cartItems, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" bottom-5 right-5 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition z-50 relative"
        aria-label="Toggle cart"
      >
        <FaShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-xs rounded-full px-2 font-bold">
            {totalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="fixed bottom-16 right-5 w-80 max-h-96 bg-white shadow-xl rounded-lg p-4 overflow-auto z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty</p>
          ) : (
            <>
              <ul className="divide-y divide-gray-300">
                {cartItems.map(item => (
                  <li key={item.id} className="py-2 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Price: {item.price} ₴</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-800 font-bold"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
              <Link
                to="/cart"
                className="block mt-4 text-center bg-pink-500 text-white py-2 rounded hover:bg-pink-600"
                onClick={() => setIsOpen(false)}
              >
                Go to Cart
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
