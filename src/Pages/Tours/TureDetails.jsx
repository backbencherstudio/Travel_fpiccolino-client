/* eslint-disable react/no-unescaped-entities */
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import blogDetailsImage from "../../assets/Images/blogDetails.jpg"
import iconn1 from "../../assets/icone/icone1.png"
import iconn2 from "../../assets/icone/icone2.png"
import iconn3 from "../../assets/icone/icone3.png"
import iconn4 from "../../assets/icone/icone4.png"

const TureDetails = () => {

    const heroContent = {
        blogDetailsTitle: "7 notti / 8 Giorni",
        heroImage: blogDetailsImage,
        titleOne: "Who We Are and What Drives Us",
        descriptionOne: "Passionate Travelers Creating Memorable Experiences Just for You",
    }

    const tags = [
        { icon: iconn4, tag: "Gen Z approved" },
        { icon: iconn3, tag: "Ride the wave" },
        { icon: iconn2, tag: "Relaxed vibes" },
        { icon: iconn1, tag: "Forever summer" },
    ]


    return (
        <div className="text-black" >

            <HeroScetion heroContent={heroContent} />

            <div className="bg-[#EFFBFB]" >

                <ParentComponent>
                    <div className="grid grid-cols-12 py-20 gap-10 " >
                        <div className="col-span-8" >

                            <h2 className="text-[40px] font-bold text-[#0C0C1D] uppercase " >FOR THOSE WHO ALWAYS LOOK TO THE HORIZON</h2>
                            <div className="flex gap-4 mt-4" >

                                {
                                    tags?.map(item => <div key={item?._id} >

                                        <div className="flex bg-[#E867311A] px-4 py-2 items-center gap-2 rounded-full " >
                                            <img className="size-5" src={item?.icon} alt="" />
                                            <h2 className="text-[#E86731]" > {item?.tag} </h2>
                                        </div>

                                    </div>)
                                }


                            </div>

                            <div>

                                <div className="mt-16 mb-20 text-[#72777F]" >

                                    <p className="mb-4" >Okay, not to brag: we also take some trips every now and then. And we can say that in Fuerteventura, we breathed in a magical atmosphere.
                                        Maybe it's the waves of the Atlantic Ocean crashing on the beach, the wind blowing steadily through our hair, or the silhouette of Calderon Hondo rising on the horizon.</p>

                                    <p className="mb-4" >Whatever your travel mood is, Club Fuerteventura will allow you to experience all of this (and much more) alongside other young travelers and discover the
                                    true essence of the destination. We won’t force you to walk kilometers under the sun or wake up at dawn: you can manage your trip in total freedom according to your own pace and with the experiences you choose to have (alone or with other Utravelers).</p>
                                    
                                    <p className="mb-4" >You will also find a local coach ready to advise you on the most local spots and share all the secrets of the destination! They will serve as a link between you and your travel companions.</p>
                                </div>


                            </div>


                        </div>

                        <div className="col-span-4 bg-red-200 " >
                            <h2>Starting from</h2>
                        </div>

                    </div>

                </ParentComponent>

            </div>


        </div>
    );
};

export default TureDetails;