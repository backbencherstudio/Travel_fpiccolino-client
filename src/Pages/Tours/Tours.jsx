import { Link, useParams } from "react-router-dom";
import TureCard from "../../Components/ToursComponents/TureCard";
import Videos from "../../Components/ToursComponents/Videos";
import BottomBannerSection from "../../Shared/BottomBannerSection";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
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

const Tours = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const texts = useSelector((state) => state.texts);
  const { user } = useSelector((state) => state.authorization);
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
                    <TureCard
                      item={item}
                      texts={texts}
                      handleEditClick={handleEditClick}
                    />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 my-20 rounded-lg text-lg border-dashed border border-orange-400 mx-5">
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

      {/* Edit Modal */}
      {editModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <h3 className="text-lg font-semibold mb-4">Edit Text</h3>
            <input
              type="text"
              value={editModal.value}
              onChange={(e) =>
                setEditModal((prev) => ({ ...prev, value: e.target.value }))
              }
              className="w-full p-2 border rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() =>
                  setEditModal({ show: false, key: "", value: "" })
                }
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleTextUpdate}
                className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours;
