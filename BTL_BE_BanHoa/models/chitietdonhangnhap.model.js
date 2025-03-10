import db from "../common/db";
const chitietdonhangnhap = (chitietdonhangnhap) => {
this.MaChiTietNhap = chitietdonhangnhap.MaChiTietNhap;
this.MaDonNhap = chitietdonhangnhap.MaDonNhap;
this.MaSanPham = chitietdonhangnhap.MaSanPham;
this.SoLuong = chitietdonhangnhap.SoLuong;
this.GiaNhap = chitietdonhangnhap.GiaNhap;
this.ThanhTien = chitietdonhangnhap.ThanhTien;
};
chitietdonhangnhap.getById = (id, callback) => {
  const sqlString = "SELECT * FROM chitietdonhangnhap WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

chitietdonhangnhap.getAll = (callback) => {
  const sqlString = "SELECT * FROM chitietdonhangnhap";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

chitietdonhangnhap.insert = (chitietdonhangnhap, callback) => {
  const sqlString = "INSERT INTO chitietdonhangnhap SET ?";
  db.query(sqlString, {tableName}, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ...{tableName} });
  });
};

chitietdonhangnhap.update = (chitietdonhangnhap, id, callback) => {
  const sqlString = "UPDATE chitietdonhangnhap SET ? WHERE id = ?";
  db.query(sqlString, [{tableName}, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

chitietdonhangnhap.delete = (id, callback) => {
  db.query("DELETE FROM {tableName} WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default chitietdonhangnhap;
