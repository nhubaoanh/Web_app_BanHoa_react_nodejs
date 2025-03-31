import db from "../common/db";
import moment from 'moment'; // Import thư viện moment để xử lý thời gian
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

khachhang.update = (data, id, callback) => {
  // Chuyển đổi định dạng NgayTao
  const formattedNgayTao = moment(data.NgayTao).format('YYYY-MM-DD HH:mm:ss');

  const sqlString = `
    UPDATE khachhang
    SET HoTen = ?, SoDienThoai = ?, Email = ?, DiaChi = ?, NgayTao = ?
    WHERE MaKhachHang = ?
  `;
  const values = [
    data.HoTen,
    data.SoDienThoai,
    data.Email,
    data.DiaChi,
    formattedNgayTao, // Sử dụng giá trị đã chuyển đổi
    id
  ];

  db.query(sqlString, values, (err, result) => {
    if (err) {
      console.error("Lỗi khi cập nhật khách hàng:", err);
      return callback({ success: false, message: "Lỗi khi cập nhật khách hàng" });
    }
    if (result.affectedRows === 0) {
      return callback({ success: false, message: "Không tìm thấy khách hàng để cập nhật" });
    }
    callback({ success: true, message: "Cập nhật thành công", data: result });
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
