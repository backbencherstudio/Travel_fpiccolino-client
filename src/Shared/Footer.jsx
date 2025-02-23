import { useEffect, useState } from "react";
import ParentComponent from "../Shared/ParentComponent/ParentComponent";
import call from "../assets/icons/call.svg";
import mail from "../assets/icons/mail.svg";
import { base_url } from "../utils/base_path";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageData } from "../features/pageData/pageDataSlice";
import { Link } from "react-router-dom";
import { FaEdit, FaTimes } from "react-icons/fa";
import { fetchTexts, updateText } from "../features/texts/textsSlice";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [message, setMessage] = useState("");
  const [editModal, setEditModal] = useState({
    isOpen: false,
    id: "",
    key: "",
    value: "",
    originalValue: "",
  });
  const { user } = useSelector((state) => state.authorization);
  const dispatch = useDispatch();
  const { homePageData } = useSelector((state) => state.pageData);
  const { texts, isLoading } = useSelector((state) => state.texts);

  useEffect(() => {
    dispatch(getHomePageData());
    dispatch(fetchTexts());
  }, [dispatch]);

  const footerData = homePageData?.footer?.[0] || {};
  const contactInfo = footerData.contactInfo || {};

  const handleEditClick = (key, value, id) => {
    setEditModal({
      isOpen: true,
      id,
      key,
      value: value || "",
      originalValue: value || "",
    });
  };

  const handleTextUpdate = async () => {
    try {
      await dispatch(
        updateText({
          key: editModal.key,
          value: editModal.value,
        })
      ).unwrap();

      setEditModal({
        isOpen: false,
        id: "",
        key: "",
        value: "",
        originalValue: "",
      });

      toast.success("Text updated successfully");
    } catch (error) {
      console.error("Error updating text:", error);
      toast.error("Failed to update text. Please try again.");
    }
  };

  const closeModal = () => {
    setEditModal((prev) => ({
      ...prev,
      isOpen: false,
      value: prev.originalValue,
    }));
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email");
      return;
    }
    if (!isAgreed) {
      setMessage("Please agree to the terms and conditions");
      return;
    }

    try {
      // Add your subscription logic here
      setMessage("Subscribed successfully!");
      setEmail("");
      setIsAgreed(false);
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("Subscription failed. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; // Consider adding a proper loading spinner
  }

  return (
    <div className="bg-white text-black px-4">
      <ParentComponent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-20 pb-10 lg:gap-0 gap-10">
          <div>
            {/* <img src={logo} alt="Logo" className=" h-52" /> */}
            <img
              src={`${base_url}/${footerData?.logoImg}`}
              alt=""
              className="w-[150px] h-[100px] rounded-lg"
            />
          </div>
          <div className="flex justify-between">
            <div className="text-[18px] font-medium">
              <div className="relative group">
                <h1 className="text-[20px] font-medium mb-6">
                  {isLoading
                    ? "Loading..."
                    : texts["footer.quickLinks"] || "Quick Links"}
                </h1>
                {user?.role === "admin" && (
                  <button
                    className="absolute -right-6 top-1/2 -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                    onClick={() =>
                      handleEditClick(
                        "footer.quickLinks",
                        texts["footer.quickLinks"],
                        texts["footer.quickLinks_id"]
                      )
                    }
                  >
                    <FaEdit size={16} />
                  </button>
                )}
              </div>
              {[
                { key: "footer.philosophy", to: "/about" },
                { key: "footer.ourTours", to: "/tours" },
                { key: "footer.countries", to: "/countries" },
                { key: "footer.blog", to: "/blog" },
                { key: "footer.faq", to: "/faq" },
                { key: "footer.support", to: "/contact" },
                { key: "footer.terms", to: "/policy" },
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <Link to={item.to}>
                    <p>
                      {isLoading ? "Loading..." : texts[item.key] || item.key}
                    </p>
                  </Link>
                  {user?.role === "admin" && (
                    <button
                      className="absolute -right-6 top-1/2 -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                      onClick={() =>
                        handleEditClick(
                          item.key,
                          texts[item.key],
                          texts[`${item.key}_id`]
                        )
                      }
                    >
                      <FaEdit size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="text-[16px] font-normal max-w-[218px]">
              <div className="relative group">
                <h1 className="text-[20px] font-medium mb-6">
                  {texts["footer.helpText"] || "Contact Us"}
                </h1>
                {user?.role === "admin" && (
                  <button
                    className="absolute -right-6 top-1/2 -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                    onClick={() =>
                      handleEditClick(
                        "footer.helpText",
                        texts["footer.helpText"],
                        texts["footer.helpText_id"]
                      )
                    }
                  >
                    <FaEdit size={16} />
                  </button>
                )}
              </div>

              <p className="flex gap-1 mt-4">
                <img src={call} alt="Call Icon" /> {contactInfo.phone || "N/A"}
              </p>
              <p className="flex gap-1 mt-2">
                <img src={mail} alt="Mail Icon" /> {contactInfo.email || "N/A"}
              </p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {footerData?.socialLinks?.map((item, index) => (
                  <p
                    key={index}
                    className="flex gap-1 mt-3 text-xs italic primary_text underline"
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </a>
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex lg:justify-end">
            <div>
              <div className="relative group">
                <h1 className="text-[20px] font-medium w-[200px]">
                  {texts["footer.newsletter"] || "Newsletter"}
                </h1>
                {user?.role === "admin" && (
                  <button
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                    onClick={() =>
                      handleEditClick(
                        "footer.newsletter",
                        texts["footer.newsletter"],
                        texts["footer.newsletter_id"]
                      )
                    }
                  >
                    <FaEdit size={16} />
                  </button>
                )}
              </div>

              <form className="relative mt-4" onSubmit={handleSubscribe}>
                <div className="relative group">
                  <input
                    className="p-3 pr-20 max-w-[327px] h-11 border border-[#626262] rounded-lg"
                    type="email"
                    placeholder={
                      texts["footer.emailPlaceholder"] || "Enter your email"
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {user?.role === "admin" && (
                    <button
                      type="button"
                      className="absolute left-[50%] top-1/2 -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEditClick(
                          "footer.emailPlaceholder",
                          texts["footer.emailPlaceholder"],
                          texts["footer.emailPlaceholder_id"]
                        );
                      }}
                    >
                      <FaEdit size={16} />
                    </button>
                  )}
                </div>

                <div className=" group">
                  <button
                    type="submit"
                    className="primary_bg text-white absolute right-5 top-2 px-[10px] py-1 rounded-lg text-[14px]"
                  >
                    {texts["footer.send"] || "Send"}
                  </button>
                  {user?.role === "admin" && (
                    <button
                      type="button"
                      className="absolute right-0.5 top-[25%] -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleEditClick(
                          "footer.send",
                          texts["footer.send"],
                          texts["footer.send_id"]
                        );
                      }}
                    >
                      <FaEdit size={16} />
                    </button>
                  )}
                </div>

                <div className="flex gap-2 mt-3">
                  <input
                    className="w-[18px] h-[18px] mt-0.5 bg-transparent"
                    type="checkbox"
                    checked={isAgreed}
                    onChange={() => setIsAgreed(!isAgreed)}
                  />
                  <div className="relative group">
                    <p>
                      {texts["footer.termsAgree"] ||
                        "I agree to the terms and conditions"}
                    </p>
                    {user?.role === "admin" && (
                      <button
                        type="button"
                        className="absolute -right-6 top-1/2 -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleEditClick(
                            "footer.termsAgree",
                            texts["footer.termsAgree"],
                            texts["footer.termsAgree_id"]
                          );
                        }}
                      >
                        <FaEdit size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </form>

              {message && (
                <p className="text-sm text-red-500 mt-3">{message}</p>
              )}
            </div>
          </div>
        </div>
      </ParentComponent>
      <div className="border-t">
        <ParentComponent>
          <div className="flex flex-col md:flex-row justify-between py-6 md:gap-0 gap-5">
            <p className="text-[16px]">Copyright {footerData.copyright}</p>
            <div className="flex gap-2">
              {footerData?.paymentLogos?.map((logo, index) => (
                <img
                  key={index}
                  src={`${base_url}/${logo}`}
                  alt={`Logo ${index + 1}`}
                  className="bg-white h-10 w-12 rounded"
                />
              ))}
            </div>
          </div>
        </ParentComponent>
      </div>

      {/* Edit Modal */}
      {editModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90%] relative">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Edit Text
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Value
                </label>
                <input
                  type="text"
                  value={editModal.value}
                  onChange={(e) =>
                    setEditModal((prev) => ({ ...prev, value: e.target.value }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter text value"
                  autoFocus
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTextUpdate}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
