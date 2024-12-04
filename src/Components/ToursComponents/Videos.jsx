import HeadLine from "../../Shared/HeadLineComponent/HeadLine";

const Videos = () => {
    
    const urls = [
        { _id: 1, url: "https://youtube.com/shorts/K5tb-Lnv-b0?si=K1iqyVMboGNiDpt_" },
        { _id: 2, url: "https://youtube.com/shorts/chvcvsz3Pl8?si=2J6k2mYod3FbjPA5" },
        { _id: 3, url: "https://youtube.com/shorts/Kognm5c4WOs?si=oRC4u1TbfNwnz5un" },
        { _id: 4, url: "https://youtube.com/shorts/SanpwL-P-cI?si=RJXQoDkCXe7RrN_a" },
    ];

    return (
        <div>
            <HeadLine
                title="Club Vibes Unleashed"
                description="Feel the Energy, Rhythm, and Magic of Our Unforgettable Nights"
            />

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-10 mt-14">
                {urls?.map((item) => {
                    const videoId = item.url.split('/shorts/')[1].split('?')[0];
                    return (
                        <div key={item._id} className="relative pb-[177%] sm:pb-[56.25%] rounded-2xl overflow-hidden h-[680px] ">
                            <iframe
                                className="absolute top-0 left-0 w-full h-full"
                                src={`https://www.youtube.com/embed/${videoId}?controls=0&modestbranding=1&rel=0&autoplay=1&fs=1`}
                                title={`YouTube video ${item._id}`}
                                frameBorder="0"
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Videos;
