/* eslint-disable react/prop-types */

import ParentComponent from "../../Shared/ParentComponent/ParentComponent";


const HeroScetion = ({ heroContent }) => {
    const { heroImage, titleOne, descriptionOne, titleTwo, descriptionTwo } = heroContent
    return (
        <div>
            <div className="h-[600px] w-full relative ">

                <img className="w-full h-full object-cover " src={heroImage} alt="" />

                <div className="absolute w-full h-full  inset-0 bg-gradient-to-t to-[#000000c4] from-transparent "></div>

                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ParentComponent>
                        <div className="text-center p-4 rounded-md text-[#FFFFFF]">
                            <h2 className="font-duera-expanded text-[56px] font-bold leading-[56px] text-center decoration-skip-ink">
                                {titleOne}
                            </h2>
                            <p className="leading-[40px] mt-4 text-[18px] ">{descriptionOne}</p>
                        </div>
                    </ParentComponent>
                </div>
            </div>

            <div className="text-center p-20 rounded-md bg-[#EFFBFB]  ">
                <ParentComponent>
                    <h2 className="font-duera-expanded text-[32px] font-bold leading-[56px] text-center decoration-skip-ink">
                        {titleTwo}
                    </h2>
                    <p className="leading-[45px] mt-8 text-[18px]">{descriptionTwo}</p>

                </ParentComponent>
            </div>

        </div>
    );
};

export default HeroScetion;