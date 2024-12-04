import banner from "../../assets/Images/beach.jpg";
const CenterBannerSection = () => {
  const bannerDetails = {
    image: banner,
    titleTop:
      "When you travel with us, you’re embarking on more than just a trip—you’re stepping into an experience crafted with care, passion, and dedication to your unique desires. Here’s what makes our journeys truly exceptional:",
    description: [
      "Personalized Itineraries: Every journey is uniquely crafted to suit your interests, style, and pace.",
      "Exclusive Experiences: Gain insider access and unforgettable moments that go beyond the guidebooks.",
      "Seamless Planning: From booking to your return home, we handle every detail so you can focus on enjoying the journey.",
      "24/7 Support: Our team is here for you at any time, providing peace of mind wherever you are.",
      "Local Connections: Immerse yourself in authentic experiences and meet the people who make each place special. Let us turn every step of y",
    ],
  };
  return (
    <>
      <p className="text-[18px] text-center mb-8 text-[#72777F] max-w-[1345px] mx-auto px-1">
        {bannerDetails.titleTop}
      </p>
      <div
        className="relative h-[520px]"
        style={{
          backgroundImage: `url('${bannerDetails.image}')`, // Static URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <ul className="text-[#72777F] text-[18px]">
        {bannerDetails.description.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </>
  );
};

export default CenterBannerSection;
