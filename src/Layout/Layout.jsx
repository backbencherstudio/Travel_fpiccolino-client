import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import ScrollToTop from "../Shared/ScrollToTop";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <ScrollToTop />
        <Outlet />
      </div>
      <div className="bg-[#061D35]">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
