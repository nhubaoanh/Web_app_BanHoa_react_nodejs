import loaihoa from "../models/loaihoa.model";

const loaihoaController = {
  getAll: (req, res) => {
    loaihoa.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    loaihoa.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    loaihoa.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    loaihoa.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    loaihoa.delete(id, (result) => res.send(result));
  }
};
export default loaihoaController