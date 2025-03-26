import { Outlet } from "react-router-dom";
import Footer from "../Footers";
import Headers from "../Headers";


function LayoutDefault() {
  return (
    <>
      <header>
        <Headers/>
      </header>
      <main style={{ backgroundColor: "#FDDDEA" }}>
        {/* cho phép bạn xây dựng các layout có cấu trúc định tuyến lồng nhau,
         giúp quản lý và hiển thị các component 
        con một cách linh hoạt dựa trên cấu hình route của bạn. */}
        <Outlet />
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}
export default LayoutDefault;