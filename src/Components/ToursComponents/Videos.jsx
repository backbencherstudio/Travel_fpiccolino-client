import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShorts } from "../../features/pckage/packageSlice";
import EditableHeading from "../Common/EditableHeading";
import { PiShieldWarningThin } from "react-icons/pi";

const Videos = ({ countryId }) => {
  const dispatch = useDispatch();
  const { shorts } = useSelector((state) => state.package);
  const [displayShorts, setDisplayShorts] = useState([]);

  useEffect(() => {
    dispatch(getShorts());
  }, [dispatch]);

  useEffect(() => {
    if (shorts?.length) {
      if (countryId) {
        // Filter shorts by countryId
        const filteredShorts = shorts.filter(
          (short) => short?.countryId?._id === countryId
        );
        setDisplayShorts(filteredShorts);
      } else {
        // Get 4 random shorts
        const randomShorts = [...shorts]
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);
        setDisplayShorts(randomShorts);
      }
    }
  }, [shorts, countryId]);

  // Function to extract video ID and create embed URL
  const getEmbedUrl = (shortUrl) => {
    const videoIdMatch = shortUrl.match(/\/shorts\/([a-zA-Z0-9_-]+)\?/);
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : shortUrl;
  };

  return (
    <div>
      <EditableHeading
        titleKey="shorts.title"
        subtitleKey="shorts.subtitle"
        defaultTitle="Unleashed Club Vibes"
        defaultSubtitle="Feel the energy, rhythm, and magic of our unforgettable nights"
      />

      {displayShorts?.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10 mt-14">
          {displayShorts?.map((item) => {
            return (
              <div
                key={item._id}
                className="relative pb-[177%] sm:pb-[56.25%] rounded-2xl overflow-hidden h-[680px]"
              >
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={getEmbedUrl(item.url)}
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title={`Short Video ${item._id}`}
                ></iframe>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-14">
          <div className="text-center py-20 my-20 rounded-lg text-lg border-dashed border border-orange-400 mx-5">
            <div className="primary_text justify-center flex text-6xl mb-3 font-bold">
              <PiShieldWarningThin />
            </div>
            <EditableHeading
              titleKey="shorts.no_shorts"
              subtitleKey="shorts.no_shorts2"
              defaultTitle="No Shorts are available"
              defaultSubtitle="For selected country"
              customTitleClass="primary_text text-lg font-medium "
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Videos;
