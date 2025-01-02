/* eslint-disable react/prop-types */

const TureCard = ({ item }) => {
  const {
    // images: image,
    tourName: title,
    tourDuration,
    amount: price,
    category: isInclusive,
  } = item;

  console.log(item);
  
 

  return (
    <div>
      <div className="relative group">
        <img
          className="h-[360px] object-cover rounded-xl "
          src={item.images[0]}
          alt=""
        />
        <div className="w-full h-full absolute top-0 left-0  rounded-xl group-hover:bg-[#E867311A] duration-300 "></div>

        {isInclusive && (
          <h2 className="absolute top-4 right-4 border border-[#E86731] text-[#E86731] bg-[#FDF0EA] px-4 py-2 rounded-full ">
            {" "}
            {isInclusive[0]}{" "}
          </h2>
        )}

        <div className="p-2">
          <h2 className="font-semibold text-[18px] text-[#141D2A]">{title}</h2>
          <p className="text-[#72777F] text-sm font-semibold ">{`Duration : Nights ${tourDuration?.nights} - Days ${tourDuration?.days} `}</p>
          <p className="text-[#E86731] text-[18px] font-semibold ">{price}</p>
        </div>
      </div>
    </div>
  );
};

export default TureCard;
