import {
    createBrowserRouter,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home/Home";
import Tours from "../Pages/Tours/Tours";
import About from "../Pages/About/About";
import TureDetails from "../Pages/Tours/TureDetails";
import Blog from "../Pages/Blog/Blog";
import BlogDetails from "../Pages/Blog/BlogDetails";
import Contact from "../Pages/Contact/Contact";
import Login from "../Pages/Auth/Login";
import SignUp from "../Pages/Auth/SignUp";
import ForgotPassword from "../Pages/Auth/ForgotPassword";
import OtpScreen from "../Pages/Auth/OtpScreen";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/tours',
                element: <Tours />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/tours',
                element: <Tours />
            },
            {
                path: '/TureDetails/:id',
                element: <TureDetails />
            },
            {
                path: '/blog',
                element: <Blog />
            },
            {
                path: '/blog/:id',
                element: <BlogDetails />
            },
            {
                path: '/contact',
                element: <Contact />
            },
        ]
    },
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/signup',
        element: <SignUp/>
    },
    {
        path:'/forgot-password',
        element: <ForgotPassword/>
    },
    {
        path:'/otp',
        element: <OtpScreen/>
    },
]);