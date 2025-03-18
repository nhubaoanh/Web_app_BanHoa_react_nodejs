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
      }
    ],
  },
  {
    path: "*",
    element: <NotFound/>
  },
];