import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import api from '../../../services/api';

const OrderDetail = () => {
  const [itemt, setItems] = useState([]);
  const [newOrder, setNewOrder] = useState({
    MaNhaCungCap: '',
    MaNhanVien: '',
    NgayNhap: '',
    TongTien: '',
    TrangThai: '',
    listjson_chitiet: [],
  });

  const [newProduct, setNewProduct] = useState({
    MaSanPham: '',
    SoLuong: '',
    GiaNhap: '',
  });

  const [action, setAction] = useState('add');
  const [currentOrder, setCurrentOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    api.get('/api/donhangnhap')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, []);

  const handleAddOrder = () => {
    const orderData = {
      ...newOrder,
      MaNhaCungCap: parseInt(newOrder.MaNhaCungCap, 10),
      TongTien: parseFloat(newOrder.TongTien).toFixed(2),
      listjson_chitiet: newOrder.listjson_chitiet,
    };

    api.post('/api/donhangnhap/create-with-detailss', orderData)
      .then((response) => {
        alert('Thêm đơn hàng thành công!');
        setItems(prev => [...prev, response.data.data]);
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Thêm thất bại:', error);
        alert('Thêm đơn hàng thất bại!');
      });
  };

  const handleEditOrder = () => {
    api.put(`/api/donhangnhap/${currentOrder.MaDonNhap}`, newOrder)
      .then(() => {
        alert('Sửa thành công!');
        setItems(prev => prev.map(item => item.MaDonNhap === currentOrder.MaDonNhap ? newOrder : item));
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Sửa thất bại:', error);
        alert('Sửa đơn hàng thất bại!');
      });
  };

  const handleDeleteOrder = () => {
    api.delete(`/api/donhangnhap/${currentOrder.MaDonNhap}`)
      .then(() => {
        alert('Xóa thành công!');
        setItems(prev => prev.filter(item => item.MaDonNhap !== currentOrder.MaDonNhap));
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Xóa thất bại:', error);
        alert('Xóa đơn hàng thất bại!');
      });
  };

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder(prev => ({ ...prev, [name]: value }));
  };

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProductToOrder = () => {
    setNewOrder(prev => ({
      ...prev,
      listjson_chitiet: [...prev.listjson_chitiet, newProduct],
    }));
    setNewProduct({ MaSanPham: '', SoLuong: '', GiaNhap: '' });
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = itemt.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(itemt.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleSubmit = () => {
    if (action === 'add') handleAddOrder();
    else if (action === 'edit') handleEditOrder();
    else if (action === 'delete') handleDeleteOrder();
  };

  return (
    <div className="container">
      <h1>Quản lý đơn hàng nhập</h1>

      <button className="btn btn-primary mb-4" onClick={() => {
        setAction('add');
        setNewOrder({
          MaNhaCungCap: '',
          MaNhanVien: '',
          NgayNhap: '',
          TongTien: '',
          TrangThai: '',
          listjson_chitiet: [],
        });
        setShowModal(true);
      }}>
        Thêm đơn hàng
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nhà cung cấp</th>
            <th>Nhân viên</th>
            <th>Ngày nhập</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.MaDonNhap}>
              <td>{item.MaDonNhap}</td>
              <td>{item.MaNhaCungCap}</td>
              <td>{item.MaNhanVien}</td>
              <td>{item.NgayNhap}</td>
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

      <ReactPaginate
        previousLabel={'← Trước'}
        nextLabel={'Tiếp →'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />

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
                  placeholder="Mã nhà cung cấp"
                  name="MaNhaCungCap"
                  value={newOrder.MaNhaCungCap}
                  onChange={handleOrderInputChange}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Mã nhân viên"
                  name="MaNhanVien"
                  value={newOrder.MaNhanVien}
                  onChange={handleOrderInputChange}
                />
                <input
                  type="datetime-local"
                  className="form-control mb-2"
                  name="NgayNhap"
                  value={newOrder.NgayNhap}
                  onChange={handleOrderInputChange}
                />
                <input
                  type="number"
                  className="form-control mb-2"
                  name="TongTien"
                  value={newOrder.TongTien}
                  onChange={handleOrderInputChange}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  name="TrangThai"
                  value={newOrder.TrangThai}
                  onChange={handleOrderInputChange}
                />

                <button className="btn btn-secondary mb-2" onClick={() => setShowProductForm(!showProductForm)}>
                  {showProductForm ? 'Ẩn thêm sản phẩm' : 'Thêm sản phẩm'}
                </button>

                {showProductForm && (
                  <div>
                    <h5>Thêm sản phẩm</h5>
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
                      placeholder="Giá nhập"
                      name="GiaNhap"
                      value={newProduct.GiaNhap}
                      onChange={handleProductInputChange}
                    />
                    <button
                      className="btn btn-success mb-2"
                      onClick={handleAddProductToOrder}
                    >
                      Thêm sản phẩm
                    </button>
                  </div>
                )}
              </>
            )}

            {action === 'delete' && <p>Bạn có chắc chắn muốn xóa đơn hàng này?</p>}

            <button className="btn btn-primary" onClick={handleSubmit}>
              {action === 'add' ? 'Thêm' : action === 'edit' ? 'Lưu' : 'Xóa'}
            </button>
            <button className="btn btn-secondary ms-2" onClick={() => setShowModal(false)}>
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
