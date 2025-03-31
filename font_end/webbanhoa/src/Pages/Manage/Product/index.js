import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { useNavigate } from "react-router-dom";
// thêm thư viện này vào để chuyển trang
import ReactPaginate from 'react-paginate';
const Product = () => {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    const offset = currentPage * itemsPerPage;
    const currentItems = items.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(items.length / itemsPerPage);

  // Hàm kiểm tra đăng nhập
  const checkLogin = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  // Kiểm tra đăng nhập khi component được render lần đầu
  useEffect(() => {
    checkLogin();
  }, []);

  
  const [searchTerm, setSearchTerm] = useState('');
  const [newProduct, setNewProduct] = useState({
    MaSanPham: '',
    TenHoa: '',
    MaLoaiHoa: '',
    GiaBan: '',
    MoTa: '',
    HinhAnh: '',
    NgayThem: ''
  });
  const [action, setAction] = useState('add'); // Quản lý trạng thái hành động (add, edit, delete)
  const [imagePreview, setImagePreview] = useState(null); // State để lưu trữ URL của ảnh đã chọn
  const [selectedFile, setSelectedFile] = useState(null); // State để lưu trữ tệp ảnh đã chọn

    // Hàm lấy danh sách sản phẩm
    const fetchProducts = () => {
      api
        .get("/api/sanpham")
        .then((response) => {
          setItems(response.data); // Lưu dữ liệu vào state
        })
        .catch((error) => {
          console.log("Lỗi khi lấy danh sách sản phẩm:", error);
        });
    };
  
    // Gọi API để lấy danh sách sản phẩm khi component được render lần đầu
    useEffect(() => {
      fetchProducts();
    }, []);

    const filteredItems = Array.isArray(items) 
    ? items.filter(item => item.TenHoa && item.TenHoa.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];
  
  const handleAdd = () => {
    const formData = new FormData();
    Object.keys(newProduct).forEach(key => {
      formData.append(key, newProduct[key]);
    });
    if (selectedFile) {
      formData.append('HinhAnh', selectedFile);
    }

    // Gửi thông tin sản phẩm mới đến backend
    api
      .post("/api/sanpham", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        fetchProducts(); // Tải lại danh sách sản phẩm
        setItems([...items, response.data]); // Cập nhật danh sách sản phẩm
        setNewProduct({
          MaSanPham: '',
          TenHoa: '',
          MaLoaiHoa: '',
          GiaBan: '',
          MoTa: '',
          HinhAnh: '',
          NgayThem: ''
        }); // Reset form
        setImagePreview(null); // Reset ảnh đã chọn
        setSelectedFile(null); // Reset tệp ảnh đã chọn
        setItems({}); // Reset form
        console.log("Thêm sản phẩm thành công:", response.data);
      })
      .catch((error) => {
        console.log("Lỗi khi thêm sản phẩm:", error);
      });
  };

  const handleEdit = () => {
    const formData = new FormData();
    Object.keys(newProduct).forEach(key => {
      formData.append(key, newProduct[key]);
    });
    if (selectedFile) {
      formData.append('HinhAnh', selectedFile);
    }

    // Gửi thông tin sản phẩm mới đến backend
    api
      .put(`/api/sanpham/${newProduct.MaSanPham}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((response) => {
        const updatedItems = items.map(item =>
          item.MaSanPham === newProduct.MaSanPham ? response.data : item
        );
        setItems(updatedItems); // Cập nhật danh sách sản phẩm
        fetchProducts(); // Tải lại danh sách sản phẩm
        setNewProduct({
          MaSanPham: '',
          TenHoa: '',
          MaLoaiHoa: '',
          GiaBan: '',
          MoTa: '',
          HinhAnh: '',
          NgayThem: ''
        }); // Reset form
        setImagePreview(null); // Reset ảnh đã chọn
        setSelectedFile(null); // Reset tệp ảnh đã chọn
        console.log("Sửa sản phẩm thành công:", response.data);
      })
      .catch((error) => {
        console.log("Lỗi khi sửa sản phẩm:", error);
      });
  };

  const handleDelete = () => {
    console.log("MaSanPham cần xóa:", newProduct.MaSanPham); // Kiểm tra giá trị
    if (!newProduct.MaSanPham) {
      console.error("Không có MaSanPham để xóa!");
      return;
    }    api
      .delete(`/api/sanpham/${newProduct.MaSanPham}`)
      .then((response) => {
        console.log("Xóa sản phẩm thành công:", response.data);
        const updatedItems = items.filter(item => item.MaSanPham !== newProduct.MaSanPham);
        setItems(updatedItems); // Cập nhật danh sách sản phẩm
      })
      .catch((error) => {
        console.log("Lỗi khi xóa sản phẩm:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
    <div>
      <div className='container'>
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
        <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#productModal" onClick={() => { setAction('add'); setNewProduct({ MaSanPham: '', TenHoa: '', MaLoaiHoa: '', GiaBan: '', MoTa: '', HinhAnh: '', NgayThem: '' }); setImagePreview(null); setSelectedFile(null); }}>Thêm sản phẩm</button>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>  
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
            {filteredItems.slice(offset, offset + itemsPerPage).map((item) => (
              <tr key={item.MaSanPham}>
                <td>{item.MaSanPham}</td>
                <td>{item.TenHoa}</td>
                <td>{item.MaLoaiHoa}</td>
                <td>{item.GiaBan}₫</td>
                <td>{item.MoTa}</td>
                <td><img src={`http://localhost:8080/${item.HinhAnh}`} alt={item.TenHoa} style={{ width: '50px', height: '50px' }} /></td>
                <td>{item.NgayThem}</td>
                <td>
                  <button className="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#productModal" onClick={() => { setAction('edit'); setNewProduct(item); setImagePreview(`/${item.HinhAnh}`); setSelectedFile(null); }}>Sửa</button>
                  <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#productModal" onClick={() => { setAction('delete'); setNewProduct(item); setImagePreview(null); setSelectedFile(null); }}>Xóa</button>
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
      </div>

      {/* Modal for adding, editing, and deleting product */}
      <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="productModalLabel">
                {action === 'add' && 'Thêm sản phẩm mới'}
                {action === 'edit' && 'Sửa sản phẩm'}
                {action === 'delete' && 'Xóa sản phẩm'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="MaSanPham" className="form-label">Mã Sản Phẩm</label>
                  <input type="text" className="form-control" id="MaSanPham" name="MaSanPham" value={newProduct.MaSanPham} onChange={handleChange} disabled={action !== 'add'} />
                </div>
                {action !== 'delete' && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="TenHoa" className="form-label">Tên Hoa</label>
                      <input type="text" className="form-control" id="TenHoa" name="TenHoa" value={newProduct.TenHoa} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="MaLoaiHoa" className="form-label">Mã Loại Hoa</label>
                      <input type="text" className="form-control" id="MaLoaiHoa" name="MaLoaiHoa" value={newProduct.MaLoaiHoa} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="GiaBan" className="form-label">Giá Bán</label>
                      <input type="text" className="form-control" id="GiaBan" name="GiaBan" value={newProduct.GiaBan} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="MoTa" className="form-label">Mô Tả</label>
                      <input type="text" className="form-control" id="MoTa" name="MoTa" value={newProduct.MoTa} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="HinhAnh" className="form-label">Hình Ảnh</label>
                      <input type="file" className="form-control" id="HinhAnh" name="HinhAnh" onChange={handleImageChange} />
                      {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="NgayThem" className="form-label">Ngày Thêm</label>
                      <input type="date" className="form-control" id="NgayThem" name="NgayThem" value={newProduct.NgayThem} onChange={handleChange} />
                    </div>
                  </>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">
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