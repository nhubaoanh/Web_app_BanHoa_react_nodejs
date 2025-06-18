import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import ReactPaginate from 'react-paginate';

const Product = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    TenHoa: '',
    MaLoaiHoa: '',
    GiaBan: '',
    MoTa: '',
    HinhAnh: '',
    NgayThem: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [action, setAction] = useState('add');

  const itemsPerPage = 10;

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    fetchProducts();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/api/sanpham');
      setItems(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      TenHoa: '',
      MaLoaiHoa: '',
      GiaBan: '',
      MoTa: '',
      HinhAnh: '',
      NgayThem: ''
    });
    setImagePreview(null);
    setSelectedFile(null);
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== 'MaSanPham' || action === 'edit') {
        formDataToSend.append(key, formData[key]);
      }
    });
    if (selectedFile) {
      formDataToSend.append('HinhAnh', selectedFile);
    }

    try {
      if (action === 'add') {
        await api.post('/api/sanpham', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Thêm sản phẩm thành công!');
      } else if (action === 'edit') {
        await api.put(`/api/sanpham/${formData.MaSanPham}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else if (action === 'delete') {
        await api.delete(`/api/sanpham/${formData.MaSanPham}`);
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error(`Lỗi khi ${action} sản phẩm:`, error);
    }
  };

  const handleEdit = (item) => {
    setAction('edit');
    setFormData(item);
    setImagePreview(`http://localhost:8080/${item.HinhAnh}`);
  };

  const handleDelete = (item) => {
    setAction('delete');
    setFormData(item);
  };

  const filteredItems = items.filter((item) =>
    item.TenHoa?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredItems.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <div className="container">
      <div className="form-outline mb-4">
        <input
          type="text"
          className="form-control"
          id="datatable-search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <label className="form-label" htmlFor="datatable-search-input">
          Search
        </label>
      </div>

      <button
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#productModal"
        onClick={() => {
          setAction('add');
          resetForm();
        }}
      >
        Thêm sản phẩm
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Id Type Flower</th>
            <th>Price</th>
            <th>Mo ta</th>
            <th>Images</th>
            <th>Date Add</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={item.MaSanPham}>
              <td>{index + 1}</td>
              <td>{item.TenHoa}</td>
              <td>{item.MaLoaiHoa}</td>
              <td>{Number(item.GiaBan).toLocaleString('vi-VN')} VND</td>
              <td>{item.MoTa}</td>
              <td>
                <img
                  src={`http://localhost:8080/${item.HinhAnh}`}
                  alt={item.TenHoa}
                  style={{ width: '100px', height: '100px' }}
                />
              </td>
              <td>{item.NgayThem}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#productModal"
                  onClick={() => handleEdit(item)}
                >
                  Sửa
                </button>
                <button
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#productModal"
                  onClick={() => handleDelete(item)}
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
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />

      {/* Modal */}
      <div className="modal fade" id="productModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {action === 'add' && 'Thêm sản phẩm mới'}
                {action === 'edit' && 'Sửa sản phẩm'}
                {action === 'delete' && 'Xóa sản phẩm'}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {action !== 'delete' && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Tên Hoa</label>
                    <input
                      type="text"
                      className="form-control"
                      name="TenHoa"
                      value={formData.TenHoa}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mã Loại Hoa</label>
                    <input
                      type="text"
                      className="form-control"
                      name="MaLoaiHoa"
                      value={formData.MaLoaiHoa}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Giá Bán</label>
                    <input
                      type="number"
                      className="form-control"
                      name="GiaBan"
                      value={formData.GiaBan}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mô Tả</label>
                    <input
                      type="text"
                      className="form-control"
                      name="MoTa"
                      value={formData.MoTa}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Hình Ảnh</label>
                    <input
                      type="file"
                      className="form-control"
                      name="HinhAnh"
                      onChange={handleImageChange}
                    />
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ width: '100px', height: '100px', marginTop: '10px' }}
                      />
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ngày Thêm</label>
                    <input
                      type="date"
                      className="form-control"
                      name="NgayThem"
                      value={formData.NgayThem}
                      onChange={handleChange}
                    />
                  </div>
                </>
              )}
              {action === 'delete' && (
                <p>Bạn có chắc chắn muốn xóa sản phẩm <strong>{formData.TenHoa}</strong>?</p>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
                data-bs-dismiss="modal"
              >
                {action === 'add' && 'Thêm sản phẩm'}
                {action === 'edit' && 'Lưu thay đổi'}
                {action === 'delete' && 'Xóa'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
