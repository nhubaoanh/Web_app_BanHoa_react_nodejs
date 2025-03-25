import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
// thêm thư viện này vào để chuyển trang
import ReactPaginate from 'react-paginate';
import './Nhacc.css'; // Thêm CSS cho phân trang

const Nhacc = () => {
  // tạo trạng thái
  const [item, setItem] = useState([]);
  const [newNhacc, setNewNhacc] = useState({});
  const [action, setAction] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const offset = currentPage * itemsPerPage;
  const currentItems = item.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(item.length / itemsPerPage);

  // Gọi API để lấy danh sách nhà cung cấp
  useEffect(() => {
    api.get('/api/nhacungcap')
      .then((res) => {
        setItem(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log('Lỗi khi lấy danh sách nhà cung cấp:', error);
      });
  }, []);

  // Lọc danh sách nhà cung cấp dựa trên từ khóa tìm kiếm
  const filteredItem = item.filter(item => 
    item.TenNhaCungCap && item.TenNhaCungCap.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Thêm nhà cung cấp mới
  const handleAdd = () => {
    const formData = new FormData();
    Object.keys(newNhacc).forEach(key => {
      formData.append(key, newNhacc[key]);
    });
    // Gửi thông tin đến backend
    api.post('/api/nhacungcap', formData)
      .then((response) => {
        setItem([...item, response.data]);
        setNewNhacc({});
        console.log(response.data);
      })
      .catch((error) => {
        console.log('Lỗi khi thêm nhà cung cấp:', error);
        console.log("Dữ liệu gửi đi:", newNhacc);
      });
  };

  // Sửa thông tin nhà cung cấp
  const handleEdit = () => {
    const formData = new FormData();
    Object.keys(newNhacc).forEach(key => {
      formData.append(key, newNhacc[key]);
    });
    // Gửi thông tin đến backend
    api.put(`/api/nhacungcap/${newNhacc.MaNhaCungCap}`, formData)
      .then((response) => {
        const newItems = item.map(item => item.MaNhaCungCap === response.data.MaNhaCungCap ? response.data : item);
        setItem(newItems);
        setNewNhacc({});
      })
      .catch((error) => {
        console.log('Lỗi khi sửa nhà cung cấp:', error);
      });
  };

  // Xóa nhà cung cấp
  const handleDelete = () => {
    api.delete(`/api/nhacungcap/${newNhacc.MaNhaCungCap}`)
      .then((response) => {
        const newItems = item.filter(item => item.MaNhaCungCap !== newNhacc.MaNhaCungCap);
        setItem(newItems);
        setNewNhacc({});
      })
      .catch((error) => {
        console.log('Lỗi khi xóa nhà cung cấp:', error);
      });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewNhacc({ ...newNhacc, [name]: value });
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
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
        <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#productModal" onClick={() => setAction('add')}>Thêm nhà cung cấp</button>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Number Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              filteredItem.slice(offset, offset + itemsPerPage).map((item) => (
                <tr key={item.MaNhaCungCap}>
                  <td>{item.MaNhaCungCap}</td>
                  <td>{item.TenNhaCungCap}</td>
                  <td>{item.SoDienThoai}</td>
                  <td>{item.Email}</td>
                  <td>{item.DiaChi}</td>
                  <td>{item.GhiChu}</td>
                  <td>
                    <button className="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#productModal" onClick={() => { setAction('edit'); setNewNhacc(item) }}>Sửa</button>
                    <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#productModal" onClick={() => { setAction('delete'); setNewNhacc(item) }}>Xóa</button>
                  </td>
                </tr>
              ))
            }
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
      <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="productModalLabel">
                {action === 'add' && 'Thêm Nhà cung cấp mới'}
                {action === 'edit' && 'Sửa Nhà cung cấp'}
                {action === 'delete' && 'Xóa Nhà cung cấp'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="MaNhaCungCap" className="form-label">Mã Nhà Cc</label>
                  <input type="text" className="form-control" id="MaNhaCungCap" name="MaNhaCungCap" value={newNhacc.MaNhaCungCap || ''} onChange={handleChange} disabled={action !== 'add'} />
                </div>
                {action !== 'delete' && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="TenNhaCungCap" className="form-label">Name NhaCungCap</label>
                      <input type="text" className="form-control" id="TenNhaCungCap" name="TenNhaCungCap" value={newNhacc.TenNhaCungCap || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="SoDienThoai" className="form-label">Số điện thoại</label>
                      <input type="text" className="form-control" id="SoDienThoai" name="SoDienThoai" value={newNhacc.SoDienThoai || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Email" className="form-label">Email</label>
                      <input type="text" className="form-control" id="Email" name="Email" value={newNhacc.Email || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="DiaChi" className="form-label">Địa chỉ</label>
                      <input type="text" className="form-control" id="DiaChi" name="DiaChi" value={newNhacc.DiaChi || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="GhiChu" className="form-label">Notes</label>
                      <input type="text" className="form-control" id="GhiChu" name="GhiChu" value={newNhacc.GhiChu || ''} onChange={handleChange} />
                    </div>
                  </>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">
                {action === 'add' && 'Thêm Nhà cung cấp'}
                {action === 'edit' && 'Sửa Nhà cung cấp'}
                {action === 'delete' && 'Xóa Nhà cung cấp'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nhacc;