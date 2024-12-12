import { CiEdit } from "react-icons/ci";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import heroImage2 from "../../../assets/Images/HeroSection/heroImage2.jpg"
import { RiAddBoxLine, RiDeleteBin5Line } from "react-icons/ri";

const UpdateBlog = () => {
    return (
        <div>
            <CustomHeadingDashboard />

            <div className="mt-10 flex justify-between items-center "  >
                <h2 className="text-[#141D2A] font-semibold text-[24px] " >Edit Blog</h2>
                <button className="bg-[#E86731] text-[#FFFFFF] px-4 py-2 rounded-md " >Update Blog</button>
            </div>

            <div className="grid grid-cols-12 gap-5 mt-5 " >
                <div className="col-span-8  " >

                    <div className="border rounded-lg p-4 mb-5">
                        <div>
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Header Image</h2>
                                <button className="border border-[#1A9835] text-[30px] rounded " > <CiEdit className="text-[#1A9835]   " /> </button>
                            </span>
                            {/* ========================= need condition in image follow the figma ========================= */}
                            <img className="rounded-lg" src={heroImage2} alt="" />

                        </div>
                        <div className="mt-4" >
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Header Text</h2>
                                <button className="border border-[#1A9835] text-[30px] rounded " > <CiEdit className="text-[#1A9835]   " /> </button>
                            </span>
                            <p className="text-[#141D2A]  " >Essential Travel Hacks for Stress-Free Adventures</p>
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 mb-5">
                        <div>
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Body Image</h2>
                                <span className="flex items-center gap-5" >
                                    <button className="border border-[#1A9835] text-[30px] rounded " > <CiEdit className="text-[#1A9835]   " /> </button>
                                    <button className="border border-[#EB3D4D] text-[30px] rounded " > <RiDeleteBin5Line className="text-[#EB3D4D]   " /> </button>
                                </span>
                            </span>
                             {/* ========================= need condition in image follow the figma ========================= */}
                            <img className="rounded-lg" src={heroImage2} alt="" />
                        </div>

                        <div className="mt-4" >
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Body text</h2>
                                <button className="border border-[#1A9835] text-[30px] rounded " > <CiEdit className="text-[#1A9835]   " /> </button>
                            </span>
                            <p className="text-[#141D2A]  " >Traveling is one of life’s greatest joys, but the logistics can sometimes be overwhelming. From packing to navigating new places, small inconveniences can add up. That’s why we’ve compiled this guide of essential travel hacks to ensure your journey is smooth, stress-free, and full of unforgettable memories.</p>
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 mb-5">
                        <span className="flex justify-between items-center mb-5" >
                            <h2 className="font-semibold text-[24px] " >Sub-Header</h2>
                            <button className="border border-[#1A9835] text-[30px] rounded " > <CiEdit className="text-[#1A9835]   " /> </button>
                        </span>

                        <h2 className="font-semibold text-[#141D2A] mb-2 " >Pack Smart, Pack Light</h2>

                        <div>
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Body Image</h2>
                                <span className="flex items-center gap-5" >
                                    <button className="border border-[#1A9835] text-[30px] rounded " > <CiEdit className="text-[#1A9835]   " /> </button>
                                    <button className="border border-[#EB3D4D] text-[30px] rounded " > <RiDeleteBin5Line className="text-[#EB3D4D]   " /> </button>
                                </span>
                            </span>
                             {/* ========================= need condition in image follow the figma ========================= */}
                            <img className="rounded-lg" src={heroImage2} alt="" />
                        </div>

                        <div className="mt-4" >
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Body text</h2>
                                <button className="border border-[#1A9835] text-[30px] rounded " > <CiEdit className="text-[#1A9835]   " /> </button>
                            </span>
                            <p className="text-[#141D2A]  " >Traveling is one of life’s greatest joys, but the logistics can sometimes be overwhelming. From packing to navigating new places, small inconveniences can add up. That’s why we’ve compiled this guide of essential travel hacks to ensure your journey is smooth, stress-free, and full of unforgettable memories.</p>
                        </div>
                    </div>


                    <div className="flex justify-end" >
                        <button className="text-[#FFFFFF] bg-[#E86731] font-semibold  flex items-center gap-2 px-4 py-2 rounded-lg " > <RiAddBoxLine /> Add Content</button>
                    </div>


                </div>




                <div className="col-span-4 " >

                    <div className="border rounded-lg p-4 mb-4">
                        <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6 " >Upload Img</h2>
                        <img className="h-[400px] object-cover rounded-lg "  src={heroImage2} alt="" />
                    </div>

                    <div className="border rounded-lg p-4 mb-4">
                        <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6 " >Category</h2>
                        <img className="h-[400px] object-cover rounded-lg "  src={heroImage2} alt="" />
                    </div>

                </div>
            </div>

        </div>
    );
};

export default UpdateBlog;