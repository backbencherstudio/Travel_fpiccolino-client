import HeroScetion from "../../Components/HeroComponent/HeroScetion";
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

        </div>
    );
};

export default Tours;