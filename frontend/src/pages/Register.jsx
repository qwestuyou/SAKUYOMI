import {useState} from "react";
import {FaGoogle, FaDiscord} from "react-icons/fa";
import {useNotification} from "../components/Notification";
import {useTheme} from "../context/ThemeContext";

export default function Register() {
    const {themeStyles} = useTheme();
    const notify = useNotification();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            notify("Passwords do not match", "error");
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (res.ok) {
                notify("Account successfully created!", "success");
                setTimeout(() => {
                    window.location.href = "/";
                }, 500);
            } else {
                notify(data.message || "Registration failed", "error");
            }
        } catch (err) {
            console.error(err);
            notify("An error occurred during registration", "error");
        }
    };

    const register = themeStyles.register;

    return (
        <div className={`flex items-center justify-center min-h-screen ${register.bg}`}>
            <div className={`max-w-md w-full mx-auto mt-16 ${register.form} p-8 rounded-2xl shadow-lg`}>
                <h2 className={`text-3xl font-bold mb-6 text-center ${register.text}`}>Register</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        className={`w-full p-3 rounded-lg ${register.input}`}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        className={`w-full p-3 rounded-lg ${register.input}`}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className={`w-full p-3 rounded-lg ${register.input}`}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        className={`w-full p-3 rounded-lg ${register.input}`}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className={register.button}>
                        Register
                    </button>
                </form>

                <div className="mt-8 flex justify-center gap-6">
                    <a
                        href="http://localhost:5000/api/auth/google"
                        className={`${register.social} p-4 rounded-full hover:scale-110 transition-all`}
                        title="Google"
                    >
                        <FaGoogle className="text-2xl text-red-500"/>
                    </a>
                    <a
                        href="http://localhost:5000/api/auth/discord"
                        className={`${register.social} p-4 rounded-full hover:scale-110 transition-all`}
                        title="Discord"
                    >
                        <FaDiscord className="text-2xl text-indigo-500"/>
                    </a>
                </div>
            </div>
        </div>
    );
}
