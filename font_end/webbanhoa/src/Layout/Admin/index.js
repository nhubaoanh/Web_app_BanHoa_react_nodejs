import React from 'react';
import "../Admin/admin.css";
import { Link , useNavigate} from "react-router-dom";
import api from '../../services/api';

const Admin = () => {
    const navigate = useNavigate();
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
              <Link to="/admin/dashboard" className="list-group-item list-group-item-action py-2 ripple" aria-current="true">
                <i className="fas fa-tachometer-alt fa-fw me-3" />
                <span>Main dashboard</span>
              </Link>
              <Link to="#" className="list-group-item list-group-item-action py-2 ripple active">
                <i className="fas fa-chart-area fa-fw me-3" />
                <span>Website traffic</span>
              </Link>
              <Link to="/admin/product" className="list-group-item list-group-item-action py-2 ripple">
                <i className="fas fa-lock fa-fw me-3" />
                <span>Product</span>
              </Link>
              <Link to="#" className="list-group-item list-group-item-action py-2 ripple">
                <i className="fas fa-chart-line fa-fw me-3" />
                <span>Analytics</span>
              </Link>
              <Link to="#" className="list-group-item list-group-item-action py-2 ripple">
                <i className="fas fa-chart-pie fa-fw me-3" />
                <span>SEO</span>
              </Link>
              <Link to="#" className="list-group-item list-group-item-action py-2 ripple">
                <i className="fas fa-chart-bar fa-fw me-3" />
                <span>Orders</span>
              </Link>
              <Link to="/admin/custom" className="list-group-item list-group-item-action py-2 ripple">
                <i className="fas fa-users fa-fw me-3" />
                <span>Custom</span>
              </Link>
              <Link to="/admin/nhacc" className="list-group-item list-group-item-action py-2 ripple">
                <i className="fas fa-users fa-fw me-3" />
                <span>Nhà cung cấp</span>
              </Link>
              <Link to="#" className="list-group-item list-group-item-action py-2 ripple">
                <i className="fas fa-money-bill fa-fw me-3" />
                <span>Sales</span>
              </Link>
            </div>
          </div>
        </nav>
        {/* Sidebar */}
        {/* Navbar */}
        <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
          <div className="container-fluid">
            <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fas fa-bars" />
            </button>
            <Link className="navbar-brand" to="#">
              <img src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp" height={25} alt="MDB Logo" loading="lazy" />
            </Link>
            <form className="d-none d-md-flex input-group w-auto my-auto">
              <input autoComplete="off" type="search" className="form-control rounded" placeholder='Search (ctrl + "/" to focus)' style={{ minWidth: 225 }} />
              <span className="input-group-text border-0">
                <i className="fas fa-search" />
              </span>
            </form>
            <ul className="navbar-nav ms-auto d-flex flex-row">
              <li className="nav-item dropdown">
                <Link className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow" to="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                  <i className="fa-solid fa-bell"></i>
                  <span className="badge rounded-pill badge-notification bg-danger">1</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link me-3 me-lg-0" to="#"><i className="fas fa-fill-drip" /></Link>
              </li>
              <li className="nav-item me-3 me-lg-0">
                <Link className="nav-link" to="#"><i className="fab fa-github" /></Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center" to="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp" className="rounded-circle" height={22} alt="Avatar" loading="lazy" />
                </Link>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                  <li><button className="dropdown-item" to="#" onClick={() => handleLogout()}>
                    <i class="fa-solid fa-right-from-bracket"></i>
                    </button></li>
                  <li><Link className="dropdown-item" to="#">Settings</Link></li>
                  <li><Link className="dropdown-item" to="#">Logout</Link></li>
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