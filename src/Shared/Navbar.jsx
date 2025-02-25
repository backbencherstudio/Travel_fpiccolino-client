import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ParentComponent from "./ParentComponent/ParentComponent";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../features/auth/authSlice";
import { FaRegUserCircle, FaWhatsapp, FaEdit, FaTimes } from "react-icons/fa";
import { PiTiktokLogo } from "react-icons/pi";
import { FaInstagram } from "react-icons/fa6";
import { LogoutOutlined, WhatsApp } from "@mui/icons-material";
import { MdOutlineDashboard } from "react-icons/md";
import { base_url } from "../utils/base_path";
import { fetchTexts, updateText } from "../features/texts/textsSlice";
import { toast } from "react-hot-toast";
// import { FaWhatsapp } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contactDropDown, setContactDropDown] = useState(false);
  const [languageDropDown, setLanguageDropDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const phoneNumber = "+393801585075";
  const message = "Hello, I have a question about your services.";
  const encodedMessage = encodeURIComponent(message);
  const { user, isAuthenticated } = useSelector((state) => state.authorization);
  const { homePageData } = useSelector((state) => state.pageData);
  const footerData = homePageData?.footer?.[0] || {};
  const { texts } = useSelector((state) => state.texts);
  const [isLoading, setIsLoading] = useState(true);
  const [hoverStates, setHoverStates] = useState({});
  const [editModal, setEditModal] = useState({
    isOpen: false,
    id: "",
    key: "",
    value: "",
    originalValue: "",
  });

  // Close dropdowns when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     // Handle menu clicks
  //     if (
  //       menuRef.current &&
  //       !menuRef.current.contains(event.target) &&
  //       buttonRef.current &&
  //       !buttonRef.current.contains(event.target) &&
  //       ProfileRef.current &&
  //       !ProfileRef.current.contains(event.target)
  //     ) {
  //       setIsMenuOpen(false);
  //       setLoginOpen(false);
  //     }

  //     // Handle dropdown clicks
  //     setContactDropDown(false);
  //     setLanguageDropDown(false);
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  useEffect(() => {
    document.body.style.overflowY = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const handleDropdownToggle = (dropdownType) => (e) => {
    e.stopPropagation(); // Prevent triggering the document click listener
    if (dropdownType === "contact") {
      setContactDropDown(!contactDropDown);
      setLanguageDropDown(false); // Close other dropdown
    } else if (dropdownType === "language") {
      setLanguageDropDown(!languageDropDown);
      setContactDropDown(false); // Close other dropdown
    }
  };

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
    setIsMenuOpen(false);
    setContactDropDown(false);
  };
  const handleClick = () => {
    window.open(
      `https://wa.me/${footerData?.contactInfo?.phone}?text=${encodedMessage}`,
      "_blank"
    );
  };

  // Fetch texts from backend
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        await dispatch(fetchTexts()).unwrap();
      } catch (error) {
        console.error("Error loading texts:", error);
        toast.error("Failed to load text content");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [dispatch]);

  const handleTextHover = (key) => {
    setHoverStates({ ...hoverStates, [key]: true });
  };

  const handleTextLeave = (key) => {
    setHoverStates({ ...hoverStates, [key]: false });
  };

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
      if (!editModal.value.trim()) {
        toast.error("Text value cannot be empty");
        return;
      }

      await dispatch(
        updateText({
          key: editModal.key,
          value: editModal.value.trim(),
        })
      ).unwrap();

      toast.success("Text updated successfully");
      setEditModal({
        isOpen: false,
        id: "",
        key: "",
        value: "",
        originalValue: "",
      });
    } catch (error) {
      console.error("Error updating text:", error);
      toast.error(error.message || "Failed to update text. Please try again.");
    }
  };

  const closeModal = () => {
    setEditModal((prev) => ({
      ...prev,
      isOpen: false,
      value: prev.originalValue,
    }));
  };

  return (
    <>
      <header className="z-30 fixed w-full nav-style py-2 banner_style">
        <ParentComponent>
          <div className="">
            <div className="flex xl:gap-6 lg:gap-3 gap-6 h-16 items-center justify-between">
              <div className="md:flex md:items-center md:gap-12">
                <Link className="block text-teal-600" to="/">
                  <img
                    src={`${base_url}/${footerData?.logoImg}`}
                    alt=""
                    className=" w-28 h-16 rounded-xl"
                  />
                </Link>
              </div>

              <div className="hidden lg:block">
                <nav aria-label="Global">
                  <ul className="flex items-center 2xl:gap-6 xl:gap-7 lg:gap-3 gap-6  primary_text lg:text-sm xl:text-[18px]">
                    <li>
                      <div
                        className="relative group"
                        onMouseEnter={() => handleTextHover("nav.about")}
                        onMouseLeave={() => handleTextLeave("nav.about")}
                      >
                        <div className="flex items-center 2xl:pr-8">
                          <NavLink
                            to="/about"
                            className={({ isActive }) =>
                              isActive ? "active" : "text-[#ffffff]"
                            }
                          >
                            {isLoading ? (
                              <span className="animate-pulse">Loading...</span>
                            ) : (
                              texts["nav.about"] || "La nostra Filosofia"
                            )}
                          </NavLink>
                          {user?.role === "admin" && (
                            <button
                              className="absolute right-0 top-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 hover:text-orange-400 transition-opacity duration-200"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleEditClick(
                                  "nav.about",
                                  texts["nav.about"],
                                  texts["nav.about_id"]
                                );
                              }}
                            >
                              <FaEdit size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </li>

                    <li>
                      <div
                        className="relative group "
                        onMouseEnter={() => handleTextHover("nav.tour")}
                        onMouseLeave={() => handleTextLeave("nav.tour")}
                      >
                        <div className="flex items-center   2xl:pr-8">
                          <NavLink
                            to="/tours"
                            className={({ isActive }) =>
                              isActive ? "active" : "text-[#ffffff]"
                            }
                          >
                            {isLoading ? (
                              <span className="animate-pulse">Loading...</span>
                            ) : (
                              texts["nav.tour"] || "l Nostri Viaggi"
                            )}
                          </NavLink>

                          {user?.role === "admin" && (
                            <button
                              className="absolute right-0 top-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 hover:text-orange-400 transition-opacity duration-200"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleEditClick(
                                  "nav.tour",
                                  texts["nav.tour"],
                                  texts["nav.tour_id"]
                                );
                              }}
                            >
                              <FaEdit size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                    <li>
                      <div
                        className="relative group"
                        onMouseEnter={() => handleTextHover("nav.countries")}
                        onMouseLeave={() => handleTextLeave("nav.countries")}
                      >
                        <div className="flex items-center 2xl:pr-8">
                          <NavLink
                            to="/countries"
                            className={({ isActive }) =>
                              isActive ? "active" : "text-[#ffffff]"
                            }
                          >
                            {isLoading ? (
                              <span className="animate-pulse">Loading...</span>
                            ) : (
                              texts["nav.countries"] || "Le nostre destinazioni"
                            )}
                          </NavLink>

                          {user?.role === "admin" && (
                            <button
                              className="absolute right-0 top-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 hover:text-orange-400 transition-opacity duration-200"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleEditClick(
                                  "nav.countries",
                                  texts["nav.countries"],
                                  texts["nav.countries_id"]
                                );
                              }}
                            >
                              <FaEdit size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </li>

                    <li>
                      <div
                        className="relative group"
                        onMouseEnter={() => handleTextHover("nav.blog")}
                        onMouseLeave={() => handleTextLeave("nav.blog")}
                      >
                        <div className="flex items-center 2xl:pr-8">
                          <NavLink
                            to="/blog"
                            className={({ isActive }) =>
                              isActive ? "active" : "text-[#ffffff]"
                            }
                          >
                            {isLoading ? (
                              <span className="animate-pulse">Loading...</span>
                            ) : (
                              texts["nav.blog"] || "ll Blog LowCost"
                            )}
                          </NavLink>
                          {user?.role === "admin" && (
                            <button
                              className="absolute right-0 top-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 hover:text-orange-400 transition-opacity duration-200"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleEditClick(
                                  "nav.blog",
                                  texts["nav.blog"],
                                  texts["nav.blog_id"]
                                );
                              }}
                            >
                              <FaEdit size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </li>

                    <li>
                      <div
                        className="relative group"
                        onMouseEnter={() => handleTextHover("nav.faq")}
                        onMouseLeave={() => handleTextLeave("nav.faq")}
                      >
                        <div className="flex items-center 2xl:pr-8">
                          <NavLink
                            to="/faq"
                            className={({ isActive }) =>
                              isActive ? "active" : "text-[#ffffff]"
                            }
                          >
                            {isLoading ? (
                              <span className="animate-pulse">Loading...</span>
                            ) : (
                              texts["nav.faq"] || "FAQ"
                            )}
                          </NavLink>
                          {user?.role === "admin" && (
                            <button
                              className="absolute right-0 top-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 hover:text-orange-400 transition-opacity duration-200"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleEditClick(
                                  "nav.faq",
                                  texts["nav.faq"],
                                  texts["nav.faq_id"]
                                );
                              }}
                            >
                              <FaEdit size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </li>

                    <li>
                      <div
                        className="relative group"
                        onMouseEnter={() => handleTextHover("nav.contact")}
                        onMouseLeave={() => handleTextLeave("nav.contact")}
                      >
                        <div className="flex items-center 2xl:pr-8">
                          <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                              isActive ? "active" : "text-[#ffffff]"
                            }
                          >
                            {isLoading ? (
                              <span className="animate-pulse">Loading...</span>
                            ) : (
                              texts["nav.contact"] || "Supporto Live"
                            )}
                          </NavLink>
                          {user?.role === "admin" && (
                            <button
                              className="absolute right-0 top-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 hover:text-orange-400 transition-opacity duration-200"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleEditClick(
                                  "nav.contact",
                                  texts["nav.contact"],
                                  texts["nav.contact_id"]
                                );
                              }}
                            >
                              <FaEdit size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex gap-3 lg:gap-[6px] items-center">
                  {/* Language Dropdown */}
                  <div className="relative inline-block text-left">
                    <button
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-[18px] primary_text mt-2"
                      
                    >
                      <div className="flex items-ceter gap-4 lg:gap-2  xl:gap-0 mr-2 lg:mr-1 xl:mr-0">

                        <a href="https://www.tiktok.com/@latuafugalowcost?_t=ZN-8u6RTNqM0Aw&_r=1">
                          <PiTiktokLogo
                            // style={{ fontSize: "36px" }}
                            // size="36px"
                            className="text-white xl:mr-3 hover:scale-105 text-2xl xl:text-[30px] 2xl:text-[36px]"
                          />
                        </a>
                        <a href="https://www.instagram.com/latuafugalowcost_official">
                          <FaInstagram
                            // style={{ fontSize: "36px" }}
                            // size="36px"
                            className="text-white xl:mr-3 hover:scale-105 text-2xl xl:text-[30px] 2xl:text-[36px]"
                          />
                        </a>
                        <FaWhatsapp onClick={handleDropdownToggle("language")}
                          // style={{ fontSize: "36px" }}
                          // size="36px"
                          className="text-white xl:mr-3 hover:scale-105 text-2xl xl:text-[30px] 2xl:text-[36px]"
                        />

                      </div>
                    </button>
                    {languageDropDown && (
                      <div className="absolute -right-10 top-12 lg:right-0 z-10 mt-2 w-64 px-3 rounded-xl bg-white shadow-lg ring-1 ring-black/5">
                        <div className="py-1 flex">
                          <div className="relative group w-full">
                            <button
                              onClick={handleClick}
                              className="flex items-center border border-gray-400 hover:bg-gray-50 text-gray-500 px-5 py-2 my-5 mx-2 w-full rounded-full justify-start font-medium text-sm text-nowrap"
                            >
                              <FaWhatsapp className="h-6 w-6 mr-3" />
                              {texts["nav.livechat"]}
                            </button>
                            {user?.role === "admin" && (
                              <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleEditClick(
                                    "nav.livechat",
                                    texts["nav.livechat"],
                                    texts["nav.livechat_id"]
                                  );
                                }}
                              >
                                <FaEdit size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    {contactDropDown && (
                      <div className="absolute -right-10 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                        <div className="py-1">
                          <div className="relative group">
                            <button
                              onClick={() => {
                                navigate(`/profile/${user?._id}`);
                                setContactDropDown(false);
                              }}
                              className="px-4 py-2 w-full text-start hover:bg-[#fdf0ea] text-sm text-gray-700 flex items-center gap-3"
                            >
                              <FaRegUserCircle size={20} />
                              {texts["nav.profile"]}
                            </button>
                            {user?.role === "admin" && (
                              <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleEditClick(
                                    "nav.profile",
                                    texts["nav.profile"],
                                    texts["nav.profile_id"]
                                  );
                                }}
                              >
                                <FaEdit size={16} />
                              </button>
                            )}
                          </div>

                          {user?.role === "admin" && (
                            <div className="group">
                              <button
                                onClick={() => {
                                  navigate("/dashboard");
                                  // First set the active tab
                                  window.localStorage.setItem(
                                    "activeTab",
                                    "Dashboard"
                                  );
                                  // Then navigate and close dropdown
                                  setContactDropDown(false);
                                }}
                                className="flex gap-3 px-4 py-2 w-full hover:bg-[#fdf0ea] text-sm text-gray-700"
                              >
                                <MdOutlineDashboard size={20} />
                                {texts["nav.dashboard"]}
                              </button>
                              {user?.role === "admin" && (
                                <button
                                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleEditClick(
                                      "nav.dashboard",
                                      texts["nav.dashboard"],
                                      texts["nav.dashboard_id"]
                                    );
                                  }}
                                >
                                  <FaEdit size={16} />
                                </button>
                              )}
                            </div>
                          )}

                          <div className="relative group">
                            <button
                              onClick={handleLogOut}
                              className="flex gap-3 px-4 py-2 w-full hover:bg-[#fdf0ea] text-sm primary_text"
                            >
                              <LogoutOutlined size={20} />
                              {texts["nav.logout"]}
                            </button>
                            {user?.role === "admin" && (
                              <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleEditClick(
                                    "nav.logout",
                                    texts["nav.logout"],
                                    texts["nav.logout_id"]
                                  );
                                }}
                              >
                                <FaEdit size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="hidden lg:block">
                    {!isAuthenticated && (
                      <div className="flex ">
                        <Link
                          className="rounded-xl primary_text bg-transparent border  2xl:px-8 px-8 py-3 lg:px-3 lg:py-[6px] 2xl:py-3 text-[18px] lg:text-sm hover:bg-[#63280141] font-medium 2xl:mx-2 lg:mx-0 mx-2  border-orange-600"
                          to="/login"
                        >
                          Login
                        </Link>

                        <div className="hidden lg:flex items-center justify-center">
                          <Link
                            className="rounded-xl text-[white] primary_bg  2xl:px-8 2xl:py-3 lg:px-3 lg:py-[6px] px-8 py-3 text-[18px] lg:text-sm  hover:opacity-85 font-medium mx-2"
                            to="/signup"
                          >
                            Sign Up
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                  {isAuthenticated && (
                    <div className="relative">
                      <div className="flex items-center">
                        <button
                          // onClick={() => navigate(`/profile/${user?._id}`)}
                          onClick={handleDropdownToggle("contact")}
                          className="w-10 h-10 text-lg border border-orange-500 flex justify-center items-center rounded-full"
                        >
                          {user?.image ? (
                            <img
                              src={user?.image_url}
                              alt="Avatar"
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <span className="text-white font-bold">
                              {`${user?.name?.slice(0, 2)}`}
                            </span>
                          )}
                        </button>
                        <div></div>
                      </div>
                    </div>
                  )}
                  <div className="block lg:hidden">
                    <button
                      className="rounded p-2 text-white transition hover:text-gray-600/75"
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </button>
                  </div>
                  {/* {isAuthenticated ? (
                    <div onClick={handleLogOut} className="hidden lg:block ml-4">
                      <LogoutOutlined className="primary_text rounded-full hover:scale-105" />
                    </div>
                  ) : (
                    <div></div>
                  )} */}
                </div>
              </div>
            </div>
            {/* Mobile Menu with Modern Design */}
            <div
              className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMenuOpen ? "visible" : "invisible"
                }`}
            >
              {/* Semi-transparent overlay */}
              <div
                className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              />

              {/* Menu content */}
              <div
                className={`absolute bg-white top-0 left-0 w-full h-full shadow-lg transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-y-0" : "-translate-y-full"
                  }`}
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <span className="text-lg font-bold text-gray-800">Menu</span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <nav className="flex bg-white flex-col p-4 space-y-6 absolute w-full z-20">
                  <ul className="text-lg">
                    {[
                      { key: "nav.about", to: "/about" },
                      { key: "nav.tour", to: "/tours" },
                      { key: "nav.countries", to: "/countries" },
                      { key: "nav.blog", to: "/blog" },
                      { key: "nav.faq", to: "/faq" },
                      { key: "nav.contact", to: "/contact" },
                    ].map((item, index) => (
                      <li key={index}>
                        <div className="relative group">
                          <div className="flex items-center pr-8">
                            <NavLink
                              onClick={() => setIsMenuOpen(false)}
                              to={item.to}
                              className="block px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 hover:text-gray-600"
                            >
                              {texts[item.key]}
                            </NavLink>
                            {user?.role === "admin" && (
                              <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 group-hover:opacity-100 hover:text-orange-400"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleEditClick(
                                    item.key,
                                    texts[item.key],
                                    texts[`${item.key}_id`]
                                  );
                                }}
                              >
                                <FaEdit size={16} />
                              </button>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {!isAuthenticated ? (
                    <div className="grid gap-2 grid-cols-2">
                      <div className="relative group">
                        <button
                          className="rounded-xl bg-white primary_text px-8 py-4 text-[18px] xl:text-sm hover:bg-orange-50  font-medium mx-2 text-center border border-orange-600 w-full mb-2"
                          onClick={() => navigate("/login")}
                        >
                          {texts["nav.login"]}
                        </button>
                        {user?.role === "admin" && (
                          <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:opacity-100 hover:text-orange-400"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleEditClick(
                                "nav.login",
                                texts["nav.login"],
                                texts["nav.login_id"]
                              );
                            }}
                          >
                            <FaEdit size={16} />
                          </button>
                        )}
                      </div>
                      <div className="relative group">
                        <button
                          className="rounded-xl text-[white] primary_bg px-8 py-4 text-[18px] xl:text-sm hover:opacity-85 font-medium mx-2 text-center w-full"
                          onClick={() => navigate("/signup")}
                        >
                          {texts["nav.signup"]}
                        </button>
                        {user?.role === "admin" && (
                          <button
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:opacity-100 hover:text-orange-400"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleEditClick(
                                "nav.signup",
                                texts["nav.signup"],
                                texts["nav.signup_id"]
                              );
                            }}
                          >
                            <FaEdit size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="relative group">
                      <button
                        className="rounded-xl text-[white] primary_bg px-8 py-4 text-[18px] xl:text-sm hover:opacity-85 font-medium mx-2 text-center w-full"
                        onClick={handleLogOut}
                      >
                        {texts["nav.logout"]}
                      </button>
                      {user?.role === "admin" && (
                        <button
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:opacity-100 hover:text-orange-400"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleEditClick(
                              "nav.logout",
                              texts["nav.logout"],
                              texts["nav.logout_id"]
                            );
                          }}
                        >
                          <FaEdit size={16} />
                        </button>
                      )}
                    </div>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </ParentComponent>
      </header>

      {/* Edit Modal */}
      {editModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-96 max-w-[90%] relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes size={20} />
            </button>

            {/* Modal content */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Edit Text
              </h3>
              {/* <p className="text-sm text-gray-600">Editing: {editModal.key}</p> */}
            </div>

            {/* Edit form */}
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

              {/* Action buttons */}
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
    </>
  );
};

export default Navbar;
