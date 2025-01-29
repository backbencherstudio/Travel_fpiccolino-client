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
              Contattaci e <br /> Facciamo i piani
            </h1>
            <p className="text-[#72777F] text-[18px] mt-6">
              Contattaci oggi per una soluzione personalizzata adatta alle tue
              esigenze!
            </p>

            <div className="flex gap-3 mt-10">
              <div className="w-11 h-11 bg-[#fef7f4] rounded-md">
                <img src={mail} className=" m-2.5" alt="" />
              </div>
              <div>
                <p className="text-[16px]">Scrivici a</p>
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
                <p className="text-[16px]">Contattaci al</p>
                <p className="text-[18px] primary_text font-medium">
                  {homePageData?.footer[0]?.contactInfo?.phone}
                </p>
              </div>{" "}
            </div>
          </div>

          <div className="p-10 bg-[#effbfb] rounded-xl">
            <h1 className="text-3xl font-bold">Scrivici un messaggio</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[18px] font-medium mt-8 mb-3">Nome</p>
                  <input
                    type="text"
                    placeholder="Inserisci il nome"
                    className="p-3 text-[16px] rounded-md w-full"
                    {...register("firstName", {
                      required: "Nome è obbligatorio",
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <p className="text-[18px] font-medium mt-8 mb-3">Cognome</p>
                  <input
                    type="text"
                    placeholder="Inserisci il cognome"
                    className="p-3 text-[16px] rounded-md w-full"
                    {...register("lastName", {
                      required: "Cognome è obbligatorio",
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
                    Indirizzo e-mail
                  </p>
                  <input
                    type="text"
                    placeholder="Inserisci l'indirizzo e-mail"
                    className="p-3 text-[16px] rounded-md w-full"
                    {...register("email", {
                      required: "Indirizzo e-mail è obbligatorio",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Inserisci un indirizzo e-mail valido",
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
                    Numero di telefono
                  </p>
                  <input
                    type="text"
                    placeholder="Inserisci il numero di telefono"
                    className="p-3 text-[16px] rounded-md w-full"
                    {...register("phone", {
                      required: "Numero di telefono è obbligatorio",
                      pattern: {
                        message: "Il numero di telefono deve essere numerico",
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
                  placeholder="Inserisci il messaggio"
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
                  Metodo di contatto preferito
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
                      Telefono
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
                      E-mail
                    </label>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="p-3 w-full primary_bg text-white font-medium text-[16px] mt-6 rounded-md"
              >
                Invia il messaggio
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
