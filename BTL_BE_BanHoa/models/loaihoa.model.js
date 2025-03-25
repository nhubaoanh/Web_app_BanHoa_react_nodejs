import db from "../common/db";
const loaihoa = (loaihoa) => {
this.MaLoaiHoa = loaihoa.MaLoaiHoa;
this.TenLoaiHoa = loaihoa.TenLoaiHoa;
this.MoTa = loaihoa.MoTa;
};
loaihoa.getById = (id, callback) => {
  const sqlString = "SELECT * FROM loaihoa WHERE id = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

loaihoa.getAll = (callback) => {
  const sqlString = "SELECT * FROM loaihoa";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

loaihoa.insert = (loaihoa, callback) => {
  const sqlString = "INSERT INTO loaihoa SET ?";
  db.query(sqlString, loaihoa, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ...loaihoa });
  });
};

loaihoa.update = (loaihoa, id, callback) => {
  const sqlString = "UPDATE loaihoa SET ? WHERE id = ?";
  db.query(sqlString, [loaihoa, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

loaihoa.delete = (id, callback) => {
  db.query("DELETE FROM loaihoa WHERE id = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

export default loaihoa;
