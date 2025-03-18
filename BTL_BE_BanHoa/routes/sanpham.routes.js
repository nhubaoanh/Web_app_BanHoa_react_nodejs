import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import sanphamController from '../controllers/sanpham.controller.js';

const router = express.Router();

// Định nghĩa thư mục lưu trữ
const uploadDir = path.resolve('uploads/');

// Kiểm tra và tạo thư mục uploads nếu chưa tồn tại
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình multer để lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Thư mục lưu file
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file theo thời gian hiện tại
  }
});

const upload = multer({ storage: storage });

// Định nghĩa các API endpoint
router.get('/', sanphamController.getAll);
router.get('/:id', sanphamController.getById);
router.post('/', upload.single('HinhAnh'), sanphamController.insert);
router.put('/:id', upload.single('HinhAnh'), sanphamController.update);
router.delete('/:id', sanphamController.delete);

export default router;