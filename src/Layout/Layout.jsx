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
      {/* <Draggable
        handle=".whatsapp-handle"
        defaultPosition={{ x: 0, y: 0 }}
        onStart={handleMouseDown}
        onStop={handleMouseUp}
      >
        <div className="fixed bottom-5 right-5 z-50">
          <div
            className="whatsapp-handle"
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <FaSquareWhatsapp className="text-[green] h-14 w-14 bg-white rounded-lg shadow-lg cursor-pointer transition-transform hover:scale-105" />
          </div>
        </div>
      </Draggable> */}
    </div>
  );
};

export default Layout;
