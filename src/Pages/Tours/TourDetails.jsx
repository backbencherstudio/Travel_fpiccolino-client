/* eslint-disable react/no-unescaped-entities */
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import blogDetailsImage from "../../assets/Images/blogDetails.jpg";
import iconn1 from "../../assets/icone/icone1.png";
import iconn2 from "../../assets/icone/icone2.png";
import iconn3 from "../../assets/icone/icone3.png";
import iconn4 from "../../assets/icone/icone4.png";
import yes from "../../assets/icone/yes.png";
import flight from "../../assets/icone/flight.png";
import image1 from "../../assets/Image1.jpg";
import image2 from "../../assets/Image2.jpg";
import image3 from "../../assets/Image3.jpg";
import image4 from "../../assets/Image4.jpg";
import { useEffect, useState } from "react";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import { reviews } from "../../ALLJsonFile/const";
import TestimonialCard from "../../Components/Cards/TestimonialCard";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
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
const TourDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params.id);

  const { packageDetails } = useSelector((state) => state.package);

  useEffect(() => {
    dispatch(getPackageDetails(params?.id));
  }, []);

  console.log(packageDetails);

  const heroContent = {
    blogDetailsTitle: `${packageDetails?.tourDuration.nights} Nights / ${packageDetails?.tourDuration.days} Days`,
    image: "http://localhost:3000" + packageDetails?.images[0],
    titleOne: packageDetails?.tourName,
  };
  console.log("heroContent dddd ", heroContent);

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
    { icon: iconn4, tag: "Gen Z approved" },
    { icon: iconn3, tag: "Ride the wave" },
    { icon: iconn2, tag: "Relaxed vibes" },
    { icon: iconn1, tag: "Forever summer" },
  ];

  const images = [
    { image: image1 },
    { image: image2 },
    { image: image3 },
    { image: image4 },
  ];

  const [imagePath, setImagePath] = useState(image3);

  return (
    <div className="text-black">
      <HeroScetion heroContent={heroContent} />
      <div className="bg-[#EFFBFB]">
        <ParentComponent>
          <div className="grid grid-cols-12 py-20 lg:gap-3 xl:gap-10 ">
            <div className="col-span-12 lg:col-span-8">
              <h2 className="lg:text-[40px] font-bold text-[#0C0C1D] uppercase ">
                FOR THOSE WHO ALWAYS LOOK TO THE HORIZON
              </h2>
              <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-4 ">
                {tags?.map((item) => (
                  <div key={item?._id}>
                    <div className="flex bg-[#E867311A] px-4 py-2 items-center gap-2 rounded-full ">
                      <img
                        className="size-5"
                        src={`${packageDetails?.images[0]}`}
                        alt=""
                      />
                      <h2 className="text-[#E86731]"> {item?.tag} </h2>
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
                        What's included
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
                        What's Not included
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
                  <h2 className="text-center text-[#1C1C1C]">Package Price</h2>
                  <span className="flex justify-center gap-10 mt-5">
                    <h2 className="flex items-center font-semibold text-[24px] text-[#25CE50] ">
                      {" "}
                      <RiMoneyEuroCircleLine /> {packageDetails?.amount}
                    </h2>
                    <h2 className="flex items-center font-semibold text-[24px] text-[#72777F] line-through ">
                      {" "}
                      <RiMoneyEuroCircleLine />{" "}
                      {parseInt(packageDetails?.amount * 1.12)}
                    </h2>
                  </span>
                </div>
                <div>
                  <h2 className="text-center border rounded-lg px-8 py-4 mb-4 text-[#141D2A]">
                    {moment(packageDetails?.tourDate)
                      .utc()
                      .format("DD/MM/YYYY")}{" "}
                    <br />
                    {packageDetails?.tourDuration?.nights} Nights &{" "}
                    {packageDetails?.tourDuration?.days} Days
                  </h2>
                  {/* <h2 className="text-center border bg-[#E867311A] text-[#FF5B00] rounded-lg px-8 py-4 mb-4">
                    Change dates
                  </h2> */}
                  <Link
                    to={`/flight/${packageDetails?._id}`}
                    className="text-center block border rounded-lg bg-[#E86731] text-[#FFFFFF] px-8 py-4 mb-4 w-full"
                  >
                    Continue
                  </Link>
                </div>
              </div>
              {/* <div className="bg-[#FFFFFF] p-10 rounded-lg ">
                <div className="mb-10">
                  <h2 className="text-[#E86731] flex items-center">
                    {" "}
                    <img src={flight} alt="" /> Add flight
                  </h2>
                </div>
                <div>
                  <p>Come From Text Editor</p>
                </div>
              </div> */}
            </div>
          </div>
        </ParentComponent>

        {/* ====================================================  Hotail Section ============================= */}
        <div className="bg-[#FFFFFF]">
          <ParentComponent>
            <div className="grid grid-cols-12 py-20 lg:gap-4 xl:gap-14 relative ">
              <div className=" col-span-12 lg:col-span-7 flex flex-col justify-between">
                <div>
                  <h2 className="uppercase font-bold text-[32px] ">
                    WHERE WILL YOU STAY
                  </h2>
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
                  {images?.map((item) => (
                    <img
                      key={item?._id}
                      src={item.image}
                      onClick={() => {
                        setImagePath(item.image);
                      }}
                      className={` size-20 xl:size-40 rounded-lg object-cover cursor-pointer  duration-300 ${
                        item?.image === imagePath
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
                  src={imagePath}
                  alt=""
                />
              </div>
            </div>
          </ParentComponent>
        </div>

        {/* ==========================================  Testimonial ================================= */}

        <div className="bg-[#EFFBFB] py-20 ">
          <HeadLine
            title="WHAT DO PEOPLE WHO HAVE TRAVELED WITH US SAY?"
            description="Real Reviews from Golfers Who Elevate Their Game in Our Apparel"
          />

          <ParentComponent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-12 ">
              {reviews?.map((item) => (
                <div key={item._id}>
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>
          </ParentComponent>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
