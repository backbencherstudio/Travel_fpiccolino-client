import BlogSections from "../../Components/Blog/BlogSections";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import heroImage from "../../assets/Images/about.jpg";
import natureImage from "../../assets/natureImage.jpg";
import natureImage2 from "../../assets/natureImage2.jpg";
import natureImage3 from "../../assets/benifit.jpg";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
const BlogDetails = () => {
  const blogs = [
    {
      id: 1,
      category: "Travel Tips",
      headerImg: heroImage,
      header: "Expert Travel Tips: Making Every Journey Easier",
      text: "Traveling is one of life’s greatest joys, but the logistics can sometimes be overwhelming. From packing to navigating new places, small inconveniences can add up. That’s why we’ve compiled this guide of essential travel hacks to ensure your journey is smooth, stress-free, and full of unforgettable memories.",
      contents: [
        {
          subHeader: "Pack Smart, Pack Light",
          img: natureImage,
          subText:
            "Traveling is one of life’s greatest joys, but the logistics can sometimes be overwhelming. From packing to navigating new places, small inconveniences can add up. That’s why we’ve compiled this guide of essential travel hacks to ensure your journey is smooth, stress-free, and full of unforgettable memories.",
        },
        {
          subHeader: "Pack Smart, Pack Light",
          img: natureImage,
          subText:
            "Traveling is one of life’s greatest joys, but the logistics can sometimes be overwhelming. From packing to navigating new places, small inconveniences can add up. That’s why we’ve compiled this guide of essential travel hacks to ensure your journey is smooth, stress-free, and full of unforgettable memories.",
        },
      ],
      date: "May 12, 2023",
      info: "LA TUA FUGA LOWCOST",
      tag: "Adventure Awaits",
    },
    {
      id: 2,
      category: "Paradise Beaches",
      headerImg: natureImage,
      header: "Expert Travel Tips: Making Every Journey Easier",
      text: "Explore breathtaking paradise beaches and immerse yourself in serene beauty. These tips will help you make the most of your beach vacation.",
      contents: [
        {
          subHeader: "Discover Hidden Gems",
          img: natureImage,
          subText:
            "From secret coves to vibrant marine life, uncover the hidden treasures waiting for you at paradise beaches around the world.",
        },
      ],
      date: "May 12, 2023",
      info: "LA TUA FUGA LOWCOST",
      tag: "Adventure Awaits",
    },
    {
      id: 3,
      category: "Travel Vibes",
      headerImg: natureImage2,
      header: "Expert Travel Tips: Making Every Journey Easier",
      text: "Dive into the ultimate travel vibes with these essential tips. Transform every trip into a memorable experience filled with adventure.",
      contents: [
        {
          subHeader: "Embrace Local Culture",
          img: natureImage2,
          subText:
            "Experience authentic travel vibes by immersing yourself in the local culture, cuisine, and traditions of your destination.",
        },
      ],
      date: "May 12, 2023",
      info: "LA TUA FUGA LOWCOST",
      tag: "Adventure Awaits",
    },
    {
      id: 4,
      category: "Helpful Travel Information",
      headerImg: natureImage3,
      header: "Expert Travel Tips: Making Every Journey Easier",
      text: "Get equipped with helpful travel information to make your journey smooth and stress-free. From planning to execution, we've got you covered.",
      contents: [
        {
          subHeader: "Plan Ahead",
          img: natureImage3,
          subText:
            "Detailed planning is key to avoiding unexpected hiccups. Learn how to create a foolproof travel plan with our tips.",
        },
      ],
      date: "May 12, 2023",
      info: "LA TUA FUGA LOWCOST",
      tag: "Adventure Awaits",
    },
    {
      id: 5,
      category: "Unforgettable Experiences You Can’t Miss",
      headerImg: natureImage3,
      header: "Expert Travel Tips: Making Every Journey Easier",
      text: "Discover unforgettable experiences that will leave a lasting impact. From breathtaking views to thrilling adventures, these tips will guide you.",
      contents: [
        {
          subHeader: "Adventure Awaits",
          img: natureImage3,
          subText:
            "Embark on experiences that you will cherish forever. Find inspiration for your next unforgettable adventure.",
        },
      ],
      date: "May 12, 2023",
      info: "LA TUA FUGA LOWCOST",
      tag: "Adventure Awaits",
    },
  ];
  const heroContent = {
    heroImage: blogs[0].headerImg,
    titleOne: "Feel at Home Wherever You Roam",
    descriptionOne:
      "Discover the warmth of home in every destination, blending comfort, connection, and local charm",
  };

  return (
    <div>
      <HeroScetion heroContent={heroContent} />
      <ParentComponent>
        <div className="grid md:grid-cols-5">
          <div className="col-span-4 max-w-[1300px]">
            <h1 className="text-[40px] font-bold mt-20">{blogs[0].header}</h1>
            <p className="text-[18px] mt-4 text-[#5C5C68]">{blogs[0].text}</p>
            <div className="mt-8">
              {blogs[0]?.contents?.map((content, index) => (
                <div key={index} className={`my-6  ${index % 2 === 0 ? 'flex flex-col md:flex-row' : 'flex flex-col md:flex-row-reverse '} gap-10`}>
                  <div className="max-w-[450px] lg:max-w-[612px]">
                    {" "}
                    <h2 className="text-[32px] font-medium">
                      {content?.subHeader}
                    </h2>
                    <p className="text-[18px] mt-4 text-[#5C5C68]">
                      {content?.subText}
                    </p>
                  </div>
                  <div className="h-[260px] lg:w-[660px]">
                    <img
                      className="rounded-2xl h-full w-full object-cover"
                      src={content?.img}
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ParentComponent>
    </div>
  );
};

export default BlogDetails;
