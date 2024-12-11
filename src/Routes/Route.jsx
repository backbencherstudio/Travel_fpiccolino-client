import {
    createBrowserRouter,
} from "react-router-dom";
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
import Dashboard from "../Pages/Dashboard/Dashboard";
import Flight from "../Pages/Flight/Flight";
import TourDetails from "../Pages/Tours/TourDetails";
import Insurance from "../Pages/Insurance/Insurance";
import Transfers from "../Pages/Transfers/Transfers";
import PersonalDetails from "../Pages/PersonalDetails/PersonalDetails";
import Faq from "../Pages/FAQ/FAQ";

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
                path: '/faq',
                element: <Faq />
            },
            {
                path: '/TourDetails/:id',
                element: <TourDetails />
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
            }

        ]
    },
    {
        path: '/flight/:id',
        element: <Flight />
    },
    {
        path: '/insurance/:id',
        element: <Insurance />
    },
    {
        path: '/transfers/:id',
        element: <Transfers />
    },
    {
        path: '/personalDetails',
        element: <PersonalDetails />
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
    {
        path:'/dashboard',
        element:<Dashboard/>
    }
]);