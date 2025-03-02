import { useDispatch, useSelector } from "react-redux";
import BlogSections from "../../Components/Blog/BlogSections";
import { getBlogsByCategory } from "../../features/blog/blogSlice";
import { useEffect } from "react";
import { getBlogData } from "../../features/pageData/pageDataSlice";
import CustomHeroSection from "../../Shared/CustomHeroSection";

const Blog = () => {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.texts);
  const { blogData } = useSelector((state) => state.pageData);

  useEffect(() => {
    dispatch(getBlogsByCategory());
    dispatch(getBlogData());
    // dispatch()
  }, [dispatch]);
  const heroContent = blogData?.hero;
  // blogData
  console.log(blogData);
  if (!heroContent) {
    return;
  }
  return (
    <div>
      {banners?.blogBanner && (
        <CustomHeroSection pageName="blog" image={banners?.blogBanner} />
      )}
      {blogData?.categoryLists?.map((blog, i) => {
        return (
          <BlogSections key={i} title={blog.category} blogs={blog.blogs} />
        );
      })}
    </div>
  );
};

export default Blog;
