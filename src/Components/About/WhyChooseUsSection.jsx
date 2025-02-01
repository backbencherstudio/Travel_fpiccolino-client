import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import experience from "../../assets/icons/experience.svg";
import support from "../../assets/icons/support.svg";
import connection from "../../assets/icons/connection.svg";
import natureImage2 from "../../assets/natureImage2.jpg";
import EditableHeading from "../Common/EditableHeading";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../utils/base_path";

const WhyChooseUsSection = ({ footer_3 }) => {
  const [whyUsData, setWhyUsData] = useState({
    bannerImage: "",
    logos: [],
  });

  useEffect(() => {
    const fetchWhyUsData = async () => {
      try {
        const response = await axios.get(`${base_url}/api/whyUs`);
        if (response.data) {
          setWhyUsData(response.data);
        }
      } catch (error) {
        console.error("Error fetching why us data:", error);
      }
    };

    fetchWhyUsData();
  }, []);

  return (
    <div>
      <div className="relative h-[520px] mt-5">
        <img
          src={
            whyUsData.bannerImage
              ? `${base_url}/${whyUsData.bannerImage}`
              : natureImage2
          }
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <ParentComponent>
        <div className="mt-10 lg:mb-0 lg:px-20 px-5">
          <EditableHeading
            titleKey="why_choose_us_title"
            subtitleKey="why_choose_us_subtitle"
            defaultTitle="Perché Sceglierci"
            defaultSubtitle="Quando viaggi con noi, non stai solo facendo un viaggio: stai entrando in un'esperienza creata con cura, passione e dedizione per i tuoi desideri unici"
          />
          <div className="grid lg:grid-cols-5 grid-cols-1 lg:gap-14 mt-14">
            <div className="col-span-2 h-[520px] max-w-[720px] ">
              <img
                src={
                  whyUsData.sideImage
                    ? `${base_url}/${whyUsData.sideImage}`
                    : natureImage2
                }
                className="h-full w-full rounded-2xl object-cover"
                alt=""
              />
            </div>
            <div className="col-span-3 grid grid-cols-1 gap-5">
              {whyUsData.logos?.map((logo, index) => (
                <div key={index} className="text-start mt-5 lg:mt-0">
                  <div className="flex justify-start">
                    <img
                      className="w-[80px] h-[80px]"
                      src={
                        logo.logo
                          ? `${base_url}/${logo.logo}`
                          : index === 0
                          ? experience
                          : index === 1
                          ? support
                          : connection
                      }
                      alt=""
                    />
                  </div>
                  <h1 className="font-semibold text-[24px]">
                    {logo.name || "Default Title"}
                  </h1>
                  <p className="text-[#72777F] text-[14px]">
                    {logo.description || "Default Description"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ParentComponent>

      <div className="mt-20 py-[60px] px-20 text-start bg-[#469697] grid lg:grid-cols-2">
        <div>
          <EditableHeading
            titleKey="why_choose_us_company_name"
            defaultTitle="Il Nostro Partner di Fiducia nel Viaggio"
            customTitleClass="font-extrabold text-[32px] text-white text-center lg:text-start max-w-[450px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <EditableHeading
            titleKey="why_choose_us_company1"
            defaultTitle="Maven"
            customTitleClass="font-extrabold text-[30px] md:text-[52px] italic text-center text-white"
          />
          <EditableHeading
            titleKey="why_choose_us_company2"
            defaultTitle="intuit"
            customTitleClass="font-semibold text-[30px] md:text-[52px] text-center text-white"
          />
          <EditableHeading
            titleKey="why_choose_us_company3"
            defaultTitle="memSQL"
            customTitleClass="text-[30px] md:text-[52px] text-center text-white"
          />
          <EditableHeading
            titleKey="why_choose_us_company4"
            defaultTitle="maze"
            customTitleClass="text-[30px] md:text-[52px] text-center text-white"
          />
          <EditableHeading
            titleKey="why_choose_us_company5"
            defaultTitle="venmo"
            customTitleClass="text-[30px] md:text-[52px] font-extrabold italic text-center text-white"
          />
          <EditableHeading
            titleKey="why_choose_us_company6"
            defaultTitle="tapcart"
            customTitleClass="text-[32px] font-[300] text-center text-white mt-5"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUsSection;
