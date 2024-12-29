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

const Home = () => {
    const dispatch = useDispatch()
    const { homePageLoaging, homePageError, homePageData } = useSelector(
        (state) => state.pageData
    );
    useEffect(() => {
        dispatch(getHomePageData())
    }, [])

    // console.log(
    //     "ijfndifuhewf", homePageLoaging, homePageError, homePageData
    // );

    const cardDetails = homePageData?.package?.data;
    const countrySection = homePageData?.country?.data;
    // blurSliderSection={blurSliderSection}
    console.log(countrySection);





    return (
        <div>
            <BannerSection />
            <SearchBar />
            <AdventureSection cardDetails={cardDetails} />
            <BlurSliderSection />
            {
                countrySection &&
                <WondersSection countrySection={countrySection} />
            }
            <ApproachSection />
            <ReviewSection />
            <ArticleAndNewsSection />
            <JourneySection />
            <BottomBannerSection />
        </div>
    );
};

export default Home;