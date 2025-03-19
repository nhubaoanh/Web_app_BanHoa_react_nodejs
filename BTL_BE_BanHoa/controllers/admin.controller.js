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
  login: (req, res) => {
    const { userName, password } = req.body;
    admin.findByCredentials(userName, password, (err, result) => {
      if (err) return res.status(500).send('Internal server error');
      if (result.length > 0) {
        // Tạo JWT token
        const token = jwt.sign({ userName }, 'gdfhghrhghthghghghghg', { expiresIn: '1h' });
        res.send({ token });
      } else {
        res.status(401).send('Invalid username or password');
      }
    });
  }
};
export default adminController