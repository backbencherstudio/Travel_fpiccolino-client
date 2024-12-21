import "swiper/css";
import { useParams } from "react-router-dom";
import { userData } from "../../ALLJsonFile/const";
import { useState } from "react";
import TourSlider from "../../Components/Dashboard/Users/TourSlider";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
const UserProfile = () => {
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const { id } = useParams();

  return (
    <ParentComponent>
      <div className="mt-32 pb-14 mb-14 border-b">
        <HeadLine
          title={"Welcome to Your Profile"}
          description={"Access and Manage Your Travel Details Seamlessly"}
        />
      </div>
      <div className="xl:max-w-[1400px] lg:max-w-[1112px]">
        <div className="max-w-[370px] md:max-w-[640px] lg:max-w-[1112px]">
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
                <p className="text-[#72777F] text-[14px]">
                  {userData[id - 1]?.name}
                </p>
              </div>{" "}
              <div>
                <h1 className="text-[16px]">Email</h1>
                <p className="text-[#72777F] text-[14px]">
                  {userData[id - 1]?.email}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-3">
              <div>
                <h1 className="text-[16px]">Phone</h1>
                <p className="text-[#72777F] text-[14px]">
                  {userData[0].phone}
                </p>
              </div>{" "}
              <div>
                <h1 className="text-[16px]">Address</h1>
                <p className="text-[#72777F] text-[14px]">
                  {userData[0]?.address}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-3">
              <div>
                <h1 className="text-[16px]">City</h1>
                <p className="text-[#72777F] text-[14px]">
                  {userData[id - 1]?.city}
                </p>
              </div>{" "}
              <div>
                <h1 className="text-[16px]">Country</h1>
                <p className="text-[#72777F] text-[14px]">
                  {userData[id - 1]?.country}
                </p>
              </div>
            </div>
            <h1 className="mt-5 text-[20px] font-medium">Bank Details</h1>
            <div className="grid grid-cols-2 mt-3">
              <div>
                <h1 className="text-[16px]">Bank Card</h1>
                <p className="text-[#72777F] text-[14px]">
                  {userData[id - 1]?.bankCard}
                </p>
              </div>{" "}
              <div>
                <h1 className="text-[16px]">Payment System</h1>
                <p className="text-[#72777F] text-[14px]">
                  {userData[id - 1]?.paymentSystem}
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
    </ParentComponent>
  );
};

export default UserProfile;
