import { useNavigate } from "react-router-dom";
import ParentAuthComponent from "../../Shared/ParentComponent/ParentAuthComponent";
import heroImage from "../../assets/Images/blogDetails.jpg";
import logo from "../../assets/logo.svg";
import { FaAngleLeft } from "react-icons/fa";
const ForgotPassword = () => {
  const navigate = useNavigate()
  return (
    <ParentAuthComponent>
      <div className="grid grid-cols-1 md:grid-cols-5 h-full ">
        <div className="md:col-span-2 hidden md:block">
          <img className="h-full w-full object-cover" src={heroImage} alt="" />
        </div>
        <div className="h-full w-full md:col-span-3">
          <div className="my-40 lg:mx-20 m-5">
            <img src={logo} alt="" />
            <p onClick={()=>navigate('/login')} className="text-[16px] cursor-pointer mt-10 flex items-center"><FaAngleLeft style={{fontSize:'20px'}}/>  Back</p>
            <h1 className="font-extrabold text-[32px] mt-8">Forgot Password</h1>
            <h5 className="text-[#72777F] text-[16px] mt-3">
            Enter your registered email address. we’ll send you a code to reset your password.
            </h5>
            <div>
              <p className="text-[14px] font-medium mt-5">Email Address or Phone Numbner</p>
              <input
                type="text"
                placeholder="Enter Email or Phone Number"
                className="p-3 text-[16px] rounded-md w-full border border-[#D0D5DD]"
              />
            </div>
          
          
            <button className="primary_bg p-3 w-full rounded-lg text-white text-[16px] font-semibold mt-6">Send OTP</button>
       
          </div>
        </div>
      </div>
    </ParentAuthComponent>
  );
};

export default ForgotPassword;
