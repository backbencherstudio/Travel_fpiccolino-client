/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import { GoChevronLeft } from "react-icons/go";
import "react-range-slider-input/dist/style.css";
import { useState, useEffect } from "react";

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

                        <div className="border mt-6 p-6 rounded-lg">
                            <h2 className="text-center text-[14px] text-[#000000]">
                                1 Stop - 6h 15m
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
                        </div>
                    </div>

                    <div className="col-span-3 shadow-lg rounded-lg p-10">
                        <h2 className="font-bold text-[24px]">Fuerteventura</h2>
                    </div>
                </div>
            </ParentComponent>
        </div>
    );
};

export default Insurence;
