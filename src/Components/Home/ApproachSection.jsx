import { useEffect, useState } from "react";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateText } from "../../features/texts/textsSlice";
import { base_url } from "../../utils/base_path";
import { fetchApproachData } from "../../features/approach/approachSlice";

const ApproachSection = ({ texts, aboutWithoutContent }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authorization);
  const { logos: approachData } = useSelector((state) => state.approach);
  useEffect(() => {
    dispatch(fetchApproachData());
  }, []);
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
        <div className="mt-[80px] mb-[100px] lg:mb-0">
          <div className="text-center">
            <div>
              <h2 className="font-duera-expanded text-[#000000] text-[30px] lg:text-[32px] font-extrabold leading-[41.6px] text-center decoration-skip-ink md:w-[70%] lg:w-[45%] xl:w-[35%] mx-auto relative group">
                {texts["approach.section.title"] || aboutWithoutContent?.title}
                {user?.role === "admin" && (
                  <button
                    className="ml-5 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                    onClick={() =>
                      handleEditClick(
                        "approach.section.title",
                        texts["approach.section.title"] ||
                          aboutWithoutContent?.title
                      )
                    }
                  >
                    <FaEdit size={16} />
                  </button>
                )}
              </h2>

              <div className="flex justify-center items-center group gap-5">
                <p className="font-poppins text-[#72777F] text-[18px] font-normal leading-[27px] text-center decoration-skip-ink mt-2">
                  {texts["approach.section.description"] ||
                    aboutWithoutContent?.description}
                </p>
                {user?.role === "admin" && (
                  <button
                    className="text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                    onClick={() =>
                      handleEditClick(
                        "approach.section.description",
                        texts["approach.section.description"] ||
                          aboutWithoutContent?.description
                      )
                    }
                  >
                    <FaEdit size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[60px] mt-14">
            {approachData?.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center">
                  <img
                    src={`${base_url}/${item.logo}`}
                    alt={item.name}
                    className="h-[100px] w-[100px] object-contain"
                  />
                </div>
                <h1 className="primary_text font-bold text-[32px]">
                  {item.name}
                </h1>
                <p className="text-[#72777F] text-[14px] max-w-[375px] mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ParentComponent>

      {/* Edit Modal */}
      {editModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg lg:w-[30%] w-[75%] relative">
            <h3 className="text-lg font-semibold mb-4">Edit Text</h3>
            <textarea
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

export default ApproachSection;
