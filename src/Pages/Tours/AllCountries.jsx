import { Link, useParams } from "react-router-dom";
import TureCard from "../../Components/ToursComponents/TureCard";
import Videos from "../../Components/ToursComponents/Videos";
import BottomBannerSection from "../../Shared/BottomBannerSection";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPackage } from "../../features/pckage/packageSlice";
import { updateText } from "../../features/texts/textsSlice";
import {
  country_wise_TourPage,
  get_all_inclusive_TourPagePage,
} from "../../features/pageData/pageDataSlice";
import { PiShieldWarningThin } from "react-icons/pi";
import EditableHeading from "../../Components/Common/EditableHeading";
import CustomHeroSection from "../../Shared/CustomHeroSection";

const AllCountries = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { texts, banners } = useSelector((state) => state.texts);
  const { all_inclusive_TourPageData, country_wise_TourPageData } = useSelector(
    (state) => state.pageData
  );

  const [editModal, setEditModal] = useState({
    show: false,
    key: "",
    value: "",
    originalValue: "",
  });

  useEffect(() => {
    if (id) {
      dispatch(country_wise_TourPage(id));
    }
  }, [id]);

  useEffect(() => {
    dispatch(getPackage({ search: "", startDate: "", endDate: "" }));
    dispatch(get_all_inclusive_TourPagePage());
  }, []);

  const handleEditClick = (key, value) => {
    setEditModal({
      show: true,
      key,
      value: texts[key] || value,
      originalValue: texts[key] || value,
    });
  };

  const handleTextUpdate = async () => {
    try {
      await dispatch(
        updateText({
          key: editModal.key,
          value: editModal.value,
        })
      ).unwrap();

      setEditModal({
        show: false,
        key: "",
        value: "",
        originalValue: "",
      });
    } catch (error) {
      console.error("Error updating text:", error);
      alert("Failed to update text. Please try again.");
    }
  };

  // Add this function to group packages by country
  const groupPackagesByCountry = (packages) => {
    return packages?.reduce((acc, pkg) => {
      const country = pkg.country || "Other";
      if (!acc[country]) {
        acc[country] = [];
      }
      acc[country].push(pkg);
      return acc;
    }, {});
  };

  const heroContent = id
    ? country_wise_TourPageData?.hero
    : all_inclusive_TourPageData?.hero;
  const packags = id
    ? country_wise_TourPageData?.package
    : all_inclusive_TourPageData?.package;

  // Group the packages by country
  const groupedPackages = groupPackagesByCountry(packags?.data);

  return (
    <div className="">
      {banners?.countryBanner && (
        <CustomHeroSection pageName="Country" image={banners?.countryBanner} />
      )}

      <ParentComponent styles="my-20">
        <EditableHeading
          titleKey="allcountries"
          subtitleKey="allcountriesDescription"
          defaultTitle="All Countries"
          defaultSubtitle="Find our amazing tours in all countries"
        />

        <div>
          {packags?.data?.length > 0 ? (
            <div className="space-y-12 mt-20">
              {Object.entries(groupedPackages).map(([country, packages]) => (
                <div key={country} className="space-y-6  rounded-lg p-5">
                  <h2 className="text-[36px] font-bold primary_text">
                    {country}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                    {packages.map((item) => (
                      <div key={item._id}>
                        <Link to={`/tours/${item._id}`}>
                          <TureCard
                            item={item}
                            texts={texts}
                            handleEditClick={handleEditClick}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 my-20 rounded-lg text-lg border-dashed border border-orange-400 mx-5">
              <div className="primary_text justify-center flex text-6xl mb-3 font-bold">
                <PiShieldWarningThin />
              </div>
              <EditableHeading
                titleKey="tour.no_tour_packages"
                subtitleKey="tour.no_tour_packages2"
                defaultTitle="No Tour Packages are available"
                defaultSubtitle="For selected country"
                customTitleClass="primary_text text-lg font-medium "
              />
            </div>
          )}
        </div>
      </ParentComponent>
      <div className="mt-20">
        <BottomBannerSection />
      </div>
    </div>
  );
};

export default AllCountries;
