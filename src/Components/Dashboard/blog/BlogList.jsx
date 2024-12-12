import { useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import { blogs } from "../../../ALLJsonFile/const";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";

const BlogList = () => {
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const [columns] = useState({
    blogName: true,
    category: true,
    date: true,
    action: true,
  });

  return (
    <div>
     <CustomHeadingDashboard/>
      <CustomTable
       tableType={"blog"}
        title={"Blog List"}
        columns={columns}
        data={blogs}
        setDateFilter={setTourDateFilter}
        dateFilter={tourDateFilter}
      />
    </div>
  );
};

export default BlogList;
