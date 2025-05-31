import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import AuthService from "../Services/AuthService.js";

const prisma = new PrismaClient();

class AuthController {
    async register(req, res) {
        const { name, email, password } = req.body;

        try {
            const existing = await prisma.user.findUnique({ where: { email } });
            if (existing) return res.status(400).json({ message: "Email уже существует" });

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    avatar: "/uploads/avatars/avatar.jpg",
                },
            });

            const token = AuthService.generateToken(user.id);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.status(201).json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    avatar: user.avatar,
                },
            });
        } catch (err) {
            console.error("Ошибка при регистрации:", err);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) return res.status(401).json({ message: "Неверный логин или пароль" });

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) return res.status(401).json({ message: "Неверный логин или пароль" });

            const token = AuthService.generateToken(user.id);
            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            return res.json({
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (err) {
            console.error("Ошибка при входе:", err);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async me(req, res) {
        try {
            const user = await prisma.user.findUnique({
                where: { id: req.user.id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true,
                    createdAt: true,
                    isAdmin: true, // ← добавляем
                },
            });

            if (!user) return res.status(404).json({ message: "Пользователь не найден" });

            return res.json({ user });
        } catch (err) {
            console.error("Ошибка при получении пользователя:", err);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }

    async logout(req, res) {
        res.clearCookie("token");
        return res.status(200).json({ message: "Выход выполнен" });
    }
}

export default new AuthController();