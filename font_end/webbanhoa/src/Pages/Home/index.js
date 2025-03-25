import React, { useEffect, useState } from "react";
import api from "../../services/api";
import Modal from "../../Layout/Modal";
import { Link } from "react-router-dom";
import './Home.css'

const Home = () => {
  // Hàm lưu thông tin sản phẩm vào localStorage
  const handlePayNow = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const [products, setProducts] = useState([]);
  // Gọi API khi component được render lần đầu
  useEffect(() => {
    api
      .get("/api/sanpham") // Gọi API lấy danh sách sản phẩm
      .then((response) => {
        setProducts(response.data); // Lưu dữ liệu vào state
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      });
  }, []);

  return (
    <div className="container" style={{
      backgroundColor: "#eee",
    }}>
      <section
      >
        <div className="text-center container py-5">
          <h4 className="mt-4 mb-5">
            <strong>Bestsellers</strong>
          </h4>
          <div className="row">
            {products.map((product) => (
              <div className="col-lg-3 col-md-6 mb-4" key={product.MaSanPham}>
                <div className="card">
                  <div
                    className="bg-image hover-zoom ripple"
                    data-mdb-ripple-color="light"
                  >
                    <img className="w-100" src={`http://localhost:8080/${product.HinhAnh}`} alt={product.TenHoa} />
                    <Link to={`/product/${product.MaSanPham}`}>
                      <div className="mask">
                        <div className="d-flex justify-content-start align-items-end h-100">
                          {product.badges && product.badges.map((badge, index) => (
                            <h5 key={index}>
                              <span className={`badge bg-${badge.color} ms-2`}>
                                {badge.text}
                              </span>
                            </h5>
                          ))}
                        </div>
                      </div>
                      <div className="hover-overlay">
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                          }}
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="card-body">
                    <Link className="text-reset" to={`/product/${product.MaSanPham}`}>
                      <h5 className="card-title mb-3">{product.TenHoa}</h5>
                    </Link>
                    <p>{product.category}</p>
                    <h6 className="mb-3">
                      {product.oldPrice && <s>${product.oldPrice}</s>}
                      <strong className="ms-2 text-danger">${product.GiaBan}</strong>
                    </h6>
                    <div className="row d-flex justify-content-between">
                        <button className="btn btn-primary col-5">
                          <Modal />
                        </button>
                        <button className="btn btn-primary col-5 paynow" onClick={() => handlePayNow(product)}>
                          <Link className="nav-link" to="/Cart">
                            Pay Now
                          </Link>
                        </button>
                      </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;