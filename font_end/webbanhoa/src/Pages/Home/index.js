import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  // const [selectedProduct, setSelectedProduct] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State để lưu giá trị tìm kiếm
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Xin chào! Tôi có thể giúp gì cho bạn?", isBot: true }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy MaLoaiHoa từ URL
  const queryParams = new URLSearchParams(location.search);
  const MaLoaiHoa = queryParams.get("MaLoaiHoa");

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm
    api
      .get("/api/sanpham")
      .then((response) => {
        console.log("Dữ liệu sản phẩm:", response.data); // Log dữ liệu trả về
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
      });
  }, []); // Chỉ gọi API một lần khi component được render

  // Lọc sản phẩm theo MaLoaiHoa và searchTerm
  const filteredProducts = products.filter((product) => {
    const matchesCategory = MaLoaiHoa
      ? product.MaLoaiHoa === parseInt(MaLoaiHoa, 10)
      : true; // Nếu không có MaLoaiHoa, hiển thị tất cả sản phẩm
    const matchesSearch = product.TenHoa.toLowerCase().includes(
      searchTerm.toLowerCase()
    ); // Kiểm tra tên sản phẩm có chứa từ khóa tìm kiếm
    return matchesCategory && matchesSearch;
  });

  const handleProductClick = (productId) => {
    api
      .get(`/api/sanpham/${productId}`)
      .then((response) => {
        console.log('Product data:', response.data);
        // Lấy phần tử đầu tiên của mảng và lưu vào localStorage
        const productData = Array.isArray(response.data) ? response.data[0] : response.data;
        localStorage.setItem('selectedProduct', JSON.stringify(productData));
        // Sử dụng navigate để chuyển trang
        navigate(`/product/${productId}`);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin sản phẩm:", error);
      });
  };

  const handlePayNow = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    cartItems.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // Add user message
    setMessages(prev => [...prev, { text: newMessage, isBot: false }]);
    
    // Simulate bot response (you can replace this with actual API calls)
    setTimeout(() => {
      const botResponse = getBotResponse(newMessage);
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);

    setNewMessage("");
  };

  const getBotResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("giá") || lowerMessage.includes("bao nhiêu")) {
      return "Giá sản phẩm được hiển thị trên từng sản phẩm. Bạn có thể xem chi tiết bằng cách click vào sản phẩm.";
    }
    if (lowerMessage.includes("mua") || lowerMessage.includes("đặt hàng")) {
      return "Bạn có thể thêm sản phẩm vào giỏ hàng bằng nút 'Mua ngay' hoặc click vào sản phẩm để xem chi tiết.";
    }
    if (lowerMessage.includes("chào") || lowerMessage.includes("hello")) {
      return "Xin chào! Tôi có thể giúp gì cho bạn?";
    }
    if (lowerMessage.includes("cảm ơn")) {
      return "Không có gì! Nếu bạn cần thêm thông tin, đừng ngại hỏi nhé!";
    }
    
    return "Xin lỗi, tôi không hiểu câu hỏi của bạn. Bạn có thể hỏi về giá cả, cách mua hàng, hoặc thông tin sản phẩm.";
  };

  return (
    <div className="container" style={{ backgroundColor: "#eee" }}>
      <section>
        <div className="text-center container py-5">
          <h4 className="mt-4 mb-5">
            <strong>
              {MaLoaiHoa
                ? `Sản phẩm thuộc danh mục ${MaLoaiHoa}`
                : "Tất cả sản phẩm"}
            </strong>
          </h4>

          {/* Ô tìm kiếm */}
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên sản phẩm để tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị tìm kiếm
            />
          </div>

          <div className="row">
            {filteredProducts.map((product) => (
              <div className="col-lg-3 col-md-6 mb-4" key={product.MaSanPham}>
                <div className="card">
                  <div
                    className="bg-image hover-zoom ripple"
                    data-mdb-ripple-color="light"
                  >
                    <img
                      className="custom-img"
                      src={
                        product.HinhAnh
                          ? `http://localhost:8080/${product.HinhAnh}`
                          : "https://via.placeholder.com/150"
                      }
                      alt={product.TenHoa || "No name"}
                      onClick={() => handleProductClick(product.MaSanPham)}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                  <div className="card-body">
                    <h5 
                      className="card-title mb-2"
                      onClick={() => handleProductClick(product.MaSanPham)}
                      style={{ cursor: 'pointer' }}
                    >
                      {product.TenHoa}
                    </h5>
                    <p>{product.category}</p>
                    <h6 className="mb-2">
                      <strong className="ms-2 text-danger">
                        {Number(product.GiaBan).toLocaleString('en-US') + ' VNĐ'}
                      </strong>
                    </h6>
                    <div className="row d-flex justify-content-center ">
                      <button
                        className="btn btn-primary col-5 paynow mx-auto"
                        onClick={() => handlePayNow(product)}
                      >
                        <i className="fa-solid fa-cart-plus"></i>
                        <Link className="nav-link" to="/Cart"></Link>
                      </button>

                      <button
                        className="btn btn-primary col-5 paynow mx-auto"
                        onClick={() => handlePayNow(product)}
                      >
                        <Link className="nav-link" to="/Cart">
                          Thanh toán ngay
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

      {/* Modal
      <div
        className="modal fade"
        id="productModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-info" id="productModalLabel">
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedProduct.map((poduct) => (
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      <img
                        className="w-100"
                        src={
                          poduct.HinhAnh
                            ? `http://localhost:8080/${poduct.HinhAnh}`
                            : "https://via.placeholder.com/150"
                        }
                        alt={poduct.TenHoa || "No name"}
                      />
                    </div>
                    <div className="col-md-6">
                      <h4 className="text-info">
                        Type Flower: {poduct.MaLoaiHoa}
                      </h4>
                      <h4 className="text-info">
                        Name Flower: {poduct.TenHoa}
                      </h4>
                      <h4 className="text-danger">
                        Price Flower: ${poduct.GiaBan}
                      </h4>
                      <h4 className="text-danger">
                        Total Flower: {poduct.SoLuongTon}
                      </h4>
                      <p className="text-info">Detail Flower: {poduct.MoTa}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Đóng
              </button>
              <button type="button" className="btn btn-primary">
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      </div> */}

      {/* Chatbot */}
      <div className="chatbot-container">
        {isChatOpen && (
          <div className="chat-window">
            <div className="chat-header">
              <h5>Chat với chúng tôi</h5>
              <button 
                className="close-btn"
                onClick={() => setIsChatOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.isBot ? "bot" : "user"}`}
                >
                  {message.text}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Nhập tin nhắn..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button onClick={handleSendMessage}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        )}
        <button
          className="chat-button"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          <i className="fas fa-comments"></i>
        </button>
      </div>
    </div>
  );
};

export default Home;