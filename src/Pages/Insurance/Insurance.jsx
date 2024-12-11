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
import { InsuranceData } from "../../ALLJsonFile/const";

const Insurance = () => {
    const [isSelect, setSelectId] = useState("")

    
    return (
        <div>
            <div className="pb-20" >
                <ParentComponent>
                    <div className="mt-20 flex  ">
                        <Link to="/flight/dd" className="flex items-center">
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
                        <div className=" col-span-12 lg:col-span-8">

                            <div>
                                <h2 className="text-[#141D2A] text-[32px] font-bold">Protect Your Adventure</h2>
                                <p className="text-[#72777F] font-[18px]">
                                    Comprehensive Insurance for Worry-Free Travel
                                </p>


                                {
                                    InsuranceData?.map(item => <div key={item?._id} onClick={()=>setSelectId(item.id)} className="border border-[#E86731] hover:border-transparent rounded-lg mt-5 p-6 flex flex-col md:flex-row items-center hover:bg-[#E867311A] duration-300 cursor-pointer " >
                                        <div className=" md:w-[90%] " >
                                            <h2 className="text-[#E86731]  " >{item.title}</h2>
                                            <p className="text-[#141D2A]" >{item.discription}.</p>

                                            <button className="underline text-[#E86731]" >Read more</button>
                                        </div>
                                        <h2 className=" w-[15%] md:w-[8%] text-center bg-[#E867311A] py-2 text-[#E86731] font-[500] rounded " >+€45</h2>
                                    </div>)
                                }



                            </div>

                        </div>

                        {/* ======================================  Side bar ========================== */}

                        <div className=" col-span-12 lg:col-span-4 mt-5 lg:mt-0">
                            <div className=" shadow-lg rounded-lg p-2 md:p-10">

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

                                <Link to={`/transfers/id`} className={`block text-center w-full duration-300 text-[#FFFFFF] py-2 rounded mt-4 ${isSelect ? "bg-[#E86731]" : "bg-[#D2D2D5]"}`} >Continue</Link>

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
