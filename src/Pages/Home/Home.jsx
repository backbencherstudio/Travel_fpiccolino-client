import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageData } from "../../features/pageData/pageDataSlice";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import SearchBar from "../../Components/Home/SearchBar";
import AdventureSection from "../../Components/Home/AdventureSection";
import BlurSliderSection from "../../Components/Home/BlurSliderSection";
import WondersSection from "../../Components/Home/WondersSection";
import ApproachSection from "../../Components/Home/ApproachSection";
import ArticleAndNewsSection from "../../Components/Home/ArticleAndNewsSection";
import BottomBannerSection from "../../Shared/BottomBannerSection";
import ReviewSection from "../../Components/Home/ReviewSection";
import JourneySection from "../../Components/Home/JourneySection";
import CookiePolicyModal from "../../Shared/CookiePolicyModal"; // Import Cookie Modal

const Home = () => {
  const dispatch = useDispatch();
  const { homePageLoaging, homePageError, homePageData } = useSelector(
    (state) => state.pageData
  );

  const [showCookieModal, setShowCookieModal] = useState(false); // Show cookie modal state

  useEffect(() => {
    dispatch(getHomePageData());

    // Check sessionStorage for cookie acceptance
    const cookiesAccepted = sessionStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setShowCookieModal(true); // Show the modal if not accepted yet
    }
  }, [dispatch]);

  const handleAcceptCookies = () => {
    sessionStorage.setItem("cookiesAccepted", "true"); // Store in sessionStorage
    setShowCookieModal(false); // Hide the modal
  };

  const heroSection = homePageData?.hero;
  const cardDetails = homePageData?.package;
  const countrySection = homePageData?.countryWithImage;
  const titleWithoutContent = homePageData?.titleWithoutContent;
  const review = homePageData?.review;
  const blogSection = homePageData?.blogSection;
  const countryWithoutImage = homePageData?.country;

  return (
    <div>
      {/* Show Cookie Modal */}
      {showCookieModal && <CookiePolicyModal onClose={handleAcceptCookies} />}

      {heroSection && <HeroScetion heroContent={heroSection} />}
      {countrySection && <SearchBar countries={countrySection} />}
      {cardDetails && <AdventureSection cardDetails={cardDetails} />}
      {countryWithoutImage && (
        <BlurSliderSection country={countryWithoutImage} />
      )}
      {countrySection && <WondersSection countrySection={countrySection} />}
      {titleWithoutContent && (
        <ApproachSection aboutWithoutContent={titleWithoutContent} />
      )}
      {review && <ReviewSection reviews={review} />}
      {blogSection && <ArticleAndNewsSection blogSection={blogSection} />}
      <JourneySection />
      <BottomBannerSection />
    </div>
  );
};

export default Home;
