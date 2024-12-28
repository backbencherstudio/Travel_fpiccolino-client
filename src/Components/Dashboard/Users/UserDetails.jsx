import "swiper/css";
import { useParams } from "react-router-dom";
import { userData } from "../../../ALLJsonFile/const";
import TourSlider from "./TourSlider";
import { useEffect, useState } from "react";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../../features/users/userSlice";
const UserDetails = () => {
  const dispatch = useDispatch();
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const { id } = useParams();
  const { userDetails } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        dispatch(getUserDetails(id));
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
  }, []);
  console.log(userDetails);
  return (
    <div className="xl:max-w-[1400px] lg:max-w-[1112px]">
      <div className="max-w-[370px] md:max-w-[640px] lg:max-w-[1112px]">
        <CustomHeadingDashboard />
        <h2 className="text-[24px] font-semibold mt-8">User Details</h2>
        <img
          src={userDetails?.image}
          className="rounded-full w-[120px] h-[120px] mt-5"
          alt=""
        />
        <h1 className="mt-5 text-[20px] font-medium">Personal Details</h1>
        <div className="mt-3  max-w-[680px]">
          <div className="grid grid-cols-2">
            <div>
              <h1 className="text-[16px]">Name</h1>
              <p className="text-[#72777F] text-[14px]">{userDetails?.name}</p>
            </div>{" "}
            <div>
              <h1 className="text-[16px]">Email</h1>
              <p className="text-[#72777F] text-[14px]">{userDetails?.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-3">
            <div>
              <h1 className="text-[16px]">Phone</h1>
              <p className="text-[#72777F] text-[14px]">{userDetails?.phone}</p>
            </div>{" "}
            <div>
              <h1 className="text-[16px]">Address</h1>
              <p className="text-[#72777F] text-[14px]">
                {userDetails?.address}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-3">
            <div>
              <h1 className="text-[16px]">City</h1>
              <p className="text-[#72777F] text-[14px]">{userDetails?.city}</p>
            </div>{" "}
            <div>
              <h1 className="text-[16px]">Country</h1>
              <p className="text-[#72777F] text-[14px]">
                {userDetails?.country}
              </p>
            </div>
          </div>
          <h1 className="mt-5 text-[20px] font-medium">Bank Details</h1>
          <div className="grid grid-cols-2 mt-3">
            <div>
              <h1 className="text-[16px]">Bank Card</h1>
              <p className="text-[#72777F] text-[14px]">
                {userDetails?.bankCard}
              </p>
            </div>{" "}
            <div>
              <h1 className="text-[16px]">Payment System</h1>
              <p className="text-[#72777F] text-[14px]">
                {userDetails?.paymentSystem}
              </p>
            </div>
          </div>
        </div>
      </div>
      <h1 className="mt-5 text-[20px] font-medium">Tour Details</h1>
      <TourSlider
        title={"Total Tours"}
        userData={userData}
        id={id}
        dateFilter={tourDateFilter}
        setDateFilter={setTourDateFilter}
      />
      <TourSlider title={"Completed Tours"} userData={userData} id={id} />
      <TourSlider title={"Pending Tours"} userData={userData} id={id} />
    </div>
  );
};

export default UserDetails;
