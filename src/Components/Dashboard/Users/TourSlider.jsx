import { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaSearch } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

const TourSlider = ({ title, userData, id, dateFilter, setDateFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  // Convert id to a number safely
  const numericId = Number(id);

  // Safely get user tours data
  const userToursData = userData?.[numericId - 1]?.tourData || [];

  return (
    <div>
      <h1 className="mt-3 text-[16px] font-medium">
        {title} {` (${userToursData.length || 0})`}
      </h1>
      <div className="flex justify-between items-center my-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute top-3 left-3 text-zinc-400" />
        </div>
        <select
          className=""
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            border: "1px solid #e86731",
            borderRadius: "4px",
            color: "#e86731",
          }}
        >
          <option value="all">All</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

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
          {userToursData.map((item) => (
            <div key={item._id}>
              <SwiperSlide>
                <img
                  src={item.destinationImg || "default-placeholder.jpg"}
                  alt={item.destination || "No destination"}
                  className="w-[172px] h-[120px] rounded-lg"
                />
                <p>{item.destination || "Unknown Destination"}</p>
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
    </div>
  );
};

export default TourSlider;
