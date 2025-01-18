import { CloseOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import img from "../assets/Images/cookie.png";
import toast from "react-hot-toast";

const FooterModal = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const footerModalDismissed = localStorage.getItem("footerModalDismissed");
    if (!footerModalDismissed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, []);

  // Validation function
  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubscribe = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setMessage(""); // Clear previous messages

    try {
      const response = await fetch(
        "http://localhost:3000/api/newsletter/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        }
      );

      if (response.ok) {
        setMessage("Thank you for subscribing!");
        toast.success("Thanks, Email send successfully");
        setEmail("");
        setErrors({});
        setName(""); // Clear input fields
        onClose();
      } else {
        const errorData = await response.json();
        setMessage(
          errorData.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setMessage("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`fixed bottom-0 z-50 bg-white shadow-lg rounded-t-3xl lg:rounded-md lg:right-5 lg:bottom-5 transform transition-transform duration-300 ${
          isVisible
            ? "translate-y-0 lg:translate-x-0"
            : "translate-y-full lg:translate-x-full"
        }`}
      >
        <div
          onClick={onClose}
          className="flex justify-end absolute right-2 top-2 bg-white rounded-full cursor-pointer"
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`bg-gray-200 w-full p-2 rounded-lg my-1 mt-5 focus:border ${
                errors.name ? "border-red-500" : "border-orange-500"
              } focus:outline-none`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-gray-200 w-full p-2 rounded-lg my-1 focus:border ${
                errors.email ? "border-red-500" : "border-orange-500"
              } focus:outline-none`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <p className="text-gray-600 my-3 text-md">
              Cliccando su “Iscriviti ora!” esprimi il tuo consenso a ricevere
              la newsletter di Utravel. Leggi l'informativa privacy
            </p>
            <button
              onClick={handleSubscribe}
              disabled={isSubmitting}
              className={`bg-orange-500 w-full hover:bg-orange-600 text-white py-2 px-4 rounded-lg my-5 ${
                isSubmitting && "opacity-50 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Contact Us"}
            </button>
          </div>
          <div className="primary_bg hidden lg:flex items-center">
            <img src={img} alt="Footer Modal Illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterModal;
