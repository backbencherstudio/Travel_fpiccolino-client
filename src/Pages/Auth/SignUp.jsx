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

  console.log(signupLoading, signupError);
  return (
    <ParentAuthComponent>
      <div className="grid grid-cols-1 md:grid-cols-5 h-full ">
        <div className="md:col-span-2 hidden md:block">
          <img className="h-full w-full object-cover" src={heroImage} alt="" />
        </div>
        <div className="h-full w-full md:col-span-3">
          <div className="lg:m-20 m-5">
            <img
              className="cursor-pointer"
              onClick={() => navigate("/")}
              src={logo}
              alt=""
            />
            <h1 className="font-extrabold text-[32px] mt-10">
              Crea un nuovo account
            </h1>

            {showError ? (
              <h5 className="text-red-500 text-[16px] error-message flex items-center mt-5">
                <BsExclamationCircle className=" text-red-500 mr-2" />
                {signupError}
              </h5>
            ) : (
              <h5 className="text-[#72777F] text-[16px] mt-5">
                Per favore, inserisci i tuoi dettagli.
              </h5>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="h-24">
                <p className="text-[18px] font-medium mt-5">Nome</p>
                <input
                  type="text"
                  placeholder="Inserisci il tuo nome"
                  className="p-3 text-[16px] rounded-md w-full border border-[#D0D5DD]"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="h-24">
                <p className="text-[18px] font-medium mt-5">Email</p>
                <input
                  type="text"
                  placeholder="Inserisci la tua e-mail"
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

              <div className="h-24">
                <p className="text-[18px] font-medium mt-5 ">Password</p>
                <input
                  type="password"
                  placeholder="Inserisci la tua password"
                  className="p-3 text-[16px] rounded-md w-full border border-[#D0D5DD]"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                />
              </div>

              <div className="mt-1 flex justify-between">
                <p className="inline text-[14px]">
                  Deve essere almeno 8 caratteri
                </p>
              </div>

              <button
                type="submit"
                className="primary_bg p-3 w-full rounded-lg text-white text-[16px] font-semibold mt-6"
              >
                Registrati
              </button>

              <div className="text-[#475467] mt-8 text-center">
                Hai già un account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="primary_text font-semibold cursor-pointer"
                >
                  {signupLoading ? "Caricamento ... " : "Accedi"}{" "}
                  {/*  later on */}
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
