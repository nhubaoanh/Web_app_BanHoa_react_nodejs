import khachhang from "../models/khachhang.model";

const khachhangController = {
  getAll: (req, res) => {
    khachhang.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    khachhang.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    khachhang.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    console.log("Dữ liệu nhận được từ frontend:", data);
    console.log("ID khách hàng:", id);
    khachhang.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    khachhang.delete(id, (result) => res.send(result));
  }
};
export default khachhangController