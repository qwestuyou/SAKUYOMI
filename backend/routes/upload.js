import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Убедись, что папка существует
const uploadPath = path.resolve('uploads', 'avatars');
fs.mkdirSync(uploadPath, { recursive: true });

// Настройка хранилища
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });
 
router.post('/avatar', upload.single('avatar'), (req, res) => {
  const filename = req.file.filename;
  res.json({ url: `/uploads/avatars/${filename}` });
});

export default router;
