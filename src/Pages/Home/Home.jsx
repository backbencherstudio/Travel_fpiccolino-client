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

const Home = () => {
    return (
        <div>
           <BannerSection/>
           <SearchBar/>
           <AdventureSection/>
           <BlurSliderSection/>
           <WondersSection/>
           <ApproachSection/>
           <ReviewSection/>
           <ArticleAndNewsSection/>
           <JourneySection/>
           <BottomBannerSection/>
        </div>
    );
};

export default Home;