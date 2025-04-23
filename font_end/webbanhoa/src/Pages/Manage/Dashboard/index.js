import React, { useEffect, useRef, useState } from 'react';
import './dashboard.css';
import { Chart, registerables } from "chart.js";
import api from '../../../services/api.js';

Chart.register(...registerables);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [tongSoLuong, setTongSoLuong] = useState(0);
  const [tongDoanhThu, setTongDoanhThu] = useState(0);

  const chartRef = useRef(null);

  useEffect(() => {
    api.get('/api/donhang/top-sanphamban-chay', { params: { soluong: 5 } })
      .then((response) => {
        const data = response.data;
        setData(data);

        console.log('Dữ liệu sản phẩm bán chạy:', data);

        if (Array.isArray(data)) {
          // Tính tổng số lượng và doanh thu
          const totalSoLuong = data.reduce((sum, item) => sum + item.TongSoLuongBan, 0);
          const totalDoanhThu = data.reduce((sum, item) => sum + item.TongDoanhThu,0);

          setTongSoLuong(totalSoLuong);
          setTongDoanhThu(totalDoanhThu);

          const labels = data.map(item => item.TenSanPham);
          const values = data.map(item => item.SoLuongBan);

          const canvas = document.getElementById("myChart");
          if (!canvas) {
            console.error("Không tìm thấy canvas!");
            return;
          }
          const ctx = canvas.getContext("2d");
          
          if (chartRef.current) {
            chartRef.current.destroy();
          }

          chartRef.current = new Chart(ctx, {
            type: "bar", // ➤ Chuyển sang bar chart
            data: {
              labels: labels, // Tên sản phẩm
              datasets: [{
                label: "Số lượng bán",
                data: values, // Số lượng bán
                backgroundColor: [
                  "rgba(75, 192, 192, 0.6)", // Màu cột
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)",
                  "rgba(255, 206, 86, 0.6)",
                  "rgba(153, 102, 255, 0.6)"
                ],
                borderColor: [
                  "rgba(75, 192, 192, 1)", // Màu viền
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(153, 102, 255, 1)"
                ],
                borderWidth: 1 // Độ dày viền
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top' // Vị trí của chú thích
                },
                title: {
                  display: true,
                  text: 'Top sản phẩm bán chạy (dạng cột)' // Tiêu đề biểu đồ
                }
              },
              scales: {
                y: {
                  beginAtZero: true // Bắt đầu từ 0 trên trục Y
                }
              }
            }
          });
          
        } else {
          console.error('Dữ liệu không phải là mảng:', data);
        }
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm bán chạy:', error);
      });

  }, []);

  return (
    <div>
      <div style={{ marginTop: 58 }}>
        <div className="container pt-4">
          {/* Chart */}
          <section className="mb-4">
            <div className="card">
              <div className="card-header py-3">
                <h5 className="mb-0 text-center">
                  <strong>Sales</strong>
                </h5>
              </div>
              <div className="card-body">
                <canvas className="my-4 w-100" id="myChart" height={380} />
              </div>
            </div>
          </section>

          {/* Statistics */}
          <section>
            <div className="row">
              <div className="col-xl-4 col-md-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between p-md-1">
                      <div className="d-flex flex-row">
                        <div className="align-self-center">
                          <i className="fas fa-box text-primary fa-3x me-4" />
                        </div>
                        <div>
                          <h4>Tổng sản phẩm bán chạy</h4>
                          <p className="mb-0">Số lượng sản phẩm trong top</p>
                        </div>
                      </div>
                      <div className="align-self-center">
                        <h2 className="h1 mb-0">{data.length}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-md-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between p-md-1">
                      <div className="d-flex flex-row">
                        <div className="align-self-center">
                          <i className="fas fa-shopping-cart text-success fa-3x me-4" />
                        </div>
                        <div>
                          <h4>Tổng số lượng bán</h4>
                          <p className="mb-0">Tổng sản phẩm đã bán</p>
                        </div>
                      </div>
                      <div className="align-self-center">
                        <h2 className="h1 mb-0">{tongSoLuong}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-md-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between p-md-1">
                      <div className="d-flex flex-row">
                        <div className="align-self-center">
                          <i className="fas fa-coins text-warning fa-3x me-4" />
                        </div>
                        <div>
                          <h4>Tổng doanh thu</h4>
                          <p className="mb-0">Tổng tiền thu được</p>
                        </div>
                      </div>
                      <div className="align-self-center">
                        <h2 className="h1 mb-0">{tongDoanhThu.toLocaleString('vi-VN')} ₫</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
