import { Outlet } from "react-router-dom";
import React from 'react'
import Admin from "../../Layout/Admin";

const LayoutAdmin = () => {
  return (
    <div>
      <>
      <header>
        <Admin/>
      </header>
      <div className="main-admin">
        {/* cho phép bạn xây dựng các layout có cấu trúc định tuyến lồng nhau,
         giúp quản lý và hiển thị các component 
        con một cách linh hoạt dựa trên cấu hình route của bạn. */}
        <Outlet  />
      </div>
      <footer>
      </footer>
    </>
    </div>
  )
}

export default LayoutAdmin
