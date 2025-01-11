/* eslint-disable react/prop-types */
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import WonderCard from "./WonderCard";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSectionData } from "../../features/sectionTitle/sectionTitleSlice";
const WondersSection = ({ countrySection }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSectionData());
  }, []);

  return (
    <div>
      <ParentComponent>
        <div className="mt-[100px] mb-[56px]">
          <HeadLine
            title={countrySection.title}
            description={countrySection.description}
          />
        </div>
        <div>
          {countrySection?.data?.length > 1 && (
            <div className="grid grid-col-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-3">
                <WonderCard item={countrySection?.data[0]} />
              </div>
              <div className="md:col-span-2">
                <WonderCard item={countrySection?.data[1]} />
              </div>
            </div>
          )}
          {countrySection?.data?.length > 5 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
              {countrySection?.data?.slice(2, 5).map((item, index) => (
                <div key={index}>
                  <WonderCard item={item} />
                </div>
              ))}
            </div>
          )}
          {countrySection?.data?.length > 6 && (
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="md:col-span-2">
                <WonderCard item={countrySection?.data[5]} />
              </div>
              <div className="md:col-span-3">
                <WonderCard item={countrySection?.data[6]} />
              </div>
            </div>
          )}
        </div>
      </ParentComponent>
    </div>
  );
};

export default WondersSection;
