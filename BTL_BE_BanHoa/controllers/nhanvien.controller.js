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

  insertSaffOfAdmin: (req, res) => {
    const data = req.body;
    nhanvien.createSaffOfAdmin(data, (err,result) => {
      if(err){
        console.error("Error calling stored procedure:", err);
        return res.status(500).send({ message: "Error creating saff", error: err});
      }
      res.send({message: "saff created successfully", data: result});
    }
    );
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