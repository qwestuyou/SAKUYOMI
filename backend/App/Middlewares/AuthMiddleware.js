import AuthService from "../Services/AuthService.js";

const AuthMiddleware = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Вы не авторизованы" });
    }

    const decoded = AuthService.verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ message: "Недействительный токен" });
    }

    req.user = decoded;
    next();
};

export default AuthMiddleware;