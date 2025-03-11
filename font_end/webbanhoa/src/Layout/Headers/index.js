// filepath: d:\Programming_Center\Programming_congngheWeb\ThWeb\BTL_WEB_BAOANH\Web_app_ban_hoa_kiwi\font_end\webbanhoa\src\Layout\Headers\index.js
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import api from "../../services/api";
import "./Header.css";

const Header = () => {
  const [menus, setMenus] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gọi API khi component được render lần đầu
  useEffect(() => {
    api
      .get("/api/loaihoa") // Gọi API lấy danh sách sản phẩm
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

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Shop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse container" id="navbarNav">
            <div className='col-md-3'>
              <ul className="navbar-nav mb-2 mb-lg-0">
                {/* Danh mục sản phẩm */}
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
                    {
                      menus.map((menu) => (
                        <li key={menu.TenLoaiHoa}><Link className="dropdown-item" to="/hoa-tiec-cuoi">{menu.TenLoaiHoa}</Link></li>
                      ))
                    }
                  </ul>
                </li>
              </ul>
            </div>
            {/* Tìm kiếm */}
            <form className="d-flex me-3 w-50">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Tìm kiếm"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
            {/* Tài khoản */}
            <ul className="navbar-nav">
              {/* Thông báo */}
              <li className="col-md-3 nav-item">
                <Link className="nav-link" to="/thong-bao">
                  <i className="fa-solid fa-bell"></i>
                </Link>
              </li>
              {/* Giỏ hàng */}
              <li className="col-md-3 nav-item">
                <Link className="nav-link" to="cart">
                  <i className="fa-solid fa-cart-shopping"></i>
                </Link>
              </li>
              <li className="col-md-4 nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  id="accountDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-circle-user"></i>
                </Link>
                <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                  <li><Link className="dropdown-item" to="/Login">Đăng nhập</Link></li>
                  <li><Link className="dropdown-item" to="/Register">Đăng ký</Link></li>
                </ul>
              </li>
              <li className="nav-item align-items-center d-flex col-md-2">
                <i className="fas fa-sun" />
                {/* Default switch */}
                <div className="ms-2 form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="themingSwitcher"
                  />
                </div>
                <i className="fas fa-moon" />
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <>
        {/* Carousel wrapper */}
        <div
          id="carouselBasicExample"
          data-mdb-carousel-init=""
          className="carousel slide carousel-fade"
          data-mdb-ride="carousel"
        >
          {/* Indicators */}
          <div className="carousel-indicators">
            <button
              type="button"
              data-mdb-button-init=""
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide-to={0}
              className={currentSlide === 0 ? "active" : ""}
              aria-current="true"
              aria-label="Slide 1"
            />
            <button
              type="button"
              data-mdb-button-init=""
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide-to={1}
              className={currentSlide === 1 ? "active" : ""}
              aria-label="Slide 2"
            />
            <button
              type="button"
              data-mdb-button-init=""
              data-mdb-target="#carouselBasicExample"
              data-mdb-slide-to={2}
              className={currentSlide === 2 ? "active" : ""}
              aria-label="Slide 3"
            />
          </div>
          {/* Inner */}
          <div className="carousel-inner">
            {/* Single item */}
            <div className={`carousel-item ${currentSlide === 0 ? "active" : ""}`}>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp"
                className="d-block w-100"
                alt="Sunset Over the City"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </div>
            </div>
            {/* Single item */}
            <div className={`carousel-item ${currentSlide === 1 ? "active" : ""}`}>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(22).webp"
                className="d-block w-100"
                alt="Canyon at Nigh"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Second slide label</h5>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
            </div>
            {/* Single item */}
            <div className={`carousel-item ${currentSlide === 2 ? "active" : ""}`}>
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(23).webp"
                className="d-block w-100"
                alt="Cliff Above a Stormy Sea"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Third slide label</h5>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
              </div>
            </div>
          </div>
          {/* Inner */}
          {/* Controls */}
          <button
            data-mdb-button-init=""
            className="carousel-control-prev"
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide="prev"
            onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + 3) % 3)}
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            data-mdb-button-init=""
            className="carousel-control-next"
            type="button"
            data-mdb-target="#carouselBasicExample"
            data-mdb-slide="next"
            onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % 3)}
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {/* Carousel wrapper */}
      </>
    </>
  );
};

export default Header;