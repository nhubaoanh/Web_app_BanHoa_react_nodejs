import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req, res) => {
  const { userName, password } = req.body;

  // tìm kiếm
  const query = 'SELECT * FROM admin WHERE TenDangNhap = ? AND MatKhau = ?';
  // Kiểm tra thông tin đăng nhập
  db.query(query, [userName, password], (error, results) => {
    if (error) {
      return res.status(500).send('Internal server error');
    }

    if (results.length > 0) {
      // Tạo JWT token
      const token = jwt.sign({ userName }, 'gdfhghrhghthghghghghg', { expiresIn: '1h' });
      res.send({ token });
    } else {
      res.status(401).send('Invalid username or password');
    }
  });
});

export default router;