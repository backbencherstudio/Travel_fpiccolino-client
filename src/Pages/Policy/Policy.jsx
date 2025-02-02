/* eslint-disable react/no-unescaped-entities */
import { useDispatch, useSelector } from "react-redux";
import blogDetailsImage from "../../assets/Images/blogDetails.jpg";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import { useEffect, useState } from "react";
import { getHeader } from "../../features/header/headerSlice";
import { getPolicyPageData } from "../../features/pageData/pageDataSlice";
import axios from "axios";
import { base_url } from "../../utils/base_path";

const Policy = () => {
  const dispatch = useDispatch();
  const { headers } = useSelector((state) => state.header);
  const { policyPageLoading, policyPageError, policyPageData } = useSelector(
    (state) => state.pageData
  );
  const [policyData, setPolicyData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(getHeader());
    dispatch(getPolicyPageData());

    // Fetch Policy data
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`${base_url}/api/policy`);
        const policiesByCategory = {};
        response.data.data.forEach((policy) => {
          policiesByCategory[policy.category] = policy.content;
        });
        setPolicyData(policiesByCategory);
        // Set initial selected category
        if (Object.keys(policiesByCategory).length > 0) {
          setSelectedCategory(Object.keys(policiesByCategory)[0]);
        }
      } catch (error) {
        console.error("Failed to fetch policies");
      }
    };
    fetchPolicies();
  }, []);

  const data = headers?.filter((item) => item.pageName === "policy");

  console.log(headers);

  // {
  //   heroImage: data[0]?.heroImage,
  //   titleOne: data[0]?.titleOne,
  //   descriptionOne: data[0]?.descriptionOne,
  // };

  console.log("policyPageData", policyPageData);

  // const heroContent = {
  //     heroImage: blogDetailsImage,
  //     titleOne: "Privacy policy",
  //     descriptionOne: "Your Data, Our Commitment to Transparency and Security",
  // }

  if (!policyPageData) {
    return;
  }

  const heroContent = policyPageData?.hero;
  console.log(policyPageData?.hero);

  return (
    <div>
      <HeroScetion heroContent={heroContent} />
      <div className="bg-[#FFFFFF] py-20">
        <ParentComponent>
          <div className="grid grid-cols-12 lg:gap-5 xl:gap-20 grid-cols-reverse">
            <div className="col-span-12 lg:col-span-9 lg:order-1 lg:pl-16 border-[#62D3D4] lg:border-l">
              {Object.keys(policyData).length === 0 ? (
                <div className="text-center py-10">
                  <h2 className="text-2xl font-semibold text-gray-600">
                    No policy information available yet.
                  </h2>
                  <p className="text-gray-500 mt-2">
                    Please check back later for updates.
                  </p>
                </div>
              ) : (
                selectedCategory && (
                  <div
                    className="policy-content prose prose-lg max-w-none ql-editor"
                    dangerouslySetInnerHTML={{
                      __html: policyData[selectedCategory],
                    }}
                  />
                )
              )}
            </div>
            {/* ======================================  Side bar ========================== */}
            <div className="col-span-12 lg:col-span-3 mt-5 lg:mt-0">
              <div className="rounded-lg">
                {Object.keys(policyData).length > 0 ? (
                  Object.keys(policyData).map((category, index) => (
                    <h2
                      key={index}
                      onClick={() => setSelectedCategory(category)}
                      className={`font-bold text-[22px] cursor-pointer hover:bg-[#FDF0EA] duration-300 hover:text-[#E86731] py-[16px] px-6 rounded-md mb-2 ${
                        selectedCategory === category
                          ? "bg-[#FDF0EA] text-[#E86731]"
                          : ""
                      }`}
                    >
                      {category}
                    </h2>
                  ))
                ) : (
                  <div className="text-gray-500 p-4">
                    No policy categories available
                  </div>
                )}
              </div>
            </div>
          </div>
        </ParentComponent>
      </div>
    </div>
  );
};

export default Policy;
