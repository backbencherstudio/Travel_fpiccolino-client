import { useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import { userData } from "../../../ALLJsonFile/const";

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
      <h1 className="text-[32px] font-semibold">Welcome, Wade</h1>
      <p className="text-[#72777F]">
        Manage your travel agency data easily with us
      </p>
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
