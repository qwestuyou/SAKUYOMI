import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FaGoogle, FaDiscord } from "react-icons/fa";
import { useNotification } from "../components/Notification";

export default function Login() {
  const { login } = useAuth();
  const { themeStyles } = useTheme();
  const styles = themeStyles.login;
  const location = useLocation();
  const navigate = useNavigate();
  const notify = useNotification();
  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const name = params.get("name");

    if (token && name) {
      login({ name });
      notify("Successfully logged in with OAuth", "success");
      navigate("/");
    }
  }, [location.search]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user);
        notify("Login successful", "success");
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        notify(data.message || "Login failed", "error");
      }
    } catch (err) {
      notify("An error occurred while logging in", "error");
      console.error(err);
    }
  };

  return (
      <div className={`flex items-center justify-center min-h-screen ${styles.bgPage} transition-all duration-500`}>
        <div className={`max-w-md w-full mx-auto ${styles.formBg} p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl`}>
          <h2 className={`text-3xl font-bold mb-6 text-center animate-fadeIn ${styles.text}`}>Login</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
                name="email"
                type="email"
                placeholder="Email"
                className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59c9e] transition-all duration-300 ${styles.input}`}
                onChange={handleChange}
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f59c9e] transition-all duration-300 ${styles.input}`}
                onChange={handleChange}
                required
            />
            <button
                type="submit"
                className={`w-full py-3 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 ${styles.button}`}
            >
              Login
            </button>
          </form>

          <div className="mt-8 flex justify-center gap-6">
            <a
                href="http://localhost:5000/api/auth/google"
                className={`${styles.socialBg} p-4 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300`}
                title="Google"
            >
              <FaGoogle className="text-2xl text-red-500" />
            </a>
            <a
                href="http://localhost:5000/api/auth/discord"
                className={`${styles.socialBg} p-4 rounded-full shadow-md hover:shadow-lg transform hover:scale-110 transition-all duration-300`}
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
