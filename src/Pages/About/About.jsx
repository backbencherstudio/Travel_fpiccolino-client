
import HeroScetion from '../../Shared/HeroComponent/HeroScetion';
import heroImage from "../../assets/Images/about.jpg"
import ApproachSection from '../../Components/Home/ApproachSection';
import JourneySection from '../../Components/Home/JourneySection';
import CenterBannerSection from '../../Components/About/CenterBannerSection';
import BottomBannerSection from '../../Shared/BottomBannerSection';
import BenifitsSliderSection from '../../Components/About/BenifitsSliderSection';
import WhyChooseUsSection from '../../Components/About/WhyChooseUsSection';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getHeader } from '../../features/header/headerSlice';
import { getAboutPageData } from '../../features/pageData/pageDataSlice';

const About = () => {

    const dispatch = useDispatch()
    const { aboutPageData } = useSelector(
        (state) => state.pageData
    );
    useEffect(() => {
        dispatch(getAboutPageData())
    }, []);

    const heroSection = aboutPageData?.hero;
    // ============================================ Hero section
    const heroContent = {
        image: heroSection?.image,
        titleOne: heroSection?.titleOne,
        descriptionOne: heroSection?.descriptionOne,
    }
    const aboutWithoutContent = aboutPageData?.aboutWithoutContent
    const footer_3 = aboutPageData?.footer_3



    return (
        <div>
            {
                aboutPageData?.hero &&
                <HeroScetion heroContent={heroContent} />
            }
            {
                aboutWithoutContent &&
                <ApproachSection aboutWithoutContent={aboutWithoutContent} />
            }
            <JourneySection />
            <CenterBannerSection />
            <BenifitsSliderSection />
            {
                footer_3 &&
                <WhyChooseUsSection footer_3={footer_3} />
            }
            <BottomBannerSection />
        </div>
    );
};

export default About;