import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./Header.css";

const Header = () => {
  const [menus, setMenus] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0); // Quản lý trạng thái slide hiện tại
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0); // Quản lý số lượng sản phẩm trong giỏ hàng
  const [userName, setUserName] = useState(""); // Tên người dùng đã đăng nhập
  const [isActive, setIsActive] = useState(false); // Trạng thái hoạt động của người dùng

  // Gọi API khi component được render lần đầu
  useEffect(() => {
    // Lấy danh sách loại hoa
    api
      .get("/api/loaihoa")
      .then((response) => {
        setMenus(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách loại hoa:", error);
      });

    // Kiểm tra trạng thái hoạt động của người dùng
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/api/admin/check-status", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const { TenDangNhap, TrangThai } = response.data;
          setUserName(TenDangNhap); // Lưu tên người dùng
          setIsActive(TrangThai === 1); // Kiểm tra trạng thái hoạt động
        })
        .catch((error) => {
          console.error("Lỗi khi kiểm tra trạng thái người dùng:", error);
        });
    }

    // Lấy số lượng sản phẩm trong giỏ hàng từ localStorage
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalQuantity = cartItems.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );
    setCartCount(totalQuantity);
  }, []);

  // Tự động chuyển slide
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
      setIsActive(false); // Tắt trạng thái hoạt động khi đăng xuất
      navigate("/login"); // Chuyển hướng đến trang đăng nhập
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  const handleCategoryClick = (MaLoaiHoa) => {
    navigate(`/home?MaLoaiHoa=${MaLoaiHoa}`); // Chuyển hướng đến trang Home với MaLoaiHoa
  };

  return (
    <div>
      {/* Phần header trên cùng */}
      <div
        className="top-header d-flex justify-content-between align-items-center px-3 py-2"
        style={{
          zIndex: "2000",
          backgroundColor: "#F098BE",
        }}
      >
        <div className="d-flex align-items-center">
          <Link to="#" className="me-3 text-white text-decoration-none">
            Kênh Người Bán
          </Link>
          <Link to="#" className="me-3 text-white text-decoration-none">
            Trở thành Người bán Shopee
          </Link>
          <Link to="#" className="me-3 text-white text-decoration-none">
            Tải ứng dụng
          </Link>
          <span className="me-3 text-white">Kết nối:</span>
          <Link
            to="https://www.facebook.com"
            className="me-2 text-white text-decoration-none"
          >
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link
            to="https://www.instagram.com"
            className="text-white text-decoration-none"
          >
            <i className="fab fa-instagram"></i>
          </Link>
        </div>
        <div className="d-flex align-items-center">
          <Link to="#" className="me-3 text-white text-decoration-none">
            <i className="fa-solid fa-bell"></i> Thông Báo
          </Link>
          <Link to="#" className="me-3 text-white text-decoration-none">
            <i className="fa-solid fa-circle-question"></i> Hỗ Trợ
          </Link>
          <Link to="#" className="me-3 text-white text-decoration-none">
            Tiếng Việt <i className="fa-solid fa-chevron-down"></i>
          </Link>
        </div>
      </div>

      {/* Phần header chính */}
      <header>
        <nav
          className="navbar navbar-expand-lg navbar-dark"
          style={{
            zIndex: "2000",
            backgroundColor: "#F098BE",
          }}
        >
          <div className="container-fluid">
            <Link
              className="navbar-brand nav-link text-decoration-none"
              to="/home"
            >
              <strong>Kiwi</strong>
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
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle text-decoration-none"
                    to="#"
                    id="productDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Danh Mục
                  </Link>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="productDropdown"
                  >
                    {menus.map((menu) => (
                      <li key={menu.TenLoaiHoa}>
                        <button
                          className="dropdown-item"
                          onClick={() => handleCategoryClick(menu.MaLoaiHoa)}
                        >
                          {menu.TenLoaiHoa}
                        </button>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
              <form className="d-flex flex-grow-1">
                <input
                  className="form-control me-2 flex-grow-1"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  style={{ flex: "2" }} // Chiếm 2 phần
                />
                <button className="btn btn-outline-light" type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </form>
              <ul className="navbar-nav list-inline ms-3 d-flex align-items-center">
                <li className="nav-item me-3">
                  <Link
                    className="nav-link text-decoration-none"
                    to="/Cart"
                  >
                    <i className="fa-solid fa-cart-shopping"></i>
                    {cartCount > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="nav-item dropdown d-flex align-items-center">
                  {/* Icon trạng thái */}
                  <span
                    className={`status-icon me-2 ${isActive ? "active" : "inactive"}`}
                    title={isActive ? "Đang hoạt động" : "Ngoại tuyến"}
                  >
                    <i className="fa-solid fa-circle"></i>
                  </span>
                  
                  {/* Hiển thị tài khoản */}
                  <Link
                    className="nav-link dropdown-toggle text-decoration-none"
                    to="#"
                    id="authDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userName ? `Xin chào, ${userName}` : "Tài Khoản"}
                  </Link>

                  {/* Dropdown Menu */}
                  <ul className="dropdown-menu" aria-labelledby="authDropdown">
                    <li>
                      <Link to="/login" className="dropdown-item text-decoration-none">
                        Đăng Nhập
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="dropdown-item text-decoration-none">
                        Đăng Ký
                      </Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="dropdown-item text-decoration-none">
                        Đăng Xuất
                      </button>
                    </li>
                  </ul>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Slider */}
      <div
        className="carousel slide carousel-fade shadow-2-strong mt-2"
        data-bs-ride="carousel"
        id="introCarousel"
      >
        <div className="carousel-indicators">
          <button
            className={currentSlide === 0 ? "active" : ""}
            data-bs-slide-to="0"
            data-bs-target="#introCarousel"
            onClick={() => setCurrentSlide(0)}
          />
          <button
            className={currentSlide === 1 ? "active" : ""}
            data-bs-slide-to="1"
            data-bs-target="#introCarousel"
            onClick={() => setCurrentSlide(1)}
          />
          <button
            className={currentSlide === 2 ? "active" : ""}
            data-bs-slide-to="2"
            data-bs-target="#introCarousel"
            onClick={() => setCurrentSlide(2)}
          />
        </div>
        <div className="carousel-inner">
          <div className={`carousel-item ${currentSlide === 0 ? "active" : ""}`}>
            <div
              className="mask"
              style={{
                backgroundColor: isActive ? "rgba(0, 255, 0, 0.6)" : "rgba(0, 0, 0, 0.6)",
              }}
            ></div>
          </div>
          <div className={`carousel-item ${currentSlide === 1 ? "active" : ""}`}>
            <div
              className="mask"
              style={{
                backgroundColor: isActive ? "rgba(0, 255, 0, 0.3)" : "rgba(0, 0, 0, 0.3)",
              }}
            ></div>
          </div>
          <div className={`carousel-item ${currentSlide === 2 ? "active" : ""}`}>
            <div
              className="mask"
              style={{
                background:
                  isActive
                    ? "linear-gradient(45deg, rgba(239, 254, 251, 0.7), rgba(91, 214, 14, 0.7) 100%)"
                    : "linear-gradient(45deg, rgba(239, 254, 251, 0.7), rgba(91, 14, 214, 0.7) 100%)",
              }}
            ></div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          data-bs-slide="prev"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide - 1 + 3) % 3)
          }
        >
          <span aria-hidden="true" className="carousel-control-prev-icon" />
          <span className="sr-only">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          data-bs-slide="next"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % 3)
          }
        >
          <span aria-hidden="true" className="carousel-control-next-icon" />
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
