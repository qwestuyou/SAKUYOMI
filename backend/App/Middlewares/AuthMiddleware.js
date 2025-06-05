import AuthService from "../Services/AuthService.js";

const AuthMiddleware = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "You are not logged in" });
    }

    const decoded = AuthService.verifyToken(token);

    if (!decoded) {
        return res.status(401).json({ message: "Invalid token" });
    }

    req.user = decoded;
    next();
};

export default AuthMiddleware;