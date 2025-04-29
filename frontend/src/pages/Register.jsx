import { useState } from "react";
import { FaGoogle, FaDiscord } from "react-icons/fa";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        alert("Аккаунт успешно создан!");
        window.location.href = "/login";
      } else {
        alert(data.message || "Ошибка регистрации");
      }
    } catch (err) {
      alert("Ошибка при отправке данных");
      console.error(err);
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-[#fff6f4] transition-all duration-500">
        <div className="max-w-md w-full mx-auto mt-16 bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 animate-fadeIn">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
                name="name"
                type="text"
                placeholder="Name"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59c9e] transition-all duration-300 placeholder-gray-400"
                onChange={handleChange}
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59c9e] transition-all duration-300 placeholder-gray-400"
                onChange={handleChange}
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59c9e] transition-all duration-300 placeholder-gray-400"
                onChange={handleChange}
                required
            />
            <button
                type="submit"
                className="w-full bg-[#f59c9e] text-white py-3 rounded-lg hover:bg-[#e0bcbc] transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              Register
            </button>
          </form>
          <div className="mt-8 flex justify-center gap-6">
            <a
                href="http://localhost:5000/api/auth/google"
                className="bg-white p-4 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                title="Google"
            >
              <FaGoogle className="text-2xl text-red-500" />
            </a>
            <a
                href="http://localhost:5000/api/auth/discord"
                className="bg-white p-4 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                title="Discord"
            >
              <FaDiscord className="text-2xl text-indigo-500" />
            </a>
          </div>

          <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}</style>
        </div>
      </div>
  );
}