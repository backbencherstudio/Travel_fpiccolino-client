import { useNavigate } from "react-router-dom";
import ParentAuthComponent from "../../Shared/ParentComponent/ParentAuthComponent";
import heroImage from "../../assets/Images/HeroSection/heroImage.jpg";
import logo from "../../assets/logo.svg";
import { FaAngleLeft } from "react-icons/fa";
import { useState } from "react";
const OtpScreen = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate()
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
            <p onClick={()=>navigate('/forgot-password')} className="text-[16px] cursor-pointer mt-10 flex items-center"><FaAngleLeft style={{fontSize:'20px'}}/>  Back</p>
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
               onChange={(e) => handleOtpChange(index, e.target.value, e)}
               onKeyDown={(e) => handleOtpChange(index, e.target.value, e)}
               className={`w-[60px] h-[60px] text-sm text-center border ${digit && 'border-[#35aff4]'} rounded-lg font-bold text-[24px]`}
             />
             
              ))}
            </div>
          
          
            <button className="primary_bg p-3 w-full rounded-lg text-white text-[16px] font-semibold mt-6 ">Submit OTP</button>
       
          </div>
        </div>
      </div>
    </ParentAuthComponent>
  );
};

export default OtpScreen;
