import { useNavigate } from "react-router-dom";
import ParentAuthComponent from "../../Shared/ParentComponent/ParentAuthComponent";
import heroImage from "../../assets/Images/about.jpg";
import logo from "../../assets/logo.svg";
const Login = () => {
  const navigate = useNavigate()
  return (
    <ParentAuthComponent>
      <div className="grid grid-cols-1 md:grid-cols-5 h-full ">
        <div className="md:col-span-2 hidden md:block">
          <img className="h-full w-full object-cover" src={heroImage} alt="" />
        </div>
        <div className="h-full w-full md:col-span-3">
          <div className="lg:m-20 m-5">
            <img src={logo} alt="" />
            <h1 className="font-extrabold text-[32px] mt-10">Welcome back</h1>
            <h5 className="text-[#72777F] text-[16px] mt-3">
              Welcome back! Please enter your details.
            </h5>
            <div>
              <p className="text-[18px] font-medium mt-5">Email</p>
              <input
                type="text"
                placeholder="Enter Your Email"
                className="p-3 text-[16px] rounded-md w-full border border-[#D0D5DD]"
              />
            </div>
            <div>
              <p className="text-[18px] font-medium mt-5 ">Password</p>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="p-3 text-[16px] rounded-md w-full border border-[#D0D5DD]"
              />
            </div>
            <div className="mt-6 flex justify-between">
              <div>
                <input type="checkbox" className=" mr-2" />
                <p className="inline text-[14px]">Remember for 30 days</p>
              </div>
              <p onClick={()=> navigate('/forgot-password')}  className="primary_text font-semibold cursor-pointer">Forgot Password</p>{" "}
            </div>
            <button className="primary_bg p-3 w-full rounded-lg text-white text-[16px] font-semibold mt-6">Log in</button>
          <div className="text-[#475467] mt-8 text-center">{"Don't"} have an account ? <span onClick={()=> navigate('/signup')} className="primary_text font-semibold cursor-pointer">Sign up</span></div>
          </div>
        </div>
      </div>
    </ParentAuthComponent>
  );
};

export default Login;
