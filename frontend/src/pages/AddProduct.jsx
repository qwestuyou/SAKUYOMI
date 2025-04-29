import React from 'react';
import { useState } from 'react';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    categoryId: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/products", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert('Product added!');
      }
    } catch (err) {
      alert('Error adding product');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4">Add product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Назва" className="w-full p-2 border" onChange={handleChange} required />
        <textarea name="description" placeholder="Опис" className="w-full p-2 border" onChange={handleChange} required />
        <input type="number" name="price" placeholder="Ціна" className="w-full p-2 border" onChange={handleChange} required />
        <input type="text" name="image" placeholder="Посилання на зображення" className="w-full p-2 border" onChange={handleChange} />
        <input type='file' name='image' className="w-full p-2 border"/>
        <select
            name="categoryId"
            className="w-full p-2 border"
            onChange={handleChange}
            required
            >
            <option value="">Choose a category</option>
            <option value="1">Manga</option>
            <option value="2">Figure</option>
            <option value="3">Poster</option>
            <option value="4">Badge</option>
            <option value="5">Clothing</option>
            <option value="6">Accessories</option>
            <option value="7">Funko Pop! Anime</option>
            <option value="8">Stationery</option>
        </select>

        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">Add</button>
      </form>
    </div>
  );
}
