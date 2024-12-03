import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HeadLine2 from "../../Shared/HeadLineComponent/HeadLine2";
import natureImage from "../../assets/natureImage.jpg";
import natureImage2 from "../../assets/natureImage2.jpg";
import { FaAngleLeft, FaAngleRight, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import banner from '../../assets/eve.jpg';

const PlaceSliderSection = () => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  

  const cardDetails = [
    {
      image: natureImage,
      title: "Peru ",
      duratioin: "7 night/ 8 day",
      price: 189,
      isInclusive: true,
    },
    {
      image: natureImage2,
      title: "Edinburgh",
      duratioin: "7 night/ 8 day",
      price: 189,
      isInclusive: true,
    },
    {
      image: natureImage,
      title: "Amalfi Coast Escape",
      duratioin: "7 night/ 8 day",
      price: 189,
      isInclusive: false,
    },
    {
      image: natureImage,
      title: "Amalfi Coast Escape",
      duratioin: "7 night/ 8 day",
      price: 189,
      isInclusive: true,
    },
    {
      image: natureImage2,
      title: "Amalfi Coast Escape",
      duratioin: "7 night/ 8 day",
      price: 189,
      isInclusive: true,
    },
    {
      image: natureImage2,
      title: "Amalfi Coast Escape",
      duratioin: "7 night/ 8 day",
      price: 189,
      isInclusive: true,
    },
    {
      image: natureImage2,
      title: "Amalfi Coast Escape",
      duratioin: "7 night/ 8 day",
      price: 189,
      isInclusive: true,
    },
    {
      image: natureImage2,
      title: "Amalfi Coast Escape",
      duratioin: "7 night/ 8 day",
      price: 189,
      isInclusive: true,
    },
    {
      image: natureImage2,
      title: "Amalfi Coast Escape",
      duratioin: "7 night/ 8 day",
      price: 189,
      isInclusive: true,
    },
  ];

  return (
    <div
      style={{
        backgroundImage: `url('${banner}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-[#EFFBFB] py-[120px] pl-5 lg:pl-20 relative"
    >
      <div className="absolute inset-0 z-10 bg-[#0000003d]"></div>
      <div className="flex flex-col lg:flex-row gap-[5%] ">
        {/* Headline Section */}
        <div className="lg:w-[25%] max-w-[450px] z-20 relative mx-auto mb-10 md:lg-0 md:content-center">
          <HeadLine2
            title="A New Year's Eve to Remember"
            description="Ring in the New Year with Joyful Celebrations and Lasting Memories"
          />
        </div>

        {/* Slider Section */}
        <div className="lg:w-[70%] z-20">
          <Swiper
          className="gap-6"
            // spaceBetween={30}
            slidesPerView={1.5}
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
              768: {
                slidesPerView: 1.5, 
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 1.5, 
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 2.5, 
                spaceBetween: 20,
              },
            }}
          >
            {cardDetails.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="p-5 rounded-lg bg-transparent shadow-md w-[200px] h-[220px] md:h-[420px] md:w-[400px] card_style items-center text-center content-center">
                  <h3 className="lg:text-[48px] text-[28px] font-duera-expanded font-extrabold text-white">{item.title}</h3>
                  <div className="flex justify-center">
                  <p className="mr-3 primary_text font-semibold text-[14px] lg:text-[18px]">€{item.price}</p>
                  <s className="text-[#E9E9EA] font-semibold text-[14px] lg:text-[18px]">€{item.price}</s> 
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="mb-4">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className={`p-2.5 m-1  ${
                  isBeginning ? "bg-white primary_text" : "primary_bg text-white "
                } w-9 h-9 rounded-full transition-opacity  absolute bottom-10  lg:right-[70%] z-20`}
                disabled={isBeginning}
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className={`p-2.5 m-1 ${
                  isEnd ? "bg-white primary_text" : "primary_bg text-white "
                }  rounded-full transition-opacity absolute bottom-10 left-16 lg:left-[30%] z-20 `}
                disabled={isEnd}
              >
                <FaArrowRight />
              </button>
            </div>
      </div>
      
    </div>
  );
};

export default PlaceSliderSection;
