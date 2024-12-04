
import HeroScetion from '../../Shared/HeroComponent/HeroScetion';
import heroImage from "../../assets/Images/about.jpg"
import ApproachSection from '../../Components/Home/ApproachSection';
import JourneySection from '../../Components/Home/JourneySection';
import CenterBannerSection from '../../Components/About/CenterBannerSection';
import BottomBannerSection from '../../Shared/BottomBannerSection';
import BenifitsSliderSection from '../../Components/About/BenifitsSliderSection';
import WhyChooseUsSection from '../../Components/About/WhyChooseUsSection';

const About = () => {
    const heroContent = {
        heroImage,
        titleOne: "Who We Are and What Drives Us",
        descriptionOne: "Passionate Travelers Creating Memorable Experiences Just for You",
    }
    return (
        <div>
            <HeroScetion heroContent={heroContent} />
            <ApproachSection/>
            <JourneySection/>
            <CenterBannerSection/>
            <BenifitsSliderSection/>
            <WhyChooseUsSection/>
            <BottomBannerSection/>
        </div>
    );
};

export default About;