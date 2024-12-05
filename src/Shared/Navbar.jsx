import  { useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.svg';
import languageLogo from '../assets/Language.svg';
import { Link, NavLink } from 'react-router-dom';
import ParentComponent from './ParentComponent/ParentComponent';

const Navbar = () => {
    const [contactDropDown, setContactDropDown] = useState(false);
    const [languageDropDown, setLanguageDropDown] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef();
    const buttonRef = useRef();

    // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setContactDropDown(false);
      setLanguageDropDown(false);
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
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
        document.body.style.overflowY = 'hidden';
    } else {
        document.body.style.overflowY = 'auto';
    }
}, [isMenuOpen]);

  const handleDropdownToggle = (dropdownType) => (e) => {
    e.stopPropagation(); // Prevent triggering the document click listener
    if (dropdownType === 'contact') {
      setContactDropDown(!contactDropDown);
      setLanguageDropDown(false); // Close other dropdown
    } else if (dropdownType === 'language') {
      setLanguageDropDown(!languageDropDown);
      setContactDropDown(false); // Close other dropdown
    }
  };

  return (
    <header className="z-30 fixed w-full nav-style pt-4 banner_style">
    <ParentComponent>
    <div className="">
            <div className="flex lg:gap-6 h-16 items-center justify-between">
                <div className="md:flex md:items-center md:gap-12">
                    <Link className="block text-teal-600" to="/">
                        <img src={logo} alt="" className=' w-36' />
                    </Link>
                </div>

                <div className="hidden lg:block">
                    <nav aria-label="Global">
                    <ul className="flex items-center gap-6 primary_text">
                        <li>
                        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : "text-[#ffffff]"}> About </NavLink>
                        </li>

                        <li>
                        <NavLink to="/tours" className={({ isActive }) => isActive ? "active" : "text-[#ffffff]"}> Tour </NavLink>
                        </li>
                        <li>
                        <NavLink to="/blog"  className={({ isActive }) => isActive ? "active" : "text-[#ffffff]"}> Blog </NavLink>
                        </li>
                        <li>
                        <NavLink to="/cruises" className={({ isActive }) => isActive ? "active" : "text-[#ffffff]"}> FAQ </NavLink>
                        </li>

                        <li>
                        <NavLink to="/packages"  className={({ isActive }) => isActive ? "active" : "text-[#ffffff]"}> Contact </NavLink>
                        </li>
                    
                    </ul>
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <div className='flex gap-6 xl:gap-[6px] items-center'>
                        {/* Language Dropdown */}
                        <div className="relative inline-block text-left">
                            <button
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-[18px] primary_text mt-2"
                                onClick={handleDropdownToggle('language')}
                            >
                               EN
                                <svg className="-mr-1 size-5 w-6 h-6 text-[#e86731]" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 011.06 0L10 11.94l3.72-3.72a.75.75 0 011.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.22 9.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                            {languageDropDown && (
                                <div className="absolute right-0 z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black/5">
                                <div className="py-1">
                                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700">English</Link>
                                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700">Spanish</Link>
                                    <Link to="#" className="block px-4 py-2 text-sm text-gray-700">French</Link>
                                </div>
                                </div>
                            )}
                        </div>
                        <div className=' hidden lg:block'>
                            <div className="flex xl:gap-6">
                                <Link
                                    className="rounded-xl primary_text bg-transparent border border-primary  px-8 py-4 text-[18px] xl:text-sm font-medium mx-2 border-orange-600"
                                    to="/login"
                                >
                                    Login
                                </Link>

                                <div className="hidden lg:flex items-center justify-center">
                                    <Link
                                    className="rounded-xl text-[white] primary_bg  px-8 py-4 text-[18px] xl:text-sm font-medium mx-2"
                                    to="/signup"
                                    >
                                    Sign Up
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="block lg:hidden">
                            <button className="rounded p-2 text-white transition hover:text-gray-600/75" ref={buttonRef} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
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
                    { name: "about", to: "/about" },
                    { name: "Tour", to: "/tours" },
                    { name: "Blog", to: "/blog" },
                    { name: "FAQ", to: "/faq" },
                    { name: "Contact", to: "/contact" },
                    ].map((item, index) => (
                    <li key={index}>
                        <NavLink
                        to={item.to}
                        className="block px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100 hover:text-gray-600"
                        >
                        {item.name}
                        </NavLink>
                    </li>
                    ))}
                    <li>
                    <div className="relative">
                      
                    </div>
                    </li>
                </ul>
                <div className="flex flex-col gap-4 mt-6">
                    <Link
                    to="login"
                    className="block px-6 py-3 text-center text-gray-800 bg-white rounded-md z-30 hover:bg-gray-300 border border-orange-500"
                    >
                    Login
                    </Link>
                    <Link
                    to="/signup"
                    className="block px-6 py-3 text-center text-white bg-orange-500 rounded-md hover:bg-orange-600"
                    >
                    Sign Up
                    </Link>
                </div>
                </nav>
            </div>
            </div>

        </div>
    </ParentComponent>
    </header>
  )
}

export default Navbar