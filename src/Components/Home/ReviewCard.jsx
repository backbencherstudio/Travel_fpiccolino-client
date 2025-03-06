/* eslint-disable react/prop-types */
import comma from "../../assets/icons/review.svg";
import star from "../../assets/icons/star.svg";
import halfStar from "../../assets/icons/half-star.svg"; // Add half-star image for condition
import { base_url } from "../../utils/base_path";
import { FaUser } from "react-icons/fa";
import EditableHeading from "../Common/EditableHeading";

const ReviewCard = ({ item }) => {
  const {
    image,
    title,
    comment,
    name,
    rating,
    totalReviews,
    pakageImg,
    country,
    _id,
  } = item;

  // Helper function to render stars dynamically
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Get the full stars
    const hasHalfStar = rating % 1 !== 0; // Check if there's a half star

    let stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={`full-${i}`} src={star} alt="star" />);
    }

    // Add a half star if needed
    if (hasHalfStar) {
      stars.push(<img key="half" src={halfStar} alt="half-star" />);
    }

    return stars;
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-[74px] mt-14">
        <div className="md:col-span-2 h-[600px]">
          <img
            className="h-full object-cover rounded-[20px]"
            src={`${base_url}${pakageImg}`}
            alt=""
          />
        </div>
        <div className="md:col-span-3 relative md:mr-10 ">
          <div className=" md:absolute bottom-0">
            <div className="flex justify-end items-center ">
              <div className="flex items-center">
                <h1 className="text-[64px] font-medium ml-2 leading-[60px]">
                  {rating}
                </h1>
                {renderStars(rating)}
              </div>
            </div>
            <p className="text-[18px] text-right mb-10 flex justify-end items-center ">
              <EditableHeading
                titleKey="trustcore"
                defaultTitle="Trustcore"
                customTitleClass=""
              />
              {rating} {" | "}
              {totalReviews}
              <EditableHeading
                titleKey="reviews"
                defaultTitle="Recensioni"
                customTitleClass="ml-2 "
              />{" "}
            </p>
            <div className="xl:p-[60px] p-5 bg-white rounded-2xl overflow-auto max-h-[500px]">
              <img src={comma} alt="" />
              <p className="text-[18px] w-full mt-5 ">{comment}</p>
              <div className="mt-5 mb-8">
                <h1 className="flex items-center gap-2">
                  <FaUser className="primary_text text-[24px]" />{" "}
                  <EditableHeading
                    titleKey={`reviewer-${_id}`}
                    defaultTitle={name}
                    customTitleClass="primary_text text-[24px]  font-semibold "
                  />
                </h1>
                <p className="">
                  <EditableHeading
                    titleKey={`country-${_id}`}
                    defaultTitle={country}
                    customTitleClass="text-[#72777F] text-[18px]"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
