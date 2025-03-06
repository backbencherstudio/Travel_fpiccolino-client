/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import CustomTable from "../../../Shared/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { getReview } from "../../../features/review/reviewSlice";

const ReviewList = () => {
  const { review } = useSelector((state) => state.review);
  const dispatch = useDispatch();
  const [columns] = useState({
    packageImg: true,
    comment: true,
    rating: true,
    action: true,
  });
  useEffect(() => {
    dispatch(getReview());
  }, []);

  return (
    <div>
      <CustomHeadingDashboard />
      <CustomTable
        tableType="review"
        title={"Review List"}
        data={review?.reviews}
        columns={columns}
      />
    </div>
  );
};

export default ReviewList;
