import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HeadLine2 from "../../Shared/HeadLineComponent/HeadLine2";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ProgressBars from "../../Shared/ProgressBars";
import { useNavigate } from "react-router-dom";

const BlurSliderSection = ({ country }) => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [screenSize, setScreenSize] = useState("mobile");
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const { title, description, data } = country;

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

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.activeIndex;
    const totalSlides = swiper.slides.length;

    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);

    // Update background image to the active slide's image
    const activeSlide = data[activeIndex % data.length]; // Avoid index out of bounds
    setCurrentBackgroundImage(activeSlide?.image);
    setContentTitle(activeSlide?.contentTitle);

    let progress = 0;
    if (screenSize === "desktop") {
      progress = ((activeIndex + 1) / (totalSlides - 3)) * 100;
    } else if (screenSize === "tablet") {
      progress = ((activeIndex + 1) / (totalSlides - 2)) * 100;
    } else {
      progress = ((activeIndex + 1) / totalSlides) * 100;
    }
    setProgressValue(progress);
  };

  return (
    <div
      style={{
        backgroundImage: `url('${currentBackgroundImage || ""}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-[#EFFBFB] py-[120px] relative transition-all duration-500"
    >
      <div className="absolute inset-0 z-10 bg-[#0000003d]"></div>
      <div className="grid grid-cols-1 lg:grid-cols-9 lg:pl-20">
        {/* Headline Section */}
        <div className="col-span-2 max-w-[450px] z-20 relative mx-auto mb-10 md:lg-0 md:content-center">
          <HeadLine2
            title={title}
            description={contentTitle ? contentTitle : description}
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
              // Set initial background to the first slide's image
              if (data.length > 0) setCurrentBackgroundImage(data[0].image);
            }}
            onSlideChange={handleSlideChange}
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
            {data?.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() => navigate(`/tours/country/${item._id}`)}
                  className="p-5 cursor-pointer rounded-lg bg-transparent shadow-md card_style items-center text-center content-center h-[420px] mx-5 lg:mx-0"
                >
                  <h3 className="lg:text-[48px] text-[28px] font-duera-expanded font-extrabold text-white">
                    {item?.name}
                  </h3>
                  <img src={item.image} alt="" className="hidden" />
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
          disabled={isEnd}
        >
          <FaArrowRight />
        </button>
        <div className="w-[300px] md:w-[450px] ml-4 z-20">
          <ProgressBars value={progressValue} />
        </div>
      </div>
    </div>
  );
};

export default BlurSliderSection;
