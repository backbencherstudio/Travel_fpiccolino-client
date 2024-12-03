import React from 'react';
import BannerSection from '../../Components/Home/BannerSection';
import SearchBar from '../../Components/Home/SearchBar';
import AdventureSection from '../../Components/Home/AdventureSection';
import PlaceSliderSection from '../../Components/Home/PlaceSliderSection';

const Home = () => {
    return (
        <div>
           <BannerSection/>
           <SearchBar/>
           <AdventureSection/>
           <PlaceSliderSection/>
        </div>
    );
};

export default Home;