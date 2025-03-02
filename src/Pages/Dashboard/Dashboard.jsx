import { useState, useEffect } from "react";
import { FaHome, FaPlusSquare, FaQuora, FaRegUser } from "react-icons/fa";
import { IoClose, IoMenu } from "react-icons/io5";
import { LuClipboardList, LuLayoutDashboard } from "react-icons/lu";
import { PiTrolleySuitcase } from "react-icons/pi";
import { GrArticle } from "react-icons/gr";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { IoMdContacts } from "react-icons/io";

import { BiBookContent } from "react-icons/bi";
import { TiWorldOutline } from "react-icons/ti";
import { FiYoutube } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../features/auth/authSlice";
import { RiLayoutBottom2Line, RiNewsLine } from "react-icons/ri";
import { QuestionMark, Settings } from "@mui/icons-material";
import { MdOutlinePolicy } from "react-icons/md";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("tab") || "Dashboard"
  );
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const { user } = useSelector((state) => state.authorization);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);

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
    dispatch(logOut());
    navigate("/login");
  };

  return (
    <div className="lg:flex h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:relative w-[280px] bg-white border p-5 z-50 h-screen flex flex-col`}
      >
        <h1 className="text-2xl font-bold mb-5">Admin</h1>
        <nav className="flex flex-col gap-4 flex-grow overflow-y-auto mb-16">
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
          <div>
            <button
              onClick={() => setIsContactsOpen(!isContactsOpen)}
              className={`flex items-center justify-between space-x-2 p-2 rounded w-full ${
                selectedTab === "contact" || selectedTab === "newsLetter"
                  ? "bg-[#fdf0ea] primary_text font-semibold"
                  : "hover:bg-zinc-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <IoMdContacts />
                <span>Contacts</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  isContactsOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`ml-4 flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
                isContactsOpen
                  ? "max-h-[500px] opacity-100 mt-1"
                  : "max-h-0 opacity-0"
              }`}
            >
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
                onClick={() => handleNavigation("newsLetter", "newsLetter")}
                className={`flex items-center space-x-2 p-2 rounded ${
                  selectedTab === "newsLetter"
                    ? "bg-[#fdf0ea] primary_text font-semibold"
                    : "hover:bg-zinc-300"
                }`}
              >
                <RiNewsLine />
                <span>News Letters</span>
              </button>
            </div>
          </div>

          <button
            onClick={() => handleNavigation("country", "country")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "country"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <TiWorldOutline className="text-[20px]" />
            <span>Countries</span>
          </button>
          <div>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className={`flex items-center justify-between space-x-2 p-2 rounded w-full ${
                selectedTab === "uploadShorts" ||
                selectedTab === "updateFooter" ||
                selectedTab === "updateApproach" ||
                selectedTab === "Header" ||
                selectedTab === "updateFAQ" ||
                selectedTab === "updateWhyUs" ||
                selectedTab === "updatePolicy" ||
                selectedTab === "AddContent"
                  ? "bg-[#fdf0ea] primary_text font-semibold"
                  : "hover:bg-zinc-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Settings sx={{ fontSize: "20px" }} />
                <span>Settings</span>
              </div>
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${
                  isSettingsOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Settings Dropdown with smooth transition */}
            <div
              className={`ml-4 flex flex-col gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
                isSettingsOpen
                  ? "max-h-[500px] opacity-100 mt-1"
                  : "max-h-0 opacity-0"
              }`}
            >
              <button
                onClick={() =>
                  handleNavigation("updateBanners", "updateBanners")
                }
                className={`flex items-center space-x-2 p-2 rounded ${
                  selectedTab === "updateBanners"
                    ? "bg-[#fdf0ea] primary_text font-semibold"
                    : "hover:bg-zinc-300"
                }`}
              >
                <BiBookContent />
                <span>Banners</span>
              </button>

              {/* <button
                onClick={() => handleNavigation("AddContent", "addContent")}
                className={`flex items-center space-x-2 p-2 rounded ${
                  selectedTab === "AddContent"
                    ? "bg-[#fdf0ea] primary_text font-semibold"
                    : "hover:bg-zinc-300"
                }`}
              >
                <TbArrowAutofitContent />
                <span>Section Title</span>
              </button> */}

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

              <button
                onClick={() => handleNavigation("updateFooter", "updateFooter")}
                className={`flex items-center space-x-2 p-2 rounded ${
                  selectedTab === "updateFooter"
                    ? "bg-[#fdf0ea] primary_text font-semibold"
                    : "hover:bg-zinc-300"
                }`}
              >
                <RiLayoutBottom2Line />
                <span>Update Footer</span>
              </button>

              <button
                onClick={() =>
                  handleNavigation("updateApproach", "updateApproach")
                }
                className={`flex items-center space-x-2 p-2 rounded ${
                  selectedTab === "updateApproach"
                    ? "bg-[#fdf0ea] primary_text font-semibold"
                    : "hover:bg-zinc-300"
                }`}
              >
                <FaPlusSquare />
                <span>Update Approach</span>
              </button>
              <button
                onClick={() => handleNavigation("updateWhyUs", "updateWhyUs")}
                className={`flex items-center space-x-2 p-2 rounded ${
                  selectedTab === "updateWhyUs"
                    ? "bg-[#fdf0ea] primary_text font-semibold"
                    : "hover:bg-zinc-300"
                }`}
              >
                <QuestionMark sx={{ fontSize: "18px" }} />
                <span>Update Why Us</span>
              </button>
              <button
                onClick={() => handleNavigation("updateFAQ", "updateFAQ")}
                className={`flex items-center space-x-2 p-2 rounded ${
                  selectedTab === "updateFAQ"
                    ? "bg-[#fdf0ea] primary_text font-semibold"
                    : "hover:bg-zinc-300"
                }`}
              >
                <FaQuora />
                <span>Update FAQ</span>
              </button>
              <button
                onClick={() => handleNavigation("updatePolicy", "updatePolicy")}
                className={`flex items-center space-x-2 p-2 rounded ${
                  selectedTab === "updatePolicy"
                    ? "bg-[#fdf0ea] primary_text font-semibold"
                    : "hover:bg-zinc-300"
                }`}
              >
                <MdOutlinePolicy />
                <span>Update Policy</span>
              </button>
            </div>
          </div>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-white border-t flex justify-between">
          <button
            onClick={() => handleLogOut()}
            className="flex gap-3 text-[14px] hover:bg-[#fdf0ea] hover:text-[#ec6931] p-2 px-5 rounded-md text-[#72777F]"
          >
            <CiLogout className="mt-1" /> Logout
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex gap-3 text-[14px] hover:bg-[#fdf0ea] hover:text-[#ec6931] p-2 px-2 rounded-md text-[#72777F]"
          >
            Home Page <FaHome className="mt-1" />
          </button>
        </div>
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
