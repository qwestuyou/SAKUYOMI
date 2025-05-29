import { useState } from "react";
import { FaGoogle, FaDiscord } from "react-icons/fa";
import { useNotification } from "../components/Notification";
import { useTheme } from "../context/ThemeContext";

export default function Register() {
  const { themeStyles } = useTheme();
  const notify = useNotification();

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
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        notify("Аккаунт успешно создан!", "success");
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        notify(data.message || "Ошибка регистрации", "error");
      }
    } catch (err) {
      notify("Ошибка при отправке данных", "error");
      console.error(err);
    }
  };

  const register = themeStyles.register;

  return (
      <div className={`flex items-center justify-center min-h-screen ${register.bg}`}>
        <div className={`max-w-md w-full mx-auto mt-16 ${register.form} p-8 rounded-2xl shadow-lg transition-all hover:shadow-2xl`}>
          <h2 className={`text-3xl font-bold mb-6 text-center animate-fadeIn ${register.text}`}>Register</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
                name="name"
                type="text"
                placeholder="Name"
                className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59c9e] placeholder-gray-400 ${register.input}`}
                onChange={handleChange}
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59c9e] placeholder-gray-400 ${register.input}`}
                onChange={handleChange}
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59c9e] placeholder-gray-400 ${register.input}`}
                onChange={handleChange}
                required
            />
            <button
                type="submit"
                className={register.button}
            >
              Register
            </button>
          </form>

          <div className="mt-8 flex justify-center gap-6">
            <a
                href="http://localhost:5000/api/auth/google"
                className={`${register.social} p-4 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300`}
                title="Google"
            >
              <FaGoogle className="text-2xl text-red-500" />
            </a>
            <a
                href="http://localhost:5000/api/auth/discord"
                className={`${register.social} p-4 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300`}
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
          `}</style>
        </div>
      </div>
  );
}
