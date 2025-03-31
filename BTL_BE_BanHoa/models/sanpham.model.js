import db from "../common/db";
import moment from "moment";
const sanpham = (sanpham) => {
this.MaSanPham = sanpham.MaSanPham;
this.TenHoa = sanpham.TenHoa;
this.MaLoaiHoa = sanpham.MaLoaiHoa;
this.GiaBan = sanpham.GiaBan;
this.SoLuongTon = sanpham.SoLuongTon;
this.MoTa = sanpham.MoTa;
this.HinhAnh = sanpham.HinhAnh;
this.TrangThai = sanpham.TrangThai;
this.NgayThem = sanpham.NgayThem;
};
sanpham.getById = (id, callback) => {
  const sqlString = "SELECT * FROM sanpham WHERE MaSanPham = ? ";
  db.query(sqlString, id, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

sanpham.getAll = (callback) => {
  const sqlString = "SELECT * FROM sanpham";
  db.query(sqlString, (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

sanpham.insert = (sanpham, callback) => {
  console.log("Dữ liệu đầu vào:", sanpham); 
  // Chuyển đổi NgayThem thành định dạng 'YYYY-MM-DD HH:MM:SS'
  if (sanpham.NgayThem) {
    sanpham.NgayThem = moment(sanpham.NgayThem).format("YYYY-MM-DD HH:mm:ss");
  }
  const sqlString = "INSERT INTO sanpham SET ?";
  db.query(sqlString, sanpham, (err, res) => {
    if (err) return callback(err);
    callback({ id: res.insertId, ...sanpham });
  });
};

sanpham.update = (sanpham, id, callback) => {
  if (sanpham.NgayThem) {
    sanpham.NgayThem = moment(sanpham.NgayThem).format("YYYY-MM-DD HH:mm:ss");
  }
  const sqlString = "UPDATE sanpham SET ? WHERE MaSanPham = ?";
  db.query(sqlString, [sanpham, id], (err, res) => {
    if (err) return callback(err);
    callback("Cập nhật thành công");
  });
};

sanpham.delete = (id, callback) => {
  db.query("DELETE FROM sanpham WHERE MaSanPham = ?", id, (err, res) => {
    if (err) return callback(err);
    callback("Xóa thành công");
  });
};

sanpham.getByCategory = (categoryId, callback) => {
  const sqlString = "SELECT * FROM sanpham WHERE MaLoaiHoa = ?";
  db.query(sqlString, [categoryId], (err, result) => {
    if (err) return callback(err);
    callback(result);
  });
};

export default sanpham;
