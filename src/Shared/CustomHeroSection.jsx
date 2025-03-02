/* eslint-disable react/prop-types */

import EditableHeading from "../Components/Common/EditableHeading";
import { base_url } from "../utils/base_path";
import ParentComponent from "./ParentComponent/ParentComponent";
const CustomHeroSection = ({ pageName, image, country = false }) => {
  console.log(image);
  return (
    <div>
      <div className="h-[600px] w-full relative ">
        {image && !country && (
          <img
            className="w-full h-full object-cover "
            src={`${base_url}/${image}`}
            alt=""
          />
        )}
        {image && country && (
          <img
            className="w-full h-full object-cover "
            src={`${image}`}
            alt=""
          />
        )}

        <div className="absolute w-full h-full  inset-0 bg-gradient-to-t to-[#000000c4] from-transparent "></div>
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full">
          <ParentComponent>
            <div className="text-center p-4 rounded-md ">
              <p className="">
                <EditableHeading
                  titleKey={`${pageName}SubTitle`}
                  defaultTitle="Default Sub Title"
                  customTitleClass="text-18px font-semibold text-[#FFFFFF]"
                />
              </p>
              <h2 className="">
                <EditableHeading
                  titleKey={`${pageName}Title`}
                  defaultTitle="Default Title"
                  customTitleClass=" text-[30px] md:text-[40px] xl:text-[56px] font-bold leading-[56px] text-center decoration-skip-ink text-[#FFFFFF]"
                />
              </h2>
              <p className="">
                <EditableHeading
                  titleKey={`${pageName}Description`}
                  defaultTitle="Default Description"
                  customTitleClass=" leading-8 md:leading-[40px] mt-2 lg:mt-4 text-[18px] max-w-[1300px] mx-auto text-[#FFFFFF]"
                />
              </p>
            </div>
          </ParentComponent>
        </div>
      </div>
    </div>
  );
};

export default CustomHeroSection;
