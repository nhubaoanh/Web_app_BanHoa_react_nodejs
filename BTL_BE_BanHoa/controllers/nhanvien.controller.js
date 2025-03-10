import nhanvien from "../models/nhanvien.model";

const nhanvienController = {
  getAll: (req, res) => {
    nhanvien.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    nhanvien.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    nhanvien.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    nhanvien.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    nhanvien.delete(id, (result) => res.send(result));
  }
};
export default nhanvienController