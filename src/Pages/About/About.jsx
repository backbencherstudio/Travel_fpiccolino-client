
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

    console.log(aboutPageData);
    


    // =============================================================

    const { headers } = useSelector((state) => state.header);
    useEffect(() => {
        dispatch(getHeader());
    }, []);

    console.log(headers);

    const data = headers?.filter(item => item.pageName === "about")
    const heroContent = {
        heroImage: data[0]?.heroImage,
        titleOne: data[0]?.titleOne,
        descriptionOne: data[0]?.descriptionOne,
    }



    return (
        <div>
            <HeroScetion heroContent={heroContent} />
            <ApproachSection />
            <JourneySection />
            <CenterBannerSection />
            <BenifitsSliderSection />
            <WhyChooseUsSection />
            <BottomBannerSection />
        </div>
    );
};

export default About;