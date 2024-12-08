/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import { GoChevronLeft } from "react-icons/go";
import "react-range-slider-input/dist/style.css";
import { useState, useEffect } from "react";
import flightIcon from "../../assets/icone/flightIcon.png"
import infoIcon from "../../assets/infoIcon.png"
import { MdKeyboardArrowDown } from "react-icons/md";

const Insurence = ({
    startTime = { time: "10:40", timeZone: "am" },
    endTime = { time: "3:45", timeZone: "pm" },
}) => {
    const convertToMinutes = (time, timeZone) => {
        const [hours, minutes] = time.split(":").map(Number);
        let totalMinutes = hours * 60 + minutes;
        if (timeZone.toLowerCase() === "pm" && hours !== 12) {
            totalMinutes += 12 * 60;
        }
        if (timeZone.toLowerCase() === "am" && hours === 12) {
            totalMinutes -= 12 * 60;
        }
        return totalMinutes;
    };

    const formatTime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const meridian = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours > 12 ? hours - 12 : hours || 12;
        return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${meridian}`;
    };

    const calculateDuration = (start, end) => {
        let diff = end - start;
        if (diff < 0) {
            diff += 24 * 60;
        }
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        return `${hours}h ${minutes}m`;
    };

    const [value, setValue] = useState([
        convertToMinutes(startTime.time, startTime.timeZone),
        convertToMinutes(endTime.time, endTime.timeZone),
    ]);

    const [duration, setDuration] = useState("");

    useEffect(() => {
        const diff = calculateDuration(value[0], value[1]);
        setDuration(diff);
    }, [value]);



    return (
        <div>
            <ParentComponent>
                <div className="mt-20">
                    <Link to="/TureDetails/dd" className="flex items-center">
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
                <div className="grid grid-cols-12 mt-20 gap-20">
                    <div className="col-span-9">
                        <h2 className="text-[#141D2A] text-[32px] font-bold">Fuerteventura</h2>
                        <p className="text-[#72777F] font-[18px]">
                            Comprehensive Insurance for Worry-Free Travel
                        </p>

                        <div className="grid grid-cols-12 border rounded-lg mt-5" >

                            <div className="col-span-8  border-r border-dashed relative " >
                                <div className="size-10 bg-white border-b rounded-full absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 " ></div>
                                <div className="size-10 bg-white border-t rounded-full absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 " ></div>

                                <div className=" p-6 border-b ">
                                    <h2 className="text-center text-[14px] text-[#000000]">
                                        1 Stop - 6h 15m
                                    </h2>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2 >{formatTime(value[0])}</h2>
                                            <div className="bg-gray-200 relative flex justify-between h-[5px] w-full">
                                                <div className="size-5 absolute left-0 transform -translate-y-1/2 top-1/2 rounded-full bg-gray-300 flex justify-center items-center  ">
                                                    <div className="border border-black size-3 rounded-full " ></div>
                                                </div>
                                                <div className="size-5 absolute transform -translate-y-1/2 top-1/2 rounded-full bg-[#FDF0EA] flex justify-center items-center " style={{ left: '50%' }}>
                                                    <div className="bg-[#d45e2d] size-3 rounded-full " ></div>
                                                </div>

                                                <div className="size-5 absolute right-0 transform -translate-y-1/2 top-1/2 rounded-full bg-gray-300 flex justify-center items-center  ">
                                                    <div className="border border-black size-3 rounded-full " ></div>
                                                </div>
                                            </div>
                                            <h2 className="text-right" >{formatTime(value[1])}</h2>
                                        </div>
                                        <div className="flex items-start justify-between" >
                                            <h2>Rome Fiumicino Airport (ECO)</h2>
                                            <h2>Fuerteventura Airport (FOE)</h2>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center ">
                                        <span className="flex border items-center px-4 rounded" >
                                            <img className="size-10 p-1  border-r pr-3 mr-3" src={flightIcon} alt="" />
                                            <h2 className="uppercase" >IBERIA</h2>
                                        </span>
                                    </div>
                                </div>

                                <div className=" p-6 ">
                                    <h2 className="text-center text-[14px] text-[#000000]">
                                        1 Stop - 5h 30m
                                    </h2>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h2>{formatTime(value[0])}</h2>
                                            <div className="bg-gray-200 relative flex justify-between h-[5px] w-full">
                                                <div className="size-5 absolute left-0 transform -translate-y-1/2 top-1/2 rounded-full bg-gray-300 flex justify-center items-center  ">
                                                    <div className="border border-black size-3 rounded-full " ></div>
                                                </div>
                                                <div className="size-5 absolute transform -translate-y-1/2 top-1/2 rounded-full bg-[#FDF0EA] flex justify-center items-center " style={{ left: '50%' }}>
                                                    <div className="bg-[#d45e2d] size-3 rounded-full " ></div>
                                                </div>

                                                <div className="size-5 absolute right-0 transform -translate-y-1/2 top-1/2 rounded-full bg-gray-300 flex justify-center items-center  ">
                                                    <div className="border border-black size-3 rounded-full " ></div>
                                                </div>

                                            </div>
                                            <h2 className="text-right" >{formatTime(value[1])}</h2>
                                        </div>
                                        <div className="flex items-start justify-between" >
                                            <h2>Rome Fiumicino Airport (ECO)</h2>
                                            <h2>Fuerteventura Airport (FOE)</h2>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center ">
                                        <span className="flex border items-center px-4 rounded" >
                                            <img className="size-10 p-1  border-r pr-3 mr-3" src={flightIcon} alt="" />
                                            <h2 className="uppercase" >IBERIA</h2>
                                        </span>
                                    </div>
                                </div>

                            </div>



                            <div className="col-span-4 p-4  flex flex-col justify-between items-center " >

                                <div className="flex justify-end w-full " >
                                    <img src={infoIcon} alt="" />
                                </div>

                                <div className="w-full  " >
                                    <h2 className="text-[#000000] text-[18px] font-bold text-center " >€ 953 </h2>
                                    <h2 className="text-center" >per person</h2>
                                </div>

                                <button className="bg-[#E867311A] text-[#E86731] font-semibold w-full mb-5 py-3 rounded " >Select</button>

                            </div>

                        </div>


                    </div>

                    <div className="col-span-3">
                        <div className=" shadow-lg rounded-lg p-10">

                            <h2 className="font-bold text-[24px] text-[#E86731] ">Fuerteventura</h2>
                            <p>8 Days / 7 Nights</p>

                            <div className="mt-4">
                                <span className="flex items-start justify-between mb-5 " >
                                    <h2>April 19 - 26</h2>
                                    <h2 className="text-[#000000] text-[18px] font-semibold text-center " >€ 653 </h2>
                                </span>
                                <span className="flex items-start justify-between mb-5 " >
                                    <h2>Passengers</h2>
                                    <h2 className="text-[#000000] text-[18px] font-semibold text-center " >X1 </h2>
                                </span>
                                <span className="flex items-start justify-between mb-5 " >
                                    <h2>Room</h2>
                                    <h2 className="text-[#000000] text-[18px] font-semibold text-center " >Private Double </h2>
                                </span>

                                <span className="flex items-start justify-between mb-5 border-b pb-5 " >
                                    <h2>Included services</h2>
                                    <h2 className="text-[#000000] text-[18px] font-semibold text-center " > <MdKeyboardArrowDown /> </h2>
                                </span>

                                <span className="flex items-start justify-between mb-5 " >
                                    <h2>Total</h2>
                                    <h2 className="text-[20px] font-semibold " >€ 2,345</h2>
                                </span>

                                <span className="flex items-start justify-between mb-5 " >
                                    <p className="text-[#72777F] xl:pr-10" >or 3 installments of €232.66 interest-free.</p>
                                </span>

                            </div>

                            <button className="text-center w-full bg-[#D2D2D5] text-[#FFFFFF] py-2 rounded " >Continue</button>

                        </div>
                    </div>

                </div>
            </ParentComponent>
        </div>
    );
};

export default Insurence;
