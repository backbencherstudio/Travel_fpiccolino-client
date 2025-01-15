import React, { useState } from "react";
import search from "../../assets/search.svg";
import { getPackage } from "../../features/pckage/packageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCountry } from "../../features/country/countrySlice";

// Sample data for the dropdown
const destinations = [
  "Paris, France",
  "New York, USA",
  "Tokyo, Japan",
  "Sydney, Australia",
  "London, UK",
  "Rome, Italy",
  "Barcelona, Spain",
];

const SearchBar = ({ countries }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { packag } = useSelector((state) => state.package);
  const [id, setId] = useState(null);
  const handleSearchChange = (e) => {
    const query = e.target.value;
    console.log(packag);
    setSearchQuery(query);
    if (query.trim() === "") {
      setDropdownVisible(false);
    } else {
      dispatch(
        getPackage({ search: e.target.value, startDate: "", endDate: "" })
      );
      setDropdownVisible(packag.length > 0);
    }
  };

  const handleDestinationSelect = (id, destination) => {
    setId(id);
    setSearchQuery(destination);
    setDropdownVisible(false);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".dropdown")) {
      setDropdownVisible(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
  const handleNavigateDestination = () => {
    countries?.data?.map((value) => {
      if (value.name == searchQuery) {
        navigate(`/tours/country/${value._id}`);
      }
    });
  };
  return (
    <div className="lg:h-[120px] -mt-[50px] mx-5 lg:mx-0">
      <div className="max-w-[960px] mx-auto shadow-xl p-5 relative bg-white rounded-lg lg:rounded-full lg:h-[88px]">
        <div className="flex lg:flex-row w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="h-12 w-full lg:w-[80%] px-4 rounded-full focus:border focus:border-orange-500 focus:outline-none"
            placeholder="What's Your Next Destination?"
          />
          {/* <input
            type="text"
            className="h-12 lg:w-[380px] lg:border-l border-t lg:border-t-0 lg:mt-0 mt-1 px-4"
            placeholder="When do you plan to depart?"
          /> */}
        </div>
        <button
          onClick={() => handleNavigateDestination()}
          className="primary_bg hover:opacity-85 text-white px-8 py-3 lg:top-5 lg:absolute right-5 rounded-full text-[18px] w-full lg:w-auto mt-5 lg:mt-0"
        >
          <div className="flex gap-1.5 justify-center ">
            <img src={search} alt="Search" /> Search
          </div>
        </button>

        {/* Dropdown for search suggestions */}
        {isDropdownVisible && packag.length > 0 && (
          <div className="dropdown absolute right-0 z-10 bg-white border border-gray-300 w-full mt-2 rounded-md shadow-lg">
            <ul className="max-h-60 overflow-y-auto">
              {packag?.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() =>
                    handleDestinationSelect(item?._id, item?.country)
                  }
                >
                  {item?.country}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
