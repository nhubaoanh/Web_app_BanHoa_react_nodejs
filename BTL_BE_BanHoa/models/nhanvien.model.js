import db from "../common/db";
const nhanvien = (nhanvien) => {
this.MaNhanVien = nhanvien.MaNhanVien;
this.HoTen = nhanvien.HoTen;
this.SoDienThoai = nhanvien.SoDienThoai;
this.Email = nhanvien.Email;
this.MatKhau = nhanvien.MatKhau;
this.TrangThai = nhanvien.TrangThai;
};
nhanvien.getById = (id, callback) => {
  const sqlString = "SELECT * FROM nhanvien WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

nhanvien.getAll = (callback) => {
  const sqlString = "SELECT * FROM nhanvien";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

nhanvien.insert = (nhanvien, callback) => {
  const sqlString = "INSERT INTO nhanvien SET ?";
  db.query(sqlString, {tableName}, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ...{tableName} });
  });
};

nhanvien.update = (nhanvien, id, callback) => {
  const sqlString = "UPDATE nhanvien SET ? WHERE id = ?";
  db.query(sqlString, [{tableName}, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

nhanvien.delete = (id, callback) => {
  db.query("DELETE FROM {tableName} WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default nhanvien;
