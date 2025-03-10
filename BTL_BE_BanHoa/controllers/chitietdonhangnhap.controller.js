import chitietdonhangnhap from "../models/chitietdonhangnhap.model";

const chitietdonhangnhapController = {
  getAll: (req, res) => {
    chitietdonhangnhap.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    chitietdonhangnhap.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    chitietdonhangnhap.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    chitietdonhangnhap.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    chitietdonhangnhap.delete(id, (result) => res.send(result));
  }
};
export default chitietdonhangnhapController