import admin from "../models/admin.model";

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
  }
};
export default adminController