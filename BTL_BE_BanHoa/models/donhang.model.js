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
  const sqlString = "UPDATE donhang SET ? WHERE id = ?";
  db.query(sqlString, [donhang, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

donhang.delete = (id, callback) => {
  db.query("DELETE FROM donhang WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

donhang.createOrderWithDetails = (orderData, callback) =>{
  const {MaKhachHang, NgayDatHang, TongTien, TrangThai, listjson_chitiet } = orderData;

  const sqlString = `CALL sp_orders_create(?, ?, ?, ?, ?)`;
  db.query(
    sqlString,
    [MaKhachHang, NgayDatHang, TongTien, TrangThai, JSON.stringify(listjson_chitiet)],
    (err, result) => {
      if(err) return callback(err);
      callback(result);
    }
  )
}

export default donhang;
