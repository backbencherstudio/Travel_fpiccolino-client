import BlogSections from "../../Components/Blog/BlogSections";
import calender from "../../assets/icons/calender.svg";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import { useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBlogDetails,
  getCategoryCount,
} from "../../features/blog/blogSlice";
import { base_url } from "../../utils/base_path";
import moment from "moment";
import EditableHeading from "../../Components/Common/EditableHeading";
const BlogDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { blogDetails, categoryCount, categoryBlogs } = useSelector(
    (state) => state.blog
  );
  const { texts } = useSelector((state) => state.texts);

  useEffect(() => {
    dispatch(getBlogDetails(params.id));
    dispatch(getCategoryCount());
  }, []);
  const heroContent = {
    image: `${base_url}/uploads/${blogDetails?.heroSection[0].headerImg}`,
    titleOne: blogDetails?.heroSection[0]?.mainHeading,
    descriptionOne: blogDetails?.heroSection[0]?.mainSubHeading,
  };
  const relatedBlogs = categoryBlogs?.find(
    (categoryObj) => categoryObj.category === blogDetails?.category
  )?.blogs;
  return (
    <div>
      <HeroScetion heroContent={heroContent} />

      <ParentComponent>
        <div className="grid lg:grid-cols-5  mt-20 gap-12">
          <div className="lg:col-span-4 max-w-[1300px]">
            <h1 className="text-[40px] font-bold">
              {blogDetails?.heroSection[0]?.mainHeading}
            </h1>
            <p className="text-[18px] mt-4 text-[#5C5C68]">
              {blogDetails?.heroSection[0]?.mainSubHeading}
            </p>
            <div className="mt-8">
              {blogDetails?.contentList?.map((content, index) => (
                <div key={index}>
                  <div
                    className={`my-6  ${
                      index % 2 === 0
                        ? "flex flex-col md:flex-row"
                        : "flex flex-col md:flex-row-reverse "
                    } gap-10`}
                  >
                    <div className="max-w-[450px] lg:max-w-[612px]">
                      {" "}
                      <h2 className="text-[32px] font-medium">
                        {content?.headings}
                      </h2>
                      <p className="text-[18px] mt-4 text-[#5C5C68]">
                        {content?.paragraphs}
                      </p>
                    </div>
                    <div className="h-[260px] lg:w-[660px]">
                      <img
                        className="rounded-2xl h-full w-full object-cover"
                        src={`${base_url}/uploads/${content?.image}`}
                        alt=""
                      />
                    </div>
                  </div>
                  {index === 0 && blogDetails?.learn?.length > 0 && (
                    <div>
                      <h1 className="text-[32px] font-medium my-6">
                        {texts["blog.learnBasicLocalPhrases"] ||
                          "Impara le frasi locali di base"}
                      </h1>
                      {blogDetails?.learn.map((th, i) => (
                        <p key={i} className="text-[18px] mt-4">
                          {th}
                        </p>
                      ))}{" "}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {blogDetails?.thought.length > 0 && (
              <div>
                <h1 className="text-[32px] font-medium mt-12">
                  {texts["blog.finalThoughts"] || "Considerazioni finali"}
                </h1>
                {blogDetails?.thought.map((th, i) => (
                  <p key={i} className="text-[18px] mt-4">
                    {th}
                  </p>
                ))}{" "}
              </div>
            )}
            <div className="flex mt-12 justify-between">
              <p className="text-[20px] text-[#72777F]">
                {texts["blog.category"] || "Categoria:"}
                <div className="bg-[#FDF0EA] text-[#E86731] border border-[#E86731] rounded-lg inline-block py-3 text-[16px] px-6 ml-3">
                  {blogDetails?.category}
                </div>
              </p>
              <p className="text-18 flex items-center">
                <img className="h-6 w-6 mr-2" src={calender} alt="" />{" "}
                {moment(blogDetails?.createdAt).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="mt-8 bg-[#fdf0ea] p-4 border border-[#e86731] rounded-lg overflow-auto">
              <EditableHeading
                titleKey="blog.categories"
                defaultTitle={texts["blog.categories"] || "Categorie"}
                customTitleClass="text-[20px] font-medium text-[#141D2A] border-b border-[#e86731] pb-2"
              />
              <div className="mt-4">
                {/* Loop through the array of category objects */}
                {categoryCount?.Categories &&
                  categoryCount.Categories.map((categoryObj, index) => (
                    <div
                      key={index}
                      className="text-[18px] text-[#5C5C68] mt-2 flex justify-between"
                    >
                      {/* Extract category name (key) and count (value) */}
                      {Object.entries(categoryObj).map(([category, count]) => (
                        <div
                          key={category}
                          className="flex justify-between w-full"
                        >
                          <div>{category}</div> {/* Category name */}
                          <div>{count}</div> {/* Category count */}
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
            <EditableHeading
              titleKey="blog.popularArticles"
              defaultTitle={
                texts["blog.popularArticles"] || "Articoli popolari"
              }
              customTitleClass="text-[24px] font-bold my-8"
            />
            {/* {blogs.slice(0, 3).map((blog, index) => (
              <div
                key={index}
                className="flex justify-between gap-5 border-b border-[#DFE4EA] py-4"
              >
                <img
                  className="w-[80px] h-[80px] rounded-full"
                  src={blog?.headerImg}
                  alt=""
                />
                <div>
                  <h5 className="text-[20px] font-semibold text-[#141D2A]">
                    {blog?.header}
                  </h5>
                  <p className="text-[16px] text-[#72777F]">{blog.tag}</p>
                </div>
              </div>
            ))} */}
          </div>
        </div>
        <BlogSections
          relatedTitle={texts["blog.relatedArticles"] || "Articoli correlati"}
          title={blogDetails?.category}
          blogs={relatedBlogs?.slice(1, 4)}
        />
      </ParentComponent>
    </div>
  );
};

export default BlogDetails;
