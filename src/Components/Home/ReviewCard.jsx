/* eslint-disable react/prop-types */
import comma from "../../assets/icons/review.svg";
import star from "../../assets/icons/star.svg";
import halfStar from "../../assets/icons/half-star.svg"; // Add half-star image for condition

const ReviewCard = ({ item }) => {
  const { image, title, review, name, rating ,totalReviews } = item;

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
          <img className="h-full rounded-[20px]" src={image} alt="" />
        </div>
        <div className="md:col-span-3 relative mr-10 ">
         <div className=" md:absolute bottom-0">
         <div className="flex justify-end items-center ">
            <div className="flex items-center">
              <h1 className="text-[64px] font-medium ml-2 leading-[60px]">{rating}</h1>
              {renderStars(rating)}
            </div>
            
          </div>
          <p className="text-[18px] text-right mb-10">Trustcore {rating} {" | "}{totalReviews}{" Reviews"}</p>
          <div className="p-[60px] bg-white rounded-2xl">
            <img src={comma} alt="" />
            <p className="text-[18px] w-full">{review}</p>
            <div className="mt-5 mb-8">
              <h1 className="text-[24px] font-bold">{name}</h1>
              <p className="text-[#72777F] text-[18px]">{title}</p>
            </div>
          </div>
         </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
