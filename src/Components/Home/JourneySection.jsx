import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import natureImage from "../../assets/natureImage.jpg";
import natureImage2 from "../../assets/natureImage2.jpg";

import CustomButton from "../../Shared/CustomButton";
const JourneySection = () => {
 
  return (
    <div className="bg-[#fff] lg:p-20 lg:pt-0">
      <ParentComponent>
        <div className="mt-[100px]">
          <h2 className="font-duera-expanded text-[#000000] text-[30px] lg:text-[32px] font-extrabold leading-[41.6px] text-start decoration-skip-ink ">
            Your Journey, Our Passion
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-[74px] mt-14">
            <div className="lg:col-span-2 h-[600px]">
              <img className="h-full object-cover rounded-[20px]" src={natureImage} alt="" />
            </div>
            <div className="lg:col-span-3">
                <p className="text-[18px] w-full"><strong>At LA TUA FUGA LOWCOST, we believe travel is more than just visiting new places; it’s about creating unforgettable experiences, discovering hidden gems,</strong> and making memories that last a lifetime. As seasoned experts in the travel industry, we’re dedicated to designing personalized adventures that reflect your unique interests and desires. Whether you're seeking serene beaches, vibrant cities, or thrilling expeditions, our team is here to bring your travel dreams to life. Let us handle the details, so you can simply enjoy the journey.</p>
               <div className="mt-5 mb-8">
               <CustomButton content={"Read More"}/>
               </div>
              <img
                className="h-[365px] w-full rounded-[20px] object-cover"
                src={natureImage2}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="mt-14 mb-20 lg:mb-0 flex md:flex-row flex-col justify-center lg:gap-40 gap-10">

          <div className="text-center">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px]">10+</h1>
            <p className="text-[24px] text-[#72777F] mt-2">Years of Experience</p>
          </div>
        
          <div className="text-center">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px]">500+</h1>
            <p className="text-[24px] text-[#72777F] mt-2">Travel Completed</p>
          </div>
        
          <div className="text-center">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px]">1.5K</h1>
            <p className="text-[24px] text-[#72777F] mt-2">Happy Customer Review</p>
          </div>
        
          <div className="text-center">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px]">99%</h1>
            <p className="text-[24px] text-[#72777F] mt-2">Success Rating</p>
          </div>
        
        </div>
      </ParentComponent>
    </div>
  );
};

export default JourneySection;
