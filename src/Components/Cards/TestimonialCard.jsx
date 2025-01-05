/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { base_url } from "../../utils/base_path";

const TestimonialCard = ({ item }) => {
  const { name, image, date, rating, title, comment } = item;
  return (
    <div
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className="bg-[#FFFFFF] p-6 rounded-xl h-[280px] overflow-auto relative"
    >
      <div className="flex items-center">
        {image && (
          <img
            className="size-14 object-cover rounded-full mr-3"
            src={`${base_url}/uploads/${image}`}
            alt=""
          />
        )}
        <span>
          <h2 className="text-[#161824] font-semibold text-[18px]">{name}</h2>
          <p className="text-[#454650]">{date}</p>
        </span>
      </div>
      <Rating
        className="mt-2"
        readonly
        placeholderRating={rating}
        emptySymbol={<CiStar className="text-2xl text-yellow-500 " />}
        placeholderSymbol={<FaStar className="text-2xl text-yellow-500 " />}
        fullSymbol={<FaStar className="text-2xl text-yellow-500" />}
      />
      <div>
        <h2 className="text-[18px] font-semibold mt-5 mb-3 text-[#161824] ">
          {title}
        </h2>
        <p className="text-[#454650]">{comment}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
