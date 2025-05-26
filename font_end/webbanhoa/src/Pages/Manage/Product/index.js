import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { useNavigate } from "react-router-dom";
// thêm thư viện này vào để chuyển trang
import ReactPaginate from 'react-paginate';

// Custom hook for product management
const useProductManagement = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 10;

  const fetchProducts = async () => {
    try {
      const response = await api.get("/api/sanpham");
      setItems(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sản phẩm:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredItems = items.filter(item => 
    item.TenHoa?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentItems = filteredItems.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  return {
    items,
    currentItems,
    pageCount,
    currentPage,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    fetchProducts
  };
};

// Custom hook for form management
const useProductForm = (fetchProducts) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    Object.keys(formData).forEach(key => {
      if (key !== 'MaSanPham' || action === 'edit') {
        formDataToSend.append(key, formData[key]);
      }
    });
    if (selectedFile) {
      formDataToSend.append('HinhAnh', selectedFile);
    }

    try {
      switch (action) {
        case 'add':
          await api.post("/api/sanpham", formDataToSend, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          break;
        case 'edit':
          await api.put(`/api/sanpham/${formData.MaSanPham}`, formDataToSend, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          break;
        case 'delete':
          await api.delete(`/api/sanpham/${formData.MaSanPham}`);
          break;
      }
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error(`Lỗi khi ${action} sản phẩm:`, error);
    }
  };

  return {
    formData,
    imagePreview,
    action,
    setAction,
    setFormData,
    handleChange,
    handleImageChange,
    handleSubmit,
    resetForm
  };
};

// Product Table Component
const ProductTable = ({ items, onEdit, onDelete }) => (
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
      {items.map((item, index) => (
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
              onClick={() => onEdit(item)}
            >
              Sửa
            </button>
            <button 
              className="btn btn-danger" 
              data-bs-toggle="modal" 
              data-bs-target="#productModal" 
              onClick={() => onDelete(item)}
            >
              Xóa
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Product Form Modal Component
const ProductModal = ({ 
  action, 
  formData, 
  imagePreview, 
  handleChange, 
  handleImageChange, 
  handleSubmit 
}) => (
  <div className="modal fade" id="productModal" tabIndex="-1" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            {action === 'add' && 'Thêm sản phẩm mới'}
            {action === 'edit' && 'Sửa sản phẩm'}
            {action === 'delete' && 'Xóa sản phẩm'}
          </h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          {action !== 'delete' && (
            <form>
              <div className="mb-3">
                <label htmlFor="TenHoa" className="form-label">Tên Hoa</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="TenHoa" 
                  name="TenHoa" 
                  value={formData.TenHoa} 
                  onChange={handleChange} 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="MaLoaiHoa" className="form-label">Mã Loại Hoa</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="MaLoaiHoa" 
                  name="MaLoaiHoa" 
                  value={formData.MaLoaiHoa} 
                  onChange={handleChange} 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="GiaBan" className="form-label">Giá Bán (VND)</label>
                <input 
                  type="number" 
                  className="form-control" 
                  id="GiaBan" 
                  name="GiaBan" 
                  value={formData.GiaBan} 
                  onChange={handleChange}
                  placeholder="Nhập giá bán" 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="MoTa" className="form-label">Mô Tả</label>
                <input 
                  type="text" 
                  className="form-control" 
                  id="MoTa" 
                  name="MoTa" 
                  value={formData.MoTa} 
                  onChange={handleChange} 
                />
              </div>
              <div className="mb-3">
                <label htmlFor="HinhAnh" className="form-label">Hình Ảnh</label>
                <input 
                  type="file" 
                  className="form-control" 
                  id="HinhAnh" 
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
                <label htmlFor="NgayThem" className="form-label">Ngày Thêm</label>
                <input 
                  type="date" 
                  className="form-control" 
                  id="NgayThem" 
                  name="NgayThem" 
                  value={formData.NgayThem} 
                  onChange={handleChange} 
                />
              </div>
            </form>
          )}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={handleSubmit} 
            data-bs-dismiss="modal"
          >
            {action === 'add' && 'Thêm sản phẩm'}
            {action === 'edit' && 'Sửa sản phẩm'}
            {action === 'delete' && 'Xóa sản phẩm'}
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Main Product Component
const Product = () => {
  const navigate = useNavigate();
  const {
    currentItems,
    pageCount,
    currentPage,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
    fetchProducts
  } = useProductManagement();

  const {
    formData,
    imagePreview,
    action,
    setAction,
    setFormData,
    handleChange,
    handleImageChange,
    handleSubmit,
    resetForm
  } = useProductForm(fetchProducts);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const handleEdit = (item) => {
    setAction('edit');
    setFormData(item);
    setImagePreview(`/${item.HinhAnh}`);
  };

  const handleDelete = (item) => {
    setAction('delete');
    setFormData(item);
  };

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

      <ProductTable 
        items={currentItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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

      <ProductModal
        action={action}
        formData={formData}
        imagePreview={imagePreview}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Product;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          on type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">
                {action === 'add' && 'Thêm sản phẩm'}
                {action === 'edit' && 'Sửa sản phẩm'}
                {action === 'delete' && 'Xóa sản phẩm'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;