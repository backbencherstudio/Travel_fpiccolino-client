import CustomButton from "./CustomButton";
import HeadLine2 from "./HeadLineComponent/HeadLine2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getHomePageData } from "../features/pageData/pageDataSlice";
import { base_url } from "../utils/base_path";

const BottomBannerSection = () => {
  const dispatch = useDispatch();
  const { homePageData } = useSelector((state) => state.pageData);
  const [loading, setLoading] = useState(true);
  const footerData = homePageData?.footer?.[0] || {};
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getHomePageData());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleClick = () => {
    window.open(`https://wa.me/${footerData?.contactInfo?.phone}`, "_blank");
  };

  return (
    <div>
      {loading ? (
        <div className="h-[520px] flex justify-center items-center bg-gray-200">
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      ) : (
        <div
          className="relative h-[520px]"
          style={{
            height: "520px",
            backgroundImage: `url('${base_url + "/" + footerData?.bannerImg}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <img
            src={base_url + "/" + footerData?.bannerImg}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t to-[#000000c4] from-transparent"></div>
          <div className="w-full text-center absolute top-[40%]">
            <HeadLine2
              title={footerData.companyName || "Your Company Name"}
              description={
                footerData.description ||
                "A brief description about the company."
              }
            />
            <div onClick={handleClick} className="mt-14 inline-block">
              <CustomButton
                content={
                  <p className="flex gap-1">
                    Contact Now
                    <svg
                      className="mt-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="21"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                    >
                      <path
                        d="M15.1876 11.8115L17.3902 13.1249C17.8452 13.3965 18.0801 13.9249 17.9759 14.4449C17.5501 16.5774 15.4085 17.944 13.311 17.3682C8.36183 16.0099 4.49591 12.1557 3.13257 7.19571C2.55591 5.09738 3.92099 2.95403 6.05432 2.52736L6.06836 2.52487C6.5892 2.4207 7.12016 2.65653 7.39099 3.11403L8.69348 5.31321C9.15682 6.09487 8.92669 7.10319 8.16919 7.60653L6.78512 8.52737C7.76179 10.8665 9.6284 12.7407 11.9609 13.7157L12.8901 12.3282C13.3976 11.5724 14.406 11.3457 15.1876 11.8115ZM15.2918 8.3332C15.2918 6.60987 13.8893 5.2082 12.1668 5.2082C11.8218 5.2082 11.5418 5.4882 11.5418 5.8332C11.5418 6.1782 11.8218 6.4582 12.1668 6.4582C13.2001 6.4582 14.0418 7.29904 14.0418 8.3332C14.0418 8.6782 14.3218 8.9582 14.6668 8.9582C15.0118 8.9582 15.2918 8.6782 15.2918 8.3332ZM17.1668 8.9582C16.8218 8.9582 16.5418 8.6782 16.5418 8.3332C16.5418 5.9207 14.5793 3.9582 12.1668 3.9582C11.8218 3.9582 11.5418 3.6782 11.5418 3.3332C11.5418 2.9882 11.8218 2.7082 12.1668 2.7082C15.2685 2.7082 17.7918 5.23153 17.7918 8.3332C17.7918 8.6782 17.5118 8.9582 17.1668 8.9582Z"
                        fill="white"
                      />
                    </svg>
                  </p>
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomBannerSection;
