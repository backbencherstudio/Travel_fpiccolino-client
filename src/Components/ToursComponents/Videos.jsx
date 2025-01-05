import { useEffect } from "react";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import { useDispatch, useSelector } from "react-redux";
import { getShorts } from "../../features/pckage/packageSlice";

const Videos = () => {
  const dispatch = useDispatch();
  const { shorts } = useSelector((state) => state.package);

  useEffect(() => {
    dispatch(getShorts());
  }, [dispatch]);

  // Function to extract video ID and create embed URL
  const getEmbedUrl = (shortUrl) => {
    const videoIdMatch = shortUrl.match(/\/shorts\/([a-zA-Z0-9_-]+)\?/);
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : shortUrl;
  };

  return (
    <div>
      <HeadLine
        title="Club Vibes Unleashed"
        description="Feel the Energy, Rhythm, and Magic of Our Unforgettable Nights"
      />

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10 mt-14">
        {shorts?.map((item) => {
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
    </div>
  );
};

export default Videos;
