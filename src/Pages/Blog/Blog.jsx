
import BlogSections from '../../Components/Blog/BlogSections';
import HeroScetion from '../../Shared/HeroComponent/HeroScetion';
import heroImage from "../../assets/Images/about.jpg"
import natureImage from "../../assets/natureImage.jpg";
import natureImage2 from "../../assets/natureImage2.jpg";
import natureImage3 from "../../assets/benifit.jpg";
const Blog = () => {
    const heroContent = {
        heroImage,
        titleOne: "Feel at Home Wherever You Roam",
        descriptionOne: "Discover the warmth of home in every destination, blending comfort, connection, and local charm",
    }
    const blogs =[
        {
            type:'Travel Tips',
            image : heroImage,
            title:"Expert Travel Tips: Making Every Journey Easier",
            date:"May 12,2023",
            info:"LA TUA FUGA LOWCOST",
            tag:"Adventure Awaits"
        },
       
        {
            type:'Paradise Beaches',
            image : natureImage,
            title:"Expert Travel Tips: Making Every Journey Easier",
            date:"May 12,2023",
            info:"LA TUA FUGA LOWCOST",
            tag:"Adventure Awaits"
        },
        {
            type:'Travel Vibes',
            image : natureImage2,
            title:"Expert Travel Tips: Making Every Journey Easier",
            date:"May 12,2023",
            info:"LA TUA FUGA LOWCOST",
            tag:"Adventure Awaits"
        },
    
        {
            type:'Helpful Travel Information',
            image : natureImage3,
            title:"Expert Travel Tips: Making Every Journey Easier",
            date:"May 12,2023",
            info:"LA TUA FUGA LOWCOST",
            tag:"Adventure Awaits"
        },
        {
            type:'Helpful Travel Information',
            image : natureImage3,
            title:"Expert Travel Tips: Making Every Journey Easier",
            date:"May 12,2023",
            info:"LA TUA FUGA LOWCOST",
            tag:"Adventure Awaits"
        },
        {
            type:'Unforgettable Experiences You Can’t Miss',
            image : natureImage3,
            title:"Expert Travel Tips: Making Every Journey Easier",
            date:"May 12,2023",
            info:"LA TUA FUGA LOWCOST",
            tag:"Adventure Awaits"
        },
        {
            type:'Paradise Beaches',
            image : natureImage3,
            title:"Expert Travel Tips: Making Every Journey Easier",
            date:"May 12,2023",
            info:"LA TUA FUGA LOWCOST",
            tag:"Adventure Awaits"
        },
        {
            type:'Paradise Beaches',
            image : heroImage,
            title:"Expert Travel Tips: Making Every Journey Easier",
            date:"May 12,2023",
            info:"LA TUA FUGA LOWCOST",
            tag:"Adventure Awaits"
        },
       
    ]
    return (
        <div>
            <HeroScetion heroContent={heroContent} />
            <BlogSections title="Travel Tips" blogs={blogs}/>
            <BlogSections title="Travel Vibes" blogs={blogs}/>
            <BlogSections title="Helpful Travel Information" blogs={blogs}/>
            <BlogSections title="Unforgettable Experiences You Can’t Miss" blogs={blogs}/>
            <BlogSections title="Paradise Beaches" blogs={blogs}/>
        </div>
    );
};

export default Blog;