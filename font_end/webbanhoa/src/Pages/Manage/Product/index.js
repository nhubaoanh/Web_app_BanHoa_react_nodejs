import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

const Product = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Gọi API để lấy danh sách sản phẩm
  useEffect(() => {
    api
      .get("/api/sanpham")
      .then((response) => {
        setItems(response.data); // Lưu dữ liệu vào state
      })
      .catch((error) => {
        console.log("Lỗi khi lấy danh sách sản phẩm:", error);
      });
  }, []);

  const filteredItems = items.filter(item =>
    item.TenHoa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    // Logic for adding a new product
    console.log("Add new product");
  };

  const handleEdit = (index) => {
    // Logic for editing a product
    console.log("Edit product at index:", index);
  };

  const handleDelete = (index) => {
    // Logic for deleting a product
    console.log("Delete product at index:", index);
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
        <button className="btn btn-primary mb-3" onClick={handleAdd}>Thêm sản phẩm</button>
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
            {filteredItems.map((item, index) => (
              <tr key={item.MaSanPham}>
                <td>{item.MaSanPham}</td>
                <td>{item.TenHoa}</td>
                <td>{item.MaLoaiHoa}</td>
                <td>{item.GiaBan}₫</td>
                <td>{item.MoTa}</td>
                <td>{item.HinhAnh}</td>
                <td>{item.NgayThem}</td>
                <td>
                  <button className="btn btn-warning me-2" onClick={() => handleEdit(index)}>Sửa</button>
                  <button className="btn btn-danger" onClick={() => handleDelete(index)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Product;