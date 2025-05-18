import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./styles.css"
import api from "../../../services/api"

const QuanLyDonHang = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  // Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await api.get("/api/donhang")
      setOrders(response.data)
      setError("")
    } catch (err) {
      setError("Không thể tải danh sách đơn hàng")
      console.error("Lỗi khi lấy đơn hàng:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  // Hàm lấy trạng thái kế tiếp
  const getNextStatus = (currentStatus) => {
    switch (currentStatus) {
      case "Chờ xác nhận":
        return "Đã xác nhận"
      case "Đã xác nhận":
        return "Chờ giao hàng"
      case "Chờ giao hàng":
        return "Giao thành công"
      default:
        return null
    }
  }

  // Cập nhật trạng thái đơn hàng
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/donhang/${orderId}`, {
        TrangThai: newStatus
      })
      fetchOrders() // Tải lại danh sách
    } catch (err) {
      setError("Không thể cập nhật trạng thái đơn hàng")
      console.error("Lỗi khi cập nhật trạng thái:", err)
    }
  }

  // Chuyển đến trang chi tiết
  const handleViewOrder = (orderId) => {
    navigate(`/admin/donhang/${orderId}`)
  }

  if (loading) {
    return <div className="loading">Đang tải đơn hàng...</div>
  }

  return (
    <div className="order-management">
      <div className="page-header">
        <h1>Quản lý đơn hàng</h1>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="orders-list">
        {orders.map((order) => {
          const nextStatus = getNextStatus(order.TrangThai)
          return (
            <div key={order.MaDonHang} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Đơn hàng #{order.MaDonHang}</h3>
                  <p>Ngày đặt: {new Date(order.NgayDatHang).toLocaleDateString('vi-VN')}</p>
                </div>
                <div className={`order-status ${order.TrangThai.toLowerCase().replace(/\s/g, '-')}`}>
                  {order.TrangThai}
                </div>
              </div>

              <div className="order-details">
                <div className="customer-info">
                  <p><strong>Khách hàng:</strong> {order.TenKhachHang}</p>
                  <p><strong>SĐT:</strong> {order.SoDienThoai}</p>
                  <p><strong>Địa chỉ:</strong> {order.DiaChi}</p>
                </div>
                <div className="order-summary">
                  <p><strong>Tổng tiền:</strong> {order.TongTien.toLocaleString('vi-VN')}đ</p>
                  <p><strong>Thanh toán:</strong> {order.PhuongThucThanhToan}</p>
                </div>
              </div>

              <div className="order-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleViewOrder(order.MaDonHang)}
                >
                  Xem chi tiết
                </button>

                {nextStatus && (
                  <button
                    className="btn btn-primary"
                    onClick={() => updateOrderStatus(order.MaDonHang, nextStatus)}
                  >
                    Chuyển sang: {nextStatus}
                  </button>
                )}
              </div>
            </div>
          )
        })}

        {orders.length === 0 && (
          <div className="no-orders">Không có đơn hàng nào</div>
        )}
      </div>
    </div>
  )
}

export default QuanLyDonHang
