import db from "../common/db";
const khachhang = (khachhang) => {
this.MaKhachHang = khachhang.MaKhachHang;
this.HoTen = khachhang.HoTen;
this.SoDienThoai = khachhang.SoDienThoai;
this.Email = khachhang.Email;
this.DiaChi = khachhang.DiaChi;
this.NgayTao = khachhang.NgayTao;
};
khachhang.getById = (id, callback) => {
  const sqlString = "SELECT * FROM khachhang WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

khachhang.getAll = (callback) => {
  const sqlString = "SELECT * FROM khachhang";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

khachhang.insert = (khachhang, callback) => {
  const sqlString = "INSERT INTO khachhang SET ?";
  db.query(sqlString, khachhang, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ...khachhang });
  });
};

// khachhang.update = (khachhang, id, callback) => {
//   const sqlString = "UPDATE khachhang SET ? WHERE MaKhachHang = ?";
//   db.query(sqlString, [khachhang, id], (err, res) => {
//     if (err) return callback(err);
//     callback("Cập nhật thành công");
//   });
// };

khachhang.update = (khachhang, id, callback) => {
  const sqlString = "CALL SuaKhachHang(?, ?, ?, ?, ?, ?)";
  const values = [
    id,
    khachhang.HoTen,
    khachhang.SoDienThoai,
    khachhang.Email,
    khachhang.DiaChi,
    khachhang.NgayTao
  ];
  
  db.query(sqlString, values, (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

// khachhang.delete = (id, callback) => {
//   db.query("DELETE FROM khachhang WHERE MaKhachHang = ?", id, (err, res) => {
//     if (err) return callback(err);
//     callback("Xóa thành công");
//   });
// };
khachhang.delete = (id, callback) => {
  const sqlString = "CALL XoaKhachHang(?)"; // Gọi Stored Procedure
  db.query(sqlString, [id], (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};


export default khachhang;
