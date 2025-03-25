import React, {useEffect} from 'react'
import './dashboard.js';
import './dashboard.css';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables); // ✅ Đăng ký tất cả các thành phần cần thiết

const Dashboard = () => {
  useEffect(() => {
    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, {
      type: 'line', // Loại biểu đồ (line, bar, pie, etc.)
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Sales',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Sales Chart'
          }
        }
      }
    });
  }, []);
  return (
    <div>
      <div style={{ marginTop: 58 }}>
        <div className="container pt-4">
          {/* Section: Main chart */}
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
          {/* Section: Main chart */}
          {/*Section: Sales Performance KPIs*/}
          {/*Section: Minimal statistics cards*/}
          <section>
            <div className="row">
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div className="align-self-center">
                        <i className="fas fa-pencil-alt text-info fa-3x" />
                      </div>
                      <div className="text-end">
                        <h3>278</h3>
                        <p className="mb-0">New Posts</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div className="align-self-center">
                        <i className="far fa-comment-alt text-warning fa-3x" />
                      </div>
                      <div className="text-end">
                        <h3>156</h3>
                        <p className="mb-0">New Comments</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div className="align-self-center">
                        <i className="fas fa-chart-line text-success fa-3x" />
                      </div>
                      <div className="text-end">
                        <h3>64.89 %</h3>
                        <p className="mb-0">Bounce Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div className="align-self-center">
                        <i className="fas fa-map-marker-alt text-danger fa-3x" />
                      </div>
                      <div className="text-end">
                        <h3>423</h3>
                        <p className="mb-0">Total Visits</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div>
                        <h3 className="text-danger">278</h3>
                        <p className="mb-0">New Projects</p>
                      </div>
                      <div className="align-self-center">
                        <i className="fas fa-rocket text-danger fa-3x" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div>
                        <h3 className="text-success">156</h3>
                        <p className="mb-0">New Clients</p>
                      </div>
                      <div className="align-self-center">
                        <i className="far fa-user text-success fa-3x" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div>
                        <h3 className="text-warning">64.89 %</h3>
                        <p className="mb-0">Conversion Rate</p>
                      </div>
                      <div className="align-self-center">
                        <i className="fas fa-chart-pie text-warning fa-3x" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div>
                        <h3 className="text-info">423</h3>
                        <p className="mb-0">Support Tickets</p>
                      </div>
                      <div className="align-self-center">
                        <i className="far fa-life-ring text-info fa-3x" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div>
                        <h3 className="text-info">278</h3>
                        <p className="mb-0">New Posts</p>
                      </div>
                      <div className="align-self-center">
                        <i className="fas fa-book-open text-info fa-3x" />
                      </div>
                    </div>
                    <div className="px-md-1">
                      <div
                        className="progress mt-3 mb-1 rounded"
                        style={{ height: 7 }}
                      >
                        <div
                          className="progress-bar bg-info"
                          role="progressbar"
                          style={{ width: "80%" }}
                          aria-valuenow={80}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div>
                        <h3 className="text-warning">156</h3>
                        <p className="mb-0">New Comments</p>
                      </div>
                      <div className="align-self-center">
                        <i className="far fa-comments text-warning fa-3x" />
                      </div>
                    </div>
                    <div className="px-md-1">
                      <div
                        className="progress mt-3 mb-1 rounded"
                        style={{ height: 7 }}
                      >
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: "35%" }}
                          aria-valuenow={35}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div>
                        <h3 className="text-success">64.89 %</h3>
                        <p className="mb-0">Bounce Rate</p>
                      </div>
                      <div className="align-self-center">
                        <i className="fas fa-mug-hot text-success fa-3x" />
                      </div>
                    </div>
                    <div className="px-md-1">
                      <div
                        className="progress mt-3 mb-1 rounded"
                        style={{ height: 7 }}
                      >
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: "60%" }}
                          aria-valuenow={60}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between px-md-1">
                      <div>
                        <h3 className="text-danger">423</h3>
                        <p className="mb-0">Total Visits</p>
                      </div>
                      <div className="align-self-center">
                        <i className="fas fa-map-signs text-danger fa-3x" />
                      </div>
                    </div>
                    <div className="px-md-1">
                      <div
                        className="progress mt-3 mb-1 rounded"
                        style={{ height: 7 }}
                      >
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: "40%" }}
                          aria-valuenow={40}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*Section: Minimal statistics cards*/}
          {/*Section: Statistics with subtitles*/}
          <section>
            <div className="row">
              <div className="col-xl-6 col-md-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between p-md-1">
                      <div className="d-flex flex-row">
                        <div className="align-self-center">
                          <i className="fas fa-pencil-alt text-info fa-3x me-4" />
                        </div>
                        <div>
                          <h4>Total Posts</h4>
                          <p className="mb-0">Monthly blog posts</p>
                        </div>
                      </div>
                      <div className="align-self-center">
                        <h2 className="h1 mb-0">18,000</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between p-md-1">
                      <div className="d-flex flex-row">
                        <div className="align-self-center">
                          <i className="far fa-comment-alt text-warning fa-3x me-4" />
                        </div>
                        <div>
                          <h4>Total Comments</h4>
                          <p className="mb-0">Monthly blog posts</p>
                        </div>
                      </div>
                      <div className="align-self-center">
                        <h2 className="h1 mb-0">84,695</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-md-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between p-md-1">
                      <div className="d-flex flex-row">
                        <div className="align-self-center">
                          <h2 className="h1 mb-0 me-4">$76,456.00</h2>
                        </div>
                        <div>
                          <h4>Total Sales</h4>
                          <p className="mb-0">Monthly Sales Amount</p>
                        </div>
                      </div>
                      <div className="align-self-center">
                        <i className="far fa-heart text-danger fa-3x" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-md-12 mb-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between p-md-1">
                      <div className="d-flex flex-row">
                        <div className="align-self-center">
                          <h2 className="h1 mb-0 me-4">$36,000.00</h2>
                        </div>
                        <div>
                          <h4>Total Cost</h4>
                          <p className="mb-0">Monthly Cost</p>
                        </div>
                      </div>
                      <div className="align-self-center">
                        <i className="fas fa-wallet text-success fa-3x" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/*Section: Statistics with subtitles*/}
        </div>
      </div>
  {/*Main layout*/}
    </div>
  )
}

export default Dashboard
