import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageData } from "../../features/pageData/pageDataSlice";
import { fetchBanner, fetchTexts } from "../../features/texts/textsSlice";
import SearchBar from "../../Components/Home/SearchBar";
import AdventureSection from "../../Components/Home/AdventureSection";
import BlurSliderSection from "../../Components/Home/BlurSliderSection";
import WondersSection from "../../Components/Home/WondersSection";
import ApproachSection from "../../Components/Home/ApproachSection";
import ArticleAndNewsSection from "../../Components/Home/ArticleAndNewsSection";
import BottomBannerSection from "../../Shared/BottomBannerSection";
import ReviewSection from "../../Components/Home/ReviewSection";
import JourneySection from "../../Components/Home/JourneySection";
// import CookiePolicyModal from "../../Shared/CookiePolicyModal";
import FooterModal from "../../Shared/FooterModal";
import CustomHeroSection from "../../Shared/CustomHeroSection";

const Home = () => {
  const dispatch = useDispatch();
  const { homePageData } = useSelector((state) => state.pageData);
  const { texts, isLoading, banners } = useSelector((state) => state.texts);
  const [showFooterModal, setShowFooterModal] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    dispatch(getHomePageData());
    dispatch(fetchTexts());
    dispatch(fetchBanner());
    localStorage.setItem("tab", "Dashboard");
    const footerModalDismissed = localStorage.getItem("footerModalDismissed");
    if (!footerModalDismissed) {
      const handleScroll = () => {
        if (footerRef.current) {
          const rect = footerRef.current.getBoundingClientRect();
          const isFooterVisible = rect.top <= window.innerHeight;
          if (isFooterVisible) {
            setShowFooterModal(true);
            // Remove scroll listener once modal is shown
            window.removeEventListener("scroll", handleScroll);
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [dispatch]);

  const handleCloseFooterModal = () => {
    setShowFooterModal(false);
    localStorage.setItem("footerModalDismissed", "true");
  };

  // const heroSection = homePageData?.hero;
  const cardDetails = homePageData?.package;
  const countrySection = homePageData?.countryWithImage;
  const titleWithoutContent = homePageData?.titleWithoutContent;
  const review = homePageData?.review;
  const blogSection = homePageData?.blogSection;
  const countryWithoutImage = homePageData?.country;
  const footerSection = homePageData?.footer;

  return (
    <div>
      {showFooterModal && (
        <FooterModal
          footerImg={footerSection[0].emailModalImg}
          onClose={handleCloseFooterModal}
        />
      )}

      {banners?.homeBanner && (
        <CustomHeroSection pageName="home" image={banners?.homeBanner} />
      )}
      {countrySection && (
        <SearchBar
          countries={countrySection}
          texts={texts}
          isLoading={isLoading}
        />
      )}
      {cardDetails && (
        <AdventureSection cardDetails={cardDetails} texts={texts} />
      )}
      {countryWithoutImage && (
        <BlurSliderSection country={countryWithoutImage} texts={texts} />
      )}
      {countrySection && (
        <div ref={footerRef}>
          <WondersSection countrySection={countrySection} texts={texts} />
        </div>
      )}
      {titleWithoutContent && (
        <ApproachSection
          aboutWithoutContent={titleWithoutContent}
          texts={texts}
        />
      )}
      {review && <ReviewSection reviews={review} texts={texts} />}
      {blogSection && (
        <ArticleAndNewsSection blogSection={blogSection} texts={texts} />
      )}
      <JourneySection texts={texts} />
      {footerSection && (
        <div>
          <BottomBannerSection footerSection={footerSection} />
        </div>
      )}
    </div>
  );
};

export default Home;
