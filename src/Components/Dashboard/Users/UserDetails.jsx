import "swiper/css";
import { useParams } from "react-router-dom";
import { userData } from "../../../ALLJsonFile/const";
import TourSlider from "./TourSlider";
import { useEffect, useState } from "react";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../../features/users/userSlice";
import { FaRegUserCircle } from "react-icons/fa";
import { userStatus } from "../../../features/auth/authSlice";
import { base_url } from "../../../utils/base_path";
import axios from "axios";

const UserDetails = () => {
  const dispatch = useDispatch();
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const { id } = useParams();
  const { userDetails } = useSelector((state) => state.user);
  const { user, userTureStatusError } = useSelector(
    (state) => state.authorization
  );
  const [userTureStatus, setUsertourStatus] = useState(null);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        dispatch(getUserDetails(id));
        const response = await axios.get(`${base_url}/order/user/${id}/status`);
        setUsertourStatus(response?.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="xl:max-w-[1400px] lg:max-w-[1112px]">
      <div className="max-w-[370px] md:max-w-[640px] lg:max-w-[1112px]">
        <CustomHeadingDashboard />
        <h2 className="text-[24px] font-semibold mt-8">User Details</h2>
        {userDetails?.image ? (
          <img
            src={userDetails?.image}
            className="rounded-full w-[120px] h-[120px] mt-5"
            alt=""
          />
        ) : (
          <FaRegUserCircle className="w-28 h-28 mt-5 primary_text opacity-85" />
        )}
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
          {/* <h1 className="mt-5 text-[20px] font-medium">Bank Details</h1>
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
          </div> */}
        </div>
      </div>
      <h1 className="mt-5 text-[20px] font-medium">Tour Details</h1>
      <TourSlider
        userType={"admin"}
        id={id}
        title={"On Going Tours"}
        userData={userTureStatus?.tours?.ongoingTours}
      />
      <TourSlider
        userType={"admin"}
        id={id}
        title={"Pending Tours"}
        userData={userTureStatus?.tours?.pendingTours}
      />
      <TourSlider
        userType={"admin"}
        id={id}
        title={"Completed Tours"}
        userData={userTureStatus?.tours?.completedTours}
      />
    </div>
  );
};

export default UserDetails;
