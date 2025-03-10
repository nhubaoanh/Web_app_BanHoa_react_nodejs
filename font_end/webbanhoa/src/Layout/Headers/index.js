
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import api from "../../services/api";

const Header = () => {
  const [menus, setMenus] = useState([]);

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

  return (
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
                      <li><Link className="dropdown-item" to="/hoa-tiec-cuoi">{menu.TenLoaiHoa}</Link></li>
                    ))
                  }
                </ul>
              </li>
            </ul>
          </div>
          {/* Tìm kiếm */}
          <form className="d-flex me-3 w-50">
            <input
              className="form-control me-2 "
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
                <i className="fa-solid fa-bell"></i>Thông báo
              </Link>
            </li>
            {/* Giỏ hàng */}
            <li className="col-md-3 nav-item">
              <Link className="nav-link" to="cart">
                <i className="fa-solid fa-cart-shopping"></i> Giỏ hàng
              </Link>
            </li>
            <li className="col-md-6 nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="accountDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person" /> Tài khoản
              </Link>
              <ul className="dropdown-menu" aria-labelledby="accountDropdown">
                <li><Link className="dropdown-item" to="/Login">Đăng nhập</Link></li>
                <li><Link className="dropdown-item" to="/Register">Đăng ký</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
