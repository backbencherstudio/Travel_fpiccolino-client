/* eslint-disable react/prop-types */

import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import BlogCard from "./BlogCard";

const BlogSections = ({ title, blogs }) => {
  return (
    <div className="my-20">
      <ParentComponent>
      <h1 className="text-[32px]  mb-12 font-extrabold">{title}</h1>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
     {blogs.map((blog, index) => (
        <div key={index}>
          <BlogCard item={blog} />
        </div>
      ))}
     </div>
      </ParentComponent>
    </div>
  );
};

export default BlogSections;
