import chitietdonhang from "../models/chitietdonhang.model";

const chitietdonhangController = {
  getAll: (req, res) => {
    chitietdonhang.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    chitietdonhang.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    chitietdonhang.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    chitietdonhang.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    chitietdonhang.delete(id, (result) => res.send(result));
  }
};
export default chitietdonhangController