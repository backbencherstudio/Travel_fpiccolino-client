import { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import ReviewModal from "./ReviewModal";

const TourSlider = ({ userData, title, id, userType }) => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageId, setPackageId] = useState("");
  const [orderId, setOrderId] = useState("");

  // Italian translations for tour status
  const tourStatusTranslations = {
    "On Going Tours": "Tour in Corso",
    "Pending Tours": "Tour in Attesa",
    "Completed Tours": "Tour Completati",
  };

  // Function to get Italian translation
  const getItalianTitle = (englishTitle) => {
    return tourStatusTranslations[englishTitle] || englishTitle;
  };

  if (!userData?.length) {
    return (
      <div>
        <h1 className="mt-5 text-[16px] font-medium primary_text">
          {getItalianTitle(title)} (0)
        </h1>
        <div className="my-10 py-10 text-center border border-dashed border-gray-300 rounded-lg">
          <p className="primary_text">
            Non hai nessun {getItalianTitle(title)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mt-5 text-[16px] primary_text font-medium">
        {getItalianTitle(title)} {`(${userData?.length})`}
      </h1>
      <div className="mt-5 border-t pt-3">
        <Swiper
          spaceBetween={15}
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
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
        >
          {userData?.map((item) => (
            <div key={item._id}>
              <SwiperSlide
                className="cursor-pointer"
                onClick={() => {
                  navigate(`/tours/${item?.packageData?._id}`);
                }}
              >
                <img
                  src={
                    item?.packageData?.images[0] || "default-placeholder.jpg"
                  }
                  alt="package"
                  className="w-[172px] h-[120px] rounded-lg object-cover"
                />
                <p className="py-2">
                  {item?.packageData?.destination || "Unknown Destination"}
                </p>
                {userType === "user" && title === "Completed Tours" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsModalOpen(true);
                      setPackageId(item?.packageData?._id);
                      setOrderId(item?.orderId);
                    }}
                    className="primary_bg text-white px-3 py-1 rounded hover:opacity-85"
                  >
                    Aggiungi recensione
                  </button>
                )}
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
        <div className="m-4 text-end">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className={`p-3 m-1 ${
              isBeginning
                ? "bg-[#fdf0ea] primary_text"
                : "border bg-white text-black shadow"
            } w-10 h-10 rounded-md transition-opacity `}
            disabled={isBeginning}
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className={`p-3 m-1 ${
              isEnd
                ? "bg-[#fdf0ea] primary_text"
                : "border bg-white text-black shadow"
            }  rounded-md w-10 h-10`}
            disabled={isEnd}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageId={packageId}
        userId={id}
      />
    </div>
  );
};

export default TourSlider;
