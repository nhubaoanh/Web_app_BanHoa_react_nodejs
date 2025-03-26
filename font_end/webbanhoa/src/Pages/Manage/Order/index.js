import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import ReactPaginate from 'react-paginate';
import './order.css'; // Thêm CSS cho phân trang

const Orders = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // State để lưu thông tin đơn hàng mới
  const [newOrder, setNewOrder] = useState({
    MaKhachHang: '',
    NgayDatHang: '',
    TongTien: '',
    TrangThai: '',
    listjson_chitiet: [],
  });

  // State để lưu thông tin sản phẩm mới
  const [newProduct, setNewProduct] = useState({
    MaSanPham: '',
    SoLuong: '',
    GiaBan: '',
  });

  // State để hiển thị modal
  const [showModal, setShowModal] = useState(false);

  // Lấy danh sách đơn hàng
  useEffect(() => {
    api.get(`/api/donhang`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log("Lỗi server:", error);
      });
  }, []);

  // Xử lý phân trang
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Xử lý thêm đơn hàng
  const handleAddOrder = () => {
    // Gọi API để thêm đơn hàng
    api.post('/api/donhang/create-with-details', newOrder)
      .then((response) => {
        alert('Thêm đơn hàng thành công!');
        // Cập nhật danh sách đơn hàng sau khi thêm
        setItems((prevItems) => [...prevItems, response.data.data]);
        setShowModal(false); // Đóng modal sau khi thêm thành công
        console.log("Phản hồi từ API:", response); // Xem API trả về gì
      })
      .catch((error) => {
        console.error('Lỗi khi thêm đơn hàng:', error);
        alert('Thêm đơn hàng thất bại!');
      });
  };

  // Xử lý thay đổi dữ liệu trong form đơn hàng
  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  // Xử lý thay đổi dữ liệu trong form sản phẩm
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Thêm sản phẩm vào danh sách sản phẩm của đơn hàng
  const handleAddProductToOrder = () => {
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      listjson_chitiet: [...prevOrder.listjson_chitiet, newProduct],
    }));
    // Reset form sản phẩm
    setNewProduct({
      MaSanPham: '',
      SoLuong: '',
      GiaBan: '',
    });
  };

  return (
    <div>
      <div className="container">
        <h1>Quản lý đơn hàng</h1>

        {/* Nút hiển thị modal thêm đơn hàng */}
        <button
          className="btn btn-primary mb-4"
          onClick={() => setShowModal(true)}
        >
          Thêm đơn hàng
        </button>

        {/* Modal thêm đơn hàng */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Thêm đơn hàng mới</h3>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Mã khách hàng"
                name="MaKhachHang"
                value={newOrder.MaKhachHang}
                onChange={handleOrderInputChange}
              />
              <input
                type="datetime-local"
                className="form-control mb-2"
                placeholder="Ngày đặt hàng"
                name="NgayDatHang"
                value={newOrder.NgayDatHang}
                onChange={handleOrderInputChange}
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Tổng tiền"
                name="TongTien"
                value={newOrder.TongTien}
                onChange={handleOrderInputChange}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Trạng thái"
                name="TrangThai"
                value={newOrder.TrangThai}
                onChange={handleOrderInputChange}
              />

              <h4>Thêm sản phẩm</h4>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Mã sản phẩm"
                name="MaSanPham"
                value={newProduct.MaSanPham}
                onChange={handleProductInputChange}
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Số lượng"
                name="SoLuong"
                value={newProduct.SoLuong}
                onChange={handleProductInputChange}
              />
              <input
                type="number"
                className="form-control mb-2"
                placeholder="Giá bán"
                name="GiaBan"
                value={newProduct.GiaBan}
                onChange={handleProductInputChange}
              />
              <button
                className="btn btn-secondary mb-2"
                onClick={handleAddProductToOrder}
              >
                Thêm sản phẩm vào đơn hàng
              </button>

              <button
                className="btn btn-primary"
                onClick={handleAddOrder}
              >
                Thêm đơn hàng
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setShowModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        )}

        {/* Bảng danh sách đơn hàng */}
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>ID khách hàng</th>
              <th>Ngày đặt hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <tr key={item.MaDonHang}>
                <td>{item.MaDonHang}</td>
                <td>{item.MaKhachHang}</td>
                <td>{item.NgayDatHang}</td>
                <td>{item.TongTien}</td>
                <td>{item.TrangThai}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Phân trang */}
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default Orders;