import { useNavigate } from "react-router-dom";
import ParentAuthComponent from "../../Shared/ParentComponent/ParentAuthComponent";
import heroImage from "../../assets/Images/beach.jpg";
import logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const navigate = useNavigate();

  const SignUp = () => {
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  };

  
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // Handle form submission logic, e.g., API calls
  };

  return (
    <ParentAuthComponent>
      <div className="grid grid-cols-1 md:grid-cols-5 h-full ">
        <div className="md:col-span-2 hidden md:block">
          <img className="h-full w-full object-cover" src={heroImage} alt="" />
        </div>
        <div className="h-full w-full md:col-span-3">
          <div className="lg:m-20 m-5">
            <img src={logo} alt="" />
            <h1 className="font-extrabold text-[32px] mt-10">
              Create New Account
            </h1>
            <h5 className="text-[#72777F] text-[16px] mt-3">
              Please enter your details.
            </h5>
            <div>
              <p className="text-[18px] font-medium mt-5">Name</p>
              <input
                type="text"
                placeholder="Enter Your Name"
                className="p-3 text-[16px] rounded-md w-full border border-[#D0D5DD]"
              />
            </div>
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
            <div className="mt-1 flex justify-between">
              <div>
                <p className="inline text-[14px]">
                  Must be at least 8 characters
                </p>
              </div>
            </div>
            <button className="primary_bg p-3 w-full rounded-lg text-white text-[16px] font-semibold mt-6">
              Sign Up
            </button>
            <div className="text-[#475467] mt-8 text-center">
              Already have account ?{" "}
              <span
                onClick={() => navigate("/login")}
                className="primary_text font-semibold cursor-pointer"
              >
                Log in
              </span>
            </div>
          </div>
        </div>
      </div>
    </ParentAuthComponent>
  );
};

export default SignUp;
