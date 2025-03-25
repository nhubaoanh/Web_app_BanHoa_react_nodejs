import db from "../common/db";
const chitietdonhang = (chitietdonhang) => {
this.MaChiTiet = chitietdonhang.MaChiTiet;
this.MaDonHang = chitietdonhang.MaDonHang;
this.MaSanPham = chitietdonhang.MaSanPham;
this.SoLuong = chitietdonhang.SoLuong;
this.GiaBan = chitietdonhang.GiaBan;
this.ThanhTien = chitietdonhang.ThanhTien;
};
chitietdonhang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM chitietdonhang WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

chitietdonhang.getAll = (callback) => {
  const sqlString = "SELECT * FROM chitietdonhang";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

chitietdonhang.insert = (chitietdonhang, callback) => {
  const sqlString = "INSERT INTO chitietdonhang SET ?";
  db.query(sqlString, chitietdonhang, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ...chitietdonhang });
  });
};

chitietdonhang.update = (chitietdonhang, id, callback) => {
  const sqlString = "UPDATE chitietdonhang SET ? WHERE id = ?";
  db.query(sqlString, [chitietdonhang, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

chitietdonhang.delete = (id, callback) => {
  db.query("DELETE FROM chitietdonhang WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default chitietdonhang;
