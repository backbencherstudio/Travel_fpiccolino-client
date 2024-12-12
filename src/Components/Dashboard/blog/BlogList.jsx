import { useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import { blogs } from "../../../ALLJsonFile/const";

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
      <h1 className="text-[32px] font-semibold">Welcome, Wade</h1>
      <p className="text-[#72777F]">
        Manage your travel agency data easily with us
      </p>
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
