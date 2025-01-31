/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import { GoChevronLeft } from "react-icons/go";
import "react-range-slider-input/dist/style.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import Footer from "../../Shared/Footer";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Checkbox, Radio, RadioGroup } from "@mui/material";
import Frame from "../../assets/icone/Frame.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCheckoutWithNewData,
  deleteCheckout,
  getCheckout,
} from "../../features/checkout/checkoutSlice";
import moment from "moment";
import EditableHeading from "../../Components/Common/EditableHeading";

const PersonalDetails = () => {
  const [travelerss, setTravler] = useState(1);
  const { texts } = useSelector((state) => state.texts);
  const inputStyle =
    "w-full my-3 border border-gray-300 focus:border-[#E86731] focus:ring-[1px] focus:ring-[#E86731] focus:outline-none p-2 rounded-md";
  const [value, setValue] = useState("I consent");
  const navigate = useNavigate();

  const { checkout } = useSelector((state) => state.checkout);
  const { packageDetails } = useSelector((state) => state.package);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCheckout());
  }, [dispatch]);

  useEffect(() => {
    setTravler(parseInt());
  }, [checkout]);

  useEffect(() => {
    if (!checkout || Object.keys(checkout).length === 0) {
      console.log("Checkout empty. Redirecting...");
      navigate("/tours");
    }
  }, [checkout, navigate]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const travelers = parseInt(checkout?.person, 10) || 1;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      travelers: Array.from({ length: travelers }).map(() => ({
        fullName: "",
        lastName: "",
        email: "",
        phone: "",
        date: "",
        gender: "",
      })),
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "travelers",
  });

  console.log(checkout);

  const onSubmit = (data) => {
    const userUpdateData = {
      ...data,
      ...checkout,
    };
    dispatch(createCheckoutWithNewData({ ...userUpdateData }));
    navigate("/checkout");
  };

  const removeSession = () => {
    dispatch(deleteCheckout());
    navigate(`/flight/${checkout?.toureId}`);
  };

  return (
    <div>
      <div className="">
        <ParentComponent>
          <div className="mt-20 flex">
            <button
              onClick={() => removeSession()}
              className="flex items-center"
            >
              <GoChevronLeft className="text-xl" />
            </button>
            <EditableHeading
              titleKey="personalDetails.back"
              defaultTitle="Back to transfers"
              customTitleClass="text-md"
            />
          </div>
          <div className="mt-10">
            <EditableHeading
              titleKey="personalDetailsTitle"
              subtitleKey="personalDetailsDescription"
              defaultTitle="Your Personal Details"
              defaultSubtitle="Provide Your Information to Complete Your Booking Securely"
            />
          </div>
        </ParentComponent>

        <div className="border border-b-[#A5A5AB] mt-14"></div>

        <ParentComponent>
          <div className="grid grid-cols-12 mt-20 lg:gap-5 xl:gap-20 grid-cols-reverse">
            <div className="col-span-12 lg:col-span-8 lg:order-1 bg-[#EFFBFB] p-2 lg:p-10 rounded-lg mb-10">
              <div>
                <div className="border rounded-lg">
                  <h2 className="p-2 lg:p-5 text-[#141D2A] flex items-center">
                    <EditableHeading
                      titleKey="personalDetailsTitle"
                      defaultTitle="Leggi bene prima di procedere"
                      customTitleClass="text-[20px] md:text-[28px] lg:text-[32px]"
                    />
                  </h2>

                  <div className="border border-b-[#c8c8ce] mt-3"></div>
                  <p className="p-5 text-[#72777F] ">
                    <EditableHeading
                      titleKey="personalDetailsDescription"
                      defaultTitle="Inserisci il tuo nome e cognome in versione completa come riportato nei documenti, inclusi secondi nomi e/o iniziali..."
                      customTitleClass="text-[18px] font-[18px]"
                    />
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="">
                  <h2 className="text-[#000000] text-[18px] font-[400] mt-5">
                    <EditableHeading
                      titleKey="personalDetailsTitle2"
                      defaultTitle="Modulo viaggiatore dinamico"
                      customTitleClass="text-[18px] font-[18px]"
                    />
                  </h2>

                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border-b border-gray-300 pb-4 mt-8"
                    >
                      <h3 className="text-[#141D2A] text-[20px]  mb-4 flex">
                        <EditableHeading
                          titleKey="personalDetailsTitle3"
                          defaultTitle="Viaggiatore"
                          customTitleClass="text-[18px] font-[18px] font-bold"
                        />
                        {index + 1}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-2">
                        <div>
                          <label htmlFor={`travelers.${index}.fullName`}>
                            <EditableHeading
                              titleKey="fullNameLabel"
                              defaultTitle="Nome e cognome *"
                              customTitleClass="text-sm"
                            />
                          </label>
                          <input
                            id={`travelers.${index}.fullName`}
                            {...register(`travelers.${index}.fullName`, {
                              required: "Nome e cognome è obbligatorio",
                            })}
                            placeholder={
                              texts["fullNamePlaceholder"] ||
                              "Inserisci il tuo nome e cognome"
                            }
                            className={inputStyle}
                          />
                          {errors.travelers?.[index]?.fullName && (
                            <p className="text-red-500">
                              {errors.travelers[index].fullName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor={`travelers.${index}.lastName`}>
                            <EditableHeading
                              titleKey="lastNameLabel"
                              defaultTitle="Cognome *"
                              customTitleClass="text-sm"
                            />
                          </label>
                          <input
                            id={`travelers.${index}.lastName`}
                            {...register(`travelers.${index}.lastName`, {
                              required: "Cognome è obbligatorio",
                            })}
                            placeholder={
                              texts["lastNamePlaceholder"] ||
                              "Inserisci il tuo cognome"
                            }
                            className={inputStyle}
                          />
                          {errors.travelers?.[index]?.lastName && (
                            <p className="text-red-500">
                              {errors.travelers[index].lastName.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-2 mt-4">
                        <div>
                          <label htmlFor={`travelers.${index}.email`}>
                            <EditableHeading
                              titleKey="emailLabel"
                              defaultTitle="E-mail *"
                              customTitleClass="text-sm"
                            />
                          </label>
                          <input
                            id={`travelers.${index}.email`}
                            {...register(`travelers.${index}.email`, {
                              required: "Email è obbligatorio",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "E-mail non valida",
                              },
                            })}
                            placeholder={
                              texts["emailPlaceholder"] ||
                              "Inserisci il tuo email"
                            }
                            className={inputStyle}
                          />
                          {errors.travelers?.[index]?.email && (
                            <p className="text-red-500">
                              {errors.travelers[index].email.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor={`travelers.${index}.phone`}>
                            <EditableHeading
                              titleKey="phoneLabel"
                              defaultTitle="Telefono *"
                              customTitleClass="text-sm"
                            />
                          </label>
                          <Controller
                            name={`travelers.${index}.phone`}
                            control={control}
                            rules={{ required: "Telefono è obbligatorio" }}
                            render={({ field }) => (
                              <PhoneInput
                                {...field}
                                id={`travelers.${index}.phone`}
                                placeholder={
                                  texts["phonePlaceholder"] ||
                                  "Inserisci il tuo telefono"
                                }
                                className={inputStyle}
                                international
                                defaultCountry="US"
                              />
                            )}
                          />
                          {errors.travelers?.[index]?.phone && (
                            <p className="text-red-500">
                              {errors.travelers[index].phone.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label htmlFor={`travelers.${index}.gender`}>
                            <EditableHeading
                              titleKey="genderLabel"
                              defaultTitle="Genere *"
                              customTitleClass="text-sm"
                            />
                          </label>
                          <select
                            id={`travelers.${index}.gender`}
                            {...register(`travelers.${index}.gender`, {
                              required: "Genere è obbligatorio",
                            })}
                            className={inputStyle}
                          >
                            <option value="">
                              {texts["genderSelectPlaceholder"] || "Seleziona"}
                            </option>
                            <option value="male">
                              {texts["genderMale"] || "Maschio"}
                            </option>
                            <option value="female">
                              {texts["genderFemale"] || "Femmina"}
                            </option>
                            <option value="other">
                              {texts["genderOther"] || "Altro"}
                            </option>
                          </select>
                          {errors.travelers?.[index]?.gender && (
                            <p className="text-red-500">
                              {errors.travelers[index].gender.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="my-6">
                    <EditableHeading
                      titleKey="personalDetailsTitle9"
                      defaultTitle="Requisiti speciali"
                      customTitleClass="text-[18px] font-[18px]"
                    />
                    <p>
                      <EditableHeading
                        titleKey="personalDetailsTitle10"
                        defaultTitle="Per favore, informaci delle tue allergie, necessità dietetiche, ecc."
                        customTitleClass="text-[16px] font-[16px]"
                      />
                    </p>

                    <div className="border rounded-lg my-6">
                      {fields.map((_, index) => (
                        <div
                          key={index}
                          className={`${
                            index === travelers - 1 ? "" : "border-b"
                          } flex justify-between items-center px-3`}
                        >
                          <span className="flex justify-between items-center w-full">
                            <h2 className="flex items-center">
                              {" "}
                              <EditableHeading
                                titleKey="personalDetailsTitle3"
                                defaultTitle="Viaggiatore"
                                customTitleClass="text-[18px] font-[18px]"
                              />
                              {index + 1}
                            </h2>
                            <div className="flex items-center">
                              <Checkbox {...label} /> Si
                              <Checkbox {...label} /> No
                            </div>
                          </span>
                        </div>
                      ))}
                    </div>
                    <h2 className="mt-6">
                      <EditableHeading
                        titleKey="personalDetailsTitle11"
                        defaultTitle="Termini e Condizioni"
                        customTitleClass="text-[18px] font-[18px]"
                      />
                    </h2>
                    <span className="flex items-center my-2">
                      <Checkbox {...label} />
                      <p className="flex gap-0">
                        <EditableHeading
                          titleKey="personalDetailsTitle12"
                          defaultTitle="Dichiaro di aver letto e accettato la"
                          customTitleClass="text-[16px] font-[16px]"
                        />
                        <EditableHeading
                          titleKey="personalDetailsTitle13"
                          defaultTitle="politica sulla riservatezza"
                          customTitleClass="text-[16px] font-[16px] text-[#E86731]"
                        />
                        <EditableHeading
                          titleKey="e"
                          defaultTitle="e"
                          customTitleClass="text-[16px] font-[16px]"
                        />
                        <EditableHeading
                          titleKey="personalDetailsTitle13"
                          defaultTitle="Termini e Condizioni"
                          customTitleClass="text-[16px] font-[16px] text-[#E86731]"
                        />
                        .
                      </p>
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="block text-center w-full duration-300 text-[#FFFFFF] py-2 rounded mt-4 bg-[#E86731] hover:bg-[#E86731]/80"
                  >
                    Invia
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar Section */}
            <div className="col-span-12 lg:col-span-4 mt-5 lg:mt-0">
              <div className="shadow-lg rounded-lg p-2 md:p-10">
                <h2 className="font-bold text-[24px] text-[#E86731]">
                  {packageDetails?.tourName}
                </h2>
                <p>
                  {checkout?.tureDuration?.days} Days /{" "}
                  {checkout?.tureDuration?.nights} Nights
                </p>
                <div className="border border-b-[#c8c8ce] mt-3"></div>
                <div className="mt-4">
                  <span className="flex items-start justify-between mb-3">
                    {moment(checkout?.tourDate)
                      .utc()
                      .format("DD/MM/YYYY HH:mm")}
                    <h2 className="text-[#000000] text-[18px] font-semibold text-center">
                      € {checkout?.totalPackageAmount}
                    </h2>
                  </span>
                  <span className="flex items-start justify-between mb-3">
                    <h2>Passengers</h2>
                    <h2 className="text-[#000000] text-[18px] font-semibold text-center">
                      {checkout?.person}
                    </h2>
                  </span>

                  {checkout?.flightPrice && (
                    <span className="flex items-start justify-between mb-3">
                      <h2 className="flex items-center">Flight Amount</h2>
                      <h2 className="text-[#000000] text-[18px] font-semibold text-center">
                        € {checkout?.flightPrice}
                      </h2>
                    </span>
                  )}
                  {checkout?.insurance?.price && (
                    <span className="flex items-start justify-between mb-3">
                      <h2 className="flex items-center">Insurance</h2>
                      <h2 className="text-[#000000] text-[18px] font-semibold text-center">
                        € {checkout?.insurance?.price}
                      </h2>
                    </span>
                  )}

                  <span className="flex items-start justify-between mb-3 border-t pt-2">
                    <h2>Total</h2>
                    <h2 className="text-[20px] font-semibold">
                      € {checkout?.toureAmount}
                    </h2>
                  </span>
                  <span className="pb-5 block">
                    <h2 className="flex items-center">
                      <FaHeart />{" "}
                      <p className="px-1 text-[#272727] font-bold">scalapay</p>{" "}
                      <CiCircleInfo />
                    </h2>
                  </span>
                </div>
                {/* <button className="block text-center w-full duration-300 text-[#FFFFFF] py-2 rounded mt-4 bg-[#E86731]">
                                    Continue
                                </button> */}
              </div>
            </div>
          </div>
        </ParentComponent>
        <Footer />
      </div>
    </div>
  );
};

export default PersonalDetails;
