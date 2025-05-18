const Footer = () => {
    return (
      <div>
        <>
          <footer className="text-white text-center text-lg-start" style={{ backgroundColor: "#F098BE" }}>
            {/* Grid container */}
            <div className="p-4">
              {/*Grid row*/}
              <div className="row mt-4">
                {/*Grid column*/}
                <div className="col-lg-4 col-md-12 mb-4 mb-md-0">
                  <h5 className="text-uppercase mb-4">Tổng quan</h5>
                  <p>
                      Đây là trang web bán hoa của kiwi shop, nơi cung cấp các sản phẩm hoa tươi chất lượng cao và dịch vụ giao hàng nhanh chóng. Chúng tôi cam kết mang đến cho khách hàng những trải nghiệm tốt nhất với các sản phẩm hoa đa dạng và dịch vụ tận tâm.
                  </p>
                  <p>
                    Công ty : Kiwi shop <br />
                    Địa chỉ : 123 Nguyen Van Cu, Long Bien, Ha Noi <br />
                  </p>
                  <div className="mt-4">
                    {/* Facebook */}
                    <a type="button" className="btn btn-floating btn-warning btn-lg">
                      <i className="fab fa-facebook-f" />
                    </a>
                    {/* Dribbble */}
                    <a type="button" className="btn btn-floating btn-warning btn-lg">
                      <i className="fab fa-dribbble" />
                    </a>
                    {/* Twitter */}
                    <a type="button" className="btn btn-floating btn-warning btn-lg">
                      <i className="fab fa-twitter" />
                    </a>
                    {/* Google + */}
                    <a type="button" className="btn btn-floating btn-warning btn-lg">
                      <i className="fab fa-google-plus-g" />
                    </a>
                    {/* Linkedin */}
                  </div>
                </div>
                {/*Grid column*/}
                {/*Grid column*/}
                <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase mb-4 pb-1">Tìm kiếm bất kì thông tin nào </h5>
                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="formControlLg"
                      className="form-control form-control-lg"
                    />
                    <label
                      className="form-label"
                      htmlFor="formControlLg"
                      style={{ marginLeft: 0 }}
                    >
                      Search
                    </label>
                    <div className="form-notch">
                      <div className="form-notch-leading" style={{ width: 9 }} />
                      <div
                        className="form-notch-middle"
                        style={{ width: "48.8px" }}
                      />
                      <div className="form-notch-trailing" />
                    </div>
                  </div>
                  <ul className="fa-ul" style={{ marginLeft: "1.65em" }}>
                    <li className="mb-3">
                      <span className="fa-li">
                        <i className="fas fa-home" />
                      </span>
                      <span className="ms-2">Thanh tùng, thanh miện, hải dương - vn</span>
                    </li>
                    <li className="mb-3">
                      <span className="fa-li">
                        <i className="fas fa-envelope" />
                      </span>
                      <span className="ms-2">kiwishop2004.com</span>
                    </li>
                    <li className="mb-3">
                      <span className="fa-li">
                        <i className="fas fa-phone" />
                      </span>
                      <span className="ms-2">+ 84 985848254</span>
                    </li>
                    <li className="mb-3">
                      <span className="fa-li">
                        <i className="fas fa-print" />
                      </span>
                      <span className="ms-2">+ 84 966469703</span>
                    </li>
                  </ul>
                </div>
                {/*Grid column*/}
                {/*Grid column*/}
                <div className="col-lg-4 col-md-6 mb-4 mb-md-0">
                  <h5 className="text-uppercase mb-4">Mở cửa</h5>
                  <table className="table text-center text-white">
                    <tbody className="font-weight-normal">
                      <tr>
                        <td>Mon - Thu:</td>
                        <td>8am - 9pm</td>
                      </tr>
                      <tr>
                        <td>Fri - Sat:</td>
                        <td>8am - 1am</td>
                      </tr>
                      <tr>
                        <td>Sunday:</td>
                        <td>9am - 10pm</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/*Grid column*/}
              </div>
              {/*Grid row*/}
            </div>
            {/* Grid container */}
            {/* Copyright */}
            <div
              className="text-center p-3"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
              © 2025 kiwi shop :
              <a className="text-white" href="https://mdbootstrap.com/">
                nhubaoanh111@gmail.com
              </a>
            </div>
            {/* Copyright */}
          </footer>
        </>
      </div>
    );
  };
  
  export default Footer;