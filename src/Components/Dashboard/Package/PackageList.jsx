import { useEffect, useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getPackage } from "../../../features/pckage/packageSlice";

const PackageList = () => {
  const dispatch = useDispatch();
  const { packag } = useSelector((state) => state.package);
  console.log(packag);
  useEffect(() => {
    dispatch(getPackage());
  }, []);
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const [columns] = useState({
    date: true,
    duration: true,
    destination: true,
    amount: true,
    action: true,
  });

  return (
    <div>
      <CustomHeadingDashboard />
      <CustomTable
        tableType={"package"}
        title={"Package List"}
        columns={columns}
        data={packag}
        setDateFilter={setTourDateFilter}
        dateFilter={tourDateFilter}
      />
    </div>
  );
};

export default PackageList;
