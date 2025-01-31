import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import CustomButton from "../../Shared/CustomButton";
import { base_url } from "../../utils/base_path";
import { useEffect, useState } from "react";
import { getBlog } from "../../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaEdit } from "react-icons/fa";
import { updateText } from "../../features/texts/textsSlice";

const JourneySection = ({ texts }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authorization);
  const { blogs } = useSelector((state) => state.blog);
  const [randomBlog, setRandomBlog] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true });
  const [editModal, setEditModal] = useState({
    show: false,
    key: "",
    value: "",
    originalValue: "",
  });

  useEffect(() => {
    dispatch(getBlog({ search: "", startDate: "", endDate: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (blogs.length > 0) {
      const randomIndex = Math.floor(Math.random() * blogs.length);
      setRandomBlog(blogs[randomIndex]);
    }
  }, [blogs]);

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

  if (!randomBlog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#fff] lg:p-20 lg:pt-0">
      <ParentComponent>
        <div className="mt-[100px]">
          <div className="relative group">
            <h2 className="font-duera-expanded text-[#000000] text-[30px] lg:text-[32px] font-extrabold leading-[41.6px] text-start decoration-skip-ink">
              {texts["journey.section.title"] ||
                "Il tuo viaggio, la nostra passione"}
              {user?.role === "admin" && (
                <button
                  className="ml-5 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                  onClick={() =>
                    handleEditClick(
                      "journey.section.title",
                      texts["journey.section.title"] ||
                        "Il tuo viaggio, la nostra passione"
                    )
                  }
                >
                  <FaEdit size={16} />
                </button>
              )}
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-[74px] mt-14">
            <div className="lg:col-span-2 h-[600px]">
              <img
                className="h-full object-cover rounded-[20px]"
                src={`${base_url}/uploads/${randomBlog.heroSection[0]?.headerImg}`}
                alt=""
              />
            </div>
            <div className="lg:col-span-3">
              <div className="text-[18px] w-full">
                {randomBlog.heroSection[0]?.text.slice(0, 200)}
                <br />
                {randomBlog.contentList[0]?.paragraphs?.map((para, index) => (
                  <div key={`para-${index}`} className="my-2">
                    {para.slice(0, 300)}
                  </div>
                ))}
              </div>
              <div className="mt-5 mb-8">
                {/* <CustomButton content={"Read More"} /> */}
              </div>
              <img
                className="h-[365px] w-full rounded-[20px] object-cover"
                src={`${base_url}/uploads/${randomBlog.contentList[0]?.image}`}
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          ref={ref}
          className="mt-14 mb-20 lg:mb-0 flex md:flex-row flex-col justify-center lg:gap-40 gap-10"
        >
          <div className="text-center group">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px] relative">
              {inView && (
                <CountUp
                  end={texts["journey.stats.experience.count"] || 10}
                  duration={2}
                />
              )}
              +
              {user?.role === "admin" && (
                <button
                  className="ml-2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400 absolute top-1/2 -translate-y-1/2"
                  onClick={() =>
                    handleEditClick(
                      "journey.stats.experience.count",
                      texts["journey.stats.experience.count"] || "10"
                    )
                  }
                >
                  <FaEdit size={16} />
                </button>
              )}
            </h1>
            <div className="text-[24px] text-[#72777F] mt-2 relative group">
              {texts["journey.stats.experience.text"] || "Anni di esperienza"}
              {user?.role === "admin" && (
                <button
                  className="ml-2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400 absolute top-1/2 -translate-y-1/2"
                  onClick={() =>
                    handleEditClick(
                      "journey.stats.experience.text",
                      texts["journey.stats.experience.text"] ||
                        "Anni di esperienza"
                    )
                  }
                >
                  <FaEdit size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="text-center group">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px] relative">
              {inView && (
                <CountUp
                  end={texts["journey.stats.trips.count"] || 500}
                  duration={2}
                />
              )}
              +
              {user?.role === "admin" && (
                <button
                  className="ml-2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400 absolute top-1/2 -translate-y-1/2"
                  onClick={() =>
                    handleEditClick(
                      "journey.stats.trips.count",
                      texts["journey.stats.trips.count"] || "500"
                    )
                  }
                >
                  <FaEdit size={16} />
                </button>
              )}
            </h1>
            <div className="text-[24px] text-[#72777F] mt-2 relative group">
              {texts["journey.stats.trips.text"] || "Viaggio completato"}
              {user?.role === "admin" && (
                <button
                  className="ml-2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400 absolute top-1/2 -translate-y-1/2"
                  onClick={() =>
                    handleEditClick(
                      "journey.stats.trips.text",
                      texts["journey.stats.trips.text"] || "Viaggio completato"
                    )
                  }
                >
                  <FaEdit size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="text-center group">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px] relative">
              {inView && (
                <CountUp
                  end={texts["journey.stats.reviews.count"] || 1500}
                  duration={2}
                />
              )}
              +
              {user?.role === "admin" && (
                <button
                  className="ml-2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400 absolute top-1/2 -translate-y-1/2"
                  onClick={() =>
                    handleEditClick(
                      "journey.stats.reviews.count",
                      texts["journey.stats.reviews.count"] || "1500"
                    )
                  }
                >
                  <FaEdit size={16} />
                </button>
              )}
            </h1>
            <div className="text-[24px] text-[#72777F] mt-2 relative group">
              {texts["journey.stats.reviews.text"] || "Recensioni felici"}
              {user?.role === "admin" && (
                <button
                  className="ml-2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400 absolute top-1/2 -translate-y-1/2"
                  onClick={() =>
                    handleEditClick(
                      "journey.stats.reviews.text",
                      texts["journey.stats.reviews.text"] || "Recensioni felici"
                    )
                  }
                >
                  <FaEdit size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="text-center group">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px] relative">
              {inView && (
                <CountUp
                  end={texts["journey.stats.rating.count"] || 99}
                  duration={2}
                />
              )}
              %
              {user?.role === "admin" && (
                <button
                  className="ml-2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400 absolute top-1/2 -translate-y-1/2"
                  onClick={() =>
                    handleEditClick(
                      "journey.stats.rating.count",
                      texts["journey.stats.rating.count"] || "99"
                    )
                  }
                >
                  <FaEdit size={16} />
                </button>
              )}
            </h1>
            <div className="text-[24px] text-[#72777F] mt-2 relative group">
              {texts["journey.stats.rating.text"] || "Valutazione di successo"}
              {user?.role === "admin" && (
                <button
                  className="ml-2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400 absolute top-1/2 -translate-y-1/2"
                  onClick={() =>
                    handleEditClick(
                      "journey.stats.rating.text",
                      texts["journey.stats.rating.text"] ||
                        "Valutazione di successo"
                    )
                  }
                >
                  <FaEdit size={16} />
                </button>
              )}
            </div>
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

export default JourneySection;
