import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ParentComponent from "./ParentComponent/ParentComponent";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../features/auth/authSlice";
import { FaRegUserCircle } from "react-icons/fa";
import { LogoutOutlined } from "@mui/icons-material";
import { MdOutlineDashboard } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contactDropDown, setContactDropDown] = useState(false);
  const [languageDropDown, setLanguageDropDown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isloginOpen, setLoginOpen] = useState(false);

  const { user, isAuthenticated } = useSelector((state) => state.authorization);

  const ProfileRef = useRef();
  const menuRef = useRef();
  const buttonRef = useRef();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setContactDropDown(false);
      setLanguageDropDown(false);
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        ProfileRef.current &&
        !ProfileRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
        setLoginOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // console.log(first)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isMenuOpen]);
  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/");
    setIsMenuOpen(false);
  };
  return (
    <header className="z-30 fixed w-full nav-style py-2 banner_style">
      <ParentComponent>
        <div className="">
          <div className="flex lg:gap-6 h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="block text-teal-600" to="/">
                <img src={logo} alt="" className=" w-36" />
              </Link>
            </div>

            <div className="hidden lg:block">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 primary_text">
                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) =>
                        isActive ? "active" : "text-[#ffffff]"
                      }
                    >
                      {" "}
                      About{" "}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/tours"
                      className={({ isActive }) =>
                        isActive ? "active" : "text-[#ffffff]"
                      }
                    >
                      {" "}
                      Tour{" "}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/blog"
                      className={({ isActive }) =>
                        isActive ? "active" : "text-[#ffffff]"
                      }
                    >
                      {" "}
                      Blog{" "}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/faq"
                      className={({ isActive }) =>
                        isActive ? "active" : "text-[#ffffff]"
                      }
                    >
                      {" "}
                      FAQ{" "}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/policy"
                      className={({ isActive }) =>
                        isActive ? "active" : "text-[#ffffff]"
                      }
                    >
                      {" "}
                      Policy{" "}
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                        isActive ? "active" : "text-[#ffffff]"
                      }
                    >
                      {" "}
                      Contact{" "}
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-3 xl:gap-[6px] items-center">
                {/* Language Dropdown */}
                <div className="relative inline-block text-left">
                  <button
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-[18px] primary_text mt-2"
                    onClick={handleDropdownToggle("language")}
                  >
                    EN
                    <svg
                      className="-mr-1 size-5 w-6 h-6 text-[#e86731]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {languageDropDown && (
                    <div className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                      <div className="py-1">
                        <Link
                          to="#"
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          English
                        </Link>
                        <Link
                          to="#"
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          Spanish
                        </Link>
                        <Link
                          to="#"
                          className="block px-4 py-2 text-sm text-gray-700"
                        >
                          French
                        </Link>
                      </div>
                    </div>
                  )}
                  {contactDropDown && (
                    <div className="absolute -right-10 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                      <div className="py-1">
                        <button
                          onClick={() => navigate(`/profile/${user?._id}`)}
                          className=" px-4 py-2 w-full text-start hover:bg-[#fdf0ea] text-sm text-gray-700 flex items-center gap-3"
                        >
                          <FaRegUserCircle size={20} /> Profile
                        </button>
                        {user?.role === "admin" && (
                          <button
                            onClick={() => {
                              localStorage.setItem("tab", "Dashboard");
                              navigate("/dashboard");
                            }}
                            className="flex gap-3 px-4 py-2 w-full hover:bg-[#fdf0ea] text-sm text-gray-700"
                          >
                            <MdOutlineDashboard size={20} /> Dashboard
                          </button>
                        )}
                        <button
                          onClick={handleLogOut}
                          className="flex gap-3 px-4 py-2 w-full hover:bg-[#fdf0ea] text-sm primary_text"
                        >
                          <LogoutOutlined size={20} />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="hidden lg:block">
                  {!isAuthenticated && (
                    <div className="flex xl:gap-3">
                      <Link
                        className="rounded-xl primary_text bg-transparent border  px-8 py-3 text-[18px] xl:text-sm hover:bg-[#63280141] font-medium mx-2 border-orange-600"
                        to="/login"
                      >
                        Login
                      </Link>

                      <div className="hidden lg:flex items-center justify-center">
                        <Link
                          className="rounded-xl text-[white] primary_bg  px-8 py-3 text-[18px] xl:text-sm hover:opacity-85 font-medium mx-2"
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
                    ref={buttonRef}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
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
            className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
              isMenuOpen ? "visible" : "invisible"
            }`}
          >
            {/* Semi-transparent overlay */}
            <div
              className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                isMenuOpen ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu content */}
            <div
              ref={menuRef}
              className={`absolute bg-white top-0 left-0 w-full h-full shadow-lg transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "translate-y-0" : "-translate-y-full"
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
                <ul className="text-lg ">
                  {[
                    { name: "About", to: "/about" },
                    { name: "Tour", to: "/tours" },
                    { name: "Blog", to: "/blog" },
                    { name: "FAQ", to: "/faq" },
                    { name: "Contact", to: "/contact" },
                  ].map((item, index) => (
                    <li key={index}>
                      <NavLink
                        onClick={() => setIsMenuOpen(false)}
                        to={item.to}
                        className="block px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 hover:text-gray-600"
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <div className="relative"></div>
                  </li>
                </ul>
                {!isAuthenticated ? (
                  <div className="flex flex-col">
                    <Link
                      className="rounded-xl primary_text bg-transparent border px-8 py-4 text-[18px] xl:text-sm hover:bg-[#63280141] font-medium m-2 border-orange-600 text-center"
                      to="/login"
                    >
                      Login
                    </Link>
                    <Link
                      className="rounded-xl text-[white] primary_bg  px-8 py-4 text-[18px] xl:text-sm hover:opacity-85 font-medium m-2 text-center"
                      to="/signup"
                    >
                      Sign Up
                    </Link>
                  </div>
                ) : (
                  <button
                    className="rounded-xl text-[white] primary_bg  px-8 py-4 text-[18px] xl:text-sm hover:opacity-85 font-medium mx-2 text-center"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </button>
                )}
              </nav>
            </div>
          </div>
        </div>
      </ParentComponent>
    </header>
  );
};

export default Navbar;
