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
    <div className="container">
      <div className="row justify-content-center mb-4 mt-5">
        {products.map((product) => (
          <div className="card m-3" style={{ width: "18rem" }} key={product.MaSanPham}>
            <img src={`http://localhost:8080/${product.HinhAnh}`}  className="card-img-top" alt={product.TenHoa} />
            <div className="card-body">
              <h5 className="card-title">Name: {product.TenHoa}</h5>
              <h5 className="card-title">Price: {product.GiaBan}₫</h5>
              <p className="card-text">{product.MoTa}</p>
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
        ))}
      </div>
    </div>
  );
};

export default Home;
