import LayoutDefault from "../components/layoutDefault";
import Cart from "../pages/cart";
import Home from "../pages/home";
import ProductsSection from "../pages/ProductsSection";
import SearchProduct from "../pages/searchProduct";
import SingleProduct from "../pages/singleProduct";
import About from "../pages/about";
import Policy from "../pages/policy";
import Payment from "../pages/payment";
import Login from "../pages/login";
import Register from "../pages/register";
import Profile from "../pages/profile";
import PrivateRoute from "../components/privateRoute";
import UserPurchase from "../pages/userPurchase";
import PreviewAPayment from "../pages/previewAPayment";
import LayoutAdmin from "../components/layoutAdmin";
import LoginAdmin from "../pages/loginAdmin";
import PrivateAdmin from "../components/privateAdmin";
import Inventory from "../pages/inventory";
import AddProduct from "../pages/addProduct";
import DashBoard from "../pages/dashBoard";
import AdminInfo from "../pages/adminInfo";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "productsSection/:cate",
        element: <ProductsSection />,
      },
      {
        path: "searchProduct/:q",
        element: <SearchProduct />,
      },
      {
        path: "singleProduct/:id",
        element: <SingleProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "policy",
        element: <Policy />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "userPurchase",
        element: <UserPurchase />,
      },
      {
        path: "previewAPayment/:id",
        element: <PreviewAPayment />,
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "payment",
            element: <Payment />,
          },
        ],
      },
    ],
  },
  {
    element: <PrivateAdmin />,
    children: [
      {
        element: <LayoutAdmin />,
        children: [
          {
            path: "admin",
            element: <DashBoard />,
          },
          {
            path: "inventory",
            element: <Inventory />,
          },
          {
            path: "adminInfo",
            element: <AdminInfo/>,
          },
          {
            path: "addProduct",
            element: <AddProduct />,
          },
          {
            path: "admin/singleProduct/:id",
            element: <SingleProduct />,
          },
          {
            path: "admin/userPurchase",
            element: <UserPurchase />,
          },
          {
            path: "admin/previewAPayment/:id",
            element: <PreviewAPayment />,
          },
        ],
      },
    ],
  },
  {
    path: "/loginAdmin",
    element: <LoginAdmin />,
  },
];
