import banner from "../../assets/Images/beach.jpg";
import EditableHeading from "../Common/EditableHeading";

const CenterBannerSection = () => {
  const bannerDetails = {
    image: banner,
    titleTopKey: "about_banner_title",
    descriptionKeys: [
      "about_banner_desc_1",
      "about_banner_desc_2",
      "about_banner_desc_3",
      "about_banner_desc_4",
      "about_banner_desc_5",
    ],
    defaultDescription: [
      "Personalized Itineraries: Every journey is uniquely crafted to suit your interests, style, and pace.",
      "Exclusive Experiences: Gain insider access and unforgettable moments that go beyond the guidebooks.",
      "Seamless Planning: From booking to your return home, we handle every detail so you can focus on enjoying the journey.",
      "24/7 Support: Our team is here for you at any time, providing peace of mind wherever you are.",
      "Local Connections: Immerse yourself in authentic experiences and meet the people who make each place special. Let us turn every step of y",
    ],
  };

  return (
    <>
      <EditableHeading
        titleKey={bannerDetails.titleTopKey}
        defaultTitle={bannerDetails.titleTop}
        customTitleClass="text-[18px] text-center mb-8 text-[#72777F] max-w-[1345px] mx-auto px-5"
      />

      <div
        className="relative h-[520px]"
        style={{
          backgroundImage: `url('${bannerDetails.image}')`, // Static URL
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      <ul className="text-[#72777F] text-[18px] text-center mt-8   max-w-[1350px] mx-auto px-5">
        {bannerDetails.descriptionKeys.map((key, index) => (
          <li className="py-2" key={index}>
            <EditableHeading
              titleKey={key}
              defaultTitle={bannerDetails.defaultDescription[index]}
              customTitleClass="text-[#72777F] text-[18px]"
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default CenterBannerSection;
