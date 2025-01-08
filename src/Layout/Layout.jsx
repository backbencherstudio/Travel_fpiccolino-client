import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";
import ScrollToTop from "../Shared/ScrollToTop";
import { FaSquareWhatsapp } from "react-icons/fa6";
import Draggable from "react-draggable";
import { useState } from "react";

const Layout = () => {
  const phoneNumber = "+393801585075";
  const message = "Hello, I have a question about your services.";
  const encodedMessage = encodeURIComponent(message);
  const [isDragging, setIsDragging] = useState(false);
  const handleClick = () => {
    if (!isDragging) {
      window.open(
        `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
        "_blank"
      );
    }
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

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
      <Draggable
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
      </Draggable>
    </div>
  );
};

export default Layout;
