import { useEffect, useState } from "react";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import CustomTable from "../../../Shared/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { getNewsletters } from "../../../features/newsLetter/newsLetterSlice";

const NewsLetter = () => {
  const { newsletters } = useSelector((state) => state.newsletter);
  const dispatch = useDispatch();
  const [columns] = useState({
    Name: true,
    email: true,
    action: true,
  });

  useEffect(() => {
    dispatch(getNewsletters());
  }, []);
  console.log(newsletters);

  return (
    <div>
      <CustomHeadingDashboard />
      <CustomTable
        tableType={"newsLetter"}
        title={"News Letters"}
        columns={columns}
        data={newsletters}
      />
    </div>
  );
};

export default NewsLetter;
