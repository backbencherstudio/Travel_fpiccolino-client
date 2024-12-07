import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";

const Insurence = () => {
    return (
        <div>

            <ParentComponent>

                <div className="mt-20" >
                    <Link to="/TureDetails/dd" className="flex items-center" > <FaAngleLeft /> Back to Tour Details</Link>

                </div>
                <div className="mt-10" >
                    <HeadLine title="Choose Your Perfect Flight" description="Find the Best Options for Your Journey, All in One Place" />

                    <div className="grid grid-cols-12 mt-20 gap-20 " >

                        <div className="col-span-9" >
                            <h2 className="text-[#141D2A] text-[32px] font-bold " >Fuerteventura</h2>
                            <p className="text-[#72777F] font-[18px] ">Comprehensive Insurance for Worry-Free Travel</p>

                            <div className="border mt-6 p-6 rounded-lg" >
                                <h2>1 Stop - 6h 15m</h2>
                            </div>
                        </div>
                        <div className="col-span-3 shadow-lg rounded-lg p-10" >
                            <h2 className="font-bold text-[24px] " >Fuerteventura</h2>
                        </div>

                    </div>

                </div>

            </ParentComponent>

        </div>
    );
};

export default Insurence;