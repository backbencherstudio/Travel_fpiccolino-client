import banner from "../../assets/banner.jpg";
const BannerSection = () => {
  return (
    <>
      <div
        className="relative h-[720px]"
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
          <h3 className="text-[36px] lg:text-[56px] text-white font-sans font-bold top-[50%] max-w-[760px] mx-auto">
            Feel at Home Wherever You Roam
          </h3>
          <p className="text-[18px] max-w-[588px] mx-auto text-[#E9E9EA]">
            Discover the warmth of home in every destination, blending comfort,
            connection, and local charm
          </p>
        </div>
      </div>

    </>
  );
};

export default BannerSection;
