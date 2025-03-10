import db from "../common/db";
const khuyenmai = (khuyenmai) => {
this.MaKhuyenMai = khuyenmai.MaKhuyenMai;
this.TenKhuyenMai = khuyenmai.TenKhuyenMai;
this.GiamGia = khuyenmai.GiamGia;
this.NgayBatDau = khuyenmai.NgayBatDau;
this.NgayKetThuc = khuyenmai.NgayKetThuc;
this.TrangThai = khuyenmai.TrangThai;
};
khuyenmai.getById = (id, callback) => {
  const sqlString = "SELECT * FROM khuyenmai WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

khuyenmai.getAll = (callback) => {
  const sqlString = "SELECT * FROM khuyenmai";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

khuyenmai.insert = (khuyenmai, callback) => {
  const sqlString = "INSERT INTO khuyenmai SET ?";
  db.query(sqlString, {tableName}, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ...{tableName} });
  });
};

khuyenmai.update = (khuyenmai, id, callback) => {
  const sqlString = "UPDATE khuyenmai SET ? WHERE id = ?";
  db.query(sqlString, [{tableName}, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

khuyenmai.delete = (id, callback) => {
  db.query("DELETE FROM {tableName} WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default khuyenmai;
