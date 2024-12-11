import { blogs, categories } from "../../ALLJsonFile/const";
import BlogSections from "../../Components/Blog/BlogSections";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import heroImage from "../../assets/Images/about.jpg";

const Blog = () => {
  const heroContent = {
    heroImage,
    titleOne: "Feel at Home Wherever You Roam",
    descriptionOne:
      "Discover the warmth of home in every destination, blending comfort, connection, and local charm",
  };
     

  return (
    <div>
      <HeroScetion heroContent={heroContent} />
      {categories.map((category) => {
        const filteredBlogs = blogs.filter(blog => blog.category === category);
        return (
          <BlogSections
            key={category}
            title={category}
            blogs={filteredBlogs}
          />
        );
      })}
    </div>
  );
};

export default Blog;
