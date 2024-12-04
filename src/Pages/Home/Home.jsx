import BannerSection from '../../Components/Home/BannerSection';
import SearchBar from '../../Components/Home/SearchBar';
import AdventureSection from '../../Components/Home/AdventureSection';
import PlaceSliderSection from '../../Components/Home/PlaceSliderSection';
import WondersSection from '../../Components/Home/WondersSection';
import ApproachSection from '../../Components/Home/ApproachSection';
import ArticleAndNewsSection from '../../Components/Home/ArticleAndNewsSection';
import BottomBannerSection from '../../Components/Home/BottomBannerSection';
import ReviewSection from '../../Components/Home/ReviewSection';

const Home = () => {
    return (
        <div>
           <BannerSection/>
           <SearchBar/>
           <AdventureSection/>
           <PlaceSliderSection/>
           <WondersSection/>
           <ApproachSection/>
           <ReviewSection/>
           <ArticleAndNewsSection/>
           <BottomBannerSection/>
        </div>
    );
};

export default Home;