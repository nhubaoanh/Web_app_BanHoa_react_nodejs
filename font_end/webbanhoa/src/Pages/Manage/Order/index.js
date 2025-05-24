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
  const [action, setAction] = useState('add'); // Quản lý trạng thái hành động (add, edit, delete)
  const [currentOrder, setCurrentOrder] = useState(null); // Đơn hàng hiện tại để sửa hoặc xóa
  const [showModal, setShowModal] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

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
    newOrder.MaKhachHang = parseInt(newOrder.MaKhachHang, 10); // Chuyển MaKhachHang thành số nguyên
    newOrder.TongTien = parseFloat(newOrder.TongTien).toFixed(2); // Chuyển TongTien thành số thập phân chính xác
  
    // Chuyển listjson_chitiet thành chuỗi JSON
    const orderData = {
      ...newOrder,
      listjson_chitiet: (newOrder.listjson_chitiet),
    };
  
    api.post('/api/donhang/create-with-details', orderData)
      .then((response) => {
        alert('Thêm đơn hàng thành công!');
        setItems((prevItems) => [...prevItems, response.data.data]);
        setShowModal(false);
        console.log("listjson_chitiet trước khi gửi: ", newOrder.listjson_chitiet);
        console.log("Dữ liệu đơn hàng gửi lên: ", newOrder);
      })
      .catch((error) => {
        console.error('Lỗi khi thêm đơn hàng:', error);
        alert('Thêm đơn hàng thất bại!');
      });
  };
  
  

  // Sửa đơn hàng
  const handleEditOrder = () => {
    // Chuẩn bị dữ liệu đơn hàng
    const orderData = {
      ...newOrder,
      MaKhachHang: parseInt(newOrder.MaKhachHang),
      TongTien: parseFloat(newOrder.TongTien),
      listjson_chitiet: newOrder.listjson_chitiet
    };

    console.log('Dữ liệu sửa đơn hàng:', orderData);

    api.put(`/api/donhang/${currentOrder.MaDonHang}`, orderData)
      .then((response) => {
        alert('Sửa đơn hàng thành công!');
        // Cập nhật lại danh sách đơn hàng
        const updatedItems = items.map((item) =>
          item.MaDonHang === currentOrder.MaDonHang ? { ...item, ...orderData } : item
        );
        setItems(updatedItems);
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Lỗi khi sửa đơn hàng:', error);
        alert('Sửa đơn hàng thất bại: ' + (error.response?.data?.message || error.message));
      });
  };

  // Xóa đơn hàng
  const handleDeleteOrder = () => {
    api.delete(`/api/donhang/${currentOrder.MaDonHang}`)
      .then((res) => {
        alert('Xóa đơn hàng thành công!');
        console.log("xóa thành công ",res.data );
        const updatedItems = items.filter((item) => item.MaDonHang !== currentOrder.MaDonHang);
        setItems(updatedItems);
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Lỗi khi xóa đơn hàng:', error);
        alert('Xóa đơn hàng thất bại!');
      });
  };

  // Xử lý thay đổi input cho đơn hàng
  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  // Xử lý thay đổi input cho sản phẩm
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Thêm sản phẩm vào đơn hàng
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

  // Xử lý khi nhấn nút lưu trong modal
  const handleSubmit = () => {
    if (action === 'add') {
      handleAddOrder();
    } else if (action === 'edit') {
      handleEditOrder();
    } else if (action === 'delete') {
      handleDeleteOrder();
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Quản lý đơn hàng</h1>

        <button
          className="btn btn-primary mb-4"
          onClick={() => {
            setAction('add');
            setNewOrder({
              MaKhachHang: '',
              NgayDatHang: '',
              TongTien: '',
              TrangThai: '',
              listjson_chitiet: [],
            });
            setShowModal(true);
          }}
        >
          Thêm đơn hàng
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>ID khách hàng</th>
              <th>Ngày đặt hàng</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.MaDonHang}>
                <td>{offset + index + 1}</td>
                <td>{item.MaKhachHang}</td>
                <td>{item.NgayDatHang}</td>
                <td>{item.TongTien}</td>
                <td>{item.TrangThai}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => {
                      setAction('edit');
                      setCurrentOrder(item);
                      setNewOrder(item);
                      setShowModal(true);
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setAction('delete');
                      setCurrentOrder(item);
                      setShowModal(true);
                    }}
                  >
                    Xóa
                  </button>
                </td>
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

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>
              {action === 'add' && 'Thêm đơn hàng mới'}
              {action === 'edit' && 'Sửa đơn hàng'}
              {action === 'delete' && 'Xóa đơn hàng'}
            </h3>
            {action !== 'delete' && (
              <>
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
                <button
                  className="btn btn-secondary mb-2"
                  onClick={() => setShowProductForm(!showProductForm)}
                >
                  {showProductForm ? 'Ẩn danh sách sản phẩm' : 'Thêm sản phẩm'}
                </button>
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
              </>
            )}
            {action === 'delete' && <p>Bạn có chắc chắn muốn xóa đơn hàng này?</p>}
            <button className="btn btn-primary" onClick={handleSubmit}>
              {action === 'add' && 'Thêm đơn hàng'}
              {action === 'edit' && 'Sửa đơn hàng'}
              {action === 'delete' && 'Xóa đơn hàng'}
            </button>
            <button className="btn btn-danger" onClick={() => setShowModal(false)}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;