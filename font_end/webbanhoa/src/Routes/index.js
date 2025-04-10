import LayoutDefault from "../Layout/LayoutDefault";
import NotFound from "../Layout/NotFound";
import Cart from "../Pages/Cart";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Paypay from "../Pages/Paypay";
import Product from "../Pages/Manage/Product";
import LayoutAdmin from "../components/LayoutAdmin";
import Custom from "../Pages/Manage/Custom";
import Nhacc from "../Pages/Manage/Nhacc";
import Dashboard from "../Pages/Manage/Dashboard";
import Orders from "../Pages/Manage/Order";
import Seo from "../Pages/Manage/Seo";
import Saff from "../Pages/Manage/Saff";


export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        path: "home",
        element: <Home/>,
      }, {
        path: "cart",
        element: <Cart/>,
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "register",
        element: <Register/>,
      },
      {
        path : "pay",
        element : <Paypay/>
      }
      
    ],
  },
  // Routes for admin
  {
    path: "/admin",
    element: <LayoutAdmin/>,
    children: [
      {
        path: "product",
        element: <Product />
      },{
        path : "custom",
        element : <Custom/>
      },
      {
        path : "nhacc",
        element : <Nhacc/>
      },
      {
        path : "dashboard",
        element : <Dashboard/>
      },
      {
        path : "order",
        element : <Orders/>
      },
      {
        path : "seo",
        element : <Seo/>
      },{
        path : "nhanvien",
        element : <Saff/>
      }
    ],
  },
  {
    path: "*",
    element: <NotFound/>
  },
];