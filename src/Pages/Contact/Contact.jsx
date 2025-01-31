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
import EditableHeading from "../../Components/Common/EditableHeading";
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
  const { texts } = useSelector((state) => state.texts);
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
            <h1 className="">
              <EditableHeading
                titleKey="contact.title"
                defaultTitle="Contattaci e Facciamo i piani"
                customTitleClass="text-[#000000] text-[32px] font-extrabold"
              />
            </h1>
            <p className="text-[#72777F] text-[18px] mt-6">
              <EditableHeading
                titleKey="contact.description"
                defaultTitle="Contattaci oggi per una soluzione personalizzata adatta alle tue esigenze!"
                customTitleClass="text-[#72777F] text-[18px] mt-6"
              />
            </p>

            <div className="flex gap-3 mt-10">
              <div className="w-11 h-11 bg-[#fef7f4] rounded-md">
                <img src={mail} className=" m-2.5" alt="" />
              </div>
              <div>
                <p className="">
                  {" "}
                  <EditableHeading
                    titleKey="contact.service"
                    defaultTitle="Scrivici a"
                    customTitleClass="text-[16px]"
                  />{" "}
                </p>
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
                <p className="text-[16px]">
                  <EditableHeading
                    titleKey="contact.phone"
                    defaultTitle="Contattaci al"
                    customTitleClass="text-[16px]"
                  />
                </p>
                <p className="text-[18px] primary_text font-medium">
                  {homePageData?.footer[0]?.contactInfo?.phone}
                </p>
              </div>{" "}
            </div>
          </div>

          <div className="p-10 bg-[#effbfb] rounded-xl">
            <h1 className="">
              <EditableHeading
                titleKey="contact.message"
                defaultTitle="Scrivici un messaggio"
                customTitleClass="text-3xl font-bold"
              />
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[18px] font-medium mt-8 mb-3">
                    <EditableHeading
                      titleKey="contact.name"
                      defaultTitle="Nome"
                      customTitleClass="text-[18px] font-medium mt-8 mb-3"
                    />
                  </p>
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
                  <p className="text-[18px] font-medium mt-8 mb-3">
                    <EditableHeading
                      titleKey="contact.lastName"
                      defaultTitle="Cognome"
                      customTitleClass="text-[18px] font-medium mt-8 mb-3"
                    />
                  </p>
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
                    <EditableHeading
                      titleKey="contact.email"
                      defaultTitle="Indirizzo e-mail"
                      customTitleClass="text-[18px] font-medium mt-5 mb-3"
                    />
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
                    <EditableHeading
                      titleKey="contact.phone"
                      defaultTitle="Numero di telefono"
                      customTitleClass="text-[18px] font-medium mt-5 mb-3"
                    />
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
                <p className="text-[18px] font-medium mt-5 mb-3">
                  <EditableHeading
                    titleKey="contact.message"
                    defaultTitle="Message"
                    customTitleClass="text-[18px] font-medium mt-5 mb-3"
                  />
                </p>
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
                  <EditableHeading
                    titleKey="contact.preferredMethod"
                    defaultTitle="Metodo di contatto preferito"
                    customTitleClass="text-[18px] font-medium mt-5 mb-3"
                  />
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
                      <EditableHeading
                        titleKey="contact.phone"
                        defaultTitle="Telefono"
                        customTitleClass="text-[16px]"
                      />
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
                      <EditableHeading
                        titleKey="contact.email"
                        defaultTitle="E-mail"
                        customTitleClass="text-[16px]"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full  ">
                <EditableHeading
                  titleKey="contact.sendMessage"
                  defaultTitle="Invia il messaggio"
                  customTitleClass="text-[16px] primary_bg text-white font-medium text-[16px] p-3 mt-6 rounded-md"
                />
              </button>
            </form>
          </div>
        </div>
      </ParentComponent>
      <div className="bg-[#effbfb] mt-20 pt-1 pb-20">
        <ApproachSection texts={texts} />
      </div>
    </div>
  );
};

export default Contact;
