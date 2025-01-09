import { useEffect, useState } from "react";
import { GiProfit } from "react-icons/gi";
import { LuBaggageClaim, LuChartNoAxesCombined } from "react-icons/lu";
import revenue from "../../../assets/dashboard/revenue.svg";
import traveler from "../../../assets/dashboard/traveler.svg";
import profit from "../../../assets/dashboard/profit.svg";
import DashboardCard from "./DashboardCard";
import Chart from "./Chart";
import RadarChart from "./RadarChart";
import CustomTable from "../../../Shared/CustomTable";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { useDispatch, useSelector } from "react-redux";
import { getPackage } from "../../../features/pckage/packageSlice";
import {
  getChartData,
  getDashboardData,
  getRadarData,
} from "../../../features/dashboard/dashboardSlice";

const DashboardAnalysis = () => {
  const dispatch = useDispatch();
  const [chartType, setChartType] = useState("Order");
  const [timeInterval, setTimeInterval] = useState("monthly");
  const { packag } = useSelector((state) => state.package);
  const { totalData, radarData, chartData } = useSelector(
    (state) => state.dashboard
  );
  useEffect(() => {
    dispatch(getPackage({ search: "", startDate: "", endDate: "" })),
      dispatch(getDashboardData()),
      dispatch(getRadarData());
    dispatch(getChartData());
  }, [dispatch]);
  const [columns] = useState({
    date: true,
    duration: true,
    destination: true,
    amount: true,
    // action: true,
  });

  const dashboardData = [
    {
      title: "Order",
      amount: totalData?.totalOrders,
      percent: 12,
      bgColor: "bg-teal-50",
      bgColor2: "bg-teal-100",
      txColor: "text-teal-500",
      icon: LuChartNoAxesCombined,
      image: revenue,
      data: chartData?.orderData,
    },
    {
      title: "Traveler",
      amount: totalData?.totalTravellers,
      percent: 4,
      bgColor: "bg-purple-50",
      bgColor2: "bg-purple-100",
      txColor: "text-purple-500",
      icon: LuBaggageClaim,
      image: traveler,
      data: chartData?.travelerData,
    },
    {
      title: "Revenue",
      amount: totalData?.totalProfit ? totalData?.totalProfit : 0,
      percent: 6,
      bgColor: "bg-red-50",
      bgColor2: "bg-red-100",
      txColor: "text-red-500",
      icon: GiProfit,
      image: profit,
      data: chartData?.revenueData,
    },
  ];
  console.log(chartData);

  return (
    <div className="">
      <div>
        <CustomHeadingDashboard />
        <h2 className="text-[24px] font-semibold mt-8">Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
          {dashboardData?.map((data, index) => (
            <DashboardCard
              key={index}
              title={data.title}
              amount={data.amount}
              percent={data.percent}
              bgColor={data.bgColor}
              bgColor2={data.bgColor2}
              txColor={data.txColor}
              icon={data.icon}
              image={data.image}
              chartType={chartType}
              setChartType={setChartType}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3   gap-5">
          <div className="md:col-span-2">
            <Chart
              title={chartType}
              color={
                chartType === "Order"
                  ? "teal"
                  : chartType === "Traveler"
                  ? "purple"
                  : "red"
              }
              data={
                dashboardData?.find((d) => d.title === chartType)?.data || []
              }
              timeInterval={timeInterval}
              setTimeInterval={setTimeInterval}
            />
          </div>
          <div className=" border my-4 rounded-xl">
            <RadarChart data={radarData || []} />
          </div>
        </div>
      </div>

      <CustomTable
        title={"Tour Package List"}
        tableType="dashboard"
        data={packag}
        columns={columns}
      />
    </div>
  );
};

export default DashboardAnalysis;
