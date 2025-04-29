import express from "express";
import { register, login, getMe } from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import passport from "passport";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/discord", passport.authenticate("discord"));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  }),
  (req, res) => {
    const { token, user } = req.user;
    res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}&name=${encodeURIComponent(user.name)}`);
  }
);

router.get(
    "/discord/callback",
    passport.authenticate("discord", {
      session: false,
      failureRedirect: `${process.env.FRONTEND_URL}/login`,
    }),
    (req, res) => {
      const { token, user } = req.user;
      res.redirect(`${process.env.FRONTEND_URL}/?token=${token}&name=${encodeURIComponent(user.name)}`);
    }
  );

export default router;
