/* eslint-disable react/prop-types */
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import CountdownTimer from "../Common/CountdownTimer";

const TureCard = ({ item, texts, handleEditClick }) => {
  const { user } = useSelector((state) => state.authorization);
  const {
    // images: image,
    tourName: title,
    tourDuration,
    amount: price,
    bookedFlights,
    tourDate,
  } = item;

  return (
    <div>
      <div className="relative group">
        <img
          className="h-[360px] object-cover rounded-xl "
          src={item.images[0]}
          alt=""
        />
        <div className="w-full h-full absolute top-0 left-0  rounded-xl group-hover:bg-[#E867311A] duration-300 "></div>

        {bookedFlights?.length > 0 && item?.hotelName && (
          <div className="absolute top-4 right-4">
            <div className="relative group">
              <h2 className="border border-[#E86731] text-[#E86731] bg-[#FDF0EA] px-4 py-2 rounded-full">
                {texts[`tour.all_inclusive_${item._id}`] || "All Inclusive"}
              </h2>
              {user?.role === "admin" && (
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 opacity-0 group-hover:opacity-100 hover:text-orange-400"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent link navigation
                    handleEditClick(
                      `tour.all_inclusive_${item._id}`,
                      texts[`tour.all_inclusive_${item._id}`] || "All Inclusive"
                    );
                  }}
                >
                  <FaEdit size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        <div className="p-2">
          <h2 className="font-semibold text-[18px] text-[#141D2A]">{title}</h2>
          <p className="text-[#72777F] text-sm font-semibold ">{`Durata : Notti ${tourDuration?.nights} - Giorni ${tourDuration?.days} `}</p>
          <p className="text-green-500 text-[28px] font-semibold ">
            €{price}{" "}
            <s className="text-red-500 text-[16px] font-semibold ">
              €{parseInt(price * 1.12)}
            </s>
          </p>
          {tourDate && <CountdownTimer tourDate={tourDate} texts={texts} />}
        </div>
      </div>
    </div>
  );
};

export default TureCard;
