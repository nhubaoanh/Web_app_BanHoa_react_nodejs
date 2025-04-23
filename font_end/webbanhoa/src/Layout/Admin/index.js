import React, { useState } from 'react';
import "../Admin/admin.css";
import { Link, useNavigate } from "react-router-dom";
import api from '../../services/api';

const Admin = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('/admin/dashboard'); // Đường dẫn mặc định

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
    <div className="">
      <header>
        {/* Sidebar */}
        <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
          <div className="position-sticky">
            <div className="list-group list-group-flush mx-3 mt-4">
              <Link
                to="/admin/dashboard"
                className={`list-group-item list-group-item-action py-2 ripple ${activeLink === '/admin/dashboard' ? 'active' : ''}`}
                onClick={() => setActiveLink('/admin/dashboard')}
              >
                <i className="fas fa-tachometer-alt fa-fw me-3" />
                <span>Main dashboard</span>
              </Link>
              <Link
                to="/admin/product"
                className={`list-group-item list-group-item-action py-2 ripple ${activeLink === '/admin/product' ? 'active' : ''}`}
                onClick={() => setActiveLink('/admin/product')}
              >
                <i className="fas fa-lock fa-fw me-3" />
                <span>Product</span>
              </Link>
              <Link
                to="/admin/nhanvien"
                className={`list-group-item list-group-item-action py-2 ripple ${activeLink === '/admin/nhanvien' ? 'active' : ''}`}
                onClick={() => setActiveLink('/admin/nhanvien')}
              >
                <i className="fas fa-chart-line fa-fw me-3" />
                <span>Saff</span>
              </Link>
              <Link
                to="/admin/seo"
                className={`list-group-item list-group-item-action py-2 ripple ${activeLink === '/admin/seo' ? 'active' : ''}`}
                onClick={() => setActiveLink('/admin/seo')}
              >
                <i className="fas fa-chart-pie fa-fw me-3" />
                <span>SEO</span>
              </Link>
              <Link
                to="/admin/order"
                className={`list-group-item list-group-item-action py-2 ripple ${activeLink === '/admin/order' ? 'active' : ''}`}
                onClick={() => setActiveLink('/admin/order')}
              >
                <i className="fas fa-chart-bar fa-fw me-3" />
                <span>Orders</span>
              </Link>
              <Link
                to="/admin/custom"
                className={`list-group-item list-group-item-action py-2 ripple ${activeLink === '/admin/custom' ? 'active' : ''}`}
                onClick={() => setActiveLink('/admin/custom')}
              >
                <i className="fas fa-users fa-fw me-3" />
                <span>Custom</span>
              </Link>
              <Link
                to="/admin/nhacc"
                className={`list-group-item list-group-item-action py-2 ripple ${activeLink === '/admin/nhacc' ? 'active' : ''}`}
                onClick={() => setActiveLink('/admin/nhacc')}
              >
                <i className="fas fa-users fa-fw me-3" />
                <span>Nhà cung cấp</span>
              </Link>
              <Link
                to="#"
                className={`list-group-item list-group-item-action py-2 ripple ${activeLink === '/admin/sales' ? 'active' : ''}`}
                onClick={() => setActiveLink('/admin/sales')}
              >
                <i className="fas fa-money-bill fa-fw me-3" />
                <span>Sales</span>
              </Link>
            </div>
          </div>
        </nav>
        {/* Sidebar */}
        {/* Navbar */}
        <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm">
          <div className="container-fluid bg-primary">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars" />
            </button>
            <Link className="navbar-brand d-flex align-items-center" to="#">
              <i className="fa-solid fa-kiwi-bird me-2"></i>
              <span>Admin Panel</span>
            </Link>

            {/* Search Bar */}
            <form className="d-none d-md-flex input-group w-auto my-auto">
              <input
                autoComplete="off"
                type="search"
                className="form-control rounded"
                placeholder="Search..."
                style={{ minWidth: "225px" }}
              />
              <button className="btn btn-primary">
                <i className="fas fa-search"></i>
              </button>
            </form>

            <ul className="navbar-nav ms-auto d-flex flex-row">
              <li className="nav-item dropdown">
                <Link
                  className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow"
                  to="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="fa-solid fa-bell"></i>
                  <span className="badge rounded-pill badge-notification bg-danger">1</span>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Notification 1
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Notification 2
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Notification 3
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link me-3 me-lg-0" to="#">
                  <i className="fas fa-fill-drip" />
                </Link>
              </li>
              <li className="nav-item me-3 me-lg-0">
                <Link className="nav-link" to="#">
                  <i className="fab fa-github" />
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                  to="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                    className="rounded-circle"
                    height={22}
                    alt="Avatar"
                    loading="lazy"
                  />
                </Link>
                <ul className="nav-too dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <button className="dropdown-item" to="#" onClick={() => handleLogout()}>
                      <i className="fa-solid fa-right-from-bracket"></i> Logout
                    </button>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Profile
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        {/* Navbar */}
      </header>
      {/* Main layout */}
      <main style={{ marginTop: 58 }}>
        <div className="container pt-4">
          {/* Nội dung chính của trang admin */}
        </div>
      </main>
      {/* Main layout */}
    </div>
  );
};

export default Admin;