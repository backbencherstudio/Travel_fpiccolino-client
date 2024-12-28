import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Tours from "../Pages/Tours/Tours";
import About from "../Pages/About/About";
import Blog from "../Pages/Blog/Blog";
import BlogDetails from "../Pages/Blog/BlogDetails";
import Contact from "../Pages/Contact/Contact";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import OtpScreen from "../Pages/Auth/OtpScreen";
import Flight from "../Pages/Flight/Flight";
import TourDetails from "../Pages/Tours/TourDetails";
import Insurance from "../Pages/Insurance/Insurance";
import Transfers from "../Pages/Transfers/Transfers";
import PersonalDetails from "../Pages/PersonalDetails/PersonalDetails";
import Faq from "../Pages/FAQ/FAQ";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardAnalysis from "../Components/Dashboard/Dashboard/DashboardAnalysis";
import TourAnalysis from "../Components/Dashboard/Tour/TourAnalysis";
import UserList from "../Components/Dashboard/Users/UserList";
import PaymentHistory from "../Components/Dashboard/Payment/PaymentHistory";
import UserDetails from "../Components/Dashboard/Users/UserDetails";
import Policy from "../Pages/Policy/Policy";
import BlogList from "../Components/Dashboard/blog/BlogList";
import UpdateBlog from "../Components/Dashboard/blog/UpdateBlog";
import PackageList from "../Components/Dashboard/Package/PackageList";
import CreatePackage from "../Components/Dashboard/Package/CreatePackage";
import CreateBlog from "../Components/Dashboard/Blog/CreateBlog";
import SignupOtp from "../Pages/Auth/SignupOtp";
import UserProfile from "../Pages/Profile/UserProfile";
import Header from "../Components/Dashboard/Header/Header";
import UpdatePackage from "../Components/Dashboard/Package/UpdatePackage";
import ContactsTable from "../Components/Dashboard/Contact/ContactsTable ";
import OrderList from "../Components/Dashboard/Orders/OrderList";
import AddCountry from "../Components/Dashboard/AddCountry/AddCountry";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/tours",
        element: <Tours />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/tours",
        element: <Tours />,
      },
      {
        path: "/faq",
        element: <Faq />,
      },
      {
        path: "/TourDetails/:id",
        element: <TourDetails />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
      },

      {
        path: "/policy",
        element: <Policy />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/profile/:id",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardAnalysis />,
      },
      {
        path: "tour-list",
        element: <TourAnalysis />,
      },
      {
        path: "user-list",
        element: <UserList />,
      },
      {
        path: "user-list/:id",
        element: <UserDetails />,
      },
      {
        path: "order-list",
        element: <OrderList />,
      },
      {
        path: "package",
        element: <PackageList />,
      },
      {
        path: "package/update/:id",
        element: <UpdatePackage />,
      },
      {
        path: "package/create/new",
        element: <CreatePackage />,
      },
      {
        path: "payment",
        element: <PaymentHistory />,
      },
      {
        path: "blog-list",
        element: <BlogList />,
      },
      {
        path: "blog-list/:id",
        element: <BlogDetails />,
      },
      {
        path: "blog-list/create/new",
        element: <CreateBlog />,
      },
      {
        path: "blog-list/update/:id",
        element: <UpdateBlog />,
      },
      {
        path: "header",
        element: <Header />,
      },
      {
        path: "contact",
        element: <ContactsTable />,
      },
      {
        path: "addCountry",
        element: <AddCountry />,
      },
    ],
  },
  {
    path: "/flight/:id",
    element: <Flight />,
  },
  {
    path: "/insurance/:id",
    element: <Insurance />,
  },
  {
    path: "/transfers/:id",
    element: <Transfers />,
  },
  {
    path: "/personalDetails",
    element: <PersonalDetails />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/otp",
    element: <OtpScreen />,
  },
  {
    path: "/signotp",
    element: <SignupOtp />,
  },
]);
