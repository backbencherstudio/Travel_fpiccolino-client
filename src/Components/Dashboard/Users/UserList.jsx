import { useEffect, useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../features/users/userSlice";

const UserList = () => {
  const dispatch = useDispatch();
  const [columns] = useState({
    username: true,
    phone: true,
    email: true,
    country: true,
  });
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        dispatch(getUser());
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
  }, []);
  console.log(users);

  return (
    <div>
      <CustomHeadingDashboard />
      <CustomTable
        tableType={"user"}
        title={"User List"}
        columns={columns}
        data={users}
      />
    </div>
  );
};

export default UserList;
