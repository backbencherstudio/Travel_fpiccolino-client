import { useEffect, useState, useRef } from "react";
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
import FooterModal from "../../Shared/FooterModal";
import ScrollToTop from "../../Shared/ScrollToTop";

const Home = () => {
  const dispatch = useDispatch();
  const { homePageLoaging, homePageError, homePageData } = useSelector(
    (state) => state.pageData
  );

  const [showCookieModal, setShowCookieModal] = useState(false);
  const [showFooterModal, setShowFooterModal] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    dispatch(getHomePageData());
    // Check cookie policy status
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setShowCookieModal(true);
    }

    const footerModalDismissed = localStorage.getItem("footerModalDismissed");
    if (!footerModalDismissed) {
      const handleScroll = () => {
        if (footerRef.current) {
          const rect = footerRef.current.getBoundingClientRect();
          const isFooterVisible =
            rect.top >= 0 && rect.top <= window.innerHeight;
          setShowFooterModal(isFooterVisible);
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [dispatch]);

  const handleAcceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowCookieModal(false);
  };

  const handleRejectCookies = () => {
    setShowCookieModal(false);
  };

  const handleCloseFooterModal = () => {
    setShowFooterModal(false);
    localStorage.setItem("footerModalDismissed", "true");
  };

  const heroSection = homePageData?.hero;
  const cardDetails = homePageData?.package;
  const countrySection = homePageData?.countryWithImage;
  const titleWithoutContent = homePageData?.titleWithoutContent;
  const review = homePageData?.review;
  const blogSection = homePageData?.blogSection;
  const countryWithoutImage = homePageData?.country;
  const footerSection = homePageData?.footer;

  return (
    <div>
      {/* Show Cookie Modal */}
      {showCookieModal && (
        <CookiePolicyModal
          handleAcceptCookies={handleAcceptCookies}
          onClose={handleRejectCookies}
        />
      )}

      {/* Slide-in Footer Modal */}
      {showFooterModal && <FooterModal onClose={handleCloseFooterModal} />}

      {heroSection && <HeroScetion heroContent={heroSection} />}
      {countrySection && <SearchBar countries={countrySection} />}
      {cardDetails && <AdventureSection cardDetails={cardDetails} />}
      {countryWithoutImage && (
        <BlurSliderSection country={countryWithoutImage} />
      )}
      {countrySection && (
        <div ref={footerRef}>
          <WondersSection countrySection={countrySection} />
        </div>
      )}
      {titleWithoutContent && (
        <ApproachSection aboutWithoutContent={titleWithoutContent} />
      )}
      {review && <ReviewSection reviews={review} />}
      {blogSection && <ArticleAndNewsSection blogSection={blogSection} />}
      <JourneySection />
      {footerSection && (
        <div>
          <BottomBannerSection footerSection={footerSection} />
        </div>
      )}
    </div>
  );
};

export default Home;
