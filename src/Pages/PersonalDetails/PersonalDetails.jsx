/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import { GoChevronLeft } from "react-icons/go";
import "react-range-slider-input/dist/style.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import Footer from "../../Shared/Footer";
import { useState } from "react";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Controller, useForm } from "react-hook-form";
import { Checkbox } from "@mui/material";



const PersonalDetails = () => {
    const inputStyle = "w-full my-3 border border-gray-300 focus:border-[#E86731] focus:ring-[1px] focus:ring-[#E86731] focus:outline-none p-2 rounded-md"

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [formData, setFormData] = useState(null);

    const onSubmit = (data) => {
        console.log("Form Data Submitted:", data);
        setFormData(data);
    };


    return (
        <div>
            <div className="pb-20" >
                <ParentComponent>
                    <div className="mt-20 flex  ">
                        <Link to="/transfers/id" className="flex items-center">
                            <GoChevronLeft className="text-xl" /> Back to  Transfers
                        </Link>
                    </div>
                    <div className="mt-10">
                        <HeadLine
                            title="Your Personal Details"
                            description="Provide Your Information to Complete Your Booking Securely"
                        />
                    </div>
                </ParentComponent>

                <div className="border border-b-[#A5A5AB] mt-14"></div>

                <ParentComponent>
                    <div className="grid grid-cols-12 mt-20 lg:gap-5 xl:gap-20 grid-cols-reverse ">

                        <div className=" col-span-12 lg:col-span-8 lg:order-1 bg-[#EFFBFB] p-10 rounded-lg ">

                            <div>

                                <div className="border  rounded-lg">
                                    <h2 className="p-5 text-[#141D2A] text-[32px] font-bold">Leggi bene prima di procedere</h2>
                                    <div className="border border-b-[#c8c8ce] mt-3"></div>
                                    <p className="p-5 text-[#72777F] font-[18px]">
                                        Inserisci il tuo nome e cognome in versione completa come riportato nei documenti, inclusi secondi nomi e/o iniziali. Questi dati ci serviranno per proseguire con l'acquisto dei servizi e assicurazione di viaggio. Se i dati non corrispondono a quelli dei documenti, WeRoad si astiene da ogni responsabilità. Tutti i dati inseriti devono essere veritieri, in caso contrario, la prenotazione potrebbe essere annullata senza diritto di rimborso.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h2 className="text-[#000000] text-[18px] font-[400] mt-5">
                                        Campi obbligatori *
                                    </h2>
                                    <h2 className="text-[#141D2A] text-[24px] font-[600] mt-8 mb-6">
                                        Traveler 1
                                    </h2>

                                    {/* Full Name and Last Name */}
                                    <div className="mt-5">
                                        <span className="grid grid-cols-2 gap-2 mt-3">
                                            <div>
                                                <label htmlFor="fullName" className="text-[18px] text-[#141D2A]">
                                                    Full Name
                                                </label>
                                                <input
                                                    id="fullName"
                                                    className={inputStyle}
                                                    {...register("fullName", { required: "Full Name is required" })}
                                                    placeholder="Enter First Name"
                                                />
                                                {errors.fullName && (
                                                    <p className="text-red-500">{errors.fullName.message}</p>
                                                )}
                                                <p className="text-[#72777F]">
                                                    As stated on your ID card or passport
                                                </p>
                                            </div>
                                            <div>
                                                <label htmlFor="lastName" className="text-transparent">
                                                    1
                                                </label>
                                                <input
                                                    id="lastName"
                                                    className={inputStyle}
                                                    {...register("lastName", { required: "Last Name is required" })}
                                                    placeholder="Enter Last Name"
                                                />
                                                {errors.lastName && (
                                                    <p className="text-red-500">{errors.lastName.message}</p>
                                                )}
                                                <p className="text-[#72777F]">
                                                    As stated on your ID card or passport
                                                </p>
                                            </div>
                                        </span>
                                    </div>

                                    {/* Email and Phone */}
                                    <div className="mt-5">
                                        <span className="grid grid-cols-2 gap-2 mt-3">
                                            <div>
                                                <label htmlFor="email" className="text-[18px] text-[#141D2A]">
                                                    Email Address
                                                </label>
                                                <input
                                                    id="email"
                                                    className={inputStyle}
                                                    {...register("email", {
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                            message: "Invalid email address",
                                                        },
                                                    })}
                                                    placeholder="Enter Email Address"
                                                />
                                                {errors.email && (
                                                    <p className="text-red-500">{errors.email.message}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label htmlFor="phone" className="text-[18px] text-[#141D2A]">
                                                    Phone Number
                                                </label>
                                                <Controller
                                                    name="phone"
                                                    control={control}
                                                    rules={{ required: "Phone number is required" }}
                                                    render={({ field }) => (
                                                        <PhoneInput
                                                            {...field}
                                                            id="phone"
                                                            className={inputStyle}
                                                            international
                                                            defaultCountry="RU"
                                                            placeholder="Enter phone number"
                                                        />
                                                    )}
                                                />
                                                {errors.phone && (
                                                    <p className="text-red-500">{errors.phone.message}</p>
                                                )}
                                            </div>

                                        </span>
                                    </div>

                                    {/* Date */}
                                    <div className="mt-5">
                                        <span className="grid grid-cols-1  gap-2 mt-3">
                                            <div>
                                                <label htmlFor="date" className="text-[18px] text-[#141D2A]">
                                                    Date
                                                </label>

                                                <input className={inputStyle} type="date" />

                                                {errors.date && (
                                                    <p className="text-red-500">{errors.date.message}</p>
                                                )}
                                            </div>

                                            <div>

                                                <label htmlFor="sex" className="text-[18px] text-[#141D2A]">
                                                    Sex
                                                </label>

                                                <select className={inputStyle} name="" id="">
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>

                                                {errors.phone && (
                                                    <p className="text-red-500">{errors.phone.message}</p>
                                                )}

                                            </div>

                                        </span>
                                        <p className="text-[#72777F]" > <Checkbox {...label} /> I Agree To All Your Terms & condition</p>
                                    </div>



                                    <button
                                        type="submit"
                                        className="mt-5 bg-[#E86731] text-white py-2 px-4 rounded-md"
                                    >
                                        Submit
                                    </button>

                                    {formData && (
                                        <div className="mt-5 p-4 border border-gray-300 rounded-md">
                                            <h2 className="text-[#141D2A] font-bold">Submitted Data:</h2>
                                            <pre>{JSON.stringify(formData, null, 2)}</pre>
                                        </div>
                                    )}
                                </form>




                            </div>

                        </div>

                        {/* ======================================  Side bar ========================== */}

                        <div className=" col-span-12 lg:col-span-4 mt-5 lg:mt-0 ">
                            <div className=" shadow-lg rounded-lg p-10">

                                <h2 className="font-bold text-[24px] text-[#E86731] ">Fuerteventura</h2>
                                <p>8 Days / 7 Nights</p>

                                <div className="border border-b-[#c8c8ce] mt-3"></div>

                                <div className="mt-4">
                                    <span className="flex items-start justify-between mb-3 " >
                                        <h2>April 19 - 26</h2>
                                        <h2 className="text-[#000000] text-[18px] font-semibold text-center " >€ 653 </h2>
                                    </span>
                                    <span className="flex items-start justify-between mb-3 " >
                                        <h2>Passengers</h2>
                                        <h2 className="text-[#000000] text-[18px] font-semibold text-center " >X1 </h2>
                                    </span>
                                    <span className="flex items-start justify-between mb-3 " >
                                        <h2>Room</h2>
                                        <h2 className="text-[#000000] text-[18px] font-semibold text-center " >Private Double </h2>
                                    </span>

                                    <span className="flex items-start justify-between mb-3 border-b pb-5 " >
                                        <h2>Included services</h2>
                                        <h2 className="text-[#000000] text-[18px] font-semibold text-center " > <MdKeyboardArrowDown /> </h2>
                                    </span>

                                    <span className="flex items-start justify-between mb-3 " >
                                        <h2>Total</h2>
                                        <h2 className="text-[20px] font-semibold " >€ 2,345</h2>
                                    </span>

                                    <span className=" pb-5 block " >
                                        <p className="text-[#72777F] xl:pr-10" >or 3 installments of €232.66 interest-free.</p>
                                        <h2 className="flex items-center" ><FaHeart /> <p className="px-1 text-[#272727] font-bold " >scalapay</p> <CiCircleInfo /> </h2>
                                    </span>

                                </div>

                                <Link to="/personalDetails" className={` block text-center w-full duration-300 text-[#FFFFFF] py-2 rounded mt-4 bg-[#D2D2D5] `} >Continue</Link>

                            </div>
                        </div>

                    </div>
                </ParentComponent>
            </div>

            <Footer />
        </div>
    );
};

export default PersonalDetails;
