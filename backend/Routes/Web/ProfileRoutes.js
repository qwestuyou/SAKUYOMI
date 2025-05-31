import express from "express";
import multer from "multer";
import path from "path";
import ProfileController from "../../App/Controllers/ProfileController.js";
import AuthMiddleware from "../../App/Middlewares/AuthMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.resolve("uploads/avatars")),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.fieldname}${ext}`);
    },
});

const upload = multer({ storage });

// Обновление только аватарки
router.post("/avatar", AuthMiddleware, upload.single("avatar"), ProfileController.updateAvatar);

// Обновление имени, почты, аватарки и пароля
router.post("/update", AuthMiddleware, upload.single("avatar"), ProfileController.updateProfile);

export default router;
