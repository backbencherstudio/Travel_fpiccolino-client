/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { base_url } from "../../utils/base_path";
import moment from "moment";
import EditableHeading from "../Common/EditableHeading";

const TestimonialCard = ({ item }) => {
  const { createdAt, rating, title, comment, _id } = item.review;
  const { name, userImg } = item.user;
  return (
    <div
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      className=" p-6 h-[270px] overflow-auto relative shadow-lg rounded-3xl border bg-white"
    >
      <div className="flex items-center">
        {userImg && (
          <img
            className="size-14 object-cover rounded-full mr-3"
            src={`${base_url}${userImg}`}
            alt=""
          />
        )}
        <span>
          <EditableHeading
            titleKey={`reviewer-${_id}`}
            defaultTitle={name}
            customTitleClass="primary_text text-[24px]  font-semibold "
          />
          <p className="text-[#454650]">
            {moment(createdAt).format("MMM DD, YYYY")}
          </p>
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
