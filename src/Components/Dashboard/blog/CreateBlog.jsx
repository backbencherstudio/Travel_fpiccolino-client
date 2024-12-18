import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import heroImage2 from "../../../assets/Images/HeroSection/heroImage2.jpg"
import { RiAddBoxLine, RiDeleteBin5Line } from "react-icons/ri";

const CreateBlog = () => {
    const inputStyle = "w-full my-3 border border-[#E86731] border-[#E86731] ring-[1px] ring-[#E86731] text-[#E86731] outline-none p-2 rounded-md"
    return (
        <div>
            <CustomHeadingDashboard />

            <div className="mt-10 flex justify-between items-center "  >
                <h2 className="text-[#141D2A] font-semibold text-[24px] " >Add Blog</h2>
                <button className="bg-[#E86731] text-[#FFFFFF] px-4 py-2 rounded-md " >Add Blog</button>
            </div>
            
            <div className="grid grid-cols-12 gap-5 mt-5 " >
                <div className=" col-span-12 xl:col-span-8  " >

                    <div className="border rounded-lg p-4 mb-5">
                        <div>
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Header Image</h2>
                            </span>
                            {/* ========================= need condition in image follow the figma ========================= */}
                            <img className="rounded-lg" src={heroImage2} alt="" />

                        </div>
                        <div className="mt-4" >
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Header Text</h2>
                            </span>
                            <p className="text-[#141D2A]  " >Essential Travel Hacks for Stress-Free Adventures</p>
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 mb-5">
                        <div>
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Body Image</h2>
                                <span className="flex items-center gap-5" >
                                    <button className="border border-[#EB3D4D] text-[30px] rounded " > <RiDeleteBin5Line className="text-[#EB3D4D]   " /> </button>
                                </span>
                            </span>
                            {/* ========================= need condition in image follow the figma ========================= */}
                            <img className="rounded-lg" src={heroImage2} alt="" />
                        </div>

                        <div className="mt-4" >
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Body text</h2>
                            </span>
                            <p className="text-[#141D2A]  " >Traveling is one of life’s greatest joys, but the logistics can sometimes be overwhelming. From packing to navigating new places, small inconveniences can add up. That’s why we’ve compiled this guide of essential travel hacks to ensure your journey is smooth, stress-free, and full of unforgettable memories.</p>
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 mb-5">
                        <span className="flex justify-between items-center mb-5" >
                            <h2 className="font-semibold text-[24px] " >Sub-Header</h2>
                        </span>

                        <h2 className="font-semibold text-[#141D2A] mb-2 " >Pack Smart, Pack Light</h2>

                        <div>
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Body Image</h2>
                                <span className="flex items-center gap-5" >
                                    <button className="border border-[#EB3D4D] text-[30px] rounded " > <RiDeleteBin5Line className="text-[#EB3D4D]   " /> </button>
                                </span>
                            </span>
                            {/* ========================= need condition in image follow the figma ========================= */}
                            <img className="rounded-lg" src={heroImage2} alt="" />
                        </div>

                        <div className="mt-4" >
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Body text</h2>
                            </span>
                            <p className="text-[#141D2A]  " >Traveling is one of life’s greatest joys, but the logistics can sometimes be overwhelming. From packing to navigating new places, small inconveniences can add up. That’s why we’ve compiled this guide of essential travel hacks to ensure your journey is smooth, stress-free, and full of unforgettable memories.</p>
                        </div>
                    </div>


                    <div className="flex justify-end" >
                        <button className="text-[#FFFFFF] bg-[#E86731] font-semibold  flex items-center gap-2 px-4 py-2 rounded-lg " > <RiAddBoxLine /> Add Content</button>
                    </div>
                    
                </div>


                <div className=" col-span-12 xl:col-span-4 " >
                    <div className="border rounded-lg p-4 mb-4">
                        <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6 " >Upload Img</h2>
                        <img className="h-[400px] object-cover rounded-lg " src={heroImage2} alt="" />
                    </div>
                    <div className="border rounded-lg p-4 mb-4">
                        <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6 " >Category</h2>
                        <h2 className="text-[#141D2A]  mb-6 " >Blog Category</h2>
                        <select
                            className={inputStyle}
                        >
                            <option value="">All inclusive</option>
                            <option value="option">Option</option>
                        </select>

                        <div className="flex justify-end" >
                            <button className="text-[#FFFFFF] bg-[#E86731] font-semibold  flex items-center gap-2 px-4 py-2 rounded-lg " > <RiAddBoxLine /> Add Content</button>
                        </div>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default CreateBlog;