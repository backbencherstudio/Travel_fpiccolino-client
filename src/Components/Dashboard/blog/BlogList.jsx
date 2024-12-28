import { useEffect, useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import { blogs } from "../../../ALLJsonFile/const";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import axios from "axios";
import { base_url } from "../../../utils/base_path";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "../../../features/blog/blogSlice";

const BlogList = () => {
  const dispatch = useDispatch();
  const [tourDateFilter, setTourDateFilter] = useState("all");
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
        dispatch(getBlog());
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <CustomHeadingDashboard />
      <CustomTable
        tableType={"blog"}
        title={"Blog List"}
        columns={columns}
        data={blogs?.blogs}
        setDateFilter={setTourDateFilter}
        dateFilter={tourDateFilter}
      />
    </div>
  );
};

export default BlogList;
