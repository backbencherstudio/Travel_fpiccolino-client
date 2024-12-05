/* eslint-disable react/prop-types */

import { FaArrowRight } from "react-icons/fa";

const BlogCard = ({ item }) => {
  const { headerImg, header, info, contents, date } = item;

  return (
    <div className="bg-[#effbfb] rounded-2xl">
      <div className="relative group">
        <img
          className="h-[240px] w-full object-cover rounded-t-2xl "
          src={headerImg}
          alt=""
        />
        <div className="p-5">
        

          <div className="p-2">
          <h2 className="  border-[#E86731] text-[#E86731] bg-[#fff] px-4 py-2 mb-5 rounded-full shadow-sm  inline-block">
            {" "}
            Adventure Awaits{" "}
          </h2>
            <h2 className="font-semibold text-[20px] text-[#141D2A]">
              {header}
            </h2>
            <div className="mt-10 flex justify-between">
              <div>
                <p className="text-[#141D2A] text-[16px] font-semibold">
                  {info}
                </p>
                <p className="font-normal text-[14px] text-[#72777F]  ">
                  {date}
                </p>
              </div>
              <button
          className=" w-10 h-10 flex justify-center items-center primary_bg text-white rounded-full transition-opacity"
        >
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
