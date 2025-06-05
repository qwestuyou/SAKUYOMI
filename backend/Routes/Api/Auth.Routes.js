import express from "express";
import AuthController from "../../App/Controllers/AuthController.js";
import AuthMiddleware from "../../App/Middlewares/AuthMiddleware.js";
import passport from "../../Config/passport.js";

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/me", AuthMiddleware, AuthController.me);

router.get("/google", passport.authenticate("google", {scope: ["profile", "email"]}));
router.get(
    "/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL}/login`,
    }),
    (req, res) => {
        const {token, user} = req.user;
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.redirect(`${process.env.FRONTEND_URL}/`);
    }
);

router.get("/discord", passport.authenticate("discord"));
router.get(
    "/discord/callback",
    passport.authenticate("discord", {
        session: false,
        failureRedirect: `${process.env.FRONTEND_URL}/login`,
    }),
    (req, res) => {
        const {token, user} = req.user;
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.redirect(`${process.env.FRONTEND_URL}/`);
    }
);

export default router;
