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

export default donhangnhap;
