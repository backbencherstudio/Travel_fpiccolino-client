import { useEffect, useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getPackage } from "../../../features/pckage/packageSlice";

const PackageList = () => {
  const dispatch = useDispatch();
  const { packag } = useSelector((state) => state.package);
  useEffect(() => {
    dispatch(getPackage({ search: "", startDate: "", endDate: "" }));
  }, []);
  const [columns] = useState({
    date: true,
    duration: true,
    destination: true,
    amount: true,
    country: true,
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
      />
    </div>
  );
};

export default PackageList;
