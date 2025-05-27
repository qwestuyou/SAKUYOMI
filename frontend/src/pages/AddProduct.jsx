import React from 'react';
import { useState } from 'react';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    categoryId: '',
    anime: '',
    size: '',
    material: '',
    language: '',
    brand: '',
    productType: '',
    rating: '',
    inStock: true,
    color: '',
    gender: '',
    ageRating: '',
    features: '', // можно текстом, например "Glowing,Sound"
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
      // Подготовим данные
      const dataToSend = {
        ...formData,
        price: parseFloat(formData.price),
        categoryId: parseInt(formData.categoryId),
        rating: formData.rating ? parseFloat(formData.rating) : null,
        inStock: !!formData.inStock,
        features: formData.features || null,
      };

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        alert("Товар добавлен!");
        // Можно очистить форму, если нужно
        setFormData({
          name: '',
          description: '',
          price: '',
          image: '',
          categoryId: '',
          anime: '',
          size: '',
          material: '',
          language: '',
          brand: '',
          productType: '',
          rating: '',
          inStock: true,
          color: '',
          gender: '',
          ageRating: '',
          features: '',
        });
      } else {
        alert("Ошибка при добавлении товара");
      }
    } catch (err) {
      alert("Ошибка при добавлении товара");
      console.error(err);
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
        {/* Новые поля */}
        <input type="text" name="anime" placeholder="Аниме" onChange={handleChange} />
        <input type="text" name="size" placeholder="Размер (S, M, L и т.д.)" onChange={handleChange} />
        <input type="text" name="material" placeholder="Материал" onChange={handleChange} />

        <select name="language" onChange={handleChange} defaultValue="">
          <option value="">language</option>
          <option value="Japanese">Japanese</option>
          <option value="English">English</option>
          <option value="Ukrainian">Ukrainian</option>
        </select>

        <input type="text" name="brand" placeholder="Бренд" onChange={handleChange} />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="inStock"
            checked={formData.inStock}
            onChange={e => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
          />
          В наличии
        </label>

        <input type="text" name="color" placeholder="Цвет" onChange={handleChange} />
        
        <select name="gender" onChange={handleChange} defaultValue="">
          <option value="">Пол (для одежды)</option>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="unisex">Унисекс</option>
        </select>

        <select name="ageRating" onChange={handleChange} defaultValue="">
          <option value="">Возрастное ограничение</option>
          <option value="13+">0+</option>
          <option value="13+">13+</option>
          <option value="18+">18+</option>
        </select>

        <input
          type="text"
          name="features"
          placeholder="Особенности (через запятую)"
          onChange={handleChange}
        />

        <button type="submit" className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600">Add</button>
      </form>
    </div>
  );
}
