import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import natureImage from "../../assets/natureImage.jpg";
import natureImage2 from "../../assets/natureImage2.jpg";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import ArticleCard from "./ArticleCard";
import CustomButton from "../../Shared/CustomButton";
const ArticleAndNewsSection = () => {
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
    <div className="bg-[#fff] lg:p-20 py-5">
      <ParentComponent>
        <HeadLine
          title="Discover Our  Updated Articles and News"
          description="Stay Updated with the Latest Insights and Trends"
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
        <div className="mt-[100px]">
          <h2 className="font-duera-expanded text-[#000000] text-[30px] lg:text-[32px] font-extrabold leading-[41.6px] text-start decoration-skip-ink ">
            Your Journey, Our Passion
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-[74px] mt-14">
            <div className="lg:col-span-2 h-[600px]">
              <img className="h-full rounded-[20px]" src={natureImage} alt="" />
            </div>
            <div className="lg:col-span-3">
                <p className="text-[18px] w-full"><strong>At LA TUA FUGA LOWCOST, we believe travel is more than just visiting new places; it’s about creating unforgettable experiences, discovering hidden gems,</strong> and making memories that last a lifetime. As seasoned experts in the travel industry, we’re dedicated to designing personalized adventures that reflect your unique interests and desires. Whether you're seeking serene beaches, vibrant cities, or thrilling expeditions, our team is here to bring your travel dreams to life. Let us handle the details, so you can simply enjoy the journey.</p>
               <div className="mt-5 mb-8">
               <CustomButton content={"Read More"}/>
               </div>
              <img
                className="h-[365px] w-full rounded-[20px]"
                src={natureImage2}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="mt-14 mb-20 lg:mb-0 flex md:flex-row flex-col justify-center lg:gap-40 gap-10">

          <div className="text-center">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px]">10+</h1>
            <p className="text-[24px] text-[#72777F] mt-2">Years of Experience</p>
          </div>
        
          <div className="text-center">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px]">500+</h1>
            <p className="text-[24px] text-[#72777F] mt-2">Travel Completed</p>
          </div>
        
          <div className="text-center">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px]">1.5K</h1>
            <p className="text-[24px] text-[#72777F] mt-2">Happy Customer Review</p>
          </div>
        
          <div className="text-center">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px]">99%</h1>
            <p className="text-[24px] text-[#72777F] mt-2">Success Rating</p>
          </div>
        
        </div>
      </ParentComponent>
    </div>
  );
};

export default ArticleAndNewsSection;
