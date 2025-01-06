import { useDispatch, useSelector } from "react-redux";
import { accordionData } from "../../ALLJsonFile/const";
import BottomBannerSection from "../../Shared/BottomBannerSection";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";

import heroImage from "../../assets/eve.jpg";
import { useEffect } from "react";
import { getHeader } from "../../features/header/headerSlice";
import { getFaqPageData } from "../../features/pageData/pageDataSlice";

const Faq = () => {

    const dispatch = useDispatch();
    // const { headers } = useSelector((state) => state.header);
    const {  faqPageDataLoaging,
        faqPageDataError,
        faqPageData} = useSelector((state) => state.pageData);


    useEffect(() => {
        // dispatch(getHeader());
        dispatch(getFaqPageData())
    }, []);
    // const data = headers?.filter(item => item.pageName === "faq")

    const heroContent = faqPageData?.hero
    console.log(heroContent)
    // {
    //     heroImage: data[0]?.heroImage,
    //     titleOne: data[0]?.titleOne,
    //     descriptionOne: data[0]?.descriptionOne,
    // }

    console.log(faqPageData)

    // const heroContent = {
    //     heroImage,
    //     titleOne: "Feel at Home Wherever You Roam",
    //     descriptionOne:
    //         "Discover the warmth of home in every destination, blending comfort, connection, and local charm",
    // };

    // Accordion data

    if(!faqPageData){
        return
    }

    return (
        <div>
            <HeroScetion heroContent={heroContent} />

            <div className="bg-[#EFFBFB] py-20">
                <ParentComponent>
                    <div className="grid grid-cols-12 lg:gap-5 xl:gap-20 grid-cols-reverse">
                        <div className="col-span-12 lg:col-span-9 lg:order-1 bg-[#EFFBFB] rounded-lg">
                            <div  >
                                <h2 className="text-[32px] font-bold text-[#141D2A]">
                                    Booking and Reservations
                                </h2>

                                {/* ==============================================  Dynamic Accordion ============================================== */}

                                <div className="text-[#1C1C1C] mt-8 border-b border-[#E86731] pb-2">
                                    {accordionData.map((item, index) => (
                                        <div
                                            key={index}
                                            className="collapse collapse-arrow bg-[#E86731] text-[#FFFFFF] mb-7  "
                                        >
                                            <input
                                                type="radio"
                                                name="my-accordion"
                                                defaultChecked={index === 0}
                                            />
                                            <div className="collapse-title text-xl font-medium flex items-center">
                                                <h2 className="text-[20px] font-semibold">
                                                    {item.question}
                                                </h2>
                                            </div>
                                            <div className="collapse-content">
                                                <div>
                                                    <p>{item.answer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                                {/* ==============================================  Dynamic Accordion ============================================== */}

                                <h2 className="text-[32px] font-bold my-8 text-[#141D2A]">
                                    Travel Experience and Itinerary
                                </h2>

                                <div className="text-[#1C1C1C]  border-b border-[#E86731] pb-2">
                                    {accordionData.map((item, index) => (
                                        <div
                                            key={index}
                                            className="collapse collapse-arrow bg-[#E86731] text-[#FFFFFF] mb-7  "
                                        >
                                            <input
                                                type="radio"
                                                name="my-accordion"
                                            />
                                            <div className="collapse-title text-xl font-medium flex items-center">
                                                <h2 className="text-[20px] font-semibold">
                                                    {item.question}
                                                </h2>
                                            </div>
                                            <div className="collapse-content">
                                                <div>
                                                    <p>{item.answer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                                {/* ==============================================  Dynamic Accordion ============================================== */}

                                <h2 className="text-[32px] font-bold my-8 text-[#141D2A]">
                                    Payment and Pricing
                                </h2>

                                <div className="text-[#1C1C1C]  border-b border-[#E86731] pb-2">
                                    {accordionData.map((item, index) => (
                                        <div
                                            key={index}
                                            className="collapse collapse-arrow bg-[#E86731] text-[#FFFFFF] mb-7  "
                                        >
                                            <input
                                                type="radio"
                                                name="my-accordion"
                                            />
                                            <div className="collapse-title text-xl font-medium flex items-center">
                                                <h2 className="text-[20px] font-semibold">
                                                    {item.question}
                                                </h2>
                                            </div>
                                            <div className="collapse-content">
                                                <div>
                                                    <p>{item.answer}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        </div>

                        {/* ======================================  Side bar ========================== */}
                        <div className="col-span-12 lg:col-span-3 mt-5 lg:mt-0">
                            <div className="rounded-lg">
                                <h2 className="font-bold text-[22px] hover:bg-[#FFFFFF] duration-300 text-[#141D2A] py-[16px] px-6 rounded-md mb-2">
                                    Booking and Reservations
                                </h2>
                                <h2 className="font-bold text-[22px] hover:bg-[#FFFFFF] duration-300 text-[#141D2A] py-[16px] px-6 rounded-md mb-2">
                                    Travel Experience and Itinerary
                                </h2>
                                <h2 className="font-bold text-[22px] hover:bg-[#FFFFFF] duration-300 text-[#141D2A] py-[16px] px-6 rounded-md mb-2">
                                    Travel Experience and Itinerary
                                </h2>
                                <h2 className="font-bold text-[22px] hover:bg-[#FFFFFF] duration-300 text-[#141D2A] py-[16px] px-6 rounded-md mb-2">
                                    Travel Insurance and Safety
                                </h2>
                            </div>
                        </div>
                    </div>
                </ParentComponent>
            </div>
            <BottomBannerSection />
        </div>
    );
};

export default Faq;
