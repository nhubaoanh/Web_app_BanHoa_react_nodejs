import React from 'react'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import api from '../../../services/api'

const Saff = () => {
    const [item, setItem] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const [newSaff, setNewSaff] = useState({});
    const [action, setAction] = useState('add');

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;
    
    const offset = currentPage * itemsPerPage;
    const pageCount = Math.ceil(item.length / itemsPerPage);
    useEffect(() => {
        api.get('/api/nhanvien')
        .then((res) => {
            setItem(res.data)
            console.log(res.data)
        })
        .catch((Error) =>{
            console.log('Lỗi khi lấy danh sách nhân viên lên:', Error)
        });
    }, []); 

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
      };

    const filterItems = item.filter(item =>
       item.HoTen && item.HoTen.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSaff({ ...newSaff, [name]: value });
    }

    const handleSubmit = () => {
      if (action === 'add') {
        handleAdd();
      } else if (action === 'edit') {
        handleEdit();
      } else if (action === 'delete') {
        handleDelete();
      }
    };

    // thêm nhân viên
    const handleAdd = () => {
      const formData = new FormData();
      Object.keys(newSaff).forEach(key => {
        formData.append(key, newSaff[key]);
      });
      // Gửi thông tin đến backend
      api.post('/api/nhanvien/create-saff-of-admin', formData)
      .then((response) => {
        setNewSaff({});
        setItem([...item, response.data]);
        console.log(response.data);
      })
      .catch((error) => {
        console.log('Lỗi khi thêm nhân viên:', error);
        console.log("Dữ liệu gửi đi:", newSaff);
      });
    }

    const handleEdit = () => {
      const formData = new FormData();
      Object.keys(newSaff).forEach(key => {
        formData.append(key, newSaff[key]);
      });
      // Gửi thông tin đến backend
      api.put(`/api/nhacungcap/${newSaff.MaNhanVien}`, formData)
        .then((response) => {
          const newSaff = item.map(item => item.MaNhanVien === response.data.MaNhanVien ? response.data : item);
          setItem(newSaff);
          setNewSaff({});
        })
        .catch((error) => {
          console.log('Lỗi khi sửa nhà cung cấp:', error);
        });
    };
  
    // Xóa nhà cung cấp
    const handleDelete = () => {
      api.delete(`/api/nhacungcap/${newSaff.MaNhanVien}`)
        .then((response) => {
          console.log('Xóa Nhà Cung cấp thành công:',response.data);
          const newItems = item.filter(item => item.MaNhanVien !== newSaff.MaNhanVien);
          setItem(newItems);
          setNewSaff({});
        })
        .catch((error) => {
          console.log('Lỗi khi xóa nhà cung cấp:', error);
        });
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
          value={searchTerm} // Set the value of the input to searchTerm state  
          />
          <label className="form-label" htmlFor="datatable-search-input">
            Search
          </label>
        </div>
        <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#productModal" >Thêm nhà cung cấp</button>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Number Phone</th>
              <th>Email</th>
              <th>MatKhau</th>
              <th>Status</th>
              <th>Id Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                filterItems.map((item) => {
                    return (
                        <tr key={item.MaNhanVien}>
                            <td>{item.MaNhanVien}</td>
                            <td>{item.HoTen}</td>
                            <td>{item.SoDienThoai}</td>
                            <td>{item.Email}</td>
                            <td>{item.MatKhau}</td>
                            <td>{item.TrangThai}</td>
                            <td>{item.MaAdmin}</td>
                            <td>
                                <button className="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#productModal">Sửa</button>
                                <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#productModal">Xóa</button>
                            </td>
                        </tr>
                    )
                })
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
                {action === 'add' && 'Thêm Nhân viên mới'}
                {action === 'edit' && 'Sửa Nhân viên'}
                {action === 'delete' && 'Xóa Nhân viên'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="MaNhanVien" className="form-label">ID Saff</label>
                  <input type="text" className="form-control" id="MaNhanVien" name="MaNhanVien" value={newSaff.MaNhanVien || ''} onChange={handleChange} disabled={action !== 'add'} />
                </div>
                {action !== 'delete' && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="HoTen" className="form-label">Name</label>
                      <input type="text" className="form-control" id="HoTen" name="HoTen" value={newSaff.HoTen || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="SoDienThoai" className="form-label">Số điện thoại</label>
                      <input type="text" className="form-control" id="SoDienThoai" name="SoDienThoai" value={newSaff.SoDienThoai || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="Email" className="form-label">Email</label>
                      <input type="text" className="form-control" id="Email" name="Email" value={newSaff.Email || ''} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="DiaChi" className="form-label">Pass</label>
                      <input type="text" className="form-control" id="MatKhau" name="MatKhau" value={newSaff.MatKhau || ''} onChange={handleChange} />
                    </div>
                  </>
                )}
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit} data-bs-dismiss="modal">
                {action === 'add' && 'Thêm nhân viên'}
                {action === 'edit' && 'Sửa nhân viên'}
                {action === 'delete' && 'Xóa nhân viên'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Saff
