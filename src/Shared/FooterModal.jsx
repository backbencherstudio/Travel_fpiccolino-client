import { CloseOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";

const FooterModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Show after a small delay
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`fixed bottom-0 z-50  bg-white shadow-lg  rounded-t-3xl lg:rounded-md  lg:right-5 lg:bottom-5  transform transition-transform duration-300 ${
          isVisible
            ? "translate-y-0 lg:translate-x-0"
            : "translate-y-full lg:translate-x-full"
        }`}
      >
        <div
          onClick={onClose}
          className="flex justify-end absolute right-2 top-2 bg-white rounded-full"
        >
          <CloseOutlined />
        </div>
        <div className="grid lg:grid-cols-2 max-w-[800px] gap-5">
          <div className="m-5">
            <h3 className="text-lg font-semibold">Need Help?</h3>
            <p className="text-gray-600">
              If you need assistance with booking or have any questions, feel
              free to reach out!
            </p>
            <input
              type="text"
              placeholder="Name"
              className="bg-gray-200 w-full  p-2 rounded-lg my-1 mt-5 focus:border focus:border-orange-500 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Email"
              className="bg-gray-200 w-full  p-2 rounded-lg my-1 focus:border focus:border-orange-500 focus:outline-none"
            />
            <p className="text-gray-600 my-3 text-md">
              Cliccando su “Iscriviti ora!” esprimi il tuo consenso a ricevere
              la newsletter di Utravel. Leggi l'informativa privacy
            </p>
            <button className=" bg-orange-500 w-full hover:bg-orange-600 text-white py-2 px-4  rounded-lg my-5">
              Contact Us
            </button>
          </div>
          <div className="primary_bg"></div>
        </div>
      </div>
    </div>
  );
};

export default FooterModal;
