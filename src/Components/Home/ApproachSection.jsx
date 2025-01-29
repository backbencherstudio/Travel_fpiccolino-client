import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/base_path";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";

const ApproachSection = ({ aboutWithoutContent }) => {
  const [approachData, setApproachData] = useState([]);

  useEffect(() => {
    const fetchApproachData = async () => {
      try {
        const response = await axios.get(`${base_url}/api/approach`);
        if (response.data && response.data.logos) {
          setApproachData(response.data.logos);
        }
      } catch (error) {
        console.error("Error fetching approach data:", error);
      }
    };

    fetchApproachData();
  }, []);

  return (
    <div>
      <ParentComponent>
        <div className="mt-[80px] mb-[100px] lg:mb-0">
          <HeadLine
            title={aboutWithoutContent?.title}
            description={aboutWithoutContent?.description}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[60px] mt-14">
            {approachData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center">
                  <img
                    src={`${base_url}/${item.logo}`}
                    alt={item.name}
                    className="h-[100px] w-[100px] object-contain"
                  />
                </div>
                <h1 className="primary_text font-bold text-[32px]">
                  {item.name}
                </h1>
                <p className="text-[#72777F] text-[14px] max-w-[375px] mx-auto">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ParentComponent>
    </div>
  );
};

export default ApproachSection;
