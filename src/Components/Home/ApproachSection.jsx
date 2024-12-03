import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import stay from "../../assets/icons/stay.svg";
import connect from "../../assets/icons/connect.svg";
import explore from "../../assets/icons/explore.svg";

const ApproachSection = () => {
  return (
    <div>
      <ParentComponent>
        <div className="mt-[100px] mb-[100px] lg:mb-0">
          <HeadLine
            title="Our Approach to Meaningful Travel"
            description="Connecting You to Authentic Experiences and Lasting Memories"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[60px] mt-14">
            <div className="text-center">
              <div className="flex justify-center">
                <img src={stay} alt="" />
              </div>
              <h1 className="primary_text font-bold text-[32px]">Stay</h1>
              <p className="text-[#72777F] text-[14px] max-w-[375px] mx-auto">
                Uncover a vibrant space where travelers and local communities
                come together to share and connect.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <img src={connect} alt="" />
              </div>
              <h1 className="primary_text font-bold text-[32px] ">Connect</h1>
              <p className="text-[#72777F] text-[14px] max-w-[375px] mx-auto">
              Forge new connections with people and places, creating memories that will last a lifetime.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <img src={explore} alt="" />
              </div>
              <h1 className="primary_text font-bold text-[32px]">Explore</h1>
              <p className="text-[#72777F] text-[14px] max-w-[375px] mx-auto">
              Turn the world into your home and immerse yourself in authentic experiences everywhere you go.
              </p>
            </div>
          </div>
        </div>
      </ParentComponent>
    </div>
  );
};

export default ApproachSection;
