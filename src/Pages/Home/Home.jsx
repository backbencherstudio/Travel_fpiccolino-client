import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageData } from "../../features/pageData/pageDataSlice";
import { fetchTexts } from "../../features/texts/textsSlice";
import axios from "axios";
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
// import CookiePolicyModal from "../../Shared/CookiePolicyModal";
import FooterModal from "../../Shared/FooterModal";

const Home = () => {
  const dispatch = useDispatch();
  const { homePageData } = useSelector((state) => state.pageData);
  const { texts, isLoading } = useSelector((state) => state.texts);
  const [showFooterModal, setShowFooterModal] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    dispatch(getHomePageData());
    dispatch(fetchTexts());

    const footerModalDismissed = localStorage.getItem("footerModalDismissed");
    if (!footerModalDismissed) {
      const handleScroll = () => {
        if (footerRef.current) {
          const rect = footerRef.current.getBoundingClientRect();
          const isFooterVisible = rect.top <= window.innerHeight;
          setShowFooterModal(isFooterVisible);
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
      {showFooterModal && (
        <FooterModal
          footerImg={footerSection[0].emailModalImg}
          onClose={handleCloseFooterModal}
        />
      )}

      {heroSection && <HeroScetion heroContent={heroSection} />}
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
