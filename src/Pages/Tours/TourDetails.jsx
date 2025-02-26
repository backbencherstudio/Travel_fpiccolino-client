/* eslint-disable react/no-unescaped-entities */
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import iconn1 from "../../assets/icone/icone1.png";
import iconn2 from "../../assets/icone/icone2.png";
import iconn3 from "../../assets/icone/icone3.png";
import iconn4 from "../../assets/icone/icone4.png";
import yes from "../../assets/icone/yes.png";
import { useEffect, useState } from "react";
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
    blogDetailsTitle: `${packageDetails?.tourDuration.nights} Nights / ${packageDetails?.tourDuration.days} Days`,
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

  return (
    <div className="text-black">
      <HeroScetion heroContent={heroContent} />
      <div className="bg-[#fdf0ea]">
        <ParentComponent>
          <div className="grid grid-cols-12 py-20 lg:gap-3 xl:gap-10 ">
            <div className="col-span-12 lg:col-span-8">
              <EditableHeading
                titleKey="tourdetails.title"
                defaultTitle="PER CHI GUARDA SEMPRE ALL'ORIZZONTE"
                customTitleClass="uppercase font-bold text-[40px]  md:w-full text-start"
              />
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-4 ">
                {tags?.map((item, index) => (
                  <div key={item?._id}>
                    <div className="flex bg-[#ffffff] px-4 py-2 items-center gap-2 rounded-full ">
                      <img
                        className="size-8 object-cover rounded-lg"
                        src={
                          packageDetails?.images[index]
                            ? `${base_url}${packageDetails?.images[index]}`
                            : `${base_url}${packageDetails?.images[0]}`
                        }
                        alt="Package Preview"
                      />
                      {item?.tag}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                {/* ================================================  Blog Hero Content ==================================== */}
                <div className="mt-16 mb-20 text-[#72777F]">
                  <p className="mb-4">{packageDetails?.tourDescription}</p>
                </div>
                {/* ==============================================  Accordion ==============================================    */}
                <div className="text-[#1C1C1C]">
                  <div className="collapse collapse-arrow bg-[#FFFFFF] mb-10">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium flex items-center">
                      <img className="mr-2" src={yes} alt="" />
                      <h2 className="text-[20px] font-semibold ">
                        Cosa è incluso
                      </h2>
                    </div>
                    <div className="collapse-content">
                      <div className="grid lg:grid-cols-2">
                        <div>
                          {packageDetails?.includeItems?.map((item) => {
                            const IconComponent = iconMap[item.name];
                            return (
                              <div
                                key={item.include}
                                className="flex items-center mb-5"
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
                    </div>
                  </div>

                  <div className="collapse collapse-arrow bg-[#FFFFFF]">
                    <input type="radio" name="my-accordion-2" />

                    <div className="collapse-title text-xl font-medium flex items-center">
                      <RxCross2 className="mr-2 primary_text" />
                      <h2 className="text-[20px] font-semibold ">
                        Cosa non è incluso
                      </h2>
                    </div>

                    <div className="collapse-content">
                      <div className="grid lg:grid-cols-2">
                        <div>
                          {packageDetails?.notIncludeItems?.map((item) => {
                            const IconComponent = iconMap[item.name];
                            return (
                              <div
                                key={item.include}
                                className="flex items-center mb-5"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" col-span-12 lg:col-span-4 mt-10  ">
              {/* ==============================================  Hero Section Right Side Bar ===================================== */}
              <div className="bg-[#FFFFFF] p-10 rounded-lg mb-16 ">
                <div className="mb-10">
                  <EditableHeading
                    titleKey="tourdetails.price"
                    defaultTitle="Prezzo del pacchetto"
                    customTitleClass="text-[16px] text-[#1C1C1C] text-center ml-[10%]"
                  />
                  <span className="flex justify-center gap-10 mt-5">
                    <h2 className="flex items-center font-semibold text-[36px] text-[#25CE50] ">
                      {" "}
                      €{packageDetails?.amount}
                    </h2>
                    <h2 className="flex items-center font-semibold text-[22px] text-red-500 line-through ">
                      {" "}
                      €{parseInt(packageDetails?.amount * 1.12)}
                    </h2>
                  </span>
                  {packageDetails?.tourDate && (
                    <div className="mt-3">
                      <EditableHeading
                        titleKey="tourdetails.time_remaining"
                        defaultTitle="Time Remaining Until Tour"
                        customTitleClass="text-xs text-gray-600 mb-1 text-center"
                      />
                      <CountdownTimer tourDate={packageDetails.tourDate} />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-center border rounded-lg px-8 py-4 mb-4 text-[#141D2A]">
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
                      className="text-center block border rounded-lg bg-[#E86731] px-8 py-4 mb-4 w-full"
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
        </ParentComponent>

        {/* ====================================================  Hotail Section ============================= */}
        {packageDetails?.hotelImages?.length > 0 && (
          <div className="bg-[#FFFFFF]">
            <ParentComponent>
              <div className="grid grid-cols-12 py-20 lg:gap-4 xl:gap-14 relative ">
                <div className=" col-span-12 lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <EditableHeading
                      titleKey="accommodation.title"
                      defaultTitle="DOVE ALLOGGERAI"
                      customTitleClass="uppercase font-bold text-[32px]  md:w-full text-start"
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

                <div className=" col-span-12 lg:col-span-5 h-[400px] lg:h-[720px] w-[100%]  ">
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

        {/* ==========================================  Testimonial ================================= */}

        <div className="bg-[#fdf0ea] py-20">
          <EditableHeading
            titleKey="testimonial.title"
            subtitleKey="testimonial.description"
            defaultTitle="WHAT DO PEOPLE WHO TRAVELED WITH US SAY?"
            defaultSubtitle="Real reviews from golfers who improve their game with our apparel"
          />

          <ParentComponent>
            {packageReview && packageReview.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-12">
                {packageReview.map((item) => (
                  <div key={item._id}>
                    <TestimonialCard item={item} />
                  </div>
                ))}
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
    </div>
  );
};

export default TourDetails;
