/* eslint-disable react/no-unescaped-entities */
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import blogDetailsImage from "../../assets/Images/blogDetails.jpg"
import iconn1 from "../../assets/icone/icone1.png"
import iconn2 from "../../assets/icone/icone2.png"
import iconn3 from "../../assets/icone/icone3.png"
import iconn4 from "../../assets/icone/icone4.png"
import yes from "../../assets/icone/yes.png"

import image1 from "../../assets/Image1.jpg"
import image2 from "../../assets/Image2.jpg"
import image3 from "../../assets/Image3.jpg"
import image4 from "../../assets/Image4.jpg"
import { useState } from "react";

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

    const includeds = [
        { icon: iconn4, include: "7 nights in accommodation" },
        { icon: iconn3, include: "Included experience: beginner surf class" },
        { icon: iconn1, include: "Coach in Italian" },
        { icon: iconn3, include: "Utravel assistance" },
        { icon: iconn4, include: "Dedicated app" },
        { icon: iconn1, include: "Basic insurance: coverage for medical expenses up to €5,000 and up to €1,000 for luggage, plus a maximum of €310 for essential purchases" },
    ]

    const notIncludeds = [
        { include: "Round trip flight (you can add it during booking)" },
        { include: "All meals" },
        { include: "Coworking area" },
        { include: "Car rental" },
        { include: "Tourist tax" },
        { include: "Everything not mentioned in What's included " },
    ]
    const images = [
        { image: image1 },
        { image: image2 },
        { image: image3 },
        { image: image4 },
    ]

    const [imagePath, setImagePath] = useState(image3)


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

                                <div className="text-[#1C1C1C]" >

                                    <div className="collapse collapse-arrow bg-[#FFFFFF] mb-10">
                                        <input type="radio" name="my-accordion-2" defaultChecked />
                                        <div className="collapse-title text-xl font-medium flex items-center">
                                            <img className="mr-2" src={yes} alt="" />
                                            <h2 className="text-[20px] font-semibold " >
                                                What's included
                                            </h2>
                                        </div>
                                        <div className="collapse-content">

                                            <div className="grid grid-cols-2" >
                                                <div>
                                                    {
                                                        includeds.map(item =>
                                                            <div key={item?.id} className="flex items-center mb-5" >
                                                                <img className="mr-2" src={item?.icon} alt="" />
                                                                <h2>{item.include}</h2>
                                                            </div>
                                                        )
                                                    }
                                                </div>

                                                <div>
                                                    <h2 className="font-semibold text-[18px] mb-5 " >The travel fee does not include</h2>
                                                    {
                                                        notIncludeds.map(item =>
                                                            <div key={item?.id} className="flex items-center mb-4" >
                                                                <span className="mr-2 text-red-500" >X</span>
                                                                <h2>{item.include}</h2>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="collapse collapse-arrow bg-[#FFFFFF]">
                                        <input type="radio" name="my-accordion-2" />

                                        <div className="collapse-title text-xl font-medium flex items-center">
                                            <img className="mr-2" src={yes} alt="" />
                                            <h2 className="text-[20px] font-semibold " >
                                                What's included
                                            </h2>
                                        </div>

                                        <div className="collapse-content">

                                            <div className="grid grid-cols-2" >
                                                <div>
                                                    {
                                                        includeds.map(item =>
                                                            <div key={item?.id} className="flex items-center mb-5" >
                                                                <img className="mr-2" src={item?.icon} alt="" />
                                                                <h2>{item.include}</h2>
                                                            </div>
                                                        )
                                                    }
                                                </div>

                                                <div>
                                                    <h2 className="font-semibold text-[18px] mb-5 " >The travel fee does not include</h2>
                                                    {
                                                        notIncludeds.map(item =>
                                                            <div key={item?.id} className="flex items-center mb-4" >
                                                                <span className="mr-2 text-red-500" >X</span>
                                                                <h2>{item.include}</h2>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-span-4 bg-red-200 " >
                            <h2>Starting from</h2>
                        </div>

                    </div>
                </ParentComponent>

                <div className="bg-[#FFFFFF]" >
                    <ParentComponent>
                        <div className="grid grid-cols-12 py-20 gap-14" >
                            <div className=" col-span-7 flex flex-col justify-between" >
                                <div>
                                    <h2 className="uppercase font-bold text-[32px] " >WHERE WILL YOU STAY</h2>
                                    <h2 className="text-[20px] font-semibold " >MAAR House - or similar</h2>

                                    <p className="mt-5 text-[#72777F]">MAAR House is the villa with a pool that you've always dreamed of: good vibes, new travel companions, a barbecue, and two common areas to fully enjoy the island vibes!</p>

                                    <p className="mt-5 text-[#72777F]">MAAR House is the villa with a pool that you've always dreamed of: good vibes, new travel companions, a barbecue, and two common areas to fully enjoy the island vibes!</p>

                                    <p className="mt-5 text-[#72777F]">MAAR House is the villa with a pool that you've always dreamed of: good vibes, new travel companions, a barbecue, and two common areas to fully enjoy the island vibes!</p>

                                </div>
                                <div className="flex gap-4 flex-end " >
                                    {
                                        images?.map(item => <img key={item?._id} src={item.image} onClick={()=>{setImagePath(item.image)}}

                                            className={`size-36 rounded-lg object-cover cursor-pointer  duration-300 ${item?.image === imagePath ? "border-2 border-red-500" : "border-2 border-transparent" } `} alt="" />)
                                    }
                                </div>
                            </div>

                            <div className="col-span-5 h-[720px] w-full  " >
                                <img className="h-full w-full rounded-xl object-cover " src={imagePath} alt="" />
                            </div>
                        </div>

                    </ParentComponent>

                </div>

            </div>


        </div>
    );
};

export default TureDetails;