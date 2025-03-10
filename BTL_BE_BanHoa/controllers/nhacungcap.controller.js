import nhacungcap from "../models/nhacungcap.model";

const nhacungcapController = {
  getAll: (req, res) => {
    nhacungcap.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    nhacungcap.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    nhacungcap.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    nhacungcap.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    nhacungcap.delete(id, (result) => res.send(result));
  }
};
export default nhacungcapController