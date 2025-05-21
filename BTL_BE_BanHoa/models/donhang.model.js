import db from "../common/db";
const donhang = (donhang) => {
this.MaDonHang = donhang.MaDonHang;
this.MaKhachHang = donhang.MaKhachHang;
this.NgayDatHang = donhang.NgayDatHang;
this.TongTien = donhang.TongTien;
this.TrangThai = donhang.TrangThai;
};
donhang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM donhang WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

donhang.getAll = (callback) => {
  const sqlString = "SELECT * FROM donhang";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

donhang.insert = (donhang, callback) => {
  const sqlString = "INSERT INTO donhang SET ?";
  db.query(sqlString, donhang, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ...donhang });
  });
};

donhang.update = (donhang, id, callback) => {
  // Validate và chuyển đổi dữ liệu
  let { MaKhachHang, TongTien, TrangThai, NgayDatHang } = donhang;

  // Chuyển MaKhachHang thành số nguyên
  MaKhachHang = parseInt(MaKhachHang);
  if (isNaN(MaKhachHang)) {
    return callback(new Error('Mã khách hàng không hợp lệ'));
  }

  // Chuyển TongTien thành số thập phân
  TongTien = parseFloat(TongTien);
  if (isNaN(TongTien)) {
    return callback(new Error('Tổng tiền không hợp lệ'));
  }

  // Xử lý định dạng ngày tháng
  let formattedDate = NgayDatHang;
  if (NgayDatHang) {
    try {
      const date = new Date(NgayDatHang);
      formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    } catch (error) {
      return callback(new Error('Định dạng ngày tháng không hợp lệ'));
    }
  }

  // Chuẩn bị dữ liệu cập nhật
  const updateData = {
    MaKhachHang,
    TongTien,
    TrangThai,
    NgayDatHang: formattedDate
  };

  console.log('Dữ liệu cập nhật:', updateData);

  const sqlString = "UPDATE donhang SET ? WHERE MaDonHang = ?";
  db.query(sqlString, [updateData, id], (err, res) => {
    if (err) {
      console.error('Lỗi khi cập nhật đơn hàng:', err);
      return callback(err);
    }
    if (res.affectedRows === 0) {
      return callback(new Error('Không tìm thấy đơn hàng để cập nhật'));
    }
    callback(null, { message: "Cập nhật thành công", affectedRows: res.affectedRows });
  });
};

donhang.delete = (id, callback) => {
  db.query("DELETE FROM donhang WHERE MaDonHang = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

// donhang.createOrderWithDetails = (orderData, callback) =>{
//   const {MaKhachHang, NgayDatHang, TongTien, TrangThai, listjson_chitiet } = orderData;

//   const sqlString = `CALL sp_orders_create(?, ?, ?, ?, ?)`;
//   db.query(
//     sqlString,
//     [MaKhachHang, NgayDatHang, TongTien, TrangThai, JSON.stringify(listjson_chitiet)],
//     (err, result) => {
//       if(err) return callback(err);
//       callback(result);
//     }
//   )
// }

donhang.createOrderWithDetails = (orderData, callback) => {
  let { MaKhachHang, NgayDatHang, TongTien, TrangThai, listjson_chitiet } = orderData;

  // Chuyển MaKhachHang thành số nguyên (int)
  MaKhachHang = parseInt(MaKhachHang);
  if (isNaN(MaKhachHang)) {
    return callback(new Error('Mã khách hàng không hợp lệ'));
  }

  // Chuyển TongTien thành số thập phân (decimal)
  TongTien = parseFloat(TongTien);
  if (isNaN(TongTien)) {
    return callback(new Error('Tổng tiền không hợp lệ'));
  }

  const sqlString = `CALL sp_orders_create(?, ?, ?, ?, ?)`;
  db.query(
    sqlString,
    [MaKhachHang, NgayDatHang, TongTien, TrangThai, JSON.stringify(listjson_chitiet)],
    (err, result) => {
      if (err) return callback(err);

      console.log("Kết quả gọi thủ tục:", result);

      // Kiểm tra và lấy MaDonHangInserted từ kết quả
      if (result && result[0] && result[0][0] && result[0][0].MaDonHangInserted) {
        callback(null, { MaDonHang: result[0][0].MaDonHangInserted });
      } else {
        callback(new Error("Không lấy được ID của đơn hàng"));
      }
    }
  );
};

donhang.getTopSanphamBanChay = (SoLuong, callback) => {
  const sqlString = `CALL TopSanPhamBanChay(?)`;
  db.query(sqlString, [SoLuong], (err, result) => {
    if (err) return callback(err);
    callback(null,result[0]);
  });
};



export default donhang;
