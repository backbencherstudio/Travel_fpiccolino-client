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
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Checkbox, Radio, RadioGroup } from "@mui/material";
import Frame from "../../assets/icone/Frame.png"
import { useState } from "react";



const PersonalDetails = () => {
    const inputStyle = "w-full my-3 border border-gray-300 focus:border-[#E86731] focus:ring-[1px] focus:ring-[#E86731] focus:outline-none p-2 rounded-md"
    const [value, setValue] = useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const travelers = 2

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            travelers: Array(travelers).fill({ fullName: "", lastName: "", email: "", phone: "", date: "", gender: "" })
        },
    });

    const { fields } = useFieldArray({
        control,
        name: "travelers",
    });

    const onSubmit = (data) => {
        console.log("Submitted Data:", data);
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
                                    <h2 className="p-5 text-[#141D2A] text-[32px] font-bold flex items-center "> <img src={Frame} className="mr-2" alt="" /> Leggi bene prima di procedere</h2>
                                    <div className="border border-b-[#c8c8ce] mt-3"></div>
                                    <p className="p-5 text-[#72777F] font-[18px]">
                                        Inserisci il tuo nome e cognome in versione completa come riportato nei documenti, inclusi secondi nomi e/o iniziali. Questi dati ci serviranno per proseguire con l'acquisto dei servizi e assicurazione di viaggio. Se i dati non corrispondono a quelli dei documenti, WeRoad si astiene da ogni responsabilità. Tutti i dati inseriti devono essere veritieri, in caso contrario, la prenotazione potrebbe essere annullata senza diritto di rimborso.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <h2 className="text-[#000000] text-[18px] font-[400] mt-5">Dynamic Traveler Form</h2>

                                    {fields.map((field, index) => (
                                        <div key={field.id} className="border-b border-gray-300 pb-4 mt-8">
                                            <h3 className="text-[#141D2A] text-[20px] font-[600] mb-4">Traveler {index + 1}</h3>

                                            {/* Full Name and Last Name */}
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <label htmlFor={`travelers.${index}.fullName`}>Full Name *</label>
                                                    <input
                                                        id={`travelers.${index}.fullName`}
                                                        {...register(`travelers.${index}.fullName`, { required: "Full Name is required" })}
                                                        placeholder="Enter Full Name"
                                                        className={inputStyle}
                                                    />
                                                    {errors.travelers?.[index]?.fullName && <p className="text-red-500">{errors.travelers[index].fullName.message}</p>}
                                                </div>

                                                <div>
                                                    <label htmlFor={`travelers.${index}.lastName`}>Last Name *</label>
                                                    <input
                                                        id={`travelers.${index}.lastName`}
                                                        {...register(`travelers.${index}.lastName`, { required: "Last Name is required" })}
                                                        placeholder="Enter Last Name"
                                                        className={inputStyle}
                                                    />
                                                    {errors.travelers?.[index]?.lastName && <p className="text-red-500">{errors.travelers[index].lastName.message}</p>}
                                                </div>
                                            </div>

                                            {/* Email and Phone Number */}
                                            <div className="grid grid-cols-2 gap-2 mt-4">
                                                <div>
                                                    <label htmlFor={`travelers.${index}.email`}>Email *</label>
                                                    <input
                                                        id={`travelers.${index}.email`}
                                                        {...register(`travelers.${index}.email`, {
                                                            required: "Email is required",
                                                            pattern: {
                                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                                message: "Invalid email address",
                                                            },
                                                        })}
                                                        placeholder="Enter Email"
                                                        className={inputStyle}
                                                    />
                                                    {errors.travelers?.[index]?.email && <p className="text-red-500">{errors.travelers[index].email.message}</p>}
                                                </div>

                                                <div>
                                                    <label htmlFor={`travelers.${index}.phone`}>Phone *</label>
                                                    <Controller
                                                        name={`travelers.${index}.phone`}
                                                        control={control}
                                                        rules={{ required: "Phone is required" }}
                                                        render={({ field }) => (
                                                            <PhoneInput
                                                                {...field}
                                                                id={`travelers.${index}.phone`}
                                                                placeholder="Enter Phone Number"
                                                                className={inputStyle}
                                                                international
                                                                defaultCountry="US"
                                                            />
                                                        )}
                                                    />
                                                    {errors.travelers?.[index]?.phone && <p className="text-red-500">{errors.travelers[index].phone.message}</p>}
                                                </div>
                                            </div>

                                            {/* Date and Date */}
                                            <div className="grid grid-cols-2 gap-2 mt-4">
                                                <div>
                                                    <label htmlFor={`travelers.${index}.date`}>Date *</label>
                                                    <input
                                                        id={`travelers.${index}.date`}
                                                        type="date"
                                                        {...register(`travelers.${index}.date`, { required: "Date is required" })}
                                                        className={inputStyle}
                                                    />
                                                    {errors.travelers?.[index]?.date && <p className="text-red-500">{errors.travelers[index].date.message}</p>}
                                                </div>

                                                <div>
                                                    <label htmlFor={`travelers.${index}.gender`}>Gender *</label>
                                                    <select
                                                        id={`travelers.${index}.gender`}
                                                        {...register(`travelers.${index}.gender`, { required: "gender is required" })}
                                                        className={inputStyle}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                    {errors.travelers?.[index]?.gender && <p className="text-red-500">{errors.travelers[index].gender.message}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}


                                    <div className="my-6" >
                                        <h2>Special requirements</h2>
                                        <p>For each person included in this booking, please let us know about allergies, medical conditions, dietary needs, physical issues, and medication intake. If you have any other specific requests, please write them here: this is the place to do it!</p>

                                        <div className="border rounded-lg my-6" >

                                            {Array.from({ length: travelers }).map((_, index) => (
                                                <div
                                                    key={index}
                                                    className={`${index === travelers - 1 ? "" : "border-b"
                                                        } flex justify-between items-center px-3`}
                                                >
                                                    <span className="flex justify-between items-center w-full">
                                                        <h2>Traveler {index + 1}</h2>
                                                        <div className="flex items-center">
                                                            <Checkbox {...label} /> Yes
                                                            <Checkbox {...label} /> No
                                                        </div>
                                                    </span>
                                                </div>
                                            ))}

                                        </div>

                                        <div className="border  rounded-lg">
                                            <h2 className="p-5 text-[#141D2A] text-[32px] font-bold flex items-center "> <img src={Frame} className="mr-2" alt="" /> Leggi bene prima di procedere</h2>
                                            <div className="border border-b-[#c8c8ce] mt-3"></div>
                                            <p className="p-5 text-[#72777F] font-[18px]">
                                                Inserisci il tuo nome e cognome in versione completa come riportato nei documenti, inclusi secondi nomi e/o iniziali. Questi dati ci serviranno per proseguire con l'acquisto dei servizi e assicurazione di viaggio. Se i dati non corrispondono a quelli dei documenti, WeRoad si astiene da ogni responsabilità. Tutti i dati inseriti devono essere veritieri, in caso contrario, la prenotazione potrebbe essere annullata senza diritto di rimborso.
                                            </p>
                                        </div>

                                        <h2 className="mt-6" >Terms and Conditions and Privacy Policy</h2>
                                        <span className="flex items-center" >
                                            <Checkbox {...label} />
                                            <p>I declare that I have read the <span className="text-[#E86731] font-semibold " >Privacy Policy</span> and accept the <span className="text-[#E86731] font-semibold " >Terms and Conditions</span> for using LA TUA FUGA LOWCOST services.</p>

                                        </span>
                                        <p>I consent to receive commercial information related to WeRoad and other travel proposals via email, phone, SMS, and instant message.</p>

                                        <div className="h-[50px]" >
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={value}
                                                onChange={handleChange}
                                                className="flex bg-green-950 relative "
                                            >

                                                <div className="flex items-center   rounded absolute left-0 top-0">
                                                    <Radio value="I consent" />
                                                    <span>I consent</span>
                                                </div>
                                                <div className="flex items-center  rounded absolute left-[200px] top-0">
                                                    <Radio value="I do not consent" />
                                                    <span>I do not consent</span>
                                                </div>
                                            </RadioGroup>
                                        </div>

                                        <div className="border border-b-[#c8c8ce] mt-3"></div>

                                        <div className="mt-8">
                                            <ul>
                                                <li className="flex text-[#72777F] mt-3 items-center" > <span className="size-2 mr-2  bg-red-500 text-transparent block rounded-full " >0</span> Complete personal details</li>
                                                <li className="flex text-[#72777F] mt-3 items-center" > <span className="size-2 mr-2  bg-green-500 text-transparent block rounded-full " >0</span> Complete special requirements</li>
                                                <li className="flex text-[#72777F] mt-3 items-center" > <span className="size-2 mr-2  bg-red-500 text-transparent block rounded-full " >0</span> Accept the Terms and Conditions and the Privacy Policy</li>
                                                <li className="flex text-[#72777F] mt-3 items-center" > <span className="size-2 mr-2  bg-green-500 text-transparent block rounded-full " >0</span> Preferences for commercial communications completed</li>
                                            </ul>
                                        </div>



                                    </div>

                                    <p className="text-[#72777F] mt-10" > <Checkbox {...label} /> I Agree To All Your Terms & condition</p>

                                    <button type="submit" className="block text-center w-full duration-300 text-[#FFFFFF] py-2 rounded mt-4 bg-[#D2D2D5]">
                                        Submit
                                    </button>

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
