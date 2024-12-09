import { useState } from "react";
import { GiProfit } from "react-icons/gi";
import { LuBaggageClaim, LuChartNoAxesCombined } from "react-icons/lu";
import revenue from "../../assets/dashboard/revenue.svg";
import traveler from "../../assets/dashboard/traveler.svg";
import profit from "../../assets/dashboard/profit.svg";
import DashboardCard from "./DashboardCard";
import Chart from "./Chart";

const DashboardAnalysis = () => {
  const [chartType, setChartType] = useState("Revenue");
  const [timeInterval, setTimeInterval] = useState("monthly"); // Added state for time interval filter

  const dashboardData = [
    {
      title: "Revenue",
      amount: "850,930",
      percent: 12,
      bgColor: "bg-teal-50",
      bgColor2: "bg-teal-100",
      txColor: "text-teal-500",
      icon: LuChartNoAxesCombined,
      image: revenue,
      revenueData: [
        { x: "Jan", y: 12000 },
        { x: "Feb", y: 15000 },
        { x: "Mar", y: 17000 },
        { x: "Apr", y: 19000 },
        { x: "May", y: 27000 },
        { x: "June", y: 17000 },
        { x: "Week 1", y: 1000 },
        { x: "Week 2", y: 1200 },
        { x: "Week 3", y: 1100 },
        { x: "Week 4", y: 1400 },
        { x: "Week 5", y: 1100 },
        { x: "Week 6", y: 1800 },
        { x: "2021", y: 25000 },
        { x: "2022", y: 30000 },
        { x: "2023", y: 35000 },
        { x: "2024", y: 20000 },
        { x: "2025", y: 50000 },
      ],
    },
    {
      title: "Traveler",
      amount: "8,930",
      percent: 4,
      bgColor: "bg-purple-50",
      bgColor2: "bg-purple-100",
      txColor: "text-purple-500",
      icon: LuBaggageClaim,
      image: traveler,
      travelerData: [
        { x: "Jan", y: 12000 },
        { x: "Feb", y: 15000 },
        { x: "Mar", y: 17000 },
        { x: "Apr", y: 19000 },
        { x: "May", y: 27000 },
        { x: "June", y: 17000 },
        { x: "Week 1", y: 1000 },
        { x: "Week 2", y: 1200 },
        { x: "Week 3", y: 1100 },
        { x: "Week 4", y: 1400 },
        { x: "Week 5", y: 1100 },
        { x: "Week 6", y: 1800 },
        { x: "2021", y: 25000 },
        { x: "2022", y: 30000 },
        { x: "2023", y: 35000 },
        { x: "2024", y: 20000 },
        { x: "2025", y: 50000 },
      ],
    },
    {
      title: "Profit",
      amount: "80,930",
      percent: 6,
      bgColor: "bg-red-50",
      bgColor2: "bg-red-100",
      txColor: "text-red-500",
      icon: GiProfit,
      image: profit,
      profitData: [
        { x: "Jan", y: 12000 },
        { x: "Feb", y: 15000 },
        { x: "Mar", y: 17000 },
        { x: "Apr", y: 19000 },
        { x: "May", y: 27000 },
        { x: "June", y: 17000 },
        { x: "Week 1", y: 1000 },
        { x: "Week 2", y: 1200 },
        { x: "Week 3", y: 1100 },
        { x: "Week 4", y: 1400 },
        { x: "Week 5", y: 1100 },
        { x: "Week 6", y: 1800 },
        { x: "2021", y: 25000 },
        { x: "2022", y: 30000 },
        { x: "2023", y: 35000 },
        { x: "2024", y: 20000 },
        { x: "2025", y: 50000 },
      ],
    },
  ];


  return (
    <div>
      <h1 className="text-[32px] font-semibold">Welcome, Wade</h1>
      <p className="text-[#72777F]">Manage your travel agency data easily with us</p>
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

      {/* Pass filtered data to the Chart component */}
      {chartType === "Revenue" ? (
        <Chart
          title="Revenue"
          color="teal"
          data={dashboardData[0].revenueData}
          timeInterval={timeInterval}
          setTimeInterval={setTimeInterval}
        />
      ) : chartType === "Traveler" ? (
        <Chart
          title="Traveler"
          color="purple"
          data={dashboardData[1].travelerData}
          timeInterval={timeInterval}
          setTimeInterval={setTimeInterval}
        />
      ) : (
        <Chart
          title="Profit"
          color="red"
          data={dashboardData[2].profitData}
          timeInterval={timeInterval}
          setTimeInterval={setTimeInterval}
        />
      )}
    </div>
  );
};

export default DashboardAnalysis;
