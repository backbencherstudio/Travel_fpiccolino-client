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
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Checkbox, Radio, RadioGroup } from "@mui/material";
import Frame from "../../assets/icone/Frame.png";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCheckoutWithNewData, deleteCheckout, getCheckout } from "../../features/checkout/checkoutSlice";
import moment from "moment";

const PersonalDetails = () => {
    const [travelerss, setTravler] = useState(1)
    const inputStyle = "w-full my-3 border border-gray-300 focus:border-[#E86731] focus:ring-[1px] focus:ring-[#E86731] focus:outline-none p-2 rounded-md";
    const [value, setValue] = useState('I consent');
    const navigate = useNavigate();

    const { checkout } = useSelector((state) => state.checkout);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCheckout());
    }, [dispatch]);

    useEffect(() => {
        setTravler(parseInt())
    }, [checkout])

    useEffect(() => {
        if (!checkout || Object.keys(checkout).length === 0) {
            console.log("Checkout empty. Redirecting...");
            navigate("/tours");
        }
    }, [checkout, navigate]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const travelers = parseInt(checkout?.person, 10) || 1;


    const { control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            travelers: Array.from({ length: travelers }).map(() => ({
                fullName: "",
                lastName: "",
                email: "",
                phone: "",
                date: "",
                gender: ""
            }))
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
            ...checkout
        }
        dispatch(createCheckoutWithNewData({ ...userUpdateData }))
        navigate("/checkout")
        // navigate(`/personalDetails`);
    };

    // const addDataFun = () => {
    //     dispatch(createCheckout({ ...toureData }))
    //     navigate(`/personalDetails`);
    // };

    const removeSession = () => {
        dispatch(deleteCheckout());
        navigate(`/flight/${checkout?.toureId}`);
    };

    return (
        <div>
            <div className="">
                <ParentComponent>
                    <div className="mt-20 flex">
                        <button onClick={() => removeSession()} className="flex items-center">
                            <GoChevronLeft className="text-xl" /> Back to Transfers
                        </button>
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
                    <div className="grid grid-cols-12 mt-20 lg:gap-5 xl:gap-20 grid-cols-reverse">
                        <div className="col-span-12 lg:col-span-8 lg:order-1 bg-[#EFFBFB] p-2 lg:p-10 rounded-lg mb-10">
                            <div>
                                <div className="border rounded-lg">
                                    <h2 className="p-2 lg:p-5 text-[#141D2A] text-[20px] md:text-[28px] lg:text-[32px] font-bold flex items-center">
                                        <img src={Frame} className="mr-2" alt="" /> Leggi bene prima di procedere
                                    </h2>
                                    <div className="border border-b-[#c8c8ce] mt-3"></div>
                                    <p className="p-5 text-[#72777F] font-[18px]">
                                        Inserisci il tuo nome e cognome in versione completa come riportato nei documenti, inclusi secondi nomi e/o iniziali...
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="" >
                                    <h2 className="text-[#000000] text-[18px] font-[400] mt-5">Dynamic Traveler Form</h2>
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="border-b border-gray-300 pb-4 mt-8">
                                            <h3 className="text-[#141D2A] text-[20px] font-[600] mb-4">Traveler {index + 1}</h3>
                                            <div className="grid md:grid-cols-2 gap-2">
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
                                            <div className="grid md:grid-cols-2 gap-2 mt-4">
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
                                            <div className="grid md:grid-cols-2 gap-2 mt-4">
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
                                                        {...register(`travelers.${index}.gender`, { required: "Gender is required" })}
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

                                    <div className="my-6">
                                        <h2>Special requirements</h2>
                                        <p>Please let us know about allergies, dietary needs, etc.</p>
                                        <div className="border rounded-lg my-6">
                                            {fields.map((_, index) => (
                                                <div key={index} className={`${index === travelers - 1 ? "" : "border-b"} flex justify-between items-center px-3`}>
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
                                        <h2 className="mt-6">Terms and Conditions</h2>
                                        <span className="flex items-center my-2">
                                            <Checkbox {...label} />
                                            <p>I declare that I have read and accept the <span className="text-[#E86731] font-semibold">Privacy Policy</span> and <span className="text-[#E86731] font-semibold">Terms and Conditions</span>.</p>
                                        </span>
                                    </div>
                                    <button type="submit" className="block text-center w-full duration-300 text-[#FFFFFF] py-2 rounded mt-4 bg-[#E86731]">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar Section */}
                        <div className="col-span-12 lg:col-span-4 mt-5 lg:mt-0">
                            <div className="shadow-lg rounded-lg p-2 md:p-10">
                                <h2 className="font-bold text-[24px] text-[#E86731]">Fuerteventura</h2>
                                <p>{checkout?.tureDuration?.days} Days / {checkout?.tureDuration?.nights} Nights</p>
                                <div className="border border-b-[#c8c8ce] mt-3"></div>
                                <div className="mt-4">
                                    <span className="flex items-start justify-between mb-3">
                                        {moment(checkout?.tourDate).utc().format("DD/MM/YYYY HH:mm")}
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
                                        <h2 className="text-[20px] font-semibold">€ {checkout?.toureAmount}</h2>
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
