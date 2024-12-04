import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HeadLine2 from "../../Shared/HeadLineComponent/HeadLine2";
import natureImage from "../../assets/natureImage.jpg";
import natureImage2 from "../../assets/natureImage2.jpg";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import banner from "../../assets/eve.jpg";
import ProgressBars from "./ProgressBars";

const PlaceSliderSection = () => {
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [progressValue, setProgressValue] = useState(0); // Starting progress value
  const [screenSize, setScreenSize] = useState("mobile"); // Track screen size (mobile, tablet, desktop)

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
  ];

  // Check the screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setScreenSize("desktop");
      } else if (width >= 768) {
        setScreenSize("tablet");
      } else {
        setScreenSize("mobile");
      }
    };

    // Check on initial render and on resize
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.activeIndex;
    const totalSlides = swiper.slides.length;

    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);

    // For the progress bar
    let progress = 0;
    if (screenSize === "desktop") {
      if (activeIndex >= totalSlides - 3) {
        progress = 100;
      } else {
        progress = ((activeIndex + 1) / (totalSlides - 1)) * 100;
      }
    } else if (screenSize === "tablet") {
      if (activeIndex >= totalSlides - 2) {
        progress = 100;
      } else {
        progress = ((activeIndex + 1) / (totalSlides - 1)) * 100;
      }
    } else {
      progress = ((activeIndex + 1) / totalSlides) * 100;
    }

    setProgressValue(progress);
  };

  return (
    <div
      style={{
        backgroundImage: `url('${banner}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-[#EFFBFB] py-[120px] relative"
    >
      <div className="absolute inset-0 z-10 bg-[#0000003d]"></div>
      <div className="grid grid-cols-1 lg:grid-cols-9 lg:pl-20">
        {/* Headline Section */}
        <div className="col-span-2 max-w-[450px] z-20 relative mx-auto mb-10 md:lg-0 md:content-center">
          <HeadLine2
            title="A New Year's Eve to Remember"
            description="Ring in the New Year with Joyful Celebrations and Lasting Memories"
          />
        </div>
        <div className="col-span-1"></div>

        {/* Slider Section */}
        <div className="col-span-6 z-20">
          <Swiper
            className="gap-6"
            spaceBetween={30}
            slidesPerView={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={handleSlideChange} // Call the handleSlideChange function
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 2.7,
                spaceBetween: 20,
              },
            }}
          >
            {cardDetails.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="p-5 rounded-lg bg-transparent shadow-md card_style items-center text-center content-center h-[420px] mx-5 lg:mx-0">
                  <h3 className="lg:text-[48px] text-[28px] font-duera-expanded font-extrabold text-white">
                    {item.title}
                  </h3>
                  <div className="flex justify-center">
                    <p className="mr-3 primary_text font-semibold text-[14px] lg:text-[18px]">
                      €{item.price}
                    </p>
                    <s className="text-[#E9E9EA] font-semibold text-[14px] lg:text-[18px]">
                      €{item.price}
                    </s>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="z-20 flex items-center mt-[30px] mx-3 lg:justify-center">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className={`p-2.5 m-1 ${
            isBeginning ? "bg-white primary_text" : "primary_bg text-white "
          } w-9 h-9 rounded-full transition-opacity z-20`}
          disabled={isBeginning}
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className={`p-2.5 z-20 m-1 ${
            isEnd ? "bg-white primary_text" : "primary_bg text-white "
          } rounded-full transition-opacity`}
          disabled={isEnd} // Disable button based on isEnd state
        >
          <FaArrowRight />
        </button>
        <div className="w-[300px] md:w-[450px] ml-4 z-20">
          {/* Pass the dynamically calculated progress value */}
          <ProgressBars value={progressValue} />
        </div>
      </div>
    </div>
  );
};

export default PlaceSliderSection;
