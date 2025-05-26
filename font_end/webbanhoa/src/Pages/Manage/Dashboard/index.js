import React, { useEffect, useRef, useState } from 'react';
import './dashboard.css';
import { Chart, registerables } from "chart.js";
import api from '../../../services/api.js';

Chart.register(...registerables);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [tongSoLuong, setTongSoLuong] = useState(0);
  const [tongDoanhThu, setTongDoanhThu] = useState(0);
  const [revenueData, setRevenueData] = useState([]);

  const chartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    // Fetch top selling products
    api.get('/api/donhang/top-sanphamban-chay', { params: { soluong: 5 } })
      .then((response) => {
        if (!response.data.success) {
          throw new Error(response.data.message || 'Lỗi khi lấy dữ liệu');
        }
        
        const data = response.data.data;
        setData(data);

        if (Array.isArray(data)) {
          const totalSoLuong = data.reduce((sum, item) => sum + (parseInt(item.TongSoLuongBan) || 0), 0);
          const totalDoanhThu = data.reduce((sum, item) => sum + (parseFloat(item.TongDoanhThu) || 0), 0);

          setTongSoLuong(totalSoLuong);
          setTongDoanhThu(totalDoanhThu);

          const labels = data.map(item => item.TenHoa);
          const values = data.map(item => item.TongSoLuongBan);

          // Bar Chart
          const canvas = document.getElementById("myChart");
          if (canvas) {
            const ctx = canvas.getContext("2d");
            if (chartRef.current) {
              chartRef.current.destroy();
            }

            chartRef.current = new Chart(ctx, {
              type: "bar",
              data: {
                labels: labels,
                datasets: [{
                  label: "Số lượng bán",
                  data: values,
                  backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(153, 102, 255, 0.6)"
                  ],
                  borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(153, 102, 255, 1)"
                  ],
                  borderWidth: 1
                }]
              },
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top'
                  },
                  title: {
                    display: true,
                    text: 'Top sản phẩm bán chạy'
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }
            });
          }
        }
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm bán chạy:', error);
      });

    // Fetch revenue trend data
    api.get('/api/donhang/doanh-thu-theo-thang')
      .then((response) => {
        const revenueData = response.data;
        setRevenueData(revenueData);

        // Line Chart for Revenue Trend
        const lineCanvas = document.getElementById("revenueChart");
        if (lineCanvas) {
          const ctx = lineCanvas.getContext("2d");
          if (lineChartRef.current) {
            lineChartRef.current.destroy();
          }

          lineChartRef.current = new Chart(ctx, {
            type: "line",
            data: {
              labels: revenueData.map(item => `Tháng ${item.Thang}`),
              datasets: [{
                label: "Doanh thu",
                data: revenueData.map(item => item.TongDoanhThu),
                fill: true,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.4,
                pointBackgroundColor: "rgba(75, 192, 192, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(75, 192, 192, 1)"
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'top'
                },
                title: {
                  display: true,
                  text: 'Xu hướng doanh thu theo tháng'
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function(value) {
                      return new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                      }).format(value);
                    }
                  }
                }
              }
            }
          });
        }
      })
      .catch((error) => {
        console.error('Lỗi khi lấy dữ liệu doanh thu:', error);
      });
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div>
      <div style={{ marginTop: 58 }}>
        <div className="container pt-4">
          {/* Charts */}
          <section className="mb-4">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header py-3">
                    <h5 className="mb-0 text-center">
                      <strong>Top sản phẩm bán chạy</strong>
                    </h5>
                  </div>
                  <div className="card-body">
                    <canvas className="my-4 w-100" id="myChart" height={380} />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header py-3">
                    <h5 className="mb-0 text-center">
                      <strong>Xu hướng doanh thu</strong>
                    </h5>
                  </div>
                  <div className="card-body">
                    <canvas className="my-4 w-100" id="revenueChart" height={380} />
                  </div>
                </div>
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
                        <h2 className="h1 mb-0">{tongSoLuong.toLocaleString('vi-VN')}</h2>
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
                        <h2 className="h1 mb-0" style={{ fontSize: '1.5rem', whiteSpace: 'nowrap' }}>
                          {formatCurrency(tongDoanhThu)}
                        </h2>
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
