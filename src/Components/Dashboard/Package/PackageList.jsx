import { useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import { blogs } from "../../../ALLJsonFile/const";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";

const PackageList = () => {
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const [columns] = useState({
    date: true,
    duration:true,
    destination:true,
    amount:true,
    action: true,
  });

  return (
    <div>
     <CustomHeadingDashboard/>
      <CustomTable
       tableType={"package"}
        title={"Package List"}
        columns={columns}
        data={blogs}
        setDateFilter={setTourDateFilter}
        dateFilter={tourDateFilter}
      />
    </div>
  );
};

export default PackageList;
