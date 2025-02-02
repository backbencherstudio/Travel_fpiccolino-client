import { useNavigate } from "react-router-dom";
import ParentAuthComponent from "../../Shared/ParentComponent/ParentAuthComponent";
import heroImage from "../../assets/Images/HeroSection/heroImage.jpg";
import logo from "../../assets/logo.svg";
import { FaAngleLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import lock from "../../assets/icons/lock.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  match_forgot_password_otp,
  reset_forgot_password,
} from "../../features/auth/authSlice";
import { Box, CircularProgress } from "@mui/material";
import { BsExclamationCircle } from "react-icons/bs";
import { base_url } from "../../utils/base_path";
import axios from "axios";

const OtpScreen = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otpBanner, setOtpBanner] = useState(null);
  const handleOtpChange = (index, value, event) => {
    if (value.length > 1) return; // Allow only one character

    const newOtp = [...otp];
    newOtp[index] = value;

    if (event.key === "Backspace" && !value && index > 0) {
      document.getElementById(`otp-input-${index - 1}`)?.focus();
    } else if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`)?.focus();
    }

    setOtp(newOtp);
  };

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(`${base_url}/api/auth-banners`);
        if (response.data && response.data.otpBanner) {
          setOtpBanner(`${base_url}/${response.data.otpBanner}`);
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, []);
  const { match_forgot_password_otpLoading, match_forgot_password_otpError } =
    useSelector((state) => state.authorization);

  const [showError, setShowError] = useState(!!match_forgot_password_otpError);

  useEffect(() => {
    if (match_forgot_password_otpError) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [match_forgot_password_otpError]);

  const handleOtpSubmit = async () => {
    const otpValue = otp.join("");
    const response = await dispatch(match_forgot_password_otp(otpValue));
    console.log(response?.payload?.success);
    if (response?.payload?.success) {
      document.getElementById("password_modal")?.showModal();
    }
  };

  const [password, setPassword] = useState("");
  const handleChangePassword = async () => {
    //     match-password-otp",  matchForgotPasswordOTP);
    // route.patch("/reset-forgot-password

    const responce = await dispatch(reset_forgot_password(password));
    console.log(responce);
    if (responce.payload.success === true) {
      document.getElementById("success_modal")?.showModal();
    }
  };

  return (
    <ParentAuthComponent>
      <div className="grid grid-cols-1 md:grid-cols-5 h-full">
        <div className="md:col-span-2 hidden md:block">
          <img
            className="h-full w-full object-cover"
            src={otpBanner || heroImage}
            alt="Hero"
          />
        </div>
        <div className="h-full w-full md:col-span-3">
          <div className="my-40 lg:mx-20 m-5">
            <img src={logo} alt="Logo" />
            <p
              onClick={() => navigate("/forgot-password")}
              className="text-[16px] cursor-pointer mt-10 flex items-center"
            >
              <FaAngleLeft style={{ fontSize: "20px" }} /> Back
            </p>

            {showError && (
              <h5 className="text-red-500 text-[16px] mt-5 flex items-center">
                <BsExclamationCircle size={25} className=" text-red-500 mr-2" />
                {match_forgot_password_otpError}
              </h5>
            )}

            <h1 className="font-extrabold text-[32px] mt-8">Enter OTP</h1>
            <h5 className="text-[#72777F] text-[16px] mt-3">
              We have shared a code to your registered email address
            </h5>
            <div className="flex justify-between mt-8">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value, e)}
                  onKeyDown={(e) => handleOtpChange(index, e.target.value, e)}
                  className={`w-[60px] h-[60px] text-center border ${
                    digit ? "border-[#35aff4]" : "border-gray-300"
                  } rounded-lg font-bold text-[24px]`}
                />
              ))}
            </div>

            <button
              onClick={handleOtpSubmit}
              className="primary_bg p-3 w-full rounded-lg text-white text-[16px] font-semibold mt-6"
              disabled={match_forgot_password_otpLoading}
            >
              {match_forgot_password_otpLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={30} color="inherit" />
                </Box>
              ) : (
                "Submit OTP"
              )}
            </button>
          </div>
        </div>
      </div>

      <dialog id="password_modal" className="modal">
        <div className="modal-box text-center">
          <h1 className="font-extrabold text-[32px] mt-8">Change Password</h1>
          <p className="py-4">Enter your new password and submit it</p>
          <div>
            <p className="text-[18px] font-medium mt-5 text-start">Password</p>
            <input
              type="password"
              placeholder="Enter New Password"
              className="p-3 text-[16px] rounded-md w-full border border-[#D0D5DD]"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            // onClick={() =>
            //   document.getElementById("success_modal")?.showModal()
            // }
            onClick={handleChangePassword}
            className="primary_bg p-3 w-full rounded-lg text-white text-[16px] font-semibold mt-6"
          >
            Change Password
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>

      <dialog id="success_modal" className="modal">
        <div className="modal-box text-center">
          <div className="bg-[#fef7f7] inline-block rounded-full">
            <div className="bg-[#fce9e9] m-2.5 mb-1.5 inline-block rounded-full">
              <div className="primary_bg p-5 m-2.5 rounded-full">
                <img src={lock} alt="Lock" />
              </div>
            </div>
          </div>
          <h1 className="font-extrabold text-[32px] mt-8">Password Changed</h1>
          <p className="py-4">Your password has been updated successfully</p>
          <button
            onClick={() => navigate("/login")}
            // onClick={handleChangePassword}
            className="primary_bg p-3 w-full rounded-lg text-white text-[16px] font-semibold mt-6"
          >
            Back to Login
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </ParentAuthComponent>
  );
};

export default OtpScreen;
