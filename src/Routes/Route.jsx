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
import SignupOtp from "../Pages/Auth/SignupOtp";
import UserProfile from "../Pages/Profile/UserProfile";
import Header from "../Components/Dashboard/Header/Header";
import UpdatePackage from "../Components/Dashboard/Package/UpdatePackage";
import ContactsTable from "../Components/Dashboard/Contact/ContactsTable ";
import OrderList from "../Components/Dashboard/Orders/OrderList";
import AddCountry from "../Components/Dashboard/AddCountry/AddCountry";
import AddContent from "../Components/Dashboard/AddContent/AddContent";
import Checkout from "../Pages/checkout/Checkout";
import UploadShorts from "../Components/Dashboard/uploadShorts/UploadShorts";
import CreateBlog from "../Components/Dashboard/blog/CreateBlog";
import { ProtectedAdminRoute, ProtectedRoute } from "./RouteProtection";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element:  <Home /> },
      { path: "tours", element:  <Tours /> },
      { path: "about", element: <About /> },
      { path: "faq", element: <Faq /> },
      { path: "tours/:id", element: <TourDetails /> },
      { path: "tours/country/:id", element: <Tours /> },
      { path: "blog", element: <Blog /> },
      { path: "blog/:id", element: <BlogDetails /> },
      { path: "policy", element: <Policy /> },
      { path: "contact", element: <Contact /> },
      { path: "profile/:id", element:  <UserProfile /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedAdminRoute>
        <DashboardLayout />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedAdminRoute>
            <DashboardAnalysis />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "tour-list",
        element: (
          <ProtectedAdminRoute>
            <TourAnalysis />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "user-list",
        element: (
          <ProtectedAdminRoute>
            <UserList />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "user-list/:id",
        element: (
          <ProtectedAdminRoute>
            <UserDetails />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "order-list",
        element: (
          <ProtectedAdminRoute>
            <OrderList />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "package",
        element: (
          <ProtectedAdminRoute>
            <PackageList />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "package/update/:id",
        element: (
          <ProtectedAdminRoute>
            <UpdatePackage />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "package/create/new",
        element: (
          <ProtectedAdminRoute>
            <CreatePackage />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <ProtectedAdminRoute>
            <PaymentHistory />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "blog-list",
        element: (
          <ProtectedAdminRoute>
            <BlogList />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "blog-list/:id",
        element: <ProtectedAdminRoute></ProtectedAdminRoute>,
      },
      {
        path: "blog-list/create/new",
        element: (
          <ProtectedAdminRoute>
            <CreateBlog />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "blog-list/update/:id",
        element: (
          <ProtectedAdminRoute>
            <UpdateBlog />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "header",
        element: (
          <ProtectedAdminRoute>
            <Header />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "contact",
        element: (
          <ProtectedAdminRoute>
            <ContactsTable />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "addCountry",
        element: (
          <ProtectedAdminRoute>
            <AddCountry />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "addContent",
        element: (
          <ProtectedAdminRoute>
            <AddContent />
          </ProtectedAdminRoute>
        ),
      },
      {
        path: "uploadShorts",
        element: (
          <ProtectedAdminRoute>
            <UploadShorts />
          </ProtectedAdminRoute>
        ),
      },
    ],
  },
  { path: "/checkout", element: <Checkout /> },
  { path: "/flight/:id", element: <Flight /> },
  { path: "/insurance/:id", element: <Insurance /> },
  { path: "/transfers/:id", element: <Transfers /> },
  { path: "/personalDetails", element: <PersonalDetails /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/otp", element: <OtpScreen /> },
  { path: "/signotp", element: <SignupOtp /> },
  // { path: "*", element: <NotFound /> },
]);
