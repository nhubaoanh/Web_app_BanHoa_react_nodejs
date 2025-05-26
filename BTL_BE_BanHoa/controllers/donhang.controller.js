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
    
    console.log('Dữ liệu cập nhật từ request:', data);
    console.log('ID đơn hàng cần cập nhật:', id);

    donhang.update(data, id, (err, result) => {
      if (err) {
        console.error('Lỗi khi cập nhật đơn hàng:', err);
        return res.status(400).json({ 
          message: "Lỗi khi cập nhật đơn hàng", 
          error: err.message 
        });
      }
      res.json({ 
        message: "Cập nhật đơn hàng thành công", 
        data: result 
      });
    });
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
  ,
  getTopSanPhamBanChay: (req, res) => {
    const soLuong = parseInt(req.query.soluong) || 5;
    
    if (isNaN(soLuong) || soLuong <= 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Số lượng không hợp lệ. Vui lòng nhập số dương." 
      });
    }

    donhang.getTopSanphamBanChay(soLuong, (err, result) => {
      if (err) {
        console.error("Error fetching top selling products:", err);
        return res.status(500).json({ 
          success: false,
          message: "Lỗi khi lấy dữ liệu sản phẩm bán chạy", 
          error: err.message 
        });
      }

      res.json({
        success: true,
        data: result,
        total: result.length
      });
    });
  }
};
export default donhangController