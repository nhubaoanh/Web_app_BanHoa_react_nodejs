"use client"

import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../../services/api"
import "./styles.css"

const OrderConfirmation = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const steps = [
    { title: "Đã đặt hàng", icon: "🛍️", status: "Chờ xác nhận" },
    { title: "Xác nhận đơn", icon: "✓", status: "Đã xác nhận" },
    { title: "Đang vận chuyển", icon: "🚚", status: "Đang vận chuyển" },
    { title: "Giao thành công", icon: "📦", status: "Giao thành công" },
  ]

  // Lấy danh sách đơn hàng
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log("Fetching orders...") // Log để debug
        const response = await api.get("/api/donhang")
        console.log("Orders response:", response.data) // Log để debug
        if (response.data) {
          setOrders(response.data)
        } else {
          setError("Không tìm thấy đơn hàng nào")
        }
      } catch (err) {
        console.error("Error details:", err) // Log chi tiết lỗi
        setError("Không thể tải danh sách đơn hàng: " + (err.response?.data?.message || err.message))
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const handleConfirmOrder = async (orderId) => {
    try {
      const response = await api.put(`/api/donhang/${orderId}`, {
        TrangThai: "Đã xác nhận"
      })
      console.log("Confirm order response:", response.data) // Log để debug
      
      // Refresh danh sách đơn hàng sau khi xác nhận
      const updatedOrders = await api.get("/api/donhang")
      setOrders(updatedOrders.data)
    } catch (err) {
      console.error("Error confirming order:", err) // Log chi tiết lỗi
      setError("Không thể xác nhận đơn hàng: " + (err.response?.data?.message || err.message))
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Đang tải danh sách đơn hàng...</div>
        <div className="loading-details">
          <p>Vui lòng đợi trong giây lát...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button className="btn btn-primary" onClick={() => navigate('/admin/quanlydonhang')}>
          Quay lại danh sách đơn hàng
        </button>
      </div>
    )
  }

  return (
    <div className="order-confirmation">
      <div className="page-header">
        <h1>Xác nhận đơn hàng</h1>
      </div>

      <div className="orders-list">
        {orders.map((order) => {
          const currentStep = steps.findIndex(step => step.status === order.TrangThai)
          return (
            <div key={order.MaDonHang} className="order-card">
              <div className="steps-container">
                {steps.map((step, index) => {
                  const isActive = index <= currentStep
                  return (
                    <div key={index} className="step-item">
                      <div className={`step-icon ${isActive ? 'active' : ''}`}>
                        {step.icon}
                      </div>
                      <span className="step-title">{step.title}</span>
                      {index < steps.length - 1 && (
                        <div className={`step-line ${isActive ? 'active' : ''}`}></div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="order-info">
                <div className="info-grid">
                  <div className="info-item">
                    <p className="info-label">Mã đơn:</p>
                    <p className="info-value">#{order.MaDonHang}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Ngày đặt:</p>
                    <p className="info-value">{new Date(order.NgayDatHang).toLocaleDateString('vi-VN')}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Người nhận:</p>
                    <p className="info-value">{order.TenKhachHang}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Số điện thoại:</p>
                    <p className="info-value">{order.SoDienThoai}</p>
                  </div>
                  <div className="info-item full-width">
                    <p className="info-label">Địa chỉ:</p>
                    <p className="info-value">{order.DiaChi}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Thanh toán:</p>
                    <p className="info-value">{order.PhuongThucThanhToan}</p>
                  </div>
                  <div className="info-item">
                    <p className="info-label">Trạng thái:</p>
                    <p className="info-value status">{order.TrangThai}</p>
                  </div>
                </div>
              </div>

              <div className="order-actions">
                {order.TrangThai === "Chờ xác nhận" && (
                  <button
                    className="btn btn-primary"
                    onClick={() => handleConfirmOrder(order.MaDonHang)}
                  >
                    Xác nhận đơn hàng
                  </button>
                )}
              </div>
            </div>
          )
        })}

        {orders.length === 0 && (
          <div className="no-orders">
            Không có đơn hàng nào cần xác nhận
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderConfirmation
