import { useEffect, useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import { blogs } from "../../../ALLJsonFile/const";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import axios from "axios";

const BlogList = () => {
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const [columns] = useState({
    blogName: true,
    category: true,
    date: true,
    action: true,
  });

  const [blogss, setBlogss] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1010/api/blogs/allblogs"
        );
        setBlogss(response.data.blogs);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching blogs.");
      }
    };

    fetchBlogs();
  }, []);
  console.log(blogss);

  return (
    <div>
      <CustomHeadingDashboard />
      <CustomTable
        tableType={"blog"}
        title={"Blog List"}
        columns={columns}
        data={blogss}
        setDateFilter={setTourDateFilter}
        dateFilter={tourDateFilter}
      />
    </div>
  );
};

export default BlogList;
