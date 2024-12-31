import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import experience from "../../assets/icons/experience.svg";
import support from "../../assets/icons/support.svg";
import connection from "../../assets/icons/connection.svg";
import natureImage2 from "../../assets/natureImage2.jpg";
const WhyChooseUsSection = ({footer_3}) => {
  return (
    <div>
      <ParentComponent>
        <div className="mt-[80px] lg:mb-0 lg:px-20 px-5">
          <HeadLine
            title={footer_3.title}
            description={footer_3.description}
          />
          <div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-14 mt-14">
            <div className="col-span-2 h-[520px] max-w-[720px] ">
              <img
                src={natureImage2}
                className="h-full w-full rounded-2xl object-cover"
                alt=""
              />
            </div>
            <div className="col-span-3 grid grid-cols-1 gap-5 mt-14 ">
              <div className="text-start">
                <div className="flex justify-start">
                  <img src={experience} alt="" />
                </div>
                <h1 className="font-semibold text-[24px]">
                  Tailored Travel Experiences
                </h1>
                <p className="text-[#72777F] text-[14px] ">
                  We create personalized journeys that cater to your unique
                  interests, ensuring every trip is unforgettable.
                </p>
              </div>
              <div className="text-start">
                <div className="flex justify-start">
                  <img src={support} alt="" />
                </div>
                <h1 className="font-semibold text-[24px] ">
                  Expert Support Every Step of the Way
                </h1>
                <p className="text-[#72777F] text-[14px] mx-auto">
                  From planning to booking and beyond, our dedicated team is
                  here to assist you 24/7 for a seamless experience.
                </p>
              </div>
              <div className="text-start">
                <div className="flex justify-start">
                  <img src={connection} alt="" />
                </div>
                <h1 className="font-semibold text-[24px]">
                  Exclusive Access & Local Connections
                </h1>
                <p className="text-[#72777F] text-[14px] mx-auto">
                  Enjoy curated, off-the-beaten-path experiences that connect
                  you to local cultures, making your travels truly authentic.
                </p>
              </div>
            </div>

          </div>
        </div>
      </ParentComponent>

      <div className="mt-20 py-[60px] px-20 text-start bg-[#469697] grid lg:grid-cols-2">

        <div>
          <p className="font-extrabold text-[20px] md:text-[40px] text-white text-center lg:text-start ">Our Trusted Partner <br /> in Travel</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white ">
          <p className="font-semibold text-[30px] md:text-[52px] italic text-center">Maven</p>
          <p className="font-semibold text-[30px] md:text-[52px] text-center">intuit</p>
          <p className="text-[30px] md:text-[52px] text-center">memSQL</p>
          <p className="text-[30px] md:text-[52px] text-center">maze</p>
          <p className="text-[30px] md:text-[52px] font-extrabold italic text-center">venmo</p>
          <p className="text-[32px] font-[300] text-center">tapcart</p>
        </div>

      </div>


    </div>
  );
};

export default WhyChooseUsSection;
