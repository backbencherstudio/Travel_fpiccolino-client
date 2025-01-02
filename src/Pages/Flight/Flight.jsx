/* eslint-disable react/prop-types */
import { Link, useNavigate, useParams } from "react-router-dom";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import { GoChevronLeft } from "react-icons/go";
import "react-range-slider-input/dist/style.css";
import { useState, useEffect } from "react";
import flightIcon from "../../assets/icone/flightIcon.png";
import Footer from "../../Shared/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getPackageDetails } from "../../features/pckage/packageSlice";
import moment from "moment";
import { TiDeleteOutline } from "react-icons/ti";
import { createCheckout } from "../../features/checkout/checkoutSlice";

const Flight = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const { packageDetails } = useSelector((state) => state.package);

    const [flightAmount, setFlightAmount] = useState(0);
    const [totalFlightAmount, totalSetFlightAmount] = useState(0);
    const [toureAmount, setToureAmount] = useState(0);
    const [updateToureAmount, setUpdateToureAmount] = useState(0);
    const [person, setPerson] = useState("1");
    const [highLight, setHighLight] = useState(null);
    const [addFlight, setAddFlight] = useState(false);
    const [totalToureCost, setTotalToureCoust] = useState(0);

    useEffect(() => {
        if (params.id) {
            dispatch(getPackageDetails(params.id));
        }
    }, [params.id, dispatch]);

    useEffect(() => {
        if (packageDetails) {
            setFlightAmount(parseInt(packageDetails?.bookedFlights[0]?.price) || 0);
            setToureAmount(parseInt(packageDetails?.amount) || 0);
            setHighLight(packageDetails?.bookedFlights[0] || null);
        }
    }, [packageDetails]);

    useEffect(() => {
        totalSetFlightAmount(parseInt(flightAmount) * parseInt(person));
    }, [person, flightAmount]);

    useEffect(() => {
        setUpdateToureAmount(parseInt(person) * parseInt(toureAmount));
    }, [person, toureAmount]);

    useEffect(() => {
        const flightCost = addFlight ? totalFlightAmount : 0;
        setTotalToureCoust(updateToureAmount + flightCost);
    }, [addFlight, totalFlightAmount, updateToureAmount]);

    const handleAddFlight = () => setAddFlight(true);

    const handleRemoveFlight = () => setAddFlight(false);

    // order/addToCard
    const toureData = {
        toureId: packageDetails?._id,
        tourDate: packageDetails?.tourDate,
        toureAmount: totalToureCost,
        flight: addFlight && highLight,
        flightPrice: addFlight && totalFlightAmount,
        person,
        tureDuration: packageDetails?.tourDuration
    }
    const navigate = useNavigate()

    const addDataFun = () => {
        dispatch(createCheckout(toureData))
        localStorage.setItem("toureData", JSON.stringify(toureData));
        navigate(`/insurance/${packageDetails?._id}`);
    };



    return (
        <div>
            <div className="pb-20">
                <ParentComponent>
                    <div className="mt-20 flex">
                        <Link to={`/tours/${packageDetails?._id}`} className="flex items-center">
                            <GoChevronLeft className="text-xl" /> Back to Tour Details
                        </Link>
                    </div>
                    <div className="mt-10">
                        <HeadLine
                            title="Choose Your Perfect Flight"
                            description="Find the Best Options for Your Journey, All in One Place"
                        />
                    </div>
                </ParentComponent>

                <div className="border border-b-[#A5A5AB] mt-14"></div>

                <ParentComponent>
                    <div className="mt-20">
                        <h2 className="text-[#141D2A] text-[32px] font-bold">Fuerteventura</h2>
                        <p className="text-[#72777F] font-[18px]">
                            Comprehensive Insurance for Worry-Free Travel
                        </p>

                        <div className="mt-5">
                            <h2 className="text-xl font-semibold italic">Select Person</h2>
                            <select
                                onChange={(e) => setPerson(e.target.value)}
                                className="w-[20%] my-2 p-1 text-center border rounded"
                            >
                                {Array.from({ length: 10 }, (_, i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 mt-2 lg:gap-5 xl:gap-20">
                        <div className="col-span-12 lg:col-span-8">
                            <div className="grid grid-cols-12 border rounded-lg mt-2">

                                <div className="col-span-12 md:col-span-8 md:border-r border-dashed relative">
                                    <div className="size-10 hidden md:block bg-white border-b rounded-full absolute right-0 top-0 translate-x-1/2 -translate-y-1/2"></div>
                                    <div className="size-10 hidden md:block bg-white border-t rounded-full absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2"></div>

                                    {/* ========================================= Schedule map section ============================ */}

                                    {packageDetails?.bookedFlights.length === 0 ? (
                                        <div className="flex items-center justify-center">
                                            <h2 className="text-center text-xl font-semibold text-red-400 my-5 md:mt-20">
                                                Flight Not Available
                                            </h2>
                                        </div>
                                    ) : (
                                        packageDetails?.bookedFlights?.map((item, i) => (
                                            <div
                                                onClick={() => setFlightAmount(item?.price)}
                                                onMouseDown={() => setHighLight(item)}
                                                key={i}
                                                className={`p-6 cursor-pointer ${i === packageDetails?.bookedFlights?.length - 1 ? "" : "border-b"
                                                    } duration-300`}
                                            >
                                                <h2 className="text-center text-[14px] text-[#000000]">
                                                    1 Stop - {moment(item.breakTime, "HH:mm").format("hh:mm A")}
                                                </h2>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <h2>{moment(item.departureTime, "HH:mm").format("hh:mm A")}</h2>

                                                        <div className="bg-gray-200 relative flex justify-between h-[5px] w-full">
                                                            <div className="size-5 absolute left-0 transform -translate-y-1/2 top-1/2 rounded-full bg-gray-300 flex justify-center items-center">
                                                                <div className="border border-black size-3 rounded-full"></div>
                                                            </div>
                                                            <div
                                                                className="size-5 absolute transform -translate-y-1/2 top-1/2 rounded-full bg-[#FDF0EA] flex justify-center items-center"
                                                                style={{ left: "50%" }}
                                                            >
                                                                <div className="bg-[#d45e2d] size-3 rounded-full"></div>
                                                            </div>
                                                            <div className="size-5 absolute right-0 transform -translate-y-1/2 top-1/2 rounded-full bg-gray-300 flex justify-center items-center">
                                                                <div className="border border-black size-3 rounded-full"></div>
                                                            </div>
                                                        </div>
                                                        <h2>{moment(item.arrivalTime, "HH:mm").format("hh:mm A")}</h2>
                                                    </div>
                                                    <div className="flex items-start justify-between gap-2 md:gap-0">
                                                        <h2>{item.departureAirport}</h2>
                                                        <h2>{item.arrivalAirport}</h2>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center items-center">
                                                    <span
                                                        className={`flex border items-center px-4 rounded ${highLight?._id === item?._id && "bg-[#a72b6f1a]"
                                                            } duration-300`}
                                                    >
                                                        <img
                                                            className="size-10 p-1 border-r pr-3 mr-3"
                                                            src={flightIcon}
                                                            alt="Flight Icon"
                                                        />
                                                        <h2 className="uppercase font-semibold">
                                                            {item?.price}
                                                            <span className="italic"> $=</span>
                                                        </h2>
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="col-span-12 md:col-span-4 p-4 flex flex-col justify-center items-center  border-t md:border-t-0">
                                    {/* <div className="" > */}
                                    <div className="w-full flex flex-col text-center items-center ">
                                        <h2 className="text-[#000000] text-[18px] font-bold text-center">
                                            € {totalFlightAmount}
                                        </h2>
                                        <h2 className="text-center py-2">   {person}  person</h2>
                                    </div>
                                    <button
                                        onClick={handleAddFlight}
                                        className="bg-[#E867311A] text-[#E86731] font-semibold w-full mb-5 py-3 rounded"
                                        disabled={packageDetails?.bookedFlights.length === 0}
                                    >
                                        Add Flight
                                    </button>
                                    {/* </div> */}
                                </div>
                            </div>

                        </div>

                        <div className="col-span-12 lg:col-span-4 mt-5 lg:mt-0">
                            <div className="shadow-lg rounded-lg p-2 md:p-10">
                                <h2 className="font-bold text-[24px] text-[#E86731]">Fuerteventura</h2>
                                <p>
                                    {packageDetails?.tourDuration.days} Days /{" "}
                                    {packageDetails?.tourDuration.nights} Nights
                                </p>
                                <div className="border border-b-[#c8c8ce] mt-3"></div>
                                <div className="mt-4">
                                    <span className="flex items-start justify-between mb-3">
                                        {moment(packageDetails?.tourDate)
                                            .utc()
                                            .format("DD/MM/YYYY HH:mm")}
                                        <h2 className="text-[#000000] text-[18px] font-semibold text-center">
                                            € {updateToureAmount}
                                        </h2>
                                    </span>
                                    <span className="flex items-start justify-between mb-3">
                                        <h2>Passengers</h2>
                                        <h2 className="text-[#000000] text-[18px] font-semibold text-center">
                                            {person}
                                        </h2>
                                    </span>
                                    {addFlight && (
                                        <span className="flex items-start justify-between mb-3">
                                            <h2 className="flex items-center relative">
                                                <TiDeleteOutline
                                                    className="text-red-600 absolute cursor-pointer -right-2 -top-3 text-xl"
                                                    onClick={handleRemoveFlight}
                                                />
                                                Flight Amount
                                            </h2>
                                            <h2 className="text-[#000000] text-[18px] font-semibold text-center">
                                                € {totalFlightAmount}
                                            </h2>
                                        </span>
                                    )}
                                    <span className="flex items-start justify-between mb-3 border-t pt-2 ">
                                        <h2>Total</h2>
                                        <h2 className="text-[20px] font-semibold">
                                            € {totalToureCost}
                                        </h2>
                                    </span>
                                </div>

                                <button
                                    onClick={() => addDataFun()}
                                    // to="/insurance/id"
                                    className="text-center block w-full bg-[#D2D2D5] text-[#FFFFFF] py-2 rounded mt-4"
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

export default Flight;
