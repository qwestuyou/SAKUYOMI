import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export default function CartIcon() {
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition z-50"
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
          className="fixed bottom-16 right-5 w-72 max-h-96 bg-white shadow-xl rounded-lg p-4 overflow-auto z-50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Мини-корзина будет тут, пока заглушка */}
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-600">Your cart is empty</p>
          ) : (
            <ul className="divide-y divide-gray-300">
                {cartItems.map((item, index) => (
                <li key={item.id ?? index} className="py-2 flex justify-between items-center">
                    <span>{item.name}</span>
                    <span>Qty: {item.quantity}</span>
                </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}
