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
      className={`fixed bottom-5 z-50 right-5 max-w-sm bg-white shadow-lg rounded-lg p-5 transform transition-transform duration-300 ${
        isVisible
          ? "translate-y-0 lg:translate-x-0"
          : "translate-y-full lg:translate-x-full"
      }`}
    >
      <div onClick={onClose} className="flex justify-end">
        <CloseOutlined />
      </div>
      <h3 className="text-lg font-semibold">Need Help?</h3>
      <p className="text-gray-600">
        If you need assistance with booking or have any questions, feel free to
        reach out!
      </p>
      <button className="mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded">
        Contact Us
      </button>
    </div>
  );
};

export default FooterModal;
