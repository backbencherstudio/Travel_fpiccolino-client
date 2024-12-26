/* eslint-disable react/prop-types */
import moment from "moment";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../utils/base_path";

const BlogCard = ({ item }) => {
  const { heroSection, category, createdAt, contentList, id } = item;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/blog/${id}`)}
      className="bg-[#effbfb] rounded-2xl p-5 overflow-auto"
    >
      <div className="relative group">
        <img
          className="h-[240px] w-full object-cover rounded-t-2xl "
          src={`${base_url}/uploads/${heroSection?.headerImg}`}
          alt=""
        />
        <div className="p-5">
          <div className="p-2">
            <h2 className="  border-[#E86731] text-[#E86731] bg-[#fff] px-4 py-2 mb-5 rounded-full shadow-sm  inline-block">
              {" "}
              Adventure Awaits{" "}
            </h2>
            <h2 className="font-semibold text-[20px] text-[#141D2A]">
              {heroSection?.mainHeading}
            </h2>
            <div className="mt-10 flex justify-between">
              <div>
                <p className="text-[#141D2A] text-[16px] font-semibold max-w-[200px]">
                  {heroSection?.mainSubHeading.slice(0, 200)}...
                </p>
                <p className="font-normal text-[14px] text-[#72777F]  ">
                  {createdAt}
                </p>
              </div>
              <button className=" w-10 h-10 flex justify-center items-center primary_bg text-white rounded-full transition-opacity">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
