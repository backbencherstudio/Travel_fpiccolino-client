import banner from "../../assets/banner (2).jpg";
const BannerSection = () => {
  return (
    <>
      <div className="relative">
        <img className="  max-h-[80vh] cover w-full" src={banner} alt="" />
        <div className="absolute inset-0 bg-gradient-to-t to-[#000000c4] from-transparent "></div>
        <div className="w-full text-center absolute z-10 top-[50%]">
        <h3 className="text-[36px] lg:text-[56px] text-white font-sans font-bold top-[50%] z-20 max-w-[760px] mx-auto">Feel at Home Wherever You Roam</h3>
        </div>
      </div>
    </>
  );
};

export default BannerSection;
