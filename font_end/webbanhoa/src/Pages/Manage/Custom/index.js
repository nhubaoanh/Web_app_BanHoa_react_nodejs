import React, {useEffect, useState} from 'react'
import api from '../../../services/api';

const Custom = () => {
    const [items, setItems] = useState([]);


    // gọi api
    useEffect(() => {
        api.get('/api/KhachHang')
        .then((response) => {
            setItems(response.data);
        })
        .catch((error) => {
            console.log('Lỗi khi lấy danh sách khách hàng:', error);
        })
    }, []);

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
              <th>Date create</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
                items.map((item) => (
                    <tr>
                    <td>{item.MaKhachHang}</td>
                    <td>{item.HoTen}</td>
                    <td>{item.SoDienThoai}</td>
                    <td>{item.Email}</td>
                    <td>{item.DiaChi}</td>
                    <td>{item.NgayTao}</td>
                    <td>
                      <button className="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#productModal">Sửa</button>
                      <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#productModal" >Xóa</button>
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

export default Custom
