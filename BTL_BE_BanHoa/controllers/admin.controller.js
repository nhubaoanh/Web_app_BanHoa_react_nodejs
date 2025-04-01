import admin from "../models/admin.model";
import jwt from 'jsonwebtoken';
const adminController = {
  getAll: (req, res) => {
    admin.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    admin.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    admin.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    admin.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    admin.delete(id, (result) => res.send(result));
  },
  // login: (req, res) => {
  //   const { userName, password } = req.body;
  //   admin.findByCredentials(userName, password, (err, result) => {
  //     if (err) return res.status(500).send('Internal server error');
  //     if (result.length > 0) {
  //       // Tạo JWT token
  //       const token = jwt.sign({ userName }, 'gdfhghrhghthghghghghg', { expiresIn: '1h' });
  //       res.send({ token });
  //     } else {
  //       res.status(401).send('Invalid username or password');
  //     }
  //   });
  // }
  login: (req, res) => {
    const { userName, password } = req.body;
    admin.findByCredentials(userName, password, (err, result) => {
      if (err) return res.status(500).send('Internal server error');
      if (result.length > 0) {
        const user = result[0];
        // Tạo JWT token
        const token = jwt.sign({ userName, quyenHan: user.QuyenHan }, 'gdfhghrhghthghghghghg', { expiresIn: '1h' });

        // Cập nhật trạng thái của tất cả người dùng thành 0
        admin.resetStatus((err) => {
          if (err) return res.status(500).send('Internal server error');

          // Cập nhật trạng thái của người dùng hiện tại thành 1
          admin.updateStatus(user.MaAdmin, 1, (err) => {
            if (err) return res.status(500).send('Internal server error');
            res.send({ token, quyenHan: user.QuyenHan });
          });
        });
      } else {
        res.status(401).send('Invalid username or password');
      }
    });
  },
  logout: (req, res) => {
    // Cập nhật trạng thái của tất cả người dùng thành 0
    admin.resetStatus((err) => {
      if (err) return res.status(500).send('Internal server error');
      res.send('Logout successful');
    });
  },

  checkStatus: (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
  
    try {
      const decoded = jwt.verify(token, 'gdfhghrhghthghghghghg');
      const userName = decoded.userName;
  
      admin.findByCredentials(userName, null, (err, result) => {
        if (err) return res.status(500).send('Internal server error');
        if (result.length > 0) {
          const user = result[0];
          res.send({ HoTen: user.HoTen, TrangThai: user.TrangThai });
        } else {
          res.status(404).send('User not found');
        }
      });
    } catch (error) {
      res.status(401).send('Invalid token');
    }
  },
  
};
export default adminController