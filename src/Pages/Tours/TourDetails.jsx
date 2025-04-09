/* eslint-disable react/no-unescaped-entities */
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import iconn1 from "../../assets/icone/icone1.png";
import iconn2 from "../../assets/icone/icone2.png";
import iconn3 from "../../assets/icone/icone3.png";
import iconn4 from "../../assets/icone/icone4.png";
import yes from "../../assets/icone/yes.png";
import { useEffect, useState, useRef } from "react";
import TestimonialCard from "../../Components/Cards/TestimonialCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPackageDetails } from "../../features/pckage/packageSlice";
import {
  MdOutlineBedtime,
  MdOutlineCarRental,
  MdOutlineDone,
  MdOutlineFreeBreakfast,
  MdOutlineMapsHomeWork,
} from "react-icons/md";
import {
  IoClose,
  IoCloudDoneOutline,
  IoFastFoodOutline,
  IoGameControllerOutline,
  IoWifiOutline,
} from "react-icons/io5";
import { LuContact, LuSquareParking } from "react-icons/lu";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { CiMobile3 } from "react-icons/ci";
import {
  PiAirplaneTakeoffLight,
  PiPersonSimpleSwimLight,
} from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import moment from "moment";
import { base_url } from "../../utils/base_path";
import {
  clearPackageReviews,
  getReviewByPackage,
} from "../../features/review/reviewSlice";
import EditableHeading from "../../Components/Common/EditableHeading";
import CountdownTimer from "../../Components/Common/CountdownTimer";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ImageGallery from "./ImageGallery";

const MobileFixedBottom = ({ packageDetails, navigate }) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-upper z-40 lg:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between p-4 max-w-md mx-auto">
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">Prezzo totale</span>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[#25CE50]">
              €{packageDetails?.amount}
            </span>
            <span className="text-lg text-red-500 line-through">
              €{parseInt(packageDetails?.amount * 1.12)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>{packageDetails?.tourDuration?.nights} Notti</span>
            <span>•</span>
            <span>
              {moment(packageDetails?.tourDate).utc().format("DD/MM/YYYY")}
            </span>
          </div>
        </div>
        <button
          onClick={() => navigate(`/flight/${packageDetails?._id}`)}
          className="bg-[#E86731] text-white px-6 py-3 rounded-xl font-medium shadow-lg active:scale-95 transition-all"
        >
          <span className="whitespace-nowrap">Continua</span>
        </button>
      </div>

      {/* Optional: Add a subtle backdrop gradient */}
      <div className="fixed-bottom-backdrop" />
    </div>
  );
};

const TourDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { packageDetails } = useSelector((state) => state.package);
  const { packageReview } = useSelector((state) => state.review);
  useEffect(() => {
    dispatch(clearPackageReviews());
    dispatch(getPackageDetails(params?.id));
    dispatch(getReviewByPackage(params.id));
  }, []);

  const heroContent = {
    blogDetailsTitle: `${packageDetails?.tourDuration.nights} Notti  / ${packageDetails?.tourDuration.days} Giorni`,
    image: `${base_url}${packageDetails?.images[0]}`,
    titleOne: packageDetails?.tourName,
  };
  const iconMap = {
    MdOutlineBedtime: MdOutlineBedtime,
    MdOutlineCarRental: MdOutlineCarRental,
    MdOutlineDone: MdOutlineDone,
    MdOutlineFreeBreakfast: MdOutlineFreeBreakfast,
    MdOutlineMapsHomeWork: MdOutlineMapsHomeWork,
    IoCloudDoneOutline: IoCloudDoneOutline,
    IoFastFoodOutline: IoFastFoodOutline,
    IoGameControllerOutline: IoGameControllerOutline,
    IoWifiOutline: IoWifiOutline,
    LuContact: LuContact,
    LuSquareParking: LuSquareParking,
    TfiHeadphoneAlt: TfiHeadphoneAlt,
    CiMobile3: CiMobile3,
    PiAirplaneTakeoffLight: PiAirplaneTakeoffLight,
    PiPersonSimpleSwimLight: PiPersonSimpleSwimLight,
    RxCross2: RxCross2, // Add this for the "cross" icon
  };

  const tags = [
    {
      icon: iconn4,
      titleKey: "tags.genz",
      tag: (
        <EditableHeading
          titleKey="tags.genz"
          defaultTitle="A prova di GEN Z"
          customTitleClass="text-[#E86731]"
        />
      ),
    },
    {
      icon: iconn3,
      titleKey: "tags.wave",
      tag: (
        <EditableHeading
          titleKey="tags.wave"
          defaultTitle="Cavalca l'onda"
          customTitleClass="text-[#E86731]"
        />
      ),
    },
    {
      icon: iconn2,
      titleKey: "tags.relax",
      tag: (
        <EditableHeading
          titleKey="tags.relax"
          defaultTitle="Vibrazioni rilassate"
          customTitleClass="text-[#E86731]"
        />
      ),
    },
    {
      icon: iconn1,
      titleKey: "tags.summer",
      tag: (
        <EditableHeading
          titleKey="tags.summer"
          defaultTitle="Estate per sempre"
          customTitleClass="text-[#E86731]"
        />
      ),
    },
  ];

  const [imagePath, setImagePath] = useState(packageDetails?.hotelImages[0]);

  const [isOpen, setIsOpen] = useState(true);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className="text-black">
      <HeroScetion heroContent={heroContent} />
      <div className="bg-[#fefeff]">
        <ParentComponent>
          <div className="grid grid-cols-12 pt-20 lg:gap-3 xl:gap-10 ">
            <div className="col-span-12 lg:col-span-8">
              <EditableHeading
                titleKey="tourdetails.title"
                defaultTitle="PER CHI GUARDA SEMPRE ALL'ORIZZONTE"
                customTitleClass="uppercase font-bold text-[28px] lg:text-[36px]  md:w-full text-start primary_text"
              />
              <div className="flex flex-wrap mt-4">
                {tags?.map((item, index) => (
                  <div key={item?._id}>
                    <div className="flex bg-[#ffffff] px-4 py-2 items-center gap-2 rounded-full ">
                      <img
                        className=" object-cover rounded-lg"
                        src={item?.icon}
                        alt="Package Preview"
                      />
                      {item?.tag}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                {/* ================================================  Blog Hero Content ==================================== */}
                <div className="mt-16 mb-20 text-[#72777F] lg:min-h-[200px]">
                  <p className="mb-4">{packageDetails?.tourDescription}</p>
                </div>
              </div>
            </div>

            <div className=" col-span-12 lg:col-span-4 mt-10  ">
              {/* ==============================================  Hero Section Right Side Bar ===================================== */}
              <div className="bg-[#FFFFFF] shadow-md rounded-3xl p-10 mb-16 border hidden lg:block">
                <div className="mb-10">
                  <EditableHeading
                    titleKey="tourdetails.price"
                    defaultTitle="Prezzo del pacchetto"
                    customTitleClass="text-[20px] text-gray-700 font-medium text-center ml-[5%] "
                  />
                  <span className="flex justify-center gap-5 mt-3">
                    <h2 className="flex items-center font-semibold text-[36px] text-[#eb565c] ">
                      {" "}
                      {packageDetails?.amount} €
                    </h2>
                    <h2 className=" flex items-center ">
                      {" "}
                      <EditableHeading
                        titleKey={`tourdetails.price_${packageDetails?._id}`}
                        defaultTitle={`${parseInt(
                          packageDetails?.amount * 1.12
                        )}`}
                        customTitleClass="flex items-center font-bold text-[28px] text-[#818181] line-through"
                      />
                      {/* <span className="text-[#818181] line-through font-semibold text-[22px] "></span> */}
                    </h2>
                  </span>

                  <h2 className=" flex justify-center">
                    {" "}
                    <EditableHeading
                      titleKey={`tourdetails.titlebelowprice`}
                      defaultTitle={`O 3 rate da 100€ senza interessi`}
                      customTitleClass="flex items-center text-[18px] text-[#818181] font-medium"
                    />
                    {/* <span className="text-[#818181] line-through font-semibold text-[22px] "></span> */}
                  </h2>
                </div>
                <div>
                  <h2 className="text-center border rounded-xl font-normal px-8 py-4 mb-4 text-[#121a24]">
                    {moment(packageDetails?.tourDate)
                      .utc()
                      .format("DD/MM/YYYY")}{" "}
                    <br />
                    {packageDetails?.tourDuration?.nights} Notti &{" "}
                    {packageDetails?.tourDuration?.days} Giorni
                  </h2>

                  {/* <h2 className="text-center border bg-[#E867311A] text-[#FF5B00] rounded-lg px-8 py-4 mb-4">
                    Change dates
                  </h2> */}
                  <div className="group relative inline-block w-full">
                    <button
                      className="text-center block border rounded-xl bg-[#E86731] px-8 py-4 mb-4 w-full"
                      onClick={() => navigate(`/flight/${packageDetails?._id}`)}
                    >
                      <EditableHeading
                        titleKey="buttons.continue"
                        defaultTitle="Continua"
                        customTitleClass="text-white"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 mb-10 gap-4">
            <div className="col-span-12 lg:col-span-8 mt-5 order-last lg:order-first">
              <div className="bg-[#FFFFFF] p-5 rounded-3xl shadow border ">
                {/* Dropdown Header */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <h2 className="text-xl font-semibold flex items-center">
                    <img className="mr-2" src={yes} alt="" />
                    Cosa è incluso & Cosa non è incluso
                  </h2>
                  {isOpen ? (
                    <MdKeyboardArrowUp size={24} />
                  ) : (
                    <MdKeyboardArrowDown size={24} />
                  )}
                </div>

                {/* Dropdown Content */}
                {isOpen && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4 text-[#1C1C1C]">
                    {/* Cosa è incluso */}
                    <div className="p-5 lg:border-r border-b lg:border-b-0">
                      <h2 className="text-lg font-semibold flex items-center mb-4">
                        <img className="mr-2" src={yes} alt="" />
                        Cosa è incluso
                      </h2>
                      {packageDetails?.includeItems?.map((item) => {
                        const IconComponent = iconMap[item.name];
                        return (
                          <div
                            key={item.include}
                            className="flex items-center mb-3"
                          >
                            {IconComponent && (
                              <IconComponent className="text-xl mr-3 primary_text" />
                            )}
                            <h2>{item.text}</h2>
                          </div>
                        );
                      })}
                    </div>

                    {/* Cosa non è incluso */}
                    <div className="p-5">
                      <h2 className="text-lg font-semibold flex items-center mb-4">
                        <RxCross2 className="mr-2 primary_text" />
                        Cosa non è incluso
                      </h2>
                      {packageDetails?.notIncludeItems?.map((item) => {
                        const IconComponent = iconMap[item.name];
                        return (
                          <div
                            key={item.include}
                            className="flex items-center mb-3"
                          >
                            {IconComponent && (
                              <IconComponent className="text-xl mr-3 primary_text" />
                            )}
                            <h2>{item.text}</h2>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-[#FFFFFF] p-5 rounded-3xl shadow border mt-5">
                {/* Dropdown Header */}
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setIsOpen2(!isOpen2)}
                >
                  <h2 className="text-xl font-semibold flex items-center">
                    <img className="mr-2" src={yes} alt="" />
                    Cose da sapere
                  </h2>
                  {isOpen2 ? (
                    <MdKeyboardArrowUp size={24} />
                  ) : (
                    <MdKeyboardArrowDown size={24} />
                  )}
                </div>

                {/* Dropdown Content */}
                {isOpen2 && (
                  <div className=" gap-6 mt-4 text-[#1C1C1C]">
                    <EditableHeading
                      titleKey="toknow.title"
                      defaultTitle="Prima di prenotare ricorda di controllare eventuali aggiornamenti su Viaggiare Sicuri."
                      customTitleClass="text-[16px]"
                    />
                    <div className="mt-5">
                      <EditableHeading
                        titleKey="toknow.option1"
                        defaultTitle="Passaporto"
                        customTitleClass="text-[16px] font-medium"
                      />
                      <EditableHeading
                        titleKey="toknow.option1.desc"
                        defaultTitle="Passapo6 mesi di validità residua +2 pagine bianche.

rto"
                        customTitleClass="text-[16px]"
                      />
                    </div>
                    <div className="mt-3">
                      <EditableHeading
                        titleKey="toknow.option2"
                        defaultTitle="Visto"
                        customTitleClass="text-[16px] font-medium"
                      />
                      <EditableHeading
                        titleKey="toknow.option2.desc"
                        defaultTitle="Non serve per soggiorni fino a 30 giorni ma è richiesto il biglietto aereo di uscita dal paese..

rto"
                        customTitleClass="text-[16px]"
                      />
                    </div>
                    <div className="mt-3">
                      <EditableHeading
                        titleKey="toknow.option3"
                        defaultTitle="Domande Frequenti"
                        customTitleClass="text-[16px] font-medium"
                      />
                      <EditableHeading
                        titleKey="toknow.option3.desc"
                        defaultTitle="Dai un occhiata alle nostre FAQ..

rto"
                        customTitleClass="text-[16px]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <div className=" lg:px-5 ">
                <div className="border  p-5 rounded-3xl bg-[#fdf0eb] ">
                  <EditableHeading
                    titleKey="paymentBellow.title"
                    defaultTitle="✈️ Aggiungi il volo A/R con 450€."
                    customTitleClass="text-[16px]  primary_text pb-3 font-medium border-b border-dashed border-[#e86731]"
                  />
                  <EditableHeading
                    titleKey="paymentBellow.description"
                    defaultTitle="Potrai acquistare il volo con noi direttamente in fase di prenotazione a soli 450€ scegliendo l'aeroporto di Milano. Il Vantaggio? Zero sbatti: ci occupiamo di tutto noi, anche in caso di modifiche da parte della compagnia aerea."
                    customTitleClass="text-[16px]  primary_text pt-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </ParentComponent>

        {/* ====================================================  Hotail Section ============================= */}
        {packageDetails?.hotelImages?.length > 0 && (
          <div className="bg-[#f5f6fa] mt-10">
            <ParentComponent>
              <div className="grid grid-cols-12 py-20 lg:gap-4 xl:gap-14 relative ">
                <div className=" col-span-12 lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <EditableHeading
                      titleKey="accommodation.title"
                      defaultTitle="DOVE ALLOGGERAI"
                      customTitleClass="uppercase font-bold text-[32px]  md:w-full text-start primary_text"
                    />
                    <h2 className="text-[20px] mt-10 font-semibold ">
                      {packageDetails?.hotelName}
                    </h2>

                    <p className="mt-5 text-[#72777F]">
                      {packageDetails?.hotelAbout?.slice(0, 150)}
                    </p>
                    <p className="mt-2 text-[#72777F]">
                      {packageDetails?.hotelAbout?.slice(150)}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center lg:gap-4 py-5 lg:py-0  ">
                    {packageDetails?.hotelImages.slice(0, 4)?.map((img) => (
                      <img
                        key={img}
                        src={`${base_url}${img}`}
                        onClick={() => {
                          setImagePath(img);
                        }}
                        className={` size-20 xl:size-40 rounded-lg object-cover cursor-pointer  duration-300 ${
                          img === imagePath
                            ? "border-2 border-red-500"
                            : "border-2 border-transparent"
                        } `}
                        alt=""
                      />
                    ))}
                  </div>
                </div>

                <div className=" col-span-12 lg:col-span-5 h-[300px] lg:h-[600px] w-[100%]  ">
                  <img
                    className="h-full w-[100%] rounded-xl object-cover "
                    src={`${base_url}${
                      imagePath ? imagePath : packageDetails?.hotelImages[0]
                    }`}
                    alt=""
                  />
                </div>
              </div>
            </ParentComponent>
          </div>
        )}
        {packageDetails?.images?.length > 0 && (
          <ImageGallery images={packageDetails?.images} />
        )}
        {/* ==========================================  Testimonial ================================= */}

        <div className="bg-[#f5f6fa] py-20">
          <EditableHeading
            titleKey="testimonial.title"
            subtitleKey="testimonial.description"
            defaultTitle="WHAT DO PEOPLE WHO TRAVELED WITH US SAY?"
            defaultSubtitle="Real reviews from golfers who improve their game with our apparel"
          />

          <ParentComponent>
            {packageReview && packageReview.length > 0 ? (
              <div className="md:m-10">
                <Swiper
                  modules={[Autoplay, Pagination, Navigation]}
                  spaceBetween={30}
                  slidesPerView={1}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  breakpoints={{
                    320: {
                      slidesPerView: 1.5,
                    },
                    640: {
                      slidesPerView: 2.5,
                    },
                    1024: {
                      slidesPerView: 3.5,
                    },
                    1280: {
                      slidesPerView: 4.5,
                    },
                  }}
                  className="testimonial-swiper py-10"
                >
                  {packageReview.map((item) => (
                    <SwiperSlide key={item._id}>
                      <TestimonialCard item={item} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ) : (
              <div className="text-center text-gray-600 my-5 py-20 border-dashed border">
                <EditableHeading
                  titleKey="reviews.empty.title"
                  subtitleKey="reviews.empty.description"
                  defaultTitle="No reviews available"
                  defaultSubtitle="Be the first to share your experience!"
                  customTitleClass="text-lg font-semibold text-[#E86731]"
                />
              </div>
            )}
          </ParentComponent>
        </div>
      </div>

      {/* Add padding at the bottom to prevent content from being hidden behind fixed section */}
      <div className="pb-24 lg:pb-0">
        {/* Add the fixed bottom section */}
        <MobileFixedBottom
          packageDetails={packageDetails}
          navigate={navigate}
        />
      </div>
    </div>
  );
};
// const ImageGallery = ({ images }) => {
//   const [selectedImage, setSelectedImage] = useState(null);

//   return (
//     <div className="bg-[#fff] py-16">
//       <ParentComponent>
//         <div className="text-center mb-12">
//           <EditableHeading
//             titleKey="gallery.title"
//             defaultTitle="ESPLORA LA TUA DESTINAZIONE"
//             customTitleClass="uppercase font-bold text-[32px] primary_text mb-4"
//           />
//           <EditableHeading
//             titleKey="gallery.subtitle"
//             defaultTitle="Scopri la bellezza attraverso i nostri scatti"
//             customTitleClass="text-[#72777F] text-lg"
//           />
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {/* Large featured image */}
//           <div className="col-span-2 row-span-2">
//             <img
//               src={`${base_url}${images[0]}`}
//               alt="Featured"
//               className="w-full h-full object-cover rounded-xl cursor-pointer hover:opacity-90 transition duration-300"
//               onClick={() => setSelectedImage(images[0])}
//             />
//           </div>

//           {/* Smaller images */}
//           {images.slice(1).map((image, index) => (
//             <div key={index} className="overflow-hidden rounded-xl">
//               <img
//                 src={`${base_url}${image}`}
//                 alt={`Gallery ${index + 1}`}
//                 className="w-full h-64 object-cover cursor-pointer hover:scale-110 transition duration-300"
//                 onClick={() => setSelectedImage(image)}
//               />
//             </div>
//           ))}
//         </div>
//       </ParentComponent>

//       {/* Modal for full-size image view */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
//           <div className="relative max-w-7xl w-full">
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
//             >
//               <IoClose size={32} />
//             </button>
//             <img
//               src={`${base_url}${selectedImage}`}
//               alt="Selected"
//               className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

export default TourDetails;
