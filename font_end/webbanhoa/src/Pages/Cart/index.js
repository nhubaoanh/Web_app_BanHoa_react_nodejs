import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Cart = () => {

  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();
  // Lấy thông tin sản phẩm từ localStorage
  
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  // Hàm kiểm tra đăng nhập
  const checkLogin = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  // Kiểm tra đăng nhập khi component được render lần đầu
  useEffect(() => {
    checkLogin();
  }, []);

  // Tính tổng số tiền của các sản phẩm trong giỏ hàng
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.GiaBan * (item.quantity || 1);
  }, 0);

  // Hàm cập nhật số lượng sản phẩm
  const updateQuantity = (productId, delta) => {
    const newCartItems = cartItems.map((cartItem) => {
      if (cartItem.MaSanPham === productId) {
        const newQuantity = (cartItem.quantity || 1) + delta;
        return {
          ...cartItem,
          quantity: newQuantity > 0 ? newQuantity : 1, // Không cho phép số lượng nhỏ hơn 1
        };
      }
      return cartItem;
    });
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  // Hàm xóa sản phẩm khỏi giỏ hàng
  const removeItem = (productId) => {
    const newCartItems = cartItems.filter(
      (cartItem) => cartItem.MaSanPham !== productId
    );
    setCartItems(newCartItems);
    localStorage.setItem("cartItems", JSON.stringify(newCartItems));
  };

  return (
    <div>
      <section className="h-100">
        <div className="container h-100 py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-10">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-normal mb-0">Shopping Cart</h3>
                <div>
                  <p className="mb-0">
                    <span className="text-muted">Sort by:</span>{" "}
                    <a href="#!" className="text-body">
                      price <i className="fas fa-angle-down mt-1" />
                    </a>
                  </p>
                </div>
              </div>

              {cartItems.map((item) => (
                <div className="card rounded-3 mb-4" key={item.MaSanPham}>
                  <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                      <div className="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src={
                            item.HinhAnh
                              ? `http://localhost:8080/${item.HinhAnh}`
                              : "https://via.placeholder.com/150"
                          }
                          className="img-fluid rounded-3"
                          alt={item.TenHoa}
                        />
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-3">
                        <p className="lead fw-normal mb-2">{item.TenHoa}</p>
                        <p>
                          <span className="text-muted">Mô tả: </span>
                          {item.MoTa}
                        </p>
                      </div>
                      <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                        <button
                          className="btn btn-link px-2"
                          onClick={() => updateQuantity(item.MaSanPham, -1)}
                        >
                          <i className="fas fa-minus" />
                        </button>
                        <input
                          id="form1"
                          min={1}
                          name="quantity"
                          value={item.quantity || 1}
                          type="number"
                          className="form-control form-control-sm"
                          readOnly
                        />
                        <button
                          className="btn btn-link px-2"
                          onClick={() => updateQuantity(item.MaSanPham, 1)}
                        >
                          <i className="fas fa-plus" />
                        </button>
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 className="mb-0">
                          {(item.GiaBan * (item.quantity || 1)).toLocaleString('en-US') + "đ"}
                        </h5>
                      </div>
                      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a
                          href="#!"
                          className="text-danger"
                          onClick={() => removeItem(item.MaSanPham)}
                        >
                          <i className="fas fa-trash fa-lg" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Hiển thị tổng số tiền và nút thanh toán */}
              <div className="card text-end">
                <div className="card-body">
                <h5 className="mb-0">
                  Tổng tiền: {totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                </h5>

                  <button className="btn btn-primary mt-3">
                    <Link className="nav-link" to="/pay">
                      Proceed to Checkout
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;