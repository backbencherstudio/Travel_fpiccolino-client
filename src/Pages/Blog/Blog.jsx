import { useDispatch, useSelector } from "react-redux";
import { categories } from "../../ALLJsonFile/const";
import BlogSections from "../../Components/Blog/BlogSections";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import heroImage from "../../assets/Images/about.jpg";
import { getBlogsByCategory } from "../../features/blog/blogSlice";
import { useEffect } from "react";
import { getBlogData } from "../../features/pageData/pageDataSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blog.categoryBlogs);
  // console.log(blogs);
  const { getBlogDataLoaging, getBlogDataError, blogData } = useSelector(
    (state) => state.pageData
  );

  useEffect(() => {
    dispatch(getBlogsByCategory());
    dispatch(getBlogData());
    // dispatch()
  }, [dispatch]);
  const heroContent = blogData?.hero
  // blogData
  console.log(blogData)
  if(!heroContent){
    return
  }
  return (
    <div>
      <HeroScetion heroContent={heroContent} />
      {blogData?.categoryLists?.map((blog, i) => {
        return (
          <BlogSections key={i} title={blog.category} blogs={blog.blogs} />
        );
      })}
    </div>
  );
};

export default Blog;
