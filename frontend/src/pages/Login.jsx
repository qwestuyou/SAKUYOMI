import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FaGoogle, FaDiscord } from "react-icons/fa";
import { useNotification } from "../components/Notification";

export default function Login() {
  const { login } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const notify = useNotification();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const name = params.get("name");

    if (token && name) {
      localStorage.setItem("token", token);
      login({ name }, token);
      navigate("/");
    }
  }, [location.search]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        login(data.user, data.token);
        notify("Успешный вход", "success");
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        notify(data.message || "Ошибка входа", "error");
      }
    } catch (err) {
      notify("Ошибка при входе", "error");
      console.error(err);
    }
  };

  const bgPage = theme === "dark" ? "bg-[#1a1a1a]" : "bg-[#fff6f4]";
  const formBg = theme === "dark" ? "bg-[#2a2a2a]" : "bg-white";
  const textColor = theme === "dark" ? "text-white" : "text-gray-800";
  const inputBg = theme === "dark" ? "bg-[#3a3a3a] text-white placeholder-gray-400 border-gray-600" : "bg-white text-gray-800 border-gray-200";
  const socialBg = theme === "dark" ? "bg-[#3a3a3a]" : "bg-white";

  return (
      <div className={`flex items-center justify-center min-h-screen ${bgPage} transition-all duration-500`}>
        <div className={`max-w-md w-full mx-auto ${formBg} p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl`}>
          <h2 className={`text-3xl font-bold mb-6 text-center animate-fadeIn ${textColor}`}>Login</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
                name="email"
                type="email"
                placeholder="Email"
                className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59c9e] transition-all duration-300 placeholder-gray-400 ${inputBg}`}
                onChange={handleChange}
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59c9e] transition-all duration-300 placeholder-gray-400 ${inputBg}`}
                onChange={handleChange}
                required
            />
            <button
                type="submit"
                className="w-full bg-[#f59c9e] text-white py-3 rounded-lg hover:bg-[#e0bcbc] transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              Login
            </button>
          </form>

          <div className="mt-8 flex justify-center gap-6">
            <a
                href="http://localhost:5000/api/auth/google"
                className={`${socialBg} p-4 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300`}
                title="Google"
            >
              <FaGoogle className="text-2xl text-red-500" />
            </a>
            <a
                href="http://localhost:5000/api/auth/discord"
                className={`${socialBg} p-4 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300`}
                title="Discord"
            >
              <FaDiscord className="text-2xl text-indigo-500" />
            </a>
          </div>
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
  );
}
