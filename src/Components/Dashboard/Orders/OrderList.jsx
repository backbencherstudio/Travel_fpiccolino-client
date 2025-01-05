import { useEffect, useState } from "react";
import CustomTable from "../../../Shared/CustomTable";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../../features/order/orderSlice";

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getOrders({ search: "", startDate: "", endDate: "" }));
  }, []);
  const [columns] = useState({
    totalAmount: true,
    passenger: true,
    flightAmount: true,
    packageAmount: true,
    date: true,
    tourDate: true,
  });
  console.log(orders);

  return (
    <div>
      <CustomHeadingDashboard />
      <CustomTable
        tableType={"order"}
        title={"Order List"}
        columns={columns}
        data={orders}
      />
    </div>
  );
};

export default OrderList;
