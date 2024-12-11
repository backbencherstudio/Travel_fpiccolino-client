import  { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const UserDetails = () => {
    const swiperRef = useRef(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const userData = [
      {
        name: "John Butler",
        customerImg: "https://via.placeholder.com/40?text=JB",
        phone: "0182384384",
        email: "john.butler@gmail.com",
        address: "123 Lakeview St, Rome, Italy",
        city: "Rome",
        country: "Italy",
        bankCard: "2382938498394939",
        paymentSystem: "stripe",
        tourData: [
          {
            bookingId: 901923,
            customerName: "John Butler",
            customerImg: "https://via.placeholder.com/40?text=JB",
            destination: "London",
            destinationImg: "https://via.placeholder.com/40?text=LD",
            amount: "$1200",
            status: "Complete",
            date: "June 12, 2024",
          },
          {
            bookingId: 901924,
            customerName: "John Butler",
            customerImg: "https://via.placeholder.com/40?text=JB",
            destination: "New York",
            destinationImg: "https://via.placeholder.com/40?text=NY",
            amount: "$1500",
            status: "Pending",
            date: "June 13, 2024",
          },
        ],
      },
      {
        name: "Mary Cooper",
        customerImg: "https://via.placeholder.com/40?text=MC",
        phone: "0192382394",
        email: "mary.cooper@gmail.com",
        address: "456 Maple St, Paris, France",
        city: "Paris",
        country: "France",
        bankCard: "3249238492394920",
        paymentSystem: "paypal",
        tourData: [
          {
            bookingId: 901925,
            customerName: "Mary Cooper",
            customerImg: "https://via.placeholder.com/40?text=MC",
            destination: "Paris",
            destinationImg: "https://via.placeholder.com/40?text=PR",
            amount: "$2000",
            status: "Complete",
            date: "June 14, 2024",
          },
          {
            bookingId: 901926,
            customerName: "Mary Cooper",
            customerImg: "https://via.placeholder.com/40?text=MC",
            destination: "Tokyo",
            destinationImg: "https://via.placeholder.com/40?text=TOK",
            amount: "$1700",
            status: "Canceled",
            date: "June 15, 2024",
          },
        ],
      },
      {
        name: "Liam James",
        customerImg: "https://via.placeholder.com/40?text=LJ",
        phone: "0202938492",
        email: "liam.james@gmail.com",
        address: "789 Sunset Blvd, London, UK",
        city: "London",
        country: "UK",
        bankCard: "4859284938492039",
        paymentSystem: "stripe",
        tourData: [
          {
            bookingId: 901927,
            customerName: "Liam James",
            customerImg: "https://via.placeholder.com/40?text=LJ",
            destination: "London",
            destinationImg: "https://via.placeholder.com/40?text=LD",
            amount: "$1300",
            status: "Pending",
            date: "June 16, 2024",
          },
          {
            bookingId: 901928,
            customerName: "Liam James",
            customerImg: "https://via.placeholder.com/40?text=LJ",
            destination: "Sydney",
            destinationImg: "https://via.placeholder.com/40?text=SYD",
            amount: "$1800",
            status: "Complete",
            date: "June 17, 2024",
          },
        ],
      },
      {
        name: "Sophia Williams",
        customerImg: "https://via.placeholder.com/40?text=SW",
        phone: "0213849032",
        email: "sophia.williams@gmail.com",
        address: "101 Oceanview Drive, Los Angeles, USA",
        city: "Los Angeles",
        country: "USA",
        bankCard: "2398483929384932",
        paymentSystem: "paypal",
        tourData: [
          {
            bookingId: 901929,
            customerName: "Sophia Williams",
            customerImg: "https://via.placeholder.com/40?text=SW",
            destination: "Amsterdam",
            destinationImg: "https://via.placeholder.com/40?text=AMS",
            amount: "$1400",
            status: "Complete",
            date: "June 18, 2024",
          },
          {
            bookingId: 901930,
            customerName: "Sophia Williams",
            customerImg: "https://via.placeholder.com/40?text=SW",
            destination: "Rome",
            destinationImg: "https://via.placeholder.com/40?text=RO",
            amount: "$2000",
            status: "Pending",
            date: "June 19, 2024",
          },
        ],
      },
      {
        name: "Chris Evans",
        customerImg: "https://via.placeholder.com/40?text=CE",
        phone: "0223840923",
        email: "chris.evans@gmail.com",
        address: "102 Riverwalk St, Tokyo, Japan",
        city: "Tokyo",
        country: "Japan",
        bankCard: "2394839294948392",
        paymentSystem: "stripe",
        tourData: [
          {
            bookingId: 901931,
            customerName: "Chris Evans",
            customerImg: "https://via.placeholder.com/40?text=CE",
            destination: "Rome",
            destinationImg: "https://via.placeholder.com/40?text=RO",
            amount: "$1600",
            status: "Complete",
            date: "June 20, 2024",
          },
          {
            bookingId: 901932,
            customerName: "Chris Evans",
            customerImg: "https://via.placeholder.com/40?text=CE",
            destination: "Las Vegas",
            destinationImg: "https://via.placeholder.com/40?text=LV",
            amount: "$2200",
            status: "Complete",
            date: "June 21, 2024",
          },
        ],
      },
    ];
    
  return (
    <div className="max-w-[370px] md:max-w-[640px] lg:max-w-[1112px]">
      <h1 className="text-[32px] font-semibold">Welcome, Wade</h1> 
      <p className="text-[#72777F]">
        Manage your travel agency data easily with us
      </p>
      <h2 className="text-[24px] font-semibold mt-8">User Details</h2>
      <img
        src={userData[0].customerImg}
        className="rounded-full w-[120px] h-[120px] mt-5"
        alt=""
      />
      <h1 className="mt-5 text-[20px] font-medium">Personal Details</h1>
      <div className="mt-3  max-w-[680px]">
        <div className="grid grid-cols-2">
          <div>
            <h1 className="text-[16px]">Name</h1>
            <p className="text-[#72777F] text-[14px]">{userData[0].name}</p>
          </div>{" "}
          <div>
            <h1 className="text-[16px]">Email</h1>
            <p className="text-[#72777F] text-[14px]">{userData[0].email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-3">
          <div>
            <h1 className="text-[16px]">Phone</h1>
            <p className="text-[#72777F] text-[14px]">{userData[0].phone}</p>
          </div>{" "}
          <div>
            <h1 className="text-[16px]">Address</h1>
            <p className="text-[#72777F] text-[14px]">{userData[0].address}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-3">
          <div>
            <h1 className="text-[16px]">City</h1>
            <p className="text-[#72777F] text-[14px]">{userData[0].city}</p>
          </div>{" "}
          <div>
            <h1 className="text-[16px]">Country</h1>
            <p className="text-[#72777F] text-[14px]">{userData[0].country}</p>
          </div>
        </div>
        <h1 className="mt-5 text-[20px] font-medium">Bank Details</h1>
        <div className="grid grid-cols-2 mt-3">
          <div>
            <h1 className="text-[16px]">Bank Card</h1>
            <p className="text-[#72777F] text-[14px]">{userData[0].bankCard}</p>
          </div>{" "}
          <div>
            <h1 className="text-[16px]">Payment System</h1>
            <p className="text-[#72777F] text-[14px]">{userData[0].paymentSystem}</p>
          </div>
        </div>
      </div>
      <h1 className="mt-5 text-[20px] font-medium">Tour Details</h1>
    <div className="mt-5">
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
                  slidesPerView: 2, // For very small mobile screens (320px)
                  spaceBetween: 10,
                },
                480: {
                  slidesPerView: 4, // Small devices (e.g., iPhone SE, 480px width)
                  spaceBetween: 15,
                },
                640: {
                  slidesPerView: 3, // Mobile devices (640px width)
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 4, // Tablets (768px width)
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 5, // Desktop and larger screens (1024px and up)
                  spaceBetween: 20,
                },
              }}
          >
            {userData?.tourData?.map((item) => (
              <div key={item._id}>
                <SwiperSlide>
                 <img src={item.destinationImg} alt="" className="w-[172px] h-[120px] rounded-lg" />
                 <p>{item.destination}</p>
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
          <div className="m-4 text-end">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className={`p-3 m-1  ${
                  isBeginning ? "bg-[#fdf0ea] primary_text" : "border bg-white text-black shadow"
                } w-10 h-10 rounded-md transition-opacity `}
                disabled={isBeginning}
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className={`p-3 m-1 ${
                  isEnd ? "bg-[#fdf0ea] primary_text" : "border bg-white text-black shadow"
                }  rounded-md w-10 h-10`}
                disabled={isEnd}
              >
                <FaAngleRight/>
              </button>
            </div>
    </div>
    </div>
  );
};

export default UserDetails;
