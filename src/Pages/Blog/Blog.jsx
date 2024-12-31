import { useDispatch, useSelector } from "react-redux";
import { categories } from "../../ALLJsonFile/const";
import BlogSections from "../../Components/Blog/BlogSections";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import heroImage from "../../assets/Images/about.jpg";
import { getBlogsByCategory } from "../../features/blog/blogSlice";
import { useEffect } from "react";

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.categoryBlogs);
  console.log(blogs);

  useEffect(() => {
    dispatch(getBlogsByCategory());
  }, [dispatch]);
  const heroContent = {
    heroImage: "/uploads/heroImage-1735207035947-125034052.jpg",
    titleOne: "Feel at Home Wherever You Roam",
    descriptionOne:
      "Discover the warmth of home in every destination, blending comfort, connection, and local charm",
  };

  return (
    <div>
      <HeroScetion heroContent={heroContent} />
      {blogs?.map((blog, i) => {
        return (
          <BlogSections key={i} title={blog.category} blogs={blog.blogs} />
        );
      })}
    </div>
  );
};

export default Blog;
