import { Link } from "react-router-dom";
import { cardDetails } from "../../ALLJsonFile/const";
import TureCard from "../../Components/ToursComponents/TureCard";
import Videos from "../../Components/ToursComponents/Videos";
import BottomBannerSection from "../../Shared/BottomBannerSection";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import heroImage from "../../assets/Images/HeroSection/heroImage2.jpg";
import heroImage from "../../assets/Images/HeroSection/heroImage2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getHeader } from "../../features/header/headerSlice";
import { getPackage } from "../../features/pckage/packageSlice";
import { get_all_inclusive_TourPagePage } from "../../features/pageData/pageDataSlice";

const Tours = () => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.header);
  const { packag } = useSelector((state) => state.package);

  const {
    all_inclusive_TourPageLoaging,
    all_inclusive_TourPageError,
    all_inclusive_TourPageData,
  } = useSelector((state) => state.pageData);

  useEffect(() => {
    // dispatch(getHeader());
    dispatch(getPackage());
    dispatch(get_all_inclusive_TourPagePage());
  }, []);
  // const data = headers?.filter(item => item.pageName === "tour")
  console.log(packag);

  console.log("all_inclusive_TourPageData", all_inclusive_TourPageData)
 
 
  const heroContent =  all_inclusive_TourPageData?.hero
  const packags = all_inclusive_TourPageData?.package


  return (
    <div className="">
        {
            heroContent&& <HeroScetion heroContent={heroContent} />
        }
      
      <ParentComponent styles="my-20">
        <HeadLine
          title={packags?.title}
          description={packags?.subtitle}
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-20">
          {packag?.map((item) => (
            <div key={item._id}>
              <Link to={`/tours/${item._id}`}>
                <TureCard item={item} />
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-20">
          <Videos />
        </div>
      </ParentComponent>
      <div className="mt-20">
        <BottomBannerSection />
      </div>
    </div>
  );
};

export default Tours;

