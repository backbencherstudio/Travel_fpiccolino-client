import BannerSection from '../../Components/Home/BannerSection';
import SearchBar from '../../Components/Home/SearchBar';
import AdventureSection from '../../Components/Home/AdventureSection';
import PlaceSliderSection from '../../Components/Home/PlaceSliderSection';
import WondersSection from '../../Components/Home/WondersSection';

const Home = () => {
    return (
        <div>
           <BannerSection/>
           <SearchBar/>
           <AdventureSection/>
           <PlaceSliderSection/>
           <WondersSection/>
        </div>
    );
};

export default Home;