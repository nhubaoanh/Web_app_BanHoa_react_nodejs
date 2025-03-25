import React from 'react';
import "../Admin/admin.css";
import { Link } from "react-router-dom";

const Admin = () => {
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
              <Link to="#" className="list-group-item list-group-item-action py-2 ripple">
                <i className="fas fa-globe fa-fw me-3" />
                <span>International</span>
              </Link>
              <Link to="#" className="list-group-item list-group-item-action py-2 ripple">
                <i className="fas fa-building fa-fw me-3" />
                <span>Partners</span>
              </Link>
              <Link to="#" className="list-group-item list-group-item-action py-2 ripple">
                <i className="fas fa-calendar fa-fw me-3" />
                <span>Calendar</span>
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
                  <i className="fas fa-bell" />
                  <span className="badge rounded-pill badge-notification bg-danger">1</span>
                </Link>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link className="dropdown-item" to="#">Some news</Link></li>
                  <li><Link className="dropdown-item" to="#">Another news</Link></li>
                  <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link me-3 me-lg-0" to="#"><i className="fas fa-fill-drip" /></Link>
              </li>
              <li className="nav-item me-3 me-lg-0">
                <Link className="nav-link" to="#"><i className="fab fa-github" /></Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow" to="#" id="navbarDropdown" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                  <i className="united kingdom flag m-0" />
                </Link>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="#"><i className="united kingdom flag" /> English <i className="fa fa-check text-success ms-2" /></Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="#"><i className="flag-poland flag" /> Polski</Link></li>
                  <li><Link className="dropdown-item" to="#"><i className="flag-china flag" /> 中文</Link></li>
                  <li><Link className="dropdown-item" to="#"><i className="flag-japan flag" /> 日本語</Link></li>
                  <li><Link className="dropdown-item" to="#"><i className="flag-germany flag" /> Deutsch</Link></li>
                  <li><Link className="dropdown-item" to="#"><i className="flag-france flag" /> Français</Link></li>
                  <li><Link className="dropdown-item" to="#"><i className="flag-spain flag" /> Español</Link></li>
                  <li><Link className="dropdown-item" to="#"><i className="flag-russia flag" /> Русский</Link></li>
                  <li><Link className="dropdown-item" to="#"><i className="flag-portugal flag" /> Português</Link></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center" to="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp" className="rounded-circle" height={22} alt="Avatar" loading="lazy" />
                </Link>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                  <li><Link className="dropdown-item" to="#">My profile</Link></li>
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