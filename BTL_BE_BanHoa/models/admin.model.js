import db from "../common/db";
const admin = (admin) => {
this.MaAdmin = admin.MaAdmin;
this.HoTen = admin.HoTen;
this.TenDangNhap = admin.TenDangNhap;
this.MatKhau = admin.MatKhau;
this.Email = admin.Email;
this.SoDienThoai = admin.SoDienThoai;
this.QuyenHan = admin.QuyenHan;
this.TrangThai = admin.TrangThai;
};
admin.getById = (id, callback) => {
  const sqlString = "SELECT * FROM admin WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

admin.getAll = (callback) => {
  const sqlString = "SELECT * FROM admin";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

admin.insert = (admin, callback) => {
  const sqlString = "INSERT INTO admin SET ?";
  db.query(sqlString, {tableName}, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ...{tableName} });
  });
};

admin.update = (admin, id, callback) => {
  const sqlString = "UPDATE admin SET ? WHERE id = ?";
  db.query(sqlString, [{tableName}, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

admin.delete = (id, callback) => {
  db.query("DELETE FROM {tableName} WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default admin;
