/* eslint-disable react/prop-types */

import CustomButton from "../../Shared/CustomButton";

const ArticleCard = ({ item }) => {
  const { image, title, description, tag } = item;

  return (
    <div>
      <div className="relative">
        <img
          className="h-[320px] w-full object-cover rounded-xl "
          src={image}
          alt=""
        />
        {/* <div className="w-full h-full absolute top-0 left-0  rounded-xl group-hover:bg-[#E867311A] duration-300 "></div> */}
        <div className="top-8 left-8 absolute ">
          <h2 className="inline text-[#E86731] bg-[#fff] px-4 py-2 rounded-full ">
            {" "}
            {tag}{" "}
          </h2>
          <h2 className="font-semibold text-[20px] text-white mt-5">{title}</h2>
          <p className="text-[#FFF] text-[16px] font-normal ">
            {description}
          </p>
          
        </div>
        {/* <button className="primary_bg text-white text-[18px] font-medium px-6 py-3 rounded-lg shadow-lg  hover:scale-105 transition-all ease-linear">Read More</button> */}
        <div className="absolute bottom-8 right-8">
        <CustomButton content={"Read More"}/>
        </div>
       
      </div>
    </div>
  );
};

export default ArticleCard;
