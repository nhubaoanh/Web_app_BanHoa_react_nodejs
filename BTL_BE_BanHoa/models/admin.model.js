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
  db.query(sqlString, admin, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ...admin });
  });
};

admin.update = (admin, id, callback) => {
  const sqlString = "UPDATE admin SET ? WHERE id = ?";
  db.query(sqlString, [admin, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

admin.delete = (id, callback) => {
  db.query("DELETE FROM admin WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

admin.findByCredentials = (userName, password, callback) => {
  const sqlString = "SELECT * FROM admin WHERE TenDangNhap = ? AND MatKhau = ?";
  db.query(sqlString, [userName, password], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

admin.updateStatus = (id, status, callback) => {
  const sqlString = "UPDATE admin SET TrangThai = ? WHERE MaAdmin = ?";
  db.query(sqlString, [status, id], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

admin.resetStatus = (callback) => {
  const sqlString = "UPDATE admin SET TrangThai = 0";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

export default admin;
