import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./Header.css";
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';

const Header = () => {
  const [menus, setMenus] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Gọi API khi component được render lần đầu
  useEffect(() => {
    api
      .get("/api/loaihoa") // Gọi API lấy danh sách loại hoa
      .then((response) => {
        setMenus(response.data); // Lưu dữ liệu vào state
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách loại hoa:", error);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3); // Giả sử có 3 slide
    }, 3000); // Chuyển slide sau mỗi 3 giây

    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = async () => {
    try {
      await api.post("/api/admin/logout"); // Gọi API đăng xuất
      localStorage.removeItem("token"); // Xóa token khỏi localStorage
      navigate("/login"); // Chuyển hướng đến trang đăng nhập
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <div>
      <header key="1">
        <nav
          className="navbar navbar-expand-lg navbar-dark d-none d-lg-block"
          style={{
            zIndex: "2000",
          }}
        >
          <div className="container-fluid">
            <Link className="navbar-brand nav-link" to="/home">
              <strong>kiwi</strong>
            </Link>
            <button
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
              className="navbar-toggler"
              data-bs-toggle="collapse"
              data-bs-target="#navbarExample01"
              type="button"
            >
              <i className="fas fa-bars" />
            </button>
            <div className="collapse navbar-collapse" id="navbarExample01">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item active">
                  <Link className="nav-link" to="/home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/learn-bootstrap">
                    Learn Bootstrap 5
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/download-mdb">
                    Download MDB UI KIT
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="productDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Danh Mục
                  </Link>
                  <ul className="dropdown-menu" aria-labelledby="productDropdown">
                    {menus.map((menu) => (
                      <li key={menu.TenLoaiHoa}>
                        <Link className="dropdown-item" to={`/hoa-tiec-cuoi/${menu.TenLoaiHoa}`}>
                          {menu.TenLoaiHoa}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <ul className="navbar-nav list-inline">
                
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="#"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="fa-solid fa-circle-user"></i>
                  </Link>
                  <ul className="dropdown-menu custom-dropdown-menu" aria-labelledby="userDropdown">
                    <li>
                      <Link className="dropdown-item" to="/login">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/register">
                        Register
                      </Link>
                      <button className="dropdown-item" onClick={() => handleLogout()}>
                        <i class="fa-solid fa-right-from-bracket"></i>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
                <li className="">
                  <Link className="nav-link" to="https://www.facebook.com/?locale=vi_VN">
                    <i className="fab fa-facebook-f" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/twitter">
                    <i className="fab fa-twitter" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="https://github.com/">
                    <i className="fab fa-github" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div
          className="carousel slide carousel-fade shadow-2-strong"
          data-bs-ride="carousel"
          id="introCarousel"
        >
          <div className="carousel-indicators">
            <button
              className="active"
              data-bs-slide-to="0"
              data-bs-target="#introCarousel"
            />
            <button data-bs-slide-to="1" data-bs-target="#introCarousel" />
            <button data-bs-slide-to="2" data-bs-target="#introCarousel" />
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div
                className="mask"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                }}
              >
              </div>
            </div>
            <div className="carousel-item">
              <div
                className="mask"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                }}
              >
              </div>
            </div>
            <div className="carousel-item ">
              <div
                className="mask"
                style={{
                  background:
                    "linear-gradient(45deg, rgba(239, 254, 251, 0.7), rgba(91, 14, 214, 0.7) 100%)",
                }}
              >
              </div>
            </div>
          </div>
          <Link
            className="carousel-control-prev"
            data-bs-slide="prev"
            to="#introCarousel"
            role="button"
          >
            <span aria-hidden="true" className="carousel-control-prev-icon" />
            <span className="sr-only">Previous</span>
          </Link>
          <Link
            className="carousel-control-next"
            data-bs-slide="next"
            to="#introCarousel"
            role="button"
          >
            <span aria-hidden="true" className="carousel-control-next-icon" />
            <span className="sr-only">Next</span>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;