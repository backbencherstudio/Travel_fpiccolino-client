import { useEffect, useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";

import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "../../../features/blog/blogSlice";

const BlogList = () => {
  const dispatch = useDispatch();
  const [columns] = useState({
    blogName: true,
    category: true,
    date: true,
    action: true,
  });
  const { blogs } = useSelector((state) => state.blog);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        dispatch(getBlog({ searchQuery: "", startDate: "", endDate: "" }));
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
  }, [dispatch]); // Trigger fetch when startDate or endDate changes

  return (
    <div>
      <CustomHeadingDashboard />
      <CustomTable
        tableType={"blog"}
        title={"Blog List"}
        columns={columns}
        data={blogs}
      />
    </div>
  );
};

export default BlogList;
