import React, { useEffect, useState } from 'react';
import api from '../../../services/api';
import ReactPaginate from 'react-paginate';
import './order.css'; // Thêm CSS cho phân trang

const Orders = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    api.get(`/api/donhang`)
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log("lỗi server", error);
      });
  }, []);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentItems = items.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(items.length / itemsPerPage);

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
              <th>ID custom</th>
              <th>Date order</th>
              <th>Total Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.MaDonHang}>
                <td>{item.MaDonHang}</td>
                <td>{item.MaKhachHang}</td>
                <td>{item.NgayDatHang}</td>
                <td>{item.TongTien}</td>
                <td>{item.TrangThai}₫</td>
                <td>
                  <button className="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#productModal">Sửa</button>
                  <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#productModal">Xóa</button>
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
    </div>
  );
};

export default Orders;