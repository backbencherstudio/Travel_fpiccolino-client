import "swiper/css";
import { useParams } from "react-router-dom";
import { userData } from "../../ALLJsonFile/const";
import { useEffect, useState } from "react";
import TourSlider from "../../Components/Dashboard/Users/TourSlider";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import UpdateUserModal from "../../Components/Profile/UpdateUserModal";
import { useDispatch, useSelector } from "react-redux";
import { RxAvatar } from "react-icons/rx";
import { updateUser, userStatus } from "../../features/auth/authSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user, userTureStatus, userTureStatusError } = useSelector(
    (state) => state.authorization
  );
  console.log("userTureStatus", userTureStatus);

  // console.log(41584854, user);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (updatedDetails) => {
    const updatedUserData = { ...user, ...updatedDetails };
    // const updatedUserData = { ...updatedDetails };
    // console.log(updatedDetails);
    const responce = dispatch(updateUser(updatedUserData));
  };

  useEffect(() => {
    if (user) {
      dispatch(userStatus("676b7f867ded38768bd6645f"));
    }
  }, [user]);

  // console.log("userTureStatus", userTureStatus);
  // console.log(userTureStatusError)
  return (
    <ParentComponent>
      <div className="mt-32 pb-14 mb-14 border-b">
        <HeadLine
          title={"Welcome to Your Profile"}
          description={"Access and Manage Your Travel Details Seamlessly"}
        />
      </div>
      <div className="xl:max-w-[1400px] lg:max-w-[1112px]">
        <div className="max-w-[370px] md:max-w-[640px] lg:max-w-[1112px] pb-10">
          <h2 className="text-[24px] font-semibold mt-8">User Details</h2>
          {user?.image ? (
            <img
              src={user?.image_url}
              className="rounded-full w-[120px] h-[120px] mt-5"
              alt="User"
            />
          ) : (
            <RxAvatar className=" w-[120px] h-[120px] mt-5" />
          )}
          <h1 className="mt-5 text-[20px] font-medium">Personal Details</h1>
          <div className="mt-3 max-w-[680px]">
            <div className="grid grid-cols-2">
              <div>
                <h1 className="text-[16px]">Name</h1>
                <p className="text-[#72777F] text-[14px]">{user?.name}</p>
              </div>
              <div>
                <h1 className="text-[16px]">Email</h1>
                <p className="text-[#72777F] text-[14px]">{user?.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-3">
              <div>
                <h1 className="text-[16px]">Phone</h1>
                <p className="text-[#72777F] text-[14px]">{user?.phone}</p>
              </div>
              <div>
                <h1 className="text-[16px]">Address</h1>
                <p className="text-[#72777F] text-[14px]">{user?.address}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-3">
              <div>
                <h1 className="text-[16px]">City</h1>
                <p className="text-[#72777F] text-[14px]">{user?.city}</p>
              </div>
              <div>
                <h1 className="text-[16px]">Country</h1>
                <p className="text-[#72777F] text-[14px]">{user?.country}</p>
              </div>
            </div>
            <h1 className="mt-5 text-[20px] font-medium">Bank Details</h1>
            <div className="grid grid-cols-2 mt-3">
              <div>
                <h1 className="text-[16px]">Bank Card</h1>
                <p className="text-[#72777F] text-[14px]">{user?.bankCard}</p>
              </div>
              <div>
                <h1 className="text-[16px]">Payment System</h1>
                <p className="text-[#72777F] text-[14px]">
                  {user?.paymentSystem}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleEditClick}
            className="mt-5 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Edit Details
          </button>
        </div>

        {/* Tour details */}

        <TourSlider
          title={"On Going Tours"}
          userData={userTureStatus?.tours?.ongoingTours}
        />
        <TourSlider
          title={"Pending Tours"}
          userData={userTureStatus?.tours?.pendingTours}
        />
        <TourSlider
          title={"Completed Tours"}
          userData={userTureStatus?.tours?.completedTours}
        />
      </div>

      {/* Edit Modal */}
      <UpdateUserModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={user}
        onSubmit={handleSubmit}
      />
    </ParentComponent>
  );
};

export default UserProfile;
