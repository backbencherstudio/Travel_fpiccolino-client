/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

const WonderCard = ({ item }) => {
  const navigate = useNavigate();
  const {
    _id,
    image,
    contentTitle: title,
    name: location,
    contentDescription: discription,
  } = item;
  // console.log(item);
  // contentDescription
  // :
  // "sdjfklsd fsd jflksdj flsdkjf lsdkfj sldfj s"
  // contentTitle
  // :
  // "London title "
  // createdAt
  // :
  // "2024-12-29T08:32:51.791Z"
  // image
  // :
  // "http://localhost:3000/uploads/image-1735461171716-449215543.jpg"
  // name
  // :
  // "London"

  return (
    <div onClick={() => navigate(`/tours/country/${_id}`)}>
      <div className="relative">
        <img
          className="h-[360px] w-full object-cover rounded-xl "
          src={image}
          alt=""
        />
        <div className="w-full h-full absolute top-0 left-0  rounded-xl group-hover:bg-[#E867311A] duration-300 "></div>
        <div className="p-8 absolute bottom-4">
          <h2 className="inline border border-[#E86731] text-[#E86731] bg-[#FDF0EA] px-4 py-2 rounded-full ">
            {" "}
            {location}{" "}
          </h2>
          <h2 className="font-semibold text-[25px] text-white mt-5">{title}</h2>
          <p className="font-normal text-white  ">{title}</p>
          <p className="text-[#E86731] text-[18px] font-semibold ">
            {discription.slice(0, 100)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WonderCard;
