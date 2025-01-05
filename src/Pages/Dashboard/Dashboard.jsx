import { useState, useEffect } from "react";
import { FaRegBell, FaRegUser } from "react-icons/fa";
import { IoClose, IoGolfOutline, IoMenu } from "react-icons/io5";
import { LuClipboardList, LuLayoutDashboard } from "react-icons/lu";
import { PiTrolleySuitcase } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import image from "../../assets/image1.jpg";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { IoMdContacts } from "react-icons/io";

import { BiBookContent } from "react-icons/bi";
import { TiWorldOutline } from "react-icons/ti";
import { TbArrowAutofitContent } from "react-icons/tb";
import { FiYoutube } from "react-icons/fi";
import { useSelector } from "react-redux";
const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("tab") || "Dashboard"
  );
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const { user, appLoading, isAuthenticated } = useSelector(
    (state) => state.authorization
  );
  console.log(user);

  useEffect(() => {
    localStorage.setItem("tab", selectedTab);
  }, [selectedTab]);

  useEffect(() => {
    if (isSidebarOpen) {
      const timer = setTimeout(() => setShowCloseIcon(true), 150); // Delay for close icon
      return () => clearTimeout(timer);
    } else {
      setShowCloseIcon(false);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    // Close the sidebar when location changes (i.e., when navigating)
    setSidebarOpen(false);
  }, [location]);

  const handleNavigation = (tab, path) => {
    setSelectedTab(tab);
    navigate(path);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="lg:flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:relative w-[280px] bg-white border p-5 z-50 h-screen`}
      >
        <h1 className="text-2xl font-bold mb-5">Admin</h1>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => handleNavigation("Dashboard", "")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Dashboard"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <LuLayoutDashboard />
            <span>Dashboard</span>
          </button>
          {/* <button
            onClick={() => handleNavigation("Tour", "tour-list")}
            className={`flex items-center space-x-2 p-2 rounded ${selectedTab === "Tour"
              ? "bg-[#fdf0ea] primary_text font-semibold"
              : "hover:bg-zinc-300"
              }`}
          >
            <IoGolfOutline />
            <span>Tour</span>
          </button> */}
          <button
            onClick={() => handleNavigation("Users", "user-list")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Users"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <FaRegUser />
            <span>Users</span>
          </button>
          <button
            onClick={() => handleNavigation("Orders", "order-list")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Orders"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <LuClipboardList />
            <span>Orders</span>
          </button>

          <button
            onClick={() => handleNavigation("Package", "package")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Package"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <PiTrolleySuitcase />
            <span>Package</span>
          </button>
          <button
            onClick={() => handleNavigation("Payment", "payment")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Payment"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <MdOutlinePayment />
            <span>Payment History</span>
          </button>

          <button
            onClick={() => handleNavigation("Blog", "blog-list")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Blog"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <GrArticle />
            <span>Blog</span>
          </button>
          <button
            onClick={() => handleNavigation("contact", "contact")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "contact"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <IoMdContacts />
            <span>Contacts</span>
          </button>
          <button
            onClick={() => handleNavigation("AddCountry", "addCountry")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "AddCountry"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <TiWorldOutline className="text-[20px]" />
            <span>Add Country</span>
          </button>
          <button
            onClick={() => handleNavigation("Header", "header")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Header"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <BiBookContent />
            <span>Banners</span>
          </button>

          <button
            onClick={() => handleNavigation("AddContent", "addContent")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "AddContent"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <TbArrowAutofitContent />
            <span>Add Content</span>
          </button>
          <button
            onClick={() => handleNavigation("uploadShorts", "uploadShorts")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "uploadShorts"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <FiYoutube />
            <span>Upload Shorts</span>
          </button>
        </nav>
        <button
          onClick={() => handleLogOut()}
          className="absolute bottom-3 flex gap-3 text-[16px] hover:bg-[#fdf0ea] hover:text-[#ec6931] p-2 px-5 rounded-md text-[#72777F]"
        >
          <CiLogout className="mt-1" /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto h-screen">
        <header className="flex items-center justify-between bg-zinc-50 p-4 shadow-md">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-2xl text-orange-500"
          >
            {isSidebarOpen && showCloseIcon ? (
              <IoClose className="absolute top-7 left-60 z-50 transition-all ease-linear hover:bg-[#fdf0ea] rounded-full" />
            ) : (
              <IoMenu />
            )}
          </button>
          <div></div>
          <div className="flex">
            {/* <div className=" border mr-5 rounded-full h-10 w-10 flex justify-center items-center text-gray-400 cursor-pointer">
              <FaRegBell />
            </div> */}

            <div
              onClick={() => navigate(`user-list/${user?._id}`)}
              className="flex cursor-pointer"
            >
              <div className=" border border-orange-500 mr-2 rounded-full h-10 w-10 flex justify-center items-center text-gray-400 cursor-pointer">
                {user?.image_url ? (
                  <img
                    src={user.image_url}
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <FaRegUser className="primary_text" />
                )}
              </div>
              <div>
                <h1 className="font-semibold text-[18px]">
                  {user?.name ? user.name : "Admin"}
                </h1>
                <p className="text-[12px] text-[#72777F]">
                  {user?.name && "Admin"}
                </p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          <div className="p-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
