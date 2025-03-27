import sanpham from "../models/sanpham.model";
import path from 'path';
const sanphamController = {
  getAll: (req, res) => {
    sanpham.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    sanpham.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    if (req.file) {
      data.HinhAnh = path.join('uploads', req.file.filename); // Lưu đường dẫn ảnh
    }
    console.log("Data received for insert:", data); // Thêm log để kiểm tra dữ liệu
    sanpham.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    if (req.file) {
      data.HinhAnh = path.join('uploads', req.file.filename); // Lưu đường dẫn ảnh
    }
    sanpham.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    sanpham.delete(id, (result) => res.send(result));
  },
  getByCategory: (req, res) => {
    const categoryId = req.params.categoryId;
    sanpham.getByCategory(categoryId, (result) => res.send(result));
  }
};
export default sanphamController