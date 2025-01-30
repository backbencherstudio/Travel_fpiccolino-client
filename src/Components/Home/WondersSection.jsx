/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import WonderCard from "./WonderCard";
import { getSectionData } from "../../features/sectionTitle/sectionTitleSlice";
import { updateText } from "../../features/texts/textsSlice";

const WondersSection = ({ countrySection, texts }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authorization);
  const [editModal, setEditModal] = useState({
    show: false,
    key: "",
    value: "",
    originalValue: "",
  });

  const handleEditClick = (key, value) => {
    setEditModal({
      show: true,
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
        key: "",
        value: "",
        originalValue: "",
      });
    } catch (error) {
      console.error("Error updating text:", error);
      alert("Failed to update text. Please try again.");
    }
  };

  return (
    <div>
      <ParentComponent>
        <div className="mt-[100px] mb-[56px]">
          <div className="text-center ">
            <div>
              <h2 className="font-duera-expanded text-[#000000] text-[30px] lg:text-[32px] font-extrabold leading-[41.6px] text-center decoration-skip-ink md:w-[70%] lg:w-[45%] xl:w-[35%] mx-auto relative group">
                {texts["wonders.section.title"] || countrySection.title}
                {user?.role === "admin" && (
                  <button
                    className="ml-5 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                    onClick={() =>
                      handleEditClick(
                        "wonders.section.title",
                        texts["wonders.section.title"] || countrySection.title
                      )
                    }
                  >
                    <FaEdit size={16} />
                  </button>
                )}
              </h2>

              <div className="flex justify-center items-center group gap-5">
                <p className="font-poppins text-[#72777F] text-[18px] font-normal leading-[27px] text-center decoration-skip-ink mt-2">
                  {texts["wonders.section.description"] ||
                    countrySection.description}
                </p>
                {user?.role === "admin" && (
                  <button
                    className=" text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                    onClick={() =>
                      handleEditClick(
                        "wonders.section.description",
                        texts["wonders.section.description"] ||
                          countrySection.description
                      )
                    }
                  >
                    <FaEdit size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          {countrySection?.data?.length > 1 && (
            <div className="grid grid-col-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-3">
                <WonderCard item={countrySection?.data[0]} />
              </div>
              <div className="md:col-span-2">
                <WonderCard item={countrySection?.data[1]} />
              </div>
            </div>
          )}
          {countrySection?.data?.length >= 5 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
              {countrySection?.data?.slice(2, 5).map((item, index) => (
                <div key={index}>
                  <WonderCard item={item} />
                </div>
              ))}
            </div>
          )}
          {countrySection?.data?.length >= 6 && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <WonderCard item={countrySection?.data[4]} />
              </div>
              <div className="md:col-span-3">
                <WonderCard item={countrySection?.data[5]} />
              </div>
            </div>
          )}
        </div>
      </ParentComponent>

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
                  setEditModal({ show: false, key: "", value: "" })
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

export default WondersSection;
