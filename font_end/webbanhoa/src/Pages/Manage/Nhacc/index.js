import React, { useEffect, useState } from 'react'
import api from '../../../services/api';

const Nhacc = () => {
    // tạo trạng thái
    const [item, setItem] = useState([]);

    useEffect(() => {
        api.get('/api/nhacungcap')
        .then((res) => {
            setItem(res.data);
            console.log(item);
        })
        .catch((error) => {
            console.log('Lỗi khi lấy danh sách nhà cung cấp:', error);
        });

    }, [])

  return (
    <div>
      <div className='container'>
        <div className="form-outline mb-4">
          <input
            type="text"
            className="form-control"
            id="datatable-search-input"
            
          />
          <label className="form-label" htmlFor="datatable-search-input">
            Search
          </label>
        </div>
        <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#productModal">Thêm sản phẩm</button>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>  
              <th>Name</th>
              <th>Mumber Phone</th>
              <th>Email</th>
              <th>Address</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
               item.map((item) => (
                <tr key={item.MaNhaCungCap}>
                    <td>{item.MaNhaCungCap}</td>
                    <td>{item.TenNhaCungCap}</td>
                    <td>{item.SoDienThoai}</td>
                    <td>{item.Email}</td>
                    <td>{item.DiaChi}</td>
                    <td>{item.GhiChu}</td>
                    <td>
                        <button className="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#productModal">Sửa</button>
                        <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#productModal">Xóa</button>
                    </td>
                </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Nhacc
