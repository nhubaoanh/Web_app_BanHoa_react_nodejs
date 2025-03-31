import db from "../common/db";
const nhacungcap = (nhacungcap) => {
this.MaNhaCungCap = nhacungcap.MaNhaCungCap;
this.TenNhaCungCap = nhacungcap.TenNhaCungCap;
this.SoDienThoai = nhacungcap.SoDienThoai;
this.Email = nhacungcap.Email;
this.DiaChi = nhacungcap.DiaChi;
this.GhiChu = nhacungcap.GhiChu;
};
nhacungcap.getById = (id, callback) => {
  const sqlString = "SELECT * FROM nhacungcap WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

nhacungcap.getAll = (callback) => {
  const sqlString = "SELECT * FROM nhacungcap";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

nhacungcap.insert = (nhacungcap, callback) => {
  const sqlString = "INSERT INTO nhacungcap SET ?";
  db.query(sqlString, nhacungcap, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ...nhacungcap });
  });
};

nhacungcap.update = (nhacungcap, id, callback) => {
  const sqlString = "UPDATE nhacungcap SET ? WHERE MaNhaCungCap = ?";
  db.query(sqlString, [nhacungcap, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

nhacungcap.delete = (id, callback) => {
  db.query("DELETE FROM nhacungcap WHERE MaNhaCungCap = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default nhacungcap;
