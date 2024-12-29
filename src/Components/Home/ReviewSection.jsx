import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import natureImage from "../../assets/natureImage.jpg";
import natureImage2 from "../../assets/natureImage2.jpg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReviewCard from "./ReviewCard";
const ReviewSection = ({contact}) => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const cardDetails = [
    {
      image: natureImage,
      name: "Esther Howard",
      title: "World Traveler, Italy",
      rating: 4.8,
      review:
        "An incredible experience from start to finish! Its curated a trip beyond my expectations. Every detail was thoughtfully planned, from the unique accommodations to the hidden gems only locals know about. I felt immersed in the culture and genuinely cared for throughout. Can’t wait to plan my next adventure with them!",
    },
    {
      image: natureImage2,
      name: "Esther Howard",
      title: "World Traveler, Italy",
      rating: 4.8,
      totalReviews: "2,300",
      review:
        "An incredible experience from start to finish! Its curated a trip beyond my expectations. Every detail was thoughtfully planned, from the unique accommodations to the hidden gems only locals know about. I felt immersed in the culture and genuinely cared for throughout. Can’t wait to plan my next adventure with them!",
    },
    {
      image: natureImage2,
      name: "Esther Howard",
      title: "World Traveler, Italy",
      rating: 4.8,
      totalReviews: "2,300",
      review:
        "An incredible experience from start to finish! Its curated a trip beyond my expectations. Every detail was thoughtfully planned, from the unique accommodations to the hidden gems only locals know about. I felt immersed in the culture and genuinely cared for throughout. Can’t wait to plan my next adventure with them!",
    },
    {
      image: natureImage2,
      name: "Esther Howard",
      title: "World Traveler, Italy",
      rating: 4.8,
      totalReviews: "2,300",
      review:
        "An incredible experience from start to finish! Its curated a trip beyond my expectations. Every detail was thoughtfully planned, from the unique accommodations to the hidden gems only locals know about. I felt immersed in the culture and genuinely cared for throughout. Can’t wait to plan my next adventure with them!",
    },
    {
      image: natureImage2,
      name: "Esther Howard",
      title: "World Traveler, Italy",
      rating: 4.8,
      totalReviews: "2,300",
      review:
        "An incredible experience from start to finish! Its curated a trip beyond my expectations. Every detail was thoughtfully planned, from the unique accommodations to the hidden gems only locals know about. I felt immersed in the culture and genuinely cared for throughout. Can’t wait to plan my next adventure with them!",
    },
  ];


  return (
    <div className="bg-[#EFFBFB] mt-20 lg:p-20 p-5 ">
      <ParentComponent>

        <HeadLine
          title={contact.title}
          description={contact.subtitle}
        />

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
              {cardDetails?.map((item) => (
                <div key={item._id}>
                  <SwiperSlide>
                    <ReviewCard item={item} />
                  </SwiperSlide>
                </div>
              ))}
            </Swiper>
          </div>
          <div className="relative mt-5">
            <div className=" md:absolute bottom-0 ">
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
                disabled={isEnd} // Disable button based on isEnd state
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </ParentComponent>
    </div>
  );
};

export default ReviewSection;
