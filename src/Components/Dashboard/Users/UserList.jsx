import { useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import { userData } from "../../../ALLJsonFile/const";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";

const UserList = () => {
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const [columns] = useState({
    username: true,
    phone: true,
    email: true,
    country: true,
  });


  return (
    <div>
      <CustomHeadingDashboard/>
      <CustomTable
        tableType={"user"}
        title={"User List"}
        columns={columns}
        data={userData}
        setDateFilter={setTourDateFilter}
        dateFilter={tourDateFilter}
      />
    </div>
  );
};

export default UserList;
