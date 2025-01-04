/* eslint-disable no-unused-vars */
import { Link, useNavigate, useParams } from "react-router-dom";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import { GoChevronLeft } from "react-icons/go";
import "react-range-slider-input/dist/style.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import Footer from "../../Shared/Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout, getCheckout } from "../../features/checkout/checkoutSlice";
import moment from "moment";
import { TiDeleteOutline } from "react-icons/ti";
import { getPackageDetails } from "../../features/pckage/packageSlice";

const Insurance = () => {
    const [isSelectInsurance, setInsurance] = useState({});
    const [totalAmount, setTotalAmount] = useState(0);
    const { id } = useParams();
    const { checkout } = useSelector((state) => state.checkout);
    const dispatch = useDispatch();
    const params = useParams();
    const { packageDetails } = useSelector((state) => state.package);
    useEffect(() => {
        if (params.id) {
            dispatch(getPackageDetails(params.id));
        }
    }, [params.id, dispatch]);

    useEffect(() => {
        dispatch(getCheckout());
    }, [dispatch]);

    useEffect(() => {
        if (checkout?.toureAmount) {
            setTotalAmount(parseInt(checkout?.toureAmount));
        }
    }, [checkout]);

    const handleSelectInsurance = (insurance) => {
        if (isSelectInsurance?._id === insurance._id) {
            setInsurance({});
            setTotalAmount((prevTotal) => prevTotal - parseInt(insurance.price));
        } else {
            const insurancePrice = parseInt(insurance.price || 0);
            const prevInsurancePrice = parseInt(isSelectInsurance?.price || 0);
            setInsurance(insurance);
            setTotalAmount((prevTotal) => prevTotal - prevInsurancePrice + insurancePrice);
        }
    };

    console.log(checkout);

    const { toureAmount, ...data } = checkout

    const toureData = {
        ...data,
        insurance: isSelectInsurance,
        toureAmount: totalAmount
    }
    const navigate = useNavigate()

    const addDataFun = () => {
        dispatch(createCheckout({ ...toureData }))
        navigate(`/personalDetails`);
    };



    return (
        <div>
            <div className="pb-20">
                <ParentComponent>
                    <div className="mt-20 flex">
                        <Link to={`/flight/${id}`} className="flex items-center">
                            <GoChevronLeft className="text-xl" /> Back to flight
                        </Link>
                    </div>
                    <div className="mt-10">
                        <HeadLine
                            title="Travel with Confidence – Insurance Tailored for You"
                            description="Comprehensive Coverage for a Worry-Free Journey, Wherever You Go"
                        />
                    </div>
                </ParentComponent>

                <div className="border border-b-[#A5A5AB] mt-14"></div>

                <ParentComponent>
                    <div className="grid grid-cols-12 mt-20 lg:gap-5 xl:gap-20">
                        <div className="col-span-12 lg:col-span-8">
                            <div>
                                <h2 className="text-[#141D2A] text-[32px] font-bold">Protect Your Adventure</h2>
                                <p className="text-[#72777F] font-[18px]">Comprehensive Insurance for Worry-Free Travel</p>
                                {packageDetails?.insurance?.map((item) => (
                                    <div
                                        key={item?._id}
                                        onClick={() => handleSelectInsurance(item)}
                                        className={`border ${isSelectInsurance?._id === item._id
                                            ? "border-transparent bg-[#E867311A]"
                                            : "border-[#E86731]"
                                            } hover:border-transparent rounded-lg mt-5 p-6 flex flex-col md:flex-row items-center hover:bg-[#E867311A] duration-300 cursor-pointer`}
                                    >
                                        <div className="md:w-[90%]">
                                            <h2 className="text-[#E86731]">{item.insuranceName}</h2>
                                            <p className="text-[#141D2A]">
                                                {item.description?.length > 200
                                                    ? `${item.description.substring(0, 200)}...`
                                                    : item.description}
                                            </p>
                                            <button className="underline text-[#E86731]">Read more</button>
                                        </div>
                                        <h2 className="w-[15%] md:w-[8%] text-center bg-[#E867311A] py-2 text-[#E86731] font-[500] rounded">
                                            +€ {item?.price}
                                        </h2>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ======================================  Side bar ========================== */}

                        <div className="col-span-12 lg:col-span-4 mt-5 lg:mt-0">
                            <div className="shadow-lg rounded-lg p-2 md:p-10">
                                <h2 className="font-bold text-[24px] text-[#E86731]">Fuerteventura</h2>
                                <p>{checkout?.tureDuration?.days} Days / {checkout?.tureDuration?.nights} Nights</p>
                                <div className="border border-b-[#c8c8ce] mt-3"></div>
                                <div className="mt-4">
                                    <span className="flex items-start justify-between mb-3">
                                        {moment(checkout?.tourDate).utc().format("DD/MM/YYYY HH:mm")}
                                        <h2 className="text-[#000000] text-[18px] font-semibold text-center">
                                            € = {checkout?.totalPackageAmount}
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
                                                € = {checkout?.flightPrice}
                                            </h2>
                                        </span>
                                    )}

                                    {isSelectInsurance?.price && (
                                        <span className="flex items-start justify-between mb-3">
                                            <h2 className="flex items-center relative">
                                                <TiDeleteOutline
                                                    className="text-red-600 absolute cursor-pointer -right-2 -top-3 text-xl"
                                                    onClick={() => handleSelectInsurance({})}
                                                />
                                                Insurance
                                            </h2>
                                            <h2 className="text-[#000000] text-[18px] font-semibold text-center">
                                                € = {isSelectInsurance?.price}
                                            </h2>
                                        </span>
                                    )}

                                    <span className="flex items-start justify-between mb-3 border-t pt-2">
                                        <h2>Total</h2>
                                        <h2 className="text-[20px] font-semibold">€ = {totalAmount}</h2>
                                    </span>

                                    <span className="pb-5 block">
                                        <h2 className="flex items-center">
                                            <FaHeart />{" "}
                                            <p className="px-1 text-[#272727] font-bold">scalapay</p>{" "}
                                            <CiCircleInfo />
                                        </h2>
                                    </span>
                                </div>

                                <button
                                    onClick={() => { addDataFun() }}
                                    className={`block text-center w-full duration-300 text-[#FFFFFF] py-2 rounded mt-4 bg-[#E86731]`}
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    </div>
                </ParentComponent>
            </div>

            <Footer />
        </div>
    );
};

export default Insurance;
