import bcrypt from "bcrypt";
import prisma from "../prisma/client.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    console.log("Получено на регистрацию:", { name, email, password });
  
    try {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) return res.status(400).json({ message: "Email уже существует" });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });
  
      const token = generateToken(user.id);
      res.status(201).json({ user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (err) {
      console.error("Ошибка при регистрации:", err);
      res.status(500).json({ message: "Помилка при реєстрації" });
    }
  };
  

  export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log("Попытка входа:", { email, password });
  
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(401).json({ message: "Неверный логин или пароль" });
  
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ message: "Неверный логин или пароль" });
  
      const token = generateToken(user.id);
      res.status(200).json({ user: { id: user.id, name: user.name, email: user.email }, token });
    } catch (err) {
      console.error("Ошибка при авторизации:", err);
      res.status(500).json({ message: "Ошибка на сервере" });
    }
  };
  


export const getMe = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: { id: true, name: true, email: true }
      });
      res.json({ user });
    } catch (err) {
      res.status(500).json({ message: "Помилка при отриманні користувача" });
    }
  };