import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await api.post("/api/admin/login", { userName, password });
      const { token, quyenHan, MaAdmin } = response.data;
      console.log(response.data);
      localStorage.setItem('token', token);
      localStorage.setItem('quyenHan', quyenHan);
      localStorage.setItem('MaAdmin', MaAdmin);
      console.log('jwt token:', token);
      alert('Login successful');

      // Điều hướng dựa trên quyền hạn
      if (quyenHan === 'nhanvien') {
        navigate('/admin/Product'); // Chuyển hướng đến trang quản lý sản phẩm
      } else if (quyenHan === 'quanly') {
        navigate('/admin/Dashboard'); // Chuyển hướng đến trang quản lý người dùng, khách hàng, nhà cung cấp
      }else if (quyenHan === 'khachhang'){
        navigate('/home')
      }
       else {
        navigate('/login'); // Chuyển hướng đến trang Home mặc định
      }
      
    } catch (error) {
      alert('Invalid username or password');
    }
  };


  return (
    <div>
      <section className="vh-80">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example3"
                    className="form-control form-control-lg"
                    placeholder="Enter a valid username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3">
                    Username
                  </label>
                </div>
                <div className="form-outline mb-3">
                  <input
                    type="password"
                    id="form3Example4"
                    className="form-control form-control-lg"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example4">
                    Password
                  </label>
                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button
                    type="button"
                    className="btn btn-primary btn-lg"
                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <a href="#!" className="link-danger">
                      Register
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;