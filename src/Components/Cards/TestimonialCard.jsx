/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import Rating from "react-rating";

const TestimonialCard = ({ item }) => {
    const { name, image, date, reating, title, description } = item
    return (
        <div className="bg-[#FFFFFF] p-6 rounded-xl" >
            <div className="flex items-center" >
                <img className="size-14 object-cover rounded-full mr-3 " src={image} alt="" />
                <span>
                    <h2 className="text-[#161824] font-semibold text-[18px]" >{name}</h2>
                    <p className="text-[#454650]">{date}</p>
                </span>
            </div>
            <Rating
                className="mt-2"
                readonly
                placeholderRating={reating}
                emptySymbol={<CiStar className="text-2xl text-yellow-500 " />}
                placeholderSymbol={<FaStar className="text-2xl text-yellow-500 " />}
                fullSymbol={<FaStar className="text-2xl text-yellow-500" />}
            />
            <div>
                <h2 className="text-[18px] font-semibold mt-5 mb-3 text-[#161824] " >{title}</h2>
                <p className="text-[#454650]" >{description}</p>
            </div>
        </div>
    );

};

export default TestimonialCard;