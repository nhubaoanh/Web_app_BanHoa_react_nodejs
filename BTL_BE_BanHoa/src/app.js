import express from 'express';
import cors from 'cors';
import khachhangRoutes  from '../routes/khachhang.routes.js';
import adminRoutes  from '../routes/admin.routes.js';
import loaihoaRoutes  from '../routes/loaihoa.routes.js';
import donhangRoutes  from '../routes/donhang.routes.js';
import nhanviennhapRoutes  from '../routes/nhanvien.routes.js';
import sanphamRoutes  from '../routes/sanpham.routes.js';
import donhangnhapRoutes  from '../routes/donhangnhap.routes.js';
import khuyenmaiRoutes  from '../routes/khuyenmai.routes.js';
import chitietdonhangRoutes  from '../routes/chitietdonhang.routes.js';
import khuyenmaiRoutes  from '../routes/khuyenmai.routes.js';
import nhaccungcapRoutes  from '../routes/nhacungcap.routes.js';
import authRoutes from '../routes/auth.routes.js';
import path from 'path';
const app = express();


// Middleware để parse JSON
app.use(express.json());
app.use(cors());

// Khai báo thư mục tĩnh cho uploads
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// imprort vào
app.use("/api/khachhang", khachhangRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/donhang", donhangRoutes);
app.use("/api/donhangnhap", donhangnhapRoutes);
app.use("/api/loaihoa", loaihoaRoutes);
app.use("/api/sanpham", sanphamRoutes);
app.use("/api/nhanvien", nhanviennhapRoutes);
app.use("/api/khuyenmai", khuyenmaiRoutes);
app.use("/api/chitietdonhang", chitietdonhangRoutes);
app.use("/api/nhacungcap", nhaccungcapRoutes);
app.use("/api/auth", authRoutes);
app.listen(8080, () => {
    console.log("Server đang chạy tại http://localhost:8080");
  });
export const viteNodeApp = app;