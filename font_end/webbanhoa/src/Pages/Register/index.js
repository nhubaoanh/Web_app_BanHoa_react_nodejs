import React, { useState } from 'react';
import api from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Mật khẩu không khớp');
      return;
    }

    try {
      // Thêm vào bảng admin
      const adminResponse = await api.post('/api/admin/', {
        TenDangNhap: formData.name,
        Email: formData.email,
        MatKhau: formData.password,
        HoTen: formData.name,
        QuyenHan: 'khachhang',
        TrangThai: 0
      });

      console.log('Admin response:', adminResponse.data);

      if (!adminResponse.data.MaAdmin) {
        throw new Error('Không nhận được MaAdmin từ server');
      }

      // Thêm vào bảng khachhang với MaAdmin từ response
      const khachHangResponse = await api.post('/api/khachhang/', {
        HoTen: formData.name,
        Email: formData.email,
        SoDienThoai: '',
        DiaChi: '',
        MaAdmin: adminResponse.data.MaAdmin // Sử dụng MaAdmin từ response
      });

      console.log('KhachHang response:', khachHangResponse.data);

      // Lưu thông tin vào localStorage
      localStorage.setItem('MaAdmin', adminResponse.data.MaAdmin);
      localStorage.setItem('MaKhachHang', khachHangResponse.data.MaKhachHang);

      alert('Đăng ký thành công!');
      // Chuyển hướng đến trang đăng nhập
      window.location.href = '/login';
    } catch (error) {
      console.error('Lỗi khi đăng ký:', error);
      alert('Đăng ký thất bại: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <section className="vh-80" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init=""
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-label" htmlFor="form3Example1c">
                              Your Name
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init=""
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-label" htmlFor="form3Example3c">
                              Your Email
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init=""
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-label" htmlFor="form3Example4c">
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw" />
                          <div
                            data-mdb-input-init=""
                            className="form-outline flex-fill mb-0"
                          >
                            <input
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              required
                            />
                            <label className="form-label" htmlFor="form3Example4cd">
                              Repeat your password
                            </label>
                          </div>
                        </div>
                        <div className="form-check d-flex justify-content-center mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            defaultValue=""
                            id="form2Example3c"
                            required
                          />
                          <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in{" "}
                            <a href="#!">Terms of service</a>
                          </label>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            data-mdb-button-init=""
                            data-mdb-ripple-init=""
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                          <button
                            type="button"
                            data-mdb-button-init=""
                            data-mdb-ripple-init=""
                            className="btn btn-primary btn-lg mx-5"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;