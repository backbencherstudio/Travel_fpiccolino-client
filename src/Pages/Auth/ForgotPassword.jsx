import { useNavigate } from "react-router-dom";
import ParentAuthComponent from "../../Shared/ParentComponent/ParentAuthComponent";
import heroImage from "../../assets/Images/blogDetails.jpg";
import logo from "../../assets/logo.svg";
import { FaAngleLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { request_forgot_password_otp } from "../../features/auth/authSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { BsExclamationCircle } from "react-icons/bs";
import { base_url } from "../../utils/base_path";
import axios from "axios";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [forgotBanner, setForgotBanner] = useState(null);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const response = await axios.get(`${base_url}/api/auth-banners`);
        if (response.data && response.data.forgotBanner) {
          setForgotBanner(`${base_url}/${response.data.forgotBanner}`);
        }
      } catch (error) {
        console.error("Error fetching banner:", error);
      }
    };

    fetchBanner();
  }, []);
  const {
    request_forgot_password_otpLoading,
    request_forgot_password_otpError,
  } = useSelector((state) => state.authorization);

  const [showError, setShowError] = useState(
    !!request_forgot_password_otpError
  );

  useEffect(() => {
    if (request_forgot_password_otpError) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [request_forgot_password_otpError]);

  const handleForgotPassword = async () => {
    if (email) {
      let responce = await dispatch(request_forgot_password_otp(email));
      console.log("responce etge rrew ", responce);
      if (responce.payload.success === true) {
        navigate("/otp");
      }
      // navigate("/otp");
    } else {
      setShowError("email is required");
    }
  };

  return (
    <ParentAuthComponent>
      <div className="grid grid-cols-1 md:grid-cols-5 h-full">
        <div className="md:col-span-2 hidden md:block">
          <img
            className="h-full w-full object-cover"
            src={forgotBanner || heroImage}
            alt="Forgot Password Banner"
          />
        </div>
        <div className="h-full w-full md:col-span-3">
          <div className="my-40 lg:mx-20 m-5">
            <img src={logo} alt="" />
            <p
              onClick={() => navigate("/login")}
              className="text-[16px] cursor-pointer mt-10 flex items-center"
            >
              <FaAngleLeft style={{ fontSize: "20px" }} /> Indietro
            </p>
            {showError && (
              <h5 className="text-red-500 text-[16px] mt-5 flex items-center">
                <BsExclamationCircle size={25} className=" text-red-500 mr-2" />
                {request_forgot_password_otpError}
              </h5>
            )}
            <h1 className="font-extrabold text-[32px] mt-8">
              Password dimenticata
            </h1>
            <h5 className="text-[#72777F] text-[16px] mt-3">
              Inserisci la tua e-mail registrata. Ti invieremo un codice per
              reimpostare la tua password.
            </h5>
            <div>
              <p className="text-[14px] font-medium mt-5">
                E-mail o numero di telefono
              </p>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Inserisci la tua e-mail o numero di telefono"
                className="p-3 text-[16px] rounded-md w-full border border-[#D0D5DD]"
              />
            </div>

            <button
              onClick={handleForgotPassword}
              className="primary_bg p-3 w-full rounded-lg text-white text-[16px] font-semibold mt-6"
              disabled={request_forgot_password_otpLoading}
            >
              {request_forgot_password_otpLoading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress size={30} color="#fff" />
                </Box>
              ) : (
                "Invia OTP"
              )}
            </button>
          </div>
        </div>
      </div>
    </ParentAuthComponent>
  );
};

export default ForgotPassword;
