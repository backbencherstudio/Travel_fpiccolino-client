import banner from "../../assets/footerBanner.jpg";
import CustomButton from "../../Shared/CustomButton";
import HeadLine2 from "../../Shared/HeadLineComponent/HeadLine2";
import call from '../../assets/icons/call.svg'
const BottomBannerSection = () => {
  return (
    <>
      <div
        className="relative h-[520px]"
        style={{
          backgroundImage: `url('${banner}')`, // Static URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* <img className="  max-h-[80vh] cover w-full" src={banner} alt="" /> */}
        <div className="absolute inset-0 bg-gradient-to-t to-[#000000c4] from-transparent "></div>
        <div className="w-full text-center absolute top-[40%]">
        <HeadLine2
            title="Ready to Start Your Journey?"
            description="Get in Touch and Let’s Plan Your Next Adventure Together!"
          />
             <div className="mt-14">
               
             <CustomButton content={ <p className="flex gap-1">Contact Now<img src={call} alt="" /></p>}/>
             </div>
        </div>
      </div>

    </>
  );
};

export default BottomBannerSection;
