import { useNavigate } from "react-router-dom";
import ParentAuthComponent from "../../Shared/ParentComponent/ParentAuthComponent";
import heroImage from "../../assets/Images/about.jpg";
import logo from "../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { loginUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./style.css";
import { BsExclamationCircle } from "react-icons/bs";
import { useEffect, useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginLoading, loginError } = useSelector(
    (state) => state.authorization
  );

  const onSubmit = async (data) => {
    console.log(514541, data);
    const responce = await dispatch(loginUser(data));
    console.log(responce);
    if (responce.type === "users/login/fulfilled") {
      navigate("/");
    }
  };

  const [showError, setShowError] = useState(!!loginError);
  useEffect(() => {
    if (loginError) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [loginError]);

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
            <h1 className="font-extrabold text-[32px] mt-10">Bentornato</h1>
            {showError ? (
              <h5 className="text-red-500 text-[16px] error-message flex items-center mt-5">
                <BsExclamationCircle className=" text-red-500 mr-2" />
                {loginError}
              </h5>
            ) : (
              <h5 className="text-[#72777F] text-[16px] mt-5">
                Benvenuto! Per favore, inserisci i tuoi dettagli.
              </h5>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="h-24">
                <p className="text-[18px] font-medium mt-5">E-mail</p>
                <input
                  type="text"
                  placeholder="Inserisci la tua e-mail"
                  className="p-3 text-[16px] rounded-md w-full border border-[#D0D5DD]"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Inserisci una e-mail valida",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm ">
                    {errors.email.message}
                  </p>
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
                      message: "La password deve essere almeno 8 caratteri",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="mt-6 flex justify-between">
                <div>
                  {/* <input
                    type="checkbox"
                    className="mr-2"
                    {...register("rememberMe")}
                  />
                  <p className="inline text-[14px]">Ricordami per 30 giorni</p> */}
                </div>
                <p
                  onClick={() => navigate("/forgot-password")}
                  className="primary_text font-semibold cursor-pointer"
                >
                  Password dimenticata
                </p>
              </div>

              <button
                type="submit"
                className={`primary_bg ${
                  loginLoading ? "p-1" : "p-3"
                }   w-full rounded-lg text-white text-[16px] font-semibold mt-6`}
              >
                {loginLoading ? (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <CircularProgress size={30} color="#fff" />
                  </Box>
                ) : (
                  "Accedi"
                )}
              </button>

              <div className="text-[#475467] mt-8 text-center">
                Non hai un account?{" "}
                <span
                  onClick={() => navigate("/signup")}
                  className="primary_text font-semibold cursor-pointer"
                >
                  Registrati
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ParentAuthComponent>
  );
};

export default Login;
