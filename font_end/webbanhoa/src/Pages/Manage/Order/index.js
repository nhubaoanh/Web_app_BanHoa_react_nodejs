import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import ReactPaginate from 'react-paginate'; // Import thư viện React Paginate
import './order.css';

const Orders = () => {
  const [items, setItems] = useState([]);
  const [newOrder, setNewOrder] = useState({
    MaKhachHang: '',
    NgayDatHang: '',
    TongTien: '',
    TrangThai: '',
    listjson_chitiet: [],
  });
  const [newProduct, setNewProduct] = useState({
    MaSanPham: '',
    SoLuong: '',
    GiaBan: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false); // Quản lý hiển thị form sản phẩm

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const itemsPerPage = 10; // Số lượng đơn hàng mỗi trang

  useEffect(() => {
    api.get(`/api/donhang`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log("Lỗi server:", error);
      });
  }, []);

  const handleAddOrder = () => {
    api.post('/api/donhang/create-with-details', newOrder)
      .then((response) => {
        alert('Thêm đơn hàng thành công!');
        setItems((prevItems) => [...prevItems, response.data.data]);
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Lỗi khi thêm đơn hàng:', error);
        alert('Thêm đơn hàng thất bại!');
      });
  };

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProductToOrder = () => {
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      listjson_chitiet: [...prevOrder.listjson_chitiet, newProduct],
    }));
    setNewProduct({
      MaSanPham: '',
      SoLuong: '',
      GiaBan: '',
    });
  };

  // Tính toán các đơn hàng hiển thị trên trang hiện tại
  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  // Xử lý khi chuyển trang
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div>
      <div className="container">
        <h1>Quản lý đơn hàng</h1>

        <button
          className="btn btn-primary mb-4"
          onClick={() => setShowModal(true)}
        >
          Thêm đơn hàng
        </button>

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

              {/* Nút hiển thị form thêm sản phẩm */}
              <button
                className="btn btn-secondary mb-2"
                onClick={() => setShowProductForm(!showProductForm)}
              >
                {showProductForm ? "Ẩn danh sách sản phẩm" : "Thêm sản phẩm"}
              </button>

              {/* Form thêm sản phẩm */}
              {showProductForm && (
                <div>
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
                </div>
              )}

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