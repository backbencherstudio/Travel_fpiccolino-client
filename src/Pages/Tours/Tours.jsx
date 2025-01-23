import { Link, useParams } from "react-router-dom";
import TureCard from "../../Components/ToursComponents/TureCard";
import Videos from "../../Components/ToursComponents/Videos";
import BottomBannerSection from "../../Shared/BottomBannerSection";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPackage } from "../../features/pckage/packageSlice";
import {
  country_wise_TourPage,
  get_all_inclusive_TourPagePage,
} from "../../features/pageData/pageDataSlice";
import { PiShieldWarningThin } from "react-icons/pi";

const Tours = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { all_inclusive_TourPageData, country_wise_TourPageData } = useSelector(
    (state) => state.pageData
  );

  useEffect(() => {
    if (id) {
      dispatch(country_wise_TourPage(id));
    }
  }, [id]);

  useEffect(() => {
    // dispatch(getHeader());
    dispatch(getPackage({ search: "", startDate: "", endDate: "" }));
    dispatch(get_all_inclusive_TourPagePage());
  }, []);
  // const data = headers?.filter(item => item.pageName === "tour")

  console.log(23784623468785, id);
  console.log("all_inclusive_TourPageData", all_inclusive_TourPageData);
  console.log("country_wise_TourPageData", country_wise_TourPageData);

  const heroContent = id
    ? country_wise_TourPageData?.hero
    : all_inclusive_TourPageData?.hero;
  const packags = id
    ? country_wise_TourPageData?.package
    : all_inclusive_TourPageData?.package;
  return (
    <div className="">
      {heroContent && <HeroScetion heroContent={heroContent} />}

      <ParentComponent styles="my-20">
        <HeadLine title={packags?.title} description={packags?.subtitle} />
        <div>
          {packags?.data?.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-20">
              {packags?.data?.map((item) => (
                <div key={item._id}>
                  <Link to={`/tours/${item._id}`}>
                    <TureCard item={item} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className=" text-center py-20 my-20 rounded-lg text-lg border-dashed border border-orange-400 mx-5">
              <div className="primary_text justify-center flex text-6xl mb-3 font-bold">
                <PiShieldWarningThin />
              </div>
              <span className="primary_text text-lg font-medium">
                No Tour Packages are available <br /> For selected country.{" "}
              </span>
            </div>
          )}
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
