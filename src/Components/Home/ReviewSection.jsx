import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import { FaArrowLeft, FaArrowRight, FaEdit } from "react-icons/fa";
import ReviewCard from "./ReviewCard";
import { useDispatch, useSelector } from "react-redux";
import { getReview } from "../../features/review/reviewSlice";
import { updateText } from "../../features/texts/textsSlice";

const ReviewSection = ({ reviews, texts }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authorization);
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const { review } = useSelector((state) => state.review);
  const [editModal, setEditModal] = useState({
    show: false,
    key: "",
    value: "",
    originalValue: "",
  });

  useEffect(() => {
    dispatch(getReview());
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, [review]);

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
    <div className="bg-[#EFFBFB] mt-20 lg:p-20 p-5 ">
      <ParentComponent>
        <div className="text-center ">
          <div>
            <h2 className="font-duera-expanded text-[#000000] text-[30px] lg:text-[32px] font-extrabold leading-[41.6px] text-center decoration-skip-ink md:w-[70%] lg:w-[45%] xl:w-[35%] mx-auto relative group flex justify-center items-center">
              {texts["review.section.title"] || reviews?.title}
              {user?.role === "admin" && (
                <button
                  className="ml-5 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                  onClick={() =>
                    handleEditClick(
                      "review.section.title",
                      texts["review.section.title"] || reviews?.title
                    )
                  }
                >
                  <FaEdit size={16} />
                </button>
              )}
            </h2>

            <div className="flex justify-center items-center group gap-5">
              <p className="font-poppins text-[#72777F] text-[18px] font-normal leading-[27px] text-center decoration-skip-ink mt-2">
                {texts["review.section.description"] || reviews?.description}
              </p>
              {user?.role === "admin" && (
                <button
                  className="text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                  onClick={() =>
                    handleEditClick(
                      "review.section.description",
                      texts["review.section.description"] ||
                        reviews?.description
                    )
                  }
                >
                  <FaEdit size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-12">
          <div className="mt-14 md:col-span-11">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
              onSlideChange={(swiper) => {
                setIsBeginning(swiper.isBeginning);
                setIsEnd(swiper.isEnd);
              }}
            >
              {review.reviews?.slice(0, 15).map((item, index) => (
                <SwiperSlide key={`review-${item._id}`}>
                  <ReviewCard item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="relative mt-5">
            <div className="md:absolute bottom-0">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className={`p-2.5 m-1 ${
                  isBeginning
                    ? "bg-white primary_text"
                    : "primary_bg text-white "
                } w-9 h-9 rounded-full transition-opacity z-20`}
                disabled={isBeginning}
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className={`p-2.5 z-20 m-1 h-9 w-9 ${
                  isEnd ? "bg-white primary_text" : "primary_bg text-white "
                } rounded-full transition-opacity`}
                disabled={isEnd}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
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

export default ReviewSection;
