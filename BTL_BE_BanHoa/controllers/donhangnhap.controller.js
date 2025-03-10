import donhangnhap from "../models/donhangnhap.model";

const donhangnhapController = {
  getAll: (req, res) => {
    donhangnhap.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    donhangnhap.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    donhangnhap.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    donhangnhap.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    donhangnhap.delete(id, (result) => res.send(result));
  }
};
export default donhangnhapController