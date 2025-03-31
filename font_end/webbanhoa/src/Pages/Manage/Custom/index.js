import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import { useNavigate } from "react-router-dom";
const Custom = () => {
  const [items, setItems] = useState([]);
  const [newCustom, setNewCustom] = useState({});
  const [action, setAction] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  // Gọi API để lấy danh sách khách hàng
  useEffect(() => {
    api.get('/api/KhachHang')
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log('Lỗi khi lấy danh sách khách hàng:', error);
      });
  }, []);

  // Hàm kiểm tra đăng nhập
  const checkLogin = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  };

  // Kiểm tra đăng nhập khi component được render lần đầu
  useEffect(() => {
    checkLogin();
  }, []);

  // Lọc danh sách khách hàng dựa trên từ khóa tìm kiếm
  const filteredItems = items.filter(item => 
    item.HoTen && item.HoTen.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Thêm khách hàng mới
  const handleAdd = () => {
    const formData = new FormData();
    Object.keys(newCustom).forEach(key => {
      formData.append(key, newCustom[key]);
    });
    // Gửi thông tin đến backend
    api.post('/api/KhachHang', formData)
      .then((response) => {
        setItems([...items, response.data]);
        setNewCustom({});
      })
      .catch((error) => {
        console.log('Lỗi khi thêm khách hàng:', error);
      });
  };

  // Sửa thông tin khách hàng
  const handleEdit = () => {
    console.log("MaKhachHang cần sửa:", newCustom.MaKhachHang); // Kiểm tra giá trị
    const formData = new FormData();
    Object.keys(newCustom).forEach(key => {
      formData.append(key, newCustom[key]);
    });
    // Gửi thông tin đến backend
    api.put(`/api/KhachHang/${newCustom.MaKhachHang}`, formData)
      .then((response) => {
        console.log("sửa thành công : " , response.data);
        const newItems = items.map(item => item.MaKhachHang === response.data.MaKhachHang ? response.data : item);
        setItems(newItems);
        setNewCustom({});
      })
      .catch((error) => {
        console.log('Lỗi khi sửa khách hàng:', error);
      });
  };

  // Xóa khách hàng
  const handleDelete = () => {
    // Gửi thông tin đến backend
  console.log("MaKhachHang cần xóa:", newCustom.MaKhachHang); // Kiểm tra giá trị
  if (!newCustom.MaKhachHang) {
    console.error("Không có MaKhachHang để xóa!");
    return;
  }
    api.delete(`/api/KhachHang/${newCustom.MaKhachHang}`)
      .then((response) => {
        console.log("xóa thành công : ", response.data);
        const newItems = items.filter(item => item.MaKhachHang !== newCustom.MaKhachHang);
        setItems(newItems);
        setNewCustom({});
      })
      .catch((error) => {
        console.log('Lỗi khi xóa khách hàng:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustom({ ...newCustom, [name]: value });
  };

  // Xử lý chọn thêm, sửa, xóa
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <label className="form-label" htmlFor="datatable-search-input">
            Search
          </label>
        </div>
        <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#productModal">Thêm khách hàng</button>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Number Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Date create</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredItems.map((item) => (
                <tr key={item.MaKhachHang}>
                  <td>{item.MaKhachHang}</td>
                  <td>{item.HoTen}</td>
                  <td>{item.SoDienThoai}</td>
                  <td>{item.Email}</td>
                  <td>{item.DiaChi}</td>
                  <td>{item.NgayTao}</td>
                  <td>
                    <button className="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#productModal" onClick={() => { setAction('edit'); setNewCustom(item) }}>Sửa</button>
                    <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#productModal" onClick={() => { setAction('delete'); setNewCustom(item) }}>Xóa</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="productModalLabel">
                {action === 'add' && 'Thêm khách hàng mới'}
                {action === 'edit' && 'Sửa khách hàng'}
                {action === 'delete' && 'Xóa khách hàng'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="MaKhachHang" className="form-label">Mã Khách Hàng</label>
                  <input type="text" className="form-control" id="MaKhachHang" name="MaKhachHang" value={newCustom.MaKhachHang || ''} onChange={handleChange} disabled={action !== 'add'} />
                </div>
                {action !== 'delete' && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="HoTen" className="form-label">Họ tên</label>
                      <input type="text" className="form-control" id="HoTen" name="HoTen" value={newCustom.HoTen || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="SoDienThoai" className="form-label">Số điện thoại</label>
                      <input type="text" className="form-control" id="SoDienThoai" name="SoDienThoai" value={newCustom.SoDienThoai || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Email" className="form-label">Email</label>
                      <input type="text" className="form-control" id="Email" name="Email" value={newCustom.Email || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="DiaChi" className="form-label">Địa chỉ</label>
                      <input type="text" className="form-control" id="DiaChi" name="DiaChi" value={newCustom.DiaChi || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="NgayTao" className="form-label">Ngày tạo</label>
                      <input type="date" className="form-control" id="NgayTao" name="NgayTao" value={newCustom.NgayTao || ''} onChange={handleChange} />
                    </div>
                  </>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">
                {action === 'add' && 'Thêm khách hàng'}
                {action === 'edit' && 'Sửa khách hàng'}
                {action === 'delete' && 'Xóa khách hàng'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom;