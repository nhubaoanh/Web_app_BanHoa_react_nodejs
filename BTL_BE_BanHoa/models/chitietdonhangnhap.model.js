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
  db.query(sqlString, chitietdonhangnhap, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ...chitietdonhangnhap });
  });
};

chitietdonhangnhap.update = (chitietdonhangnhap, id, callback) => {
  const sqlString = "UPDATE chitietdonhangnhap SET ? WHERE id = ?";
  db.query(sqlString, [chitietdonhangnhap, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

chitietdonhangnhap.delete = (id, callback) => {
  db.query("DELETE FROM chitietdonhangnhap WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default chitietdonhangnhap;
