import { useNavigate } from "react-router-dom";
import ParentAuthComponent from "../../Shared/ParentComponent/ParentAuthComponent";
import heroImage from "../../assets/Images/HeroSection/heroImage.jpg";
import logo from "../../assets/logo.svg";
import "./style.css";
import { FaAngleLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { TbPasswordUser } from "react-icons/tb";
import { BsExclamationCircle } from "react-icons/bs";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";



const SignupOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleOtpChange = (index, value, event) => {
    if (value.length > 1) return; // Allow only one character

    const newOtp = [...otp];

    if (event.key === "Backspace") {
      if (!value && index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    } else {
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };



  return (
    <ParentAuthComponent>
      <div className="grid grid-cols-1 md:grid-cols-5 h-full ">
        <div className="md:col-span-2 hidden md:block">
          <img className="h-full w-full object-cover" src={heroImage} alt="" />
        </div>
        <div className="h-full w-full md:col-span-3">
          <div className="my-40 lg:mx-20 m-5">
            <img src={logo} alt="" />
            <p
              onClick={() => navigate(-1)}
              className="text-[16px] cursor-pointer mt-10 flex items-center"
            >
              <FaAngleLeft style={{ fontSize: "20px" }} /> Back
            </p>

 

            <h1 className="font-extrabold text-[32px] mt-8">Enter OTP</h1>
            <h5 className="text-[#72777F] text-[16px] mt-3">
              We have share a code of your registered email address
            </h5>
            <div className="flex justify-between mt-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  size="small"
                  value={digit}
                  required
                  onChange={(e) => handleOtpChange(index, e.target.value, e)}
                  onKeyDown={(e) => handleOtpChange(index, e.target.value, e)}
                  className={`w-[60px] h-[60px] text-sm text-center border outline-orange-600 ${
                    digit && "border-[#ff631b]"
                  } rounded-lg font-bold text-[24px]`}
                />
              ))}
            </div>

            <button
              //   onClick={() => document.getElementById("password_modal").showModal()}
         
              className="primary_bg p-3 w-full rounded-lg text-white text-[16px] font-semibold mt-6 active:opacity-60"
            >
             Submit OTP
            </button>
            <h5 className="text-[#72777F] text-[16px] mt-5">
              If you didn't receive a code!{" "}
              <span
                className="text-orange-600 font-medium cursor-pointer hover:underline hover:text-orange-600"
                onClick={() =>
                  document.getElementById("success_modal").showModal()
                }
              >
                Resend
              </span>
            </h5>
          </div>
        </div>
      </div>

      {/* <dialog id="password_modal" className="modal">
        <div className="modal-box text-center">
          <h1 className="font-extrabold text-[32px] mt-8">Change Password</h1>
          <p className="py-4">Enter your new password and submit it</p>
          <div>
            <p className="text-[18px] font-medium mt-5 text-start">Password</p>
            <input
              type="password"
              placeholder="Enter New Password"
              className="p-3 text-[16px] rounded-md w-full border border-[#D0D5DD]"
            />
          </div>
          <button
           
            className="primary_bg p-3 w-full rounded-lg text-white text-[16px] font-semibold mt-6 "
          >
            Change Password
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog> */}
      <dialog id="success_modal" className="modal">
        <div className="modal-box text-center">
          <div className="bg-[#fef7f7] inline-block  rounded-full">
            <div className="bg-[#fce9e9] m-2.5 mb-1.5 inline-block rounded-full">
              <div className="primary_bg p-5 m-2.5 rounded-full">
                {/* <img src={lock} alt="" /> */}
                <TbPasswordUser className="text-white text-[45px]" />
              </div>
            </div>
          </div>
          <h1 className="font-extrabold text-[32px] mt-8">
            {" "}
            Successfully Password Changed
          </h1>
          <p className="py-4">Your otp has been updated successfully</p>


        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </ParentAuthComponent>
  );
};

export default SignupOtp;
