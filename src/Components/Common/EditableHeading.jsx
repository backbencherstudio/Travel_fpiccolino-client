import { FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { updateText } from "../../features/texts/textsSlice";
import toast from "react-hot-toast";

const EditableHeading = ({
  titleKey,
  subtitleKey,
  defaultTitle = "Explore Our Amazing Tours",
  defaultSubtitle,
  customTitleClass = "font-duera-expanded text-[#000000] text-[30px] lg:text-[32px] font-extrabold leading-[41.6px] text-center",
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authorization);
  const { texts } = useSelector((state) => state.texts);

  const [editModal, setEditModal] = useState({
    show: false,
    key: "",
    value: "",
    originalValue: "",
  });

  const handleEditClick = (e, key, value) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    setEditModal({
      show: true,
      key,
      value: texts[key] || value,
      originalValue: texts[key] || value,
    });
  };

  const handleTextUpdate = async (e) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    try {
      await dispatch(
        updateText({
          key: editModal.key,
          value: editModal.value,
        })
      ).unwrap();
      toast.success("Text updated successfully");
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
    <>
      <div>
        <h2
          className={`decoration-skip-ink relative group ${customTitleClass}`}
        >
          {texts[titleKey] || defaultTitle}
          {user?.role === "admin" && (
            <button
              className="ml-1 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
              onClick={(e) => handleEditClick(e, titleKey, texts[titleKey])}
            >
              <FaEdit size={16} />
            </button>
          )}
        </h2>
        {defaultSubtitle && (
          <div className="flex justify-center items-center group gap-5">
            <p className="font-poppins text-[#72777F] text-[18px] font-normal leading-[27px] text-center decoration-skip-ink mt-2">
              {texts[subtitleKey] || defaultSubtitle}
            </p>
            {user?.role === "admin" && (
              <button
                className="text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                onClick={(e) =>
                  handleEditClick(e, subtitleKey, texts[subtitleKey])
                }
              >
                <FaEdit size={16} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editModal.show && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setEditModal({ show: false, key: "", value: "" });
          }}
        >
          <div
            className="bg-white p-6 rounded-lg lg:w-[30%] w-[75%] relative"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <h3 className="text-lg font-semibold mb-4">Edit Text</h3>
            <textarea
              type="text"
              value={editModal.value}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setEditModal((prev) => ({ ...prev, value: e.target.value }));
              }}
              className="w-full p-2 border rounded mb-4 "
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setEditModal({ show: false, key: "", value: "" });
                }}
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
    </>
  );
};

export default EditableHeading;
