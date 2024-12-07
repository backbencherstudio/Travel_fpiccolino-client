import BlogSections from "../../Components/Blog/BlogSections";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import heroImage from "../../assets/Images/about.jpg";
import natureImage from "../../assets/natureImage.jpg";
import natureImage2 from "../../assets/natureImage2.jpg";
import natureImage3 from "../../assets/benifit.jpg";
import image1 from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import image3 from "../../assets/image3.jpg";
import image4 from "../../assets/image4.jpg";
import image5 from "../../assets/image5.jpg";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const BlogDetails = () => {
  const params = useParams();
  const blogs = [
    {
      id: 0,
      category: "Travel Tips",
      headerImg: natureImage3, // Random image from provided imports
      header: "Maximize Your Travel Experience with These Essential Tips",
      text: "Traveling doesn't have to be complicated. With the right planning and tips, you can make the most of your journey. Learn how to pack smarter, navigate easily, and enjoy your travels without the stress.",
      contents: [
        {
          subHeader: "The Perfect Packing List",
          img: image1, // Random image from provided imports
          subText:
            "Packing can make or break your trip. Here's a guide to packing light and ensuring you have everything you need for a smooth journey.",
        },
        {
          subHeader: "Stay Safe While Traveling",
          img: image2, // Random image from provided imports
          subText:
            "Safety should always be a priority when traveling. Learn tips for staying safe, from securing your belongings to choosing the safest travel routes.",
        },
      ],
      date: "March 15, 2023",
      info: "Travel Made Simple",
      tag: "Travel Smart",
    },
    {
      id: 1,
      category: "Unforgettable Experiences You Can’t Miss",
      headerImg: heroImage, // Random image from provided imports
      header: "5 Experiences You Can't Miss in Bali",
      text: "Bali is a paradise for travelers. With its beautiful beaches, rich culture, and lush landscapes, Bali offers some unforgettable experiences that you simply cannot miss.",
      contents: [
        {
          subHeader: "Sunset at Tanah Lot Temple",
          img: natureImage, // Random image from provided imports
          subText:
            "Witness one of the most breathtaking sunsets at the Tanah Lot Temple, a must-see landmark in Bali.",
        },
        {
          subHeader: "Bali's Sacred Monkey Forest",
          img: natureImage2, // Random image from provided imports
          subText:
            "Get up close with Bali's playful monkeys in the Sacred Monkey Forest Sanctuary, an unforgettable experience for nature lovers.",
        },
        {
          subHeader: "Explore the Rice Terraces",
          img: image3, // Random image from provided imports
          subText:
            "Discover the stunning landscapes of Bali’s rice terraces in Ubud. Perfect for nature walks and photography.",
        },
      ],
      date: "April 10, 2023",
      info: "Discover Bali",
      tag: "Adventure Awaits",
    },
    {
      id: 2,
      category: "Paradise Beaches",
      headerImg: image4, // Random image from provided imports
      header: "Discover the Most Beautiful Beaches Around the World",
      text: "From powder-soft sand to crystal-clear waters, paradise beaches await you. Here's a list of the world's most beautiful beaches you need to visit.",
      contents: [
        {
          subHeader: "Grace Bay, Turks and Caicos",
          img: image5, // Random image from provided imports
          subText:
            "Grace Bay in Turks and Caicos boasts incredible turquoise waters and perfect sand. The beach is a tranquil paradise that offers both relaxation and adventure.",
        },
        {
          subHeader: "Seven Mile Beach, Grand Cayman",
          img: natureImage3, // Random image from provided imports
          subText:
            "One of the most iconic beaches in the Caribbean, Seven Mile Beach in Grand Cayman is a stunning, serene escape for beach lovers.",
        },
      ],
      date: "May 12, 2023",
      info: "Beach Paradise",
      tag: "Tropical Vibes",
    },
    {
      id: 3,
      category: "Travel Vibes",
      headerImg: image2, // Random image from provided imports
      header: "Dive into the Ultimate Travel Vibes with These Tips",
      text: "Whether you're looking for relaxation or adventure, travel vibes are essential for any great vacation. Here's how to make the most of your journey.",
      contents: [
        {
          subHeader: "Embrace the Local Culture",
          img: natureImage2, // Random image from provided imports
          subText:
            "Experience the heart of your destination by embracing the local culture, from cuisine to customs. It will transform your trip into a true adventure.",
        },
        {
          subHeader: "Capture the Moment",
          img: image1, // Random image from provided imports
          subText:
            "No matter where you are, take the time to capture moments that will stay with you forever. From candid street shots to epic landscapes.",
        },
      ],
      date: "June 1, 2023",
      info: "Chase the Vibes",
      tag: "Travel Essentials",
    },
    {
      id: 4,
      category: "Helpful Travel Information",
      headerImg: heroImage, // Random image from provided imports
      header: "How to Plan the Perfect Trip with These Travel Tips",
      text: "Planning a trip can be overwhelming, but with these travel tips, you can ensure a smooth and stress-free journey from start to finish.",
      contents: [
        {
          subHeader: "Choose Your Destination Wisely",
          img: image4, // Random image from provided imports
          subText:
            "Choosing the right destination can set the tone for your entire trip. Consider factors like climate, season, and budget before deciding.",
        },
        {
          subHeader: "Book in Advance",
          img: natureImage, // Random image from provided imports
          subText:
            "Booking your flights, accommodations, and activities well in advance can save you time and money.",
        },
      ],
      date: "July 15, 2023",
      info: "Travel Simplified",
      tag: "Plan Like a Pro",
    },
    {
      id: 5,
      category: "Travel Tips",
      headerImg: image3, // Random image from provided imports
      header: "Avoid Common Travel Mistakes with These Tips",
      text: "Traveling can be stressful, but avoiding common mistakes can make your journey a lot smoother. Here's how to avoid those common travel blunders.",
      contents: [
        {
          subHeader: "Don't Overpack",
          img: image2, // Random image from provided imports
          subText:
            "One of the biggest mistakes travelers make is overpacking. Learn how to pack light and efficiently with these travel hacks.",
        },
        {
          subHeader: "Know Your Transportation Options",
          img: natureImage3, // Random image from provided imports
          subText:
            "From taxis to trains, knowing your transportation options will make your trip easier and more cost-effective.",
        },
      ],
      date: "August 5, 2023",
      info: "Smart Travel",
      tag: "Travel Smarter",
    },
    {
      id: 6,
      category: "Unforgettable Experiences You Can’t Miss",
      headerImg: natureImage, // Random image from provided imports
      header: "Bucket List Experiences You Have to Try",
      text: "Looking for some unforgettable adventures? Check out these incredible bucket-list experiences that should be on your radar!",
      contents: [
        {
          subHeader: "Go on a Safari in Africa",
          img: image5, // Random image from provided imports
          subText:
            "Embark on the adventure of a lifetime and experience Africa’s wild side with a safari in Kenya or Tanzania.",
        },
        {
          subHeader: "See the Northern Lights",
          img: image1, // Random image from provided imports
          subText:
            "Head to Iceland or Norway to witness the awe-inspiring Northern Lights in all their glory.",
        },
      ],
      date: "September 10, 2023",
      info: "Bucket List",
      tag: "Once in a Lifetime",
    },
    {
      id: 7,
      category: "Adventure Travel",
      headerImg: natureImage2, // Random image from provided imports
      header: "Top 5 Adventures You Should Experience at Least Once",
      text: "Adventure travel is all about pushing boundaries, exploring new territories, and experiencing the world in ways that challenge you. These adventures are not just fun, they’re life-changing.",
      contents: [
        {
          subHeader: "Trekking the Inca Trail",
          img: image3, // Random image from provided imports
          subText:
            "Embark on a journey through the Andes, hiking the Inca Trail to the ancient city of Machu Picchu. A true adventure for the brave at heart!",
        },
        {
          subHeader: "Skydiving Over Interlaken",
          img: image2, // Random image from provided imports
          subText:
            "For adrenaline junkies, skydiving over Interlaken in Switzerland offers a thrilling experience, with views of the Swiss Alps like no other.",
        },
      ],
      date: "September 25, 2023",
      info: "Adventure Travel",
      tag: "Adrenaline Rush",
    },
    {
      id: 8,
      category: "Food Travel",
      headerImg: heroImage, // Random image from provided imports
      header: "Around the World in 5 Delicious Meals",
      text: "Traveling and food go hand in hand. Discover some of the most iconic meals from around the globe, each offering a taste of the local culture.",
      contents: [
        {
          subHeader: "Sushi in Japan",
          img: image1, // Random image from provided imports
          subText:
            "Dive into Japan’s food culture with sushi, from traditional nigiri to creative modern rolls.",
        },
        {
          subHeader: "Tacos in Mexico",
          img: natureImage3, // Random image from provided imports
          subText:
            "No trip to Mexico is complete without tasting the delicious street tacos, made fresh with vibrant ingredients.",
        },
      ],
      date: "October 5, 2023",
      info: "World Food Journey",
      tag: "Culinary Delights",
    },
    {
      id: 9,
      category: "Solo Travel",
      headerImg: image5, // Random image from provided imports
      header: "How to Travel Solo and Love Every Minute of It",
      text: "Solo travel is empowering and liberating. Whether you’re a seasoned traveler or just beginning, here are tips to make your solo adventure unforgettable.",
      contents: [
        {
          subHeader: "Stay Safe and Secure",
          img: natureImage, // Random image from provided imports
          subText:
            "Safety is the number one priority for solo travelers. Learn how to stay secure while enjoying your independence.",
        },
        {
          subHeader: "Embrace Freedom",
          img: natureImage2, // Random image from provided imports
          subText:
            "Traveling solo gives you complete freedom. Discover how to make the most of it, from spontaneous decisions to meeting new people.",
        },
      ],
      date: "November 20, 2023",
      info: "Solo Traveler's Guide",
      tag: "Travel Alone",
    },
    {
      id: 10,
      category: "Sustainable Travel",
      headerImg: natureImage3, // Random image from provided imports
      header: "Sustainable Travel: How to Protect the Planet While Exploring",
      text: "Sustainability is key to preserving the world’s natural beauty. Here’s how you can travel responsibly and minimize your environmental footprint.",
      contents: [
        {
          subHeader: "Eco-Friendly Accommodations",
          img: image2, // Random image from provided imports
          subText:
            "Stay at eco-friendly hotels and lodges that prioritize sustainability, offering low-impact options for travelers.",
        },
        {
          subHeader: "Pack Light to Reduce Waste",
          img: image3, // Random image from provided imports
          subText:
            "Packing light not only helps with ease of travel, but it also reduces waste. Use sustainable packing materials and avoid disposable plastics.",
        },
      ],
      date: "October 30, 2023",
      info: "Green Travel",
      tag: "Eco-Friendly Adventures",
    },
    {
      id: 11,
      category: "Luxury Travel",
      headerImg: image4, // Random image from provided imports
      header: "The Best Luxury Resorts Around the World",
      text: "If you’re looking for the ultimate getaway, look no further than these luxurious resorts. Indulge in world-class amenities, fine dining, and stunning locations.",
      contents: [
        {
          subHeader: "Overwater Villas in the Maldives",
          img: image1, // Random image from provided imports
          subText:
            "Stay in luxurious overwater villas in the Maldives, where clear blue waters surround you, and every luxury is at your fingertips.",
        },
        {
          subHeader: "Private Safaris in Africa",
          img: natureImage2, // Random image from provided imports
          subText:
            "Experience the African wilderness like never before with a private safari in Kenya, complete with five-star service and extraordinary wildlife sightings.",
        },
      ],
      date: "December 15, 2023",
      info: "Exclusive Getaways",
      tag: "Luxury Escapes",
    },
    {
      id: 12,
      category: "Family Travel",
      headerImg: image5, // Random image from provided imports
      header: "How to Plan a Perfect Family Vacation",
      text: "Family vacations can be tricky, but with the right planning, you can create unforgettable memories. Here’s a guide to help you plan your next family getaway.",
      contents: [
        {
          subHeader: "Choose Family-Friendly Destinations",
          img: natureImage, // Random image from provided imports
          subText:
            "Choose destinations that offer fun activities for all ages, from theme parks to nature reserves, ensuring everyone has something to enjoy.",
        },
        {
          subHeader: "Pack Smart for the Whole Family",
          img: natureImage3, // Random image from provided imports
          subText:
            "Packing smart for the family ensures that everyone has what they need without overloading your bags. Here’s how to pack efficiently for your next adventure.",
        },
      ],
      date: "January 10, 2024",
      info: "Family Adventures",
      tag: "Traveling with Kids",
    },
    {
      id: 13,
      category: "Cultural Exploration",
      headerImg: image2, // Random image from provided imports
      header: "Top 5 Cultural Destinations You Should Explore",
      text: "Cultural exploration allows you to immerse yourself in the traditions, customs, and history of a place. These destinations offer rich cultural experiences you won’t want to miss.",
      contents: [
        {
          subHeader: "Explore the Temples of Kyoto",
          img: image3, // Random image from provided imports
          subText:
            "Discover the beauty and tranquility of Kyoto’s ancient temples, where you can learn about Japan’s rich cultural heritage.",
        },
        {
          subHeader: "The Great Wall of China",
          img: natureImage2, // Random image from provided imports
          subText:
            "No trip to China is complete without visiting the Great Wall. Walk along this ancient structure and experience China’s fascinating history.",
        },
      ],
      date: "February 5, 2024",
      info: "Cultural Journeys",
      tag: "Discover History",
    },
  ];

  const heroContent = {
    heroImage: blogs[params.id].headerImg,
    titleOne: "Feel at Home Wherever You Roam",
    descriptionOne:
      "Discover the warmth of home in every destination, blending comfort, connection, and local charm",
  };
  const getCategoryCount = () => {
    const categoryCount = {};
    blogs.forEach((blog) => {
      categoryCount[blog.category] = (categoryCount[blog.category] || 0) + 1;
    });
    return categoryCount;
  };

  // Get category count
  const categoryCount = getCategoryCount();
  return (
    <div>
      <HeroScetion heroContent={heroContent} />
      <ParentComponent>
        <div className="grid md:grid-cols-5  mt-20 gap-12">
          <div className="md:col-span-4 max-w-[1300px]">
            <h1 className="text-[40px] font-bold">
              {blogs[params.id].header}
            </h1>
            <p className="text-[18px] mt-4 text-[#5C5C68]">
              {blogs[params.id].text}
            </p>
            <div className="mt-8">
              {blogs[params.id]?.contents?.map((content, index) => (
                <div
                  key={index}
                  className={`my-6  ${
                    index % 2 === 0
                      ? "flex flex-col md:flex-row"
                      : "flex flex-col md:flex-row-reverse "
                  } gap-10`}
                >
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
          <div className="md:col-span-1">
          <div className="relative mt-4">
                <input
                  className="bg-[#fbfbfb] p-3 pr-20 w-full text-[18px] border border-[#f2b8a0] rounded-lg"
                  type="text"
                  placeholder="Search.."
                />
                <button className=" primary_text absolute right-1 top-4 px-[10px] py-1 rounded-lg">
              <FaSearch/>
                </button>
              
              </div>
              <div className="mt-8 bg-[#fdf0ea] p-4 border border-[#e86731] rounded-lg">
                <h4 className="text-[20px] font-medium text-[#141D2A] border-b border-[#e86731] pb-2">Categories</h4>
                <div className="mt-4">
                {Object.keys(categoryCount).map((category, index) => (
                  <div
                    key={index}
                    className="text-[18px] text-[#5C5C68] mt-2 flex justify-between"
                  >
                   <div> {category}</div> <div>
                   {categoryCount[category]}</div>
                  </div>
                ))}
              </div>
              </div>
          </div>
        </div>
        <BlogSections
          relatedTitle={"Related Articles"}
          title={blogs[params.id].category}
          blogs={blogs}
        />
      </ParentComponent>
    </div>
  );
};

export default BlogDetails;
