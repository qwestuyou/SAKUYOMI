import express from "express";
import multer from "multer";
import path from "path";
import authMiddleware from "../middleware/auth.middleware.js";
import prisma from "../prisma/client.js";


const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("uploads/avatars"));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({ storage });

router.post("/avatar", authMiddleware, upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file) {
      console.log("⚠️ Файл не был получен multer");
      return res.status(400).json({ message: "No file uploaded" });
    }
    console.log("✅ Файл получен multer:", req.file);

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    await prisma.user.update({
      where: { id: req.user.id },
      data: { avatar: avatarUrl },
    });

    res.json({ avatar: avatarUrl });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Failed to upload avatar" });
  }
});

export default router;
