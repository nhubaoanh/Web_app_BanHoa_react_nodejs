import khuyenmai from "../models/khuyenmai.model";

const khuyenmaiController = {
  getAll: (req, res) => {
    khuyenmai.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    khuyenmai.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    khuyenmai.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    khuyenmai.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    khuyenmai.delete(id, (result) => res.send(result));
  }
};
export default khuyenmaiController