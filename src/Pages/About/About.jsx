import ApproachSection from "../../Components/Home/ApproachSection";
import JourneySection from "../../Components/Home/JourneySection";
import CenterBannerSection from "../../Components/About/CenterBannerSection";
import BottomBannerSection from "../../Shared/BottomBannerSection";
import WhyChooseUsSection from "../../Components/About/WhyChooseUsSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAboutPageData } from "../../features/pageData/pageDataSlice";
import CustomHeroSection from "../../Shared/CustomHeroSection";

const About = () => {
  const dispatch = useDispatch();
  const { aboutPageData } = useSelector((state) => state.pageData);
  const { banners } = useSelector((state) => state.texts);
  useEffect(() => {
    dispatch(getAboutPageData());
  }, []);
  const texts = useSelector((state) => state.texts);
  const heroSection = aboutPageData?.hero;

  const aboutWithoutContent = aboutPageData?.aboutWithoutContent;
  const footer_3 = aboutPageData?.footer_3;
  console.log(aboutPageData);

  return (
    <div>
      {banners?.aboutBanner && (
        <CustomHeroSection pageName="about" image={banners?.aboutBanner} />
      )}
      {aboutWithoutContent && (
        <ApproachSection
          aboutWithoutContent={aboutWithoutContent}
          texts={texts}
        />
      )}
      <JourneySection texts={texts} />
      <CenterBannerSection bannerImage={heroSection?.image} />
      {/* <BenifitsSliderSection /> */}
      {footer_3 && <WhyChooseUsSection footer_3={footer_3} />}
      <BottomBannerSection />
    </div>
  );
};

export default About;
