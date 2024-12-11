import { Link } from "react-router-dom";
import { cardDetails } from "../../ALLJsonFile/const";
import TureCard from "../../Components/ToursComponents/TureCard";
import Videos from "../../Components/ToursComponents/Videos";
import BottomBannerSection from "../../Shared/BottomBannerSection";
import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import heroImage from "../../assets/Images/HeroSection/heroImage2.jpg"


const Tours = () => {
    const heroContent = {
        heroImage,
        titleOne: "A Taste of Italy",
        descriptionOne: "Experience the Richness of Italian Culture, One Bite at a Time",
        titleTwo: "Italy",
        descriptionTwo: "Does your mind switch to Do Not Disturb mode the moment your vacation starts? Is your perfect getaway all about sandy beaches, a cocktail in hand, and zero worries? If travel for you is the ultimate way to recharge, we’ve got the perfect destinations lined up just for you."
    }
    return (
        <div className="">
            <HeroScetion heroContent={heroContent} />
            <ParentComponent styles="my-20">
                <HeadLine title="Celebrate Easter Monday and Italy Around the Globe" description="Discover How to Turn These Spring Holidays into an International Adventure" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-20" >
                    {
                        cardDetails?.map(item => <div key={item._id} >
                            <Link to={`/tourDetails/${item.id}`} >
                                <TureCard item={item} />
                            </Link>
                        </div>)
                    }
                </div>
                <div className="mt-20" >
                    <Videos />
                </div>
            </ParentComponent>
            <div className="mt-20" >
                <BottomBannerSection />
            </div>
        </div>
    );
};

export default Tours;