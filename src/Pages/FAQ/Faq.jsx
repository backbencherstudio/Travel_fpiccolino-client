import HeroScetion from "../../Shared/HeroComponent/HeroScetion";

import heroImage from "../../assets/eve.jpg"

const Faq = () => {
    const heroContent = {
        heroImage,
        titleOne: "Feel at Home Wherever You Roam",
        descriptionOne:
            "Discover the warmth of home in every destination, blending comfort, connection, and local charm",
    };

    return (
        <div>

            <HeroScetion heroContent={heroContent} />

        </div>
    );
};

export default Faq;