/* eslint-disable react/prop-types */
import { CloseOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewsletter } from "../features/newsLetter/newsLetterSlice";
import EditableHeading from "../Components/Common/EditableHeading";
import { base_url } from "../utils/base_path";

const FooterModal = ({ onClose, footerImg }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.newsletter);

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
      newErrors.name = "Nome è obbligatorio.";
    } else if (name.length < 2) {
      newErrors.name = "Nome deve essere almeno 2 caratteri.";
    }

    if (!email.trim()) {
      newErrors.email = "E-mail è obbligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Inserisci un indirizzo email valido.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubscribe = async () => {
    if (!validateForm()) {
      return;
    }

    dispatch(createNewsletter({ name, email }))
      .unwrap()
      .then(() => {
        toast.success("Grazie, Email inviata con successo");
        setEmail("");
        setName("");
        onClose();
      })
      .catch((err) => {
        toast.error(err.message || "Qualcosa è andato storto.");
      });
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
            <EditableHeading
              titleKey="modal_footer_title"
              defaultTitle="Hai bisogno di aiuto?"
              customTitleClass="text-lg font-semibold"
            />
            <EditableHeading
              titleKey="modal_footer_title1"
              defaultTitle=" Se hai bisogno di aiuto con la prenotazione o hai qualsiasi
              domanda, non esitare a contattarci!"
              customTitleClass="text-gray-600 my-3 text-md"
            />
            <input
              type="text"
              placeholder="Nome"
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
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-gray-200 w-full p-2 rounded-lg my-1 focus:border ${
                errors.email ? "border-red-500" : "border-orange-500"
              } focus:outline-none`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <EditableHeading
              titleKey="modal_footer_title2"
              defaultTitle="Cliccando su “Iscriviti ora!” esprimi il tuo consenso a ricevere la newsletter di Utravel. Leggi l'informativa privacy"
              customTitleClass="text-gray-600 my-3 text-md"
            />
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className={`bg-orange-500 w-full hover:bg-orange-600 text-white py-2 px-4 rounded-lg my-5 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading ? "Invia..." : "Contattaci"}
            </button>
          </div>
          <div className="primary_bg hidden lg:flex items-center justify-center">
            <img
              src={`${base_url}/${footerImg}`}
              alt="Footer Modal Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterModal;
