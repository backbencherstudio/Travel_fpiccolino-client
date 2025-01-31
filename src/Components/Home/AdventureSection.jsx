import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import TureCard from "../ToursComponents/TureCard";
import { FaAngleLeft, FaAngleRight, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateText } from "../../features/texts/textsSlice";
import EditableHeading from "../Common/EditableHeading";

const AdventureSection = ({ cardDetails, texts }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authorization);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
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
    <div className="bg-[#EFFBFB] lg:p-20 p-5 ">
      <ParentComponent>
        <div className="text-center mb-14">
          <EditableHeading
            titleKey="home.adventure.title"
            subtitleKey="home.adventure.description"
            defaultTitle="Adventure Tours Here"
            defaultSubtitle="Explore the world with our adventure tours. From hiking in the mountains to snorkeling in the sea, we have something for everyone."
          />
        </div>
        <div className="relative">
          <div className="mb-4">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className={`p-2.5 m-1  ${
                isBeginning
                  ? "bg-zinc-300 text-zinc-400"
                  : "bg-white text-[#F8D0BF]"
              } w-9 h-9 rounded-full transition-opacity -left-7 absolute top-[35%] z-20`}
              disabled={isBeginning}
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className={`p-2.5 m-1 ${
                isEnd ? "bg-zinc-300 text-zinc-400" : "bg-white text-[#F8D0BF] "
              }  rounded-full transition-opacity absolute top-[35%] -right-7 z-20 `}
              disabled={isEnd}
            >
              <FaAngleRight />
            </button>
          </div>
          <div className="mt-14">
            <Swiper
              spaceBetween={30}
              slidesPerView={5}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              // className="w-full"
              breakpoints={{
                320: {
                  slidesPerView: 1, // For very small mobile screens (320px)
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 1.5, // Small devices (e.g., iPhone SE, 480px width)
                  spaceBetween: 15,
                },
                640: {
                  slidesPerView: 2, // Mobile devices (640px width)
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3, // Tablets (768px width)
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4, // Desktop and larger screens (1024px and up)
                  spaceBetween: 20,
                },
                1400: {
                  slidesPerView: 5, // Desktop and larger screens (1024px and up)
                  spaceBetween: 20,
                },
              }}
            >
              {cardDetails?.data?.map((item) => (
                <SwiperSlide key={`adventure-${item._id}`}>
                  <Link to={`/tours/${item._id}`}>
                    <TureCard
                      item={item}
                      texts={texts}
                      handleEditClick={(key, value) => {
                        handleEditClick(key, value);
                      }}
                    />
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Edit Modal */}
        {editModal.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
            <div className="bg-white p-6 rounded-lg w-96 relative">
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
      </ParentComponent>
    </div>
  );
};

export default AdventureSection;
