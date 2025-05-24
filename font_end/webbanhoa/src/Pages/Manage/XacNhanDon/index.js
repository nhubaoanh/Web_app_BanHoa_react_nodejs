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

  // Kiểm tra đăng nhập ngay khi component được mount
  useEffect(() => {
    const checkLogin = () => {
      const maAdmin = localStorage.getItem("MaAdmin");
      const token = localStorage.getItem("token");
      
      if (!maAdmin || !token) {
        setError("Vui lòng đăng nhập để xem đơn hàng");
        setLoading(false);
        navigate('/login');
        return false;
      }
      return true;
    };

    if (!checkLogin()) {
      return;
    }
  }, [navigate]);

  // Hàm xác định trạng thái hiện tại của đơn hàng
  const getCurrentStep = (status) => {
    switch (status) {
      case "Chờ xác nhận":
        return 0;
      case "Đã xác nhận":
        return 1;
      case "Đang vận chuyển":
        return 2;
      case "Giao thành công":
        return 3;
      default:
        return 0;
    }
  };

  // Hàm xác định màu sắc cho trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "Giao thành công":
        return "success";
      case "Đang vận chuyển":
        return "primary";
      case "Đã xác nhận":
        return "info";
      case "Chờ xác nhận":
        return "warning";
      default:
        return "secondary";
    }
  };

  // Lấy danh sách đơn hàng của người dùng đã đăng nhập
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const maKhachHang = localStorage.getItem("MaAdmin");
        const token = localStorage.getItem("token");
        
        if (!maKhachHang || !token) {
          setError("Vui lòng đăng nhập để xem đơn hàng");
          setLoading(false);
          navigate('/login');
          return;
        }

        // Thêm token vào header của request
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Lấy tất cả đơn hàng
        const response = await api.get("/api/donhang");

        if (response.data) {
          // Lấy thông tin đơn hàng từ localStorage
          const lastOrderInfo = JSON.parse(localStorage.getItem('lastOrderInfo') || '{}');

          // Lọc đơn hàng theo MaKhachHang và trạng thái
          const filteredOrders = response.data.filter(order => {
            // Chuyển đổi MaKhachHang thành số để so sánh
            const orderMaKhachHang = parseInt(order.MaKhachHang);
            const userMaKhachHang = parseInt(maKhachHang);
            
            // Kiểm tra trạng thái đơn hàng
            const isCompleted = order.TrangThai === "hoan thanh";
            const isPending = order.TrangThai === "Cho xu ly";
            
            // Nếu là đơn hoàn thành, chuyển trạng thái thành "Giao thành công"
            if (isCompleted) {
              order.TrangThai = "Giao thành công";
            }

            // Nếu là đơn hàng mới nhất và chưa có thông tin chi tiết
            if (orderMaKhachHang === userMaKhachHang && 
                (isPending || isCompleted) && 
                !order.TenKhachHang && 
                lastOrderInfo.TenKhachHang) {
              // Thêm thông tin từ localStorage
              order.TenKhachHang = lastOrderInfo.TenKhachHang;
              order.SoDienThoai = lastOrderInfo.SoDienThoai;
              order.DiaChi = lastOrderInfo.DiaChi;
              order.GhiChu = lastOrderInfo.GhiChu;
            }
            
            return orderMaKhachHang === userMaKhachHang && (isPending || isCompleted);
          });

          console.log("Đơn hàng đã lọc:", filteredOrders);
          setOrders(filteredOrders);
        } else {
          setError("Không tìm thấy đơn hàng nào");
        }
      } catch (err) {
        console.error("Error details:", err);
        setError("Không thể tải danh sách đơn hàng: " + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [navigate]);

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
        <button className="btn btn-primary" onClick={() => navigate('/home')}>
          Quay lại trang chủ
        </button>
      </div>
    )
  }

  return (
    <div className="order-confirmation">
      <div className="page-header">
        <h1>Đơn hàng của tôi</h1>
      </div>

      <div className="orders-list">
        {orders.map((order) => {
          const currentStep = getCurrentStep(order.TrangThai);
          const statusColor = getStatusColor(order.TrangThai);
          
          return (
            <div key={order.MaDonHang} className="order-card">
              <div className="steps-container">
                {steps.map((step, index) => {
                  const isActive = index <= currentStep;
                  const isCompleted = index < currentStep;
                  return (
                    <div key={index} className="step-item">
                      <div className={`step-icon ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                        {step.icon}
                      </div>
                      <span className={`step-title ${isActive ? 'active' : ''}`}>{step.title}</span>
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
                    <p className={`info-value status status-${statusColor}`}>
                      {order.TrangThai}
                    </p>
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
            Bạn chưa có đơn hàng nào
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderConfirmation
