import BannerSection from '../../Components/Home/BannerSection';
import SearchBar from '../../Components/Home/SearchBar';
import AdventureSection from '../../Components/Home/AdventureSection';
import BlurSliderSection from '../../Components/Home/BlurSliderSection';
import WondersSection from '../../Components/Home/WondersSection';
import ApproachSection from '../../Components/Home/ApproachSection';
import ArticleAndNewsSection from '../../Components/Home/ArticleAndNewsSection';
import BottomBannerSection from '../../Shared/BottomBannerSection';
import ReviewSection from '../../Components/Home/ReviewSection';
import JourneySection from '../../Components/Home/JourneySection';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHomePageData } from '../../features/pageData/pageDataSlice';
// import { getHeader } from '../../features/header/headerSlice';
import HeroScetion from '../../Shared/HeroComponent/HeroScetion';

const Home = () => {

    const dispatch = useDispatch()
    const { homePageLoaging, homePageError, homePageData } = useSelector(
        (state) => state.pageData
    );

    useEffect(() => {
        dispatch(getHomePageData())
    }, []);

    // const { headers } = useSelector((state) => state.header);
    // useEffect(() => {
    //     dispatch(getHeader());
    // }, []);

    // const data = headers?.filter(item => item.pageName === "home")
    // const heroContent = {
    //     heroImage: data[0]?.heroImage,
    //     titleOne: data[0]?.titleOne,
    //     descriptionOne: data[0]?.descriptionOne,
    // }

    const heroSection = homePageData?.hero
    const cardDetails = homePageData?.package;
    const countrySection = homePageData?.countryWithImage;
    const titleWithoutContent = homePageData?.titleWithoutContent;
    const review = homePageData?.review;
    const blogSection = homePageData?.blogSection;

    console.log(homePageData);
    

    return (
        <div>
            {/* <BannerSection /> */}
            {
                heroSection &&
                <HeroScetion heroContent={heroSection} />
            }
            <SearchBar />
            {
                cardDetails &&
                <AdventureSection cardDetails={cardDetails} />
            }
            <BlurSliderSection />
            {
                countrySection &&
                <WondersSection countrySection={countrySection} />
            }
            <ApproachSection titleWithoutContent={titleWithoutContent} />
            {
                review &&
                <ReviewSection review={review} />
            }
            {
                blogSection &&
                <ArticleAndNewsSection blogSection={blogSection} />
            }
            <JourneySection />
            <BottomBannerSection />
        </div>
    );
};

export default Home;