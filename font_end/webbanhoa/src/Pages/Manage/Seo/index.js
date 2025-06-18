import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import ReactPaginate from 'react-paginate';

const Seo = () => {
  const [items, setItems] = useState([]); // Danh sách nhà cung cấp
  const [newItem, setNewItem] = useState({}); // Nhà cung cấp mới hoặc đang chỉnh sửa
  const [searchTerm, setSearchTerm] = useState(''); // Từ khóa tìm kiếm
  const [action, setAction] = useState('add'); // Hành động hiện tại (add, edit, delete)
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const itemsPerPage = 10 ; // Số lượng mục trên mỗi trang

  // Lấy danh sách nhà cung cấp từ API
  useEffect(() => {
    api.get('/api/khuyenmai')
      .then((res) => {
        setItems(res.data);
      })
      .catch((error) => {
        console.error("Error when fetching data:", error);
      });
  }, []);

  // Lọc danh sách nhà cung cấp dựa trên từ khóa tìm kiếm
  const filteredItems = items.filter(item =>
    item.TenKhuyenMai && item.TenKhuyenMai.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xử lý phân trang
  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  // Thêm nhà cung cấp
  const handleAdd = () => {
    api.post('/api/khuyenmai', newItem)
      .then((res) => {
        setItems([...items, res.data]);
        alert('Thêm nhà cung cấp thành công!');
      })
      .catch((error) => {
        console.error("Error when adding item:", error);
        alert('Thêm nhà cung cấp thất bại!');
      });
  };

  // Sửa nhà cung cấp
  const handleEdit = () => {
    api.put(`/api/khuyenmai/${newItem.MaKhuyenMai}`, newItem)
      .then((res) => {
        const updatedItems = items.map(item =>
          item.MaKhuyenMai === newItem.MaKhuyenMai ? newItem : item
        );
        setItems(updatedItems);
        alert('Sửa nhà cung cấp thành công!');
      })
      .catch((error) => {
        console.error("Error when editing item:", error);
        alert('Sửa nhà cung cấp thất bại!');
      });
  };

  // Xóa nhà cung cấp
  const handleDelete = () => {
    api.delete(`/api/khuyenmai/${newItem.MaKhuyenMai}`)
      .then(() => {
        const updatedItems = items.filter(item => item.MaKhuyenMai !== newItem.MaKhuyenMai);
        setItems(updatedItems);
        alert('Xóa nhà cung cấp thành công!');
      })
      .catch((error) => {
        console.error("Error when deleting item:", error);
        alert('Xóa nhà cung cấp thất bại!');
      });
  };

  // Xử lý khi nhấn nút Submit
  const handleSubmit = () => {
    if (action === 'add') {
      handleAdd();
    } else if (action === 'edit') {
      handleEdit();
    } else if (action === 'delete') {
      handleDelete();
    }
  };

  return (
    <div className="container">
      <div className="form-outline mb-4">
        <input
          type="text"
          className="form-control"
          id="datatable-search-input"
          placeholder="Tìm kiếm mã giảm giá..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label className="form-label" htmlFor="datatable-search-input">Search</label>
      </div>
      <button
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#productModal"
        onClick={() => {
          setAction('add');
          setNewItem({});
        }}
      >
        Thêm khuyến mãi
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Discount</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {filteredItems.slice(offset, offset + itemsPerPage).map((item, index) => (
            <tr key={item.MaKhuyenMai}>
              <td>{offset + index + 1}</td>
              <td>{item.TenKhuyenMai}</td>
              <td>{item.GiamGia}%</td>
              <td>{item.NgayBatDau}</td>
              <td>{item.NgayKetThuc}</td>
              <td>{item.TrangThai === 1 ? 'Hoạt động' : 'Hết hạn'}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#productModal"
                  onClick={() => {
                    setAction('edit');
                    setNewItem(item);
                  }}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#productModal"
                  onClick={() => {
                    setAction('delete');
                    setNewItem(item);
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

      {/* Modal */}
      <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="productModalLabel">
                {action === 'add' && 'Thêm mã giảm giá mới'}
                {action === 'edit' && 'Sửa mã giảm giá'}
                {action === 'delete' && 'Xóa mã giảm giá'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {action !== 'delete' ? (
                <form>
                  <div className="mb-3">
                    <label htmlFor="TenKhuyenMai" className="form-label">Tên Khuyến Mãi</label>
                    <input
                      type="text"
                      className="form-control"
                      id="TenKhuyenMai"
                      name="TenKhuyenMai"
                      value={newItem.TenKhuyenMai || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="GiamGia" className="form-label">Giảm Giá (%)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="GiamGia"
                      name="GiamGia"
                      value={newItem.GiamGia || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="NgayBatDau" className="form-label">Ngày Bắt Đầu</label>
                    <input
                      type="date"
                      className="form-control"
                      id="NgayBatDau"
                      name="NgayBatDau"
                      value={newItem.NgayBatDau || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="NgayKetThuc" className="form-label">Ngày Kết Thúc</label>
                    <input
                      type="date"
                      className="form-control"
                      id="NgayKetThuc"
                      name="NgayKetThuc"
                      value={newItem.NgayKetThuc || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="TrangThai" className="form-label">Trạng Thái</label>
                    <select
                      className="form-control"
                      id="TrangThai"
                      name="TrangThai"
                      value={newItem.TrangThai || ''}
                      onChange={handleChange}
                    >
                      <option value="1">Hoạt động</option>
                      <option value="0">Hết hạn</option>
                    </select>
                  </div>
                </form>
              ) : (
                <p>Bạn có chắc chắn muốn xóa mã giảm giá này?</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">
                {action === 'add' && 'Thêm mã giảm giá'}
                {action === 'edit' && 'Sửa mã giảm giá'}
                {action === 'delete' && 'Xóa mã giảm giá'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seo;