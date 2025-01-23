/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { CloseOutlined } from "@mui/icons-material";

const CookiePolicyModal = ({ handleAcceptCookies, onClose }) => {
  const [isVisible, setIsVisible] = useState(false); // Controls the visibility with animation
  const [activeTab, setActiveTab] = useState("general"); // Controls the active tab

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300); // Small delay for smoother animation
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-md shadow-xl shadow-gray-500 max-w-4xl mx-5 transform transition-transform duration-300 ${
          isVisible ? "scale-100" : "scale-95"
        }`}
      >
        <div onClick={onClose}>
          <CloseOutlined className="absolute right-1 top-1 primary_text hover:scale-110" />
        </div>
        <div className="flex justify-between items-center border-b-2 p-8">
          <img src={logo} alt="" className="w-24" />
          <h2 className="text-xl font-semibold text-gray-500">Cookie Policy</h2>
        </div>

        {/* Tab Navigation */}
        <div className="border-b-2 grid grid-cols-3">
          <button
            className={`p-4 ${
              activeTab === "general"
                ? "primary_text border-b-2 border-b-orange-500"
                : " text-gray-700"
            }`}
            onClick={() => setActiveTab("general")}
          >
            General Info
          </button>
          <button
            className={`p-4  ${
              activeTab === "statistics"
                ? "primary_text border-b-2 border-b-orange-500"
                : " text-gray-700"
            }`}
            onClick={() => setActiveTab("statistics")}
          >
            Statistics
          </button>
          <button
            className={`p-4 ${
              activeTab === "preferences"
                ? "primary_text border-b-2 border-b-orange-500"
                : " text-gray-700"
            }`}
            onClick={() => setActiveTab("preferences")}
          >
            Preferences
          </button>
        </div>

        {/* Tab Content Section */}
        <div className="p-5">
          {activeTab === "general" && (
            <div
              className="relative p-3 max-h-[250px] overflow-scroll scroll-smooth"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 50%, rgba(0, 0, 0, 0.1) 100%)",
                maskImage:
                  "linear-gradient(to bottom, black 50%, rgba(0, 0, 0, 0.1) 100%)",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
            >
              <p className="text-gray-500">
                Questo sito web utilizza i cookie Su questo sito usiamo cookie
                tecnici, statistici e, previo tuo consenso, di profilazione
                nostri e di terze parti. Cliccando "Accetta tutti i cookie"
                acconsenti di ricevere tutti i cookie del nostro sito; cliccando
                su "Mostra dettagli" puoi avere maggiori informazioni sui
                singoli cookie di ogni categoria. La chiusura del banner
                mediante selezione dell’apposito comando “X” comporta il
                permanere delle impostazioni di default, e dunque la
                continuazione della navigazione con i cookie tecnici. La casella
                dei cookie statistici è già selezionata poiché, non permettendo
                la diretta individuazione dell’interessato (cd. single out), i
                relativi cookie sono equiparati ai tecnici, ma puoi in ogni
                momento impedirne l’archiviazione deselezionando la relativa
                casella. Se vuoi maggiori informazioni sul funzionamento dei
                cookie attivi sul sito
              </p>
            </div>
          )}
          {activeTab === "statistics" && (
            <p className="text-gray-500">
              We collect anonymous data for statistical purposes. These cookies
              help us understand how users interact with our website and improve
              its performance.
            </p>
          )}
          {activeTab === "preferences" && (
            <p className="text-gray-500">
              Manage your preferences by allowing or disabling specific types of
              cookies. You can choose to disable personalized ads or disable
              analytical cookies.
            </p>
          )}
        </div>

        {/* Footer Section */}
        <div className="flex justify-end border-t-2 p-5 gap-5">
          <button
            onClick={handleAcceptCookies}
            className="border border-orange-500 hover:text-white hover:bg-orange-500 text-orange-500 font-semibold py-2 px-4 rounded transition-all ease-linear duration-300"
          >
            Accept and Continue
          </button>
          <button
            onClick={onClose}
            className="border border-red-500 hover:text-white hover:bg-red-500 text-red-500 font-semibold py-2 px-4 rounded transition-all ease-linear duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyModal;
