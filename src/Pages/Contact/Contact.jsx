import ApproachSection from "../../Components/Home/ApproachSection";
import call from "../../assets/icons/call2.svg";
import mail from "../../assets/icons/mail2.svg";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../features/contact/contactSlice";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import { getCiontectPageData } from "../../features/pageData/pageDataSlice";
const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [selectedOption, setSelectedOption] = useState("phone");
  const dispatch = useDispatch();

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const onSubmit = (data) => {
    console.log("Submitted Data:", { ...data, contactMethod: selectedOption });
    const contactData = { ...data, contactMethod: selectedOption };
    const res = dispatch(createContact(contactData));
    console.log("res", res);
    reset();
  };

  // const { headers } = useSelector((state) => state.header);
  const { contactPage, homePageData } = useSelector((state) => state.pageData);
  useEffect(() => {
    // dispatch(getHeader());
    dispatch(getCiontectPageData());
  }, []);
  // const data = headers?.filter((item) => item.pageName === "contact");

  if (!contactPage) {
    return;
  }

  const heroContent = contactPage?.hero;

  // {
  //   heroImage: data[0]?.heroImage,
  //   titleOne: data[0]?.titleOne,
  //   descriptionOne: data[0]?.descriptionOne,
  // };

  return (
    <div>
      {/* <BannerSection /> */}
      <HeroScetion heroContent={heroContent} />
      <ParentComponent>
        <div className="mt-20 grid md:grid-cols-2 max-w-[1440px] mx-auto gap-10">
          <div>
            <h1 className="text-[32px] font-extrabold">
              Let's Connect And <br /> Make Plans
            </h1>
            <p className="text-[#72777F] text-[18px] mt-6">
              Contact Us Today for a Customized Solution Tailored to Your Needs!
            </p>

            <div className="flex gap-3 mt-10">
              <div className="w-11 h-11 bg-[#fef7f4] rounded-md">
                <img src={mail} className=" m-2.5" alt="" />
              </div>
              <div>
                <p className="text-[16px]">Mail us at</p>
                <p className="text-[18px] primary_text font-medium">
                  {homePageData?.footer[0]?.contactInfo?.email}
                </p>
              </div>{" "}
            </div>
            <div className="flex gap-3 mt-5">
              <div className="w-11 h-11 bg-[#fef7f4] rounded-md">
                <img src={call} className=" m-2.5" alt="" />
              </div>
              <div>
                <p className="text-[16px]">Phone us at</p>
                <p className="text-[18px] primary_text font-medium">
                  {homePageData?.footer[0]?.contactInfo?.phone}
                </p>
              </div>{" "}
            </div>
          </div>

          <div className="p-10 bg-[#effbfb] rounded-xl">
            <h1 className="text-3xl font-bold">Send us a message</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[18px] font-medium mt-8 mb-3">
                    First Name
                  </p>
                  <input
                    type="text"
                    placeholder="Enter First Name"
                    className="p-3 text-[16px] rounded-md w-full"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-[18px] font-medium mt-8 mb-3">Last Name</p>
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    className="p-3 text-[16px] rounded-md w-full"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-[18px] font-medium mt-5 mb-3">
                    Email Address
                  </p>
                  <input
                    type="text"
                    placeholder="Enter Email Address"
                    className="p-3 text-[16px] rounded-md w-full"
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-[18px] font-medium mt-5 mb-3">
                    Phone Number
                  </p>
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    className="p-3 text-[16px] rounded-md w-full"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        message: "Phone number must be numeric",
                      },
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-[18px] font-medium mt-5 mb-3">Message</p>
                <textarea
                  placeholder="Enter Message"
                  className="p-3 text-[16px] rounded-md w-full"
                  {...register("message", { required: "Message is required" })}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <div>
                <p className="text-[18px] font-medium mt-5 mb-3">
                  Preferred Contact Method
                </p>
                <div className="grid grid-cols-2 gap-3 bg-white p-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="phone"
                      name="contactMethod"
                      value="phone"
                      checked={selectedOption === "phone"}
                      onChange={handleOptionChange}
                      className="mr-2 size-5"
                    />
                    <label
                      htmlFor="phone"
                      className={`text-[16px] ${
                        selectedOption === "phone"
                          ? "primary_text"
                          : "text-zinc-400"
                      }`}
                    >
                      Phone
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="email"
                      name="contactMethod"
                      value="email"
                      checked={selectedOption === "email"}
                      onChange={handleOptionChange}
                      className="mr-2 size-5"
                    />
                    <label
                      htmlFor="email"
                      className={`text-[16px] ${
                        selectedOption === "email"
                          ? "primary_text"
                          : "text-zinc-400"
                      }`}
                    >
                      Email
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="p-3 w-full primary_bg text-white font-medium text-[16px] mt-6 rounded-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </ParentComponent>
      <div className="bg-[#effbfb] mt-20 pt-1 pb-20">
        <ApproachSection />
      </div>
    </div>
  );
};

export default Contact;
