import { useState, useEffect } from "react";
import { FaBell, FaRegBell, FaRegUser } from "react-icons/fa";
import { IoClose, IoGolfOutline, IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";

import { LuLayoutDashboard } from "react-icons/lu";
import { PiTrolleySuitcase } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { GrArticle } from "react-icons/gr";
import image from "../../assets/image1.jpg";
import DashboardAnalysis from "../../Components/Dashboard/DashboardAnalysis";

const Dashboard = () => {
  const navigate = useNavigate();

  // State for selected tab
  const [selectedTab, setSelectedTab] = useState(
    localStorage.getItem("tab") || "Dashboard"
  );
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);

  useEffect(() => {
    localStorage.setItem("tab", selectedTab);
  }, [selectedTab]);

  // Handle close icon delay
  useEffect(() => {
    if (isSidebarOpen) {
      const timer = setTimeout(() => setShowCloseIcon(true), 150); // 1-second delay
      return () => clearTimeout(timer); // Cleanup timer
    } else {
      setShowCloseIcon(false); // Reset immediately when sidebar closes
    }
  }, [isSidebarOpen]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tab");
    navigate("/login");
  };

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:translate-x-0 lg:relative lg:w-64 w-64 bg-white border p-5 z-50`}
      >
        <h1 className="text-2xl font-bold mb-5">Admin</h1>
        <nav className="flex flex-col gap-4">
          <button
            onClick={() => handleTabChange("Dashboard")}
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
            onClick={() => handleTabChange("Machines")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Machines"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <IoGolfOutline />
            <span>Tour</span>
          </button>
          <button
            onClick={() => handleTabChange("Courses")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Courses"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <FaRegUser />
            <span>User Details</span>
          </button>
          <button
            onClick={() => handleTabChange("Task List")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Task List"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <PiTrolleySuitcase />
            <span>Package</span>
          </button>
          <button
            onClick={() => handleTabChange("Tutorials")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Tutorials"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <MdOutlinePayment />
            <span>Payment History</span>
          </button>
          <button
            onClick={() => handleTabChange("Tutorials")}
            className={`flex items-center space-x-2 p-2 rounded ${
              selectedTab === "Tutorials"
                ? "bg-[#fdf0ea] primary_text font-semibold"
                : "hover:bg-zinc-300"
            }`}
          >
            <GrArticle />
            <span>Blog</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <header className="flex items-center justify-between bg-zinc-50 p-4 shadow-md">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-2xl text-orange-500"
          >
            {isSidebarOpen && showCloseIcon ? (
              <IoClose className="absolute top-7 left-52 z-50 transition-all ease-linear" />
            ) : (
              <IoMenu />
            )}
          </button>
          <div></div>
          <div className="flex">
            <input
              type="text"
              placeholder="Search" // Unicode for search icon
              className="p-2 border mx-5 rounded-lg bg-no-repeat bg-left pl-10"
              style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="gray" viewBox="0 0 24 24" width="20px" height="20px"><path d="M10 2a8 8 0 015.664 13.736l5.316 5.316a1 1 0 01-1.414 1.414l-5.316-5.316A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"></path></svg>')`,
                backgroundSize: "16px 16px",
                backgroundPosition: "10px center",
              }}
            />
            <div className=" border mr-5 rounded-full h-10 w-10 flex justify-center items-center text-gray-400 cursor-pointer">
              <FaRegBell />
            </div>
            <div className="flex">
              <div className=" border mr-1 rounded-full h-10 w-10 flex justify-center items-center text-gray-400 cursor-pointer">
                <img
                  src={image}
                  className="h-full w-full rounded-full object-cover"
                  alt=""
                />
              </div>
             <div>
             <h1 className="font-semibold text-[16px]">Tren bold</h1>
             <p className="text-[12px] text-[#72777F]">Admin</p>
             </div>
            </div>
          </div>
        </header>

        <main className="p-5">
         {selectedTab === 'Dashboard' && <DashboardAnalysis />}
                    {/*  {selectedTab === 'Machines' && <Machines />}
                    {selectedTab === 'Courses' && <Courses />}
                    {selectedTab === 'Task List' && <TaskList />}
                    {selectedTab === 'Tutorials' && <AddTutorial />} */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
