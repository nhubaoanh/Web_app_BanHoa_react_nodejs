import db from "../common/db";
const donhangnhap = (donhangnhap) => {
this.MaDonNhap = donhangnhap.MaDonNhap;
this.MaNhaCungCap = donhangnhap.MaNhaCungCap;
this.MaNhanVien = donhangnhap.MaNhanVien;
this.NgayNhap = donhangnhap.NgayNhap;
this.TongTien = donhangnhap.TongTien;
this.TrangThai = donhangnhap.TrangThai;
};
donhangnhap.getById = (id, callback) => {
  const sqlString = "SELECT * FROM donhangnhap WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

donhangnhap.getAll = (callback) => {
  const sqlString = "SELECT * FROM donhangnhap";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

donhangnhap.insert = (donhangnhap, callback) => {
  const sqlString = "INSERT INTO donhangnhap SET ?";
  db.query(sqlString, donhangnhap, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ...donhangnhap });
  });
};

donhangnhap.update = (donhangnhap, id, callback) => {
  const sqlString = "UPDATE donhangnhap SET ? WHERE id = ?";
  db.query(sqlString, [donhangnhap, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

donhangnhap.delete = (id, callback) => {
  db.query("DELETE FROM donhangnhap WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

donhangnhap.createAddOrderWithDetails = (orderData, callback) =>{
  let {MaNhaCungCap, MaNhanVien, NgayNhap, TongTien, TrangThai, listjson_chitiet } = orderData;

  // Chuyển MaKhachHang thành số nguyên (int)
  MaNhaCungCap = parseInt(MaNhaCungCap);
  if (isNaN(MaNhaCungCap)) {
    return callback(new Error('Mã nhà cung cấp không hợp lệ'));
  }

  // Chuyển TongTien thành số thập phân (decimal)
  TongTien = parseFloat(TongTien);
  if (isNaN(TongTien)) {
    return callback(new Error('Tổng tiền không hợp lệ'));
  }
  const sqlString = `CALL sp_donnhap_create(?, ?, ?, ?, ?, ?)`;
  db.query(
    sqlString,
    [MaNhaCungCap, MaNhanVien, NgayNhap, TongTien, TrangThai, JSON.stringify(listjson_chitiet)],
    (err, result) => {
      if(err) return callback(err);
      callback(null, result);
    }
  )
};

export default donhangnhap;
