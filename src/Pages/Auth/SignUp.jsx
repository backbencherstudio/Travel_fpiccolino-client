import { useNavigate } from "react-router-dom";
import ParentAuthComponent from "../../Shared/ParentComponent/ParentAuthComponent";
import heroImage from "../../assets/Images/beach.jpg";
import logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";
import { BsExclamationCircle } from "react-icons/bs";

const SignUp = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { signupLoading, signupError } = useSelector(
    (state) => state.authorization
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showError, setShowError] = useState(!!signupError);
  useEffect(() => {
    if (signupError) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [signupError]);

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const responce = await dispatch(registerUser(data));
      console.log(responce);
      if (responce?.payload?.otp === "success") {
        navigate("/signotp");
      }
    } catch (error) {
      console.log(error);
    }
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

            {showError ? (
              <div className="errorMessage mt-5">
                <BsExclamationCircle className="exclamationMark text-red-500 " />
                {/* <p className="error-message">{signupError}</p> */}
                <p className="error-message">{signupError}</p>
              </div>
            ) : (
              <h5 className="text-[#72777F] text-[16px] mt-3">
                Please enter your details.
              </h5>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <p className="text-[18px] font-medium mt-5">Name</p>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  className="p-3 text-[16px] rounded-md w-full border border-[#D0D5DD]"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <p className="text-[18px] font-medium mt-5">Email</p>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  className="p-3 text-[16px] rounded-md w-full border border-[#D0D5DD]"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div>
                <p className="text-[18px] font-medium mt-5 ">Password</p>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="p-3 text-[16px] rounded-md w-full border border-[#D0D5DD]"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mt-1 flex justify-between">
                <p className="inline text-[14px]">
                  Must be at least 8 characters
                </p>
              </div>

              <button
                type="submit"
                className="primary_bg p-3 w-full rounded-lg text-white text-[16px] font-semibold mt-6"
              >
                {signupLoading ? "Loading ... " : "Sign Up"} {/*  later on */}
              </button>

              <div className="text-[#475467] mt-8 text-center">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="primary_text font-semibold cursor-pointer"
                >
                  Log in
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ParentAuthComponent>
  );
};

export default SignUp;
