/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import CustomButton from "../../Shared/CustomButton";

const ArticleCard = ({ item }) => {
  const navigate = useNavigate();
  const { headerImg, header, text, mainHeading } = item?.heroSection[0];

  return (
    <div>
      <div className="relative">
        <img
          className="h-[320px] w-full object-cover rounded-xl "
          src={`http://localhost:3000/uploads/${headerImg}`}
          alt=""
        />
        {/* <div className="w-full h-full absolute top-0 left-0  rounded-xl group-hover:bg-[#E867311A] duration-300 "></div> */}
        <div className="top-8 left-8 absolute ">
          <h2 className="inline text-[#E86731] bg-[#fff] px-4 py-2 rounded-full ">
            {text}
          </h2>
          <h2 className="font-semibold text-[20px] text-white mt-5">
            {header}
          </h2>
          <p className="text-[#FFF] text-[16px] font-normal ">{mainHeading}</p>
        </div>
        {/* <button className="primary_bg text-white text-[18px] font-medium px-6 py-3 rounded-lg shadow-lg  hover:scale-105 transition-all ease-linear">Read More</button> */}
        <div
          onClick={() => navigate(`/blog/${item._id}`)}
          className="absolute bottom-8 right-8"
        >
          <CustomButton content={"vedere di più"} />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
