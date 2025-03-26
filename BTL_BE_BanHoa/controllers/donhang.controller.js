import donhang from "../models/donhang.model";

const donhangController = {
  getAll: (req, res) => {
    donhang.getAll((result) => res.send(result));
  },

  getById: (req, res) => {
    const id = req.params.id;
    donhang.getById(id, (result) => res.send(result));
  },

  insert: (req, res) => {
    const data = req.body;
    donhang.insert(data, (result) => res.send(result));
  },

  update: (req, res) => {
    const data = req.body;
    const id = req.params.id;
    donhang.update(data, id, (result) => res.send(result));
  },

  delete: (req, res) => {
    const id = req.params.id;
    donhang.delete(id, (result) => res.send(result));
  },
  insertWithDetails: (req, res) => {
    const data = req.body;

    donhang.createOrderWithDetails(data, (err, result) => {
      if(err){
        console.error("Error calling stored procedure:", err);
        return res.status(500).send({ message: "Error creating order", error: err});

      }
      res.send({message: "Order created successfully", data: result});
    });
  }
};
export default donhangController