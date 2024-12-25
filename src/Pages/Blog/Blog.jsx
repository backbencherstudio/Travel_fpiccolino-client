import { useDispatch, useSelector } from "react-redux";
import { categories } from "../../ALLJsonFile/const";
import BlogSections from "../../Components/Blog/BlogSections";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import heroImage from "../../assets/Images/about.jpg";
import { getBlog } from "../../features/blog/blogSlice";
import { useEffect } from "react";

const Blog = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog.blogs);
  useEffect(() => {
    dispatch(getBlog());
  }, [dispatch]);
  const heroContent = {
    heroImage,
    titleOne: "Feel at Home Wherever You Roam",
    descriptionOne:
      "Discover the warmth of home in every destination, blending comfort, connection, and local charm",
  };

  return (
    <div>
      <HeroScetion heroContent={heroContent} />
      {categories?.map((category) => {
        return <BlogSections key={category} title={category} blogs={blogs} />;
      })}
    </div>
  );
};

export default Blog;
