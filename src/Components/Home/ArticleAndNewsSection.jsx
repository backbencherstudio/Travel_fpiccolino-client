import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import natureImage from "../../assets/natureImage.jpg";
import natureImage2 from "../../assets/natureImage2.jpg";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ArticleCard from "./ArticleCard";
const ArticleAndNewsSection = ({blogSection}) => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const cardDetails = [
    {
      image: natureImage,
      title: "Amalfi Coast Escape",
      tag: "Adventure Awaits",
      description: "Discover unique travel tips, guides, and inspiration.",
    },
    {
      image: natureImage2,
      title: "Amalfi Coast Escape",
      tag: "Adventure Awaits",
      description: "Discover unique travel tips, guides, and inspiration.",
    },
    {
      image: natureImage,
      title: "Amalfi Coast Escape",
      tag: "Adventure Awaits",
      description: "Discover unique travel tips, guides, and inspiration.",
    },
    {
      image: natureImage2,
      title: "Amalfi Coast Escape",
      tag: "Adventure Awaits",
      description: "Discover unique travel tips, guides, and inspiration.",
    },
  ];
  return (
    <div className="bg-[#fff] lg:p-20 lg:pb-0 pt-5">
      <ParentComponent>

        <HeadLine
          title={blogSection.title}
          description={blogSection.subtitle}
        />

        <div className="relative mx-4 lg:mx-0">
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
              slidesPerView={3}
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
                  slidesPerView: 1, // Small devices (e.g., iPhone SE, 480px width)
                  spaceBetween: 15,
                },
                640: {
                  slidesPerView: 1.5, // Mobile devices (640px width)
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 1.5, // Tablets (768px width)
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 2.5, // Desktop and larger screens (1024px and up)
                  spaceBetween: 20,
                },
              }}
            >
              {cardDetails?.map((item) => (
                <div key={item._id}>
                  <SwiperSlide>
                    <ArticleCard item={item} />
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          </div>
        </div>
      </ParentComponent>
    </div>
  );
};

export default ArticleAndNewsSection;
