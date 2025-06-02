import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import path from "path";

import authRoutes from "./Routes/Api/Auth.Routes.js";
import productRoutes from "./Routes/Web/ProductRoutes.js";
import categoryRoutes from "./Routes/Web/CategoryRoutes.js";
import profileRoutes from "./Routes/Web/ProfileRoutes.js";
import reviewRoutes from "./Routes/Web/ReviewRoutes.js";
import wishlistRoutes from "./Routes/Web/WishlistRoutes.js";
import cartRoutes from "./Routes/Web/CartRoutes.js";
import passport from "./Config/passport.js";

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/update", profileRoutes);
app.use("/api/cart", cartRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});
