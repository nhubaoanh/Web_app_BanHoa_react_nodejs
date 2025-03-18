import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/login', (req, res) => {
  const { userName, password } = req.body;

  // Kiểm tra thông tin đăng nhập
  if (userName === 'admin' && password === 'admin') {
    // Tạo JWT token
    const token = jwt.sign({ userName }, 'gdfhghrhghthghghghghg', { expiresIn: '1h' });
    res.send({ token });
  } else {
    res.status(401).send('Invalid username or password');
  }
});

export default router;