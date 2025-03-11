import React, { useState, useEffect } from 'react';
import './CheckoutPage.css'; // Import file CSS để định kiểu

const provinces = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "TP Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

const districts = {
  "An Giang": ["Thành phố Long Xuyên", "Thành phố Châu Đốc", "Huyện An Phú", "Huyện Châu Phú", "Huyện Châu Thành", "Huyện Chợ Mới", "Huyện Phú Tân", "Huyện Thoại Sơn", "Huyện Tịnh Biên", "Huyện Tri Tôn"],
  "Bà Rịa - Vũng Tàu": ["Thành phố Vũng Tàu", "Thành phố Bà Rịa", "Huyện Châu Đức", "Huyện Côn Đảo", "Huyện Đất Đỏ", "Huyện Long Điền", "Huyện Tân Thành", "Huyện Xuyên Mộc"],
  // Thêm các quận huyện cho các tỉnh thành khác...
};

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districtOptions, setDistrictOptions] = useState([]);

  // lấy thông tin từ local
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);

  // Tính tổng số tiền của các sản phẩm trong giỏ hàng
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.GiaBan * (item.quantity || 1);
  }, 0);

  useEffect(() => {
    if (selectedProvince) {
      setDistrictOptions(districts[selectedProvince] || []);
    } else {
      setDistrictOptions([]);
    }
  }, [selectedProvince]);

  return (
    <div className='container'>
      <div className="checkout-container">
        <div className="checkout-row">
          {/* Thông tin nhận hàng */}
          <div className="checkout-col-md-7">
            <h4>Thông tin nhận hàng</h4>
            <form>
              <div className="checkout-form-group">
                <input type="email" placeholder="Email" className="checkout-form-control" />
              </div>
              <div className="checkout-form-group">
                <input type="text" placeholder="Họ và tên" className="checkout-form-control" />
              </div>
              <div className="checkout-form-group">
                <input type="text" placeholder="Số điện thoại" className="checkout-form-control" />
              </div>
              <div className="checkout-form-group">
                <input type="text" placeholder="Địa chỉ" className="checkout-form-control" />
              </div>
              <div className="checkout-row">
                <div className="checkout-col">
                  <select
                    className="checkout-form-control"
                    value={selectedProvince}
                    onChange={(e) => setSelectedProvince(e.target.value)}
                  >
                    <option value="">Chọn tỉnh thành</option>
                    {provinces.map((province, index) => (
                      <option key={index} value={province}>{province}</option>
                    ))}
                  </select>
                </div>
                <div className="checkout-col">
                  <select
                    className="checkout-form-control"
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                  >
                    <option value="">Chọn quận huyện</option>
                    {districtOptions.map((district, index) => (
                      <option key={index} value={district}>{district}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="checkout-form-group mt-3">
                <textarea placeholder="Ghi chú" rows={2} className="checkout-form-control"></textarea>
              </div>
            </form>
          </div>
          
          {/* Đơn hàng */}
          <div className="checkout-col-md-5">
            <h4>Đơn hàng</h4>
            {cartItems.map((item) => (
              <div className="checkout-card" key={item.MaSanPham}>
                <div className="checkout-card-body">
                  <div className="checkout-row">
                    <div className="checkout-col-xs-3">
                      <img
                        src={item.HinhAnh}
                        alt={item.TenHoa}
                        className="checkout-img-fluid"
                      />
                    </div>
                    <div className="checkout-col">
                      <p>{item.TenHoa}</p>
                    </div>
                    <div className="checkout-col text-end">${item.GiaBan}</div>
                  </div>
                </div>
              </div>
            ))}
            <div className="checkout-form-group mt-3">
              <input type="text" placeholder="Nhập mã giảm giá" className="checkout-form-control" />
            </div>
            <button className="checkout-btn checkout-btn-primary w-100 mt-2">Áp dụng</button>
            <hr />
            <div className="checkout-row">
              <div className="checkout-col">Tạm tính</div>
              <div className="checkout-col text-end">${totalAmount}</div>
            </div>
            <div className="checkout-row">
              <div className="checkout-col">Phí vận chuyển</div>
              <div className="checkout-col text-end">- $200.00</div>
            </div>
            <hr />
            <div className="checkout-row">
              <div className="checkout-col"><strong>Tổng cộng</strong></div>
              <div className="checkout-col text-end text-primary"><strong>${totalAmount}</strong></div>
            </div>
            <button className="checkout-btn checkout-btn-primary w-100 mt-3">ĐẶT HÀNG</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;