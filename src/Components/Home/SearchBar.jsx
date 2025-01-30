import React, { useState } from "react";
import search from "../../assets/search.svg";
import { getPackage } from "../../features/pckage/packageSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { updateText } from "../../features/texts/textsSlice";

const SearchBar = ({ countries, texts, isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { packag } = useSelector((state) => state.package);
  const { user } = useSelector((state) => state.authorization);
  const [id, setId] = useState(null);
  const [editModal, setEditModal] = useState({
    show: false,
    id: "",
    key: "",
    value: "",
    originalValue: "",
  });

  const handleEditClick = (key, value, id) => {
    setEditModal({
      show: true,
      id,
      key,
      value: texts[key] || value,
      originalValue: texts[key] || value,
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
        show: false,
        id: "",
        key: "",
        value: "",
        originalValue: "",
      });
    } catch (error) {
      console.error("Error updating text:", error);
      alert("Failed to update text. Please try again.");
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
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
          <div className="relative group w-full lg:w-[80%]">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="h-12 w-full px-4 rounded-full focus:border focus:border-orange-500 focus:outline-none"
              placeholder={
                isLoading
                  ? "Loading..."
                  : texts["search.placeholder"] ||
                    "Qual è la tua prossima destinazione?"
              }
            />
            {user?.role === "admin" && (
              <button
                className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                onClick={() =>
                  handleEditClick(
                    "search.placeholder",
                    texts["search.placeholder"],
                    texts["search.placeholder_id"]
                  )
                }
              >
                <FaEdit size={16} />
              </button>
            )}
          </div>
        </div>
        <div className=" group">
          <button
            onClick={() => handleNavigateDestination()}
            className="primary_bg hover:opacity-85 text-white px-8 py-3 lg:top-5 lg:absolute right-5 rounded-full text-[18px] w-full lg:w-auto mt-5 lg:mt-0"
          >
            <div className="flex gap-1.5 justify-center">
              <img src={search} alt="Search" />
              {isLoading ? "Loading..." : texts["search.button"] || "Cerca"}
            </div>
          </button>
          {user?.role === "admin" && (
            <button
              className="absolute right-0.5 top-1/2 -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
              onClick={() =>
                handleEditClick(
                  "search.button",
                  texts["search.button"],
                  texts["search.button_id"]
                )
              }
            >
              <FaEdit size={16} />
            </button>
          )}
        </div>

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

      {/* Edit Modal */}
      {editModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h3 className="text-lg font-semibold mb-4">Edit Text</h3>
            <input
              type="text"
              value={editModal.value}
              onChange={(e) =>
                setEditModal((prev) => ({ ...prev, value: e.target.value }))
              }
              className="w-full p-2 border rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  setEditModal({ show: false, id: "", key: "", value: "" })
                }
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleTextUpdate}
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
