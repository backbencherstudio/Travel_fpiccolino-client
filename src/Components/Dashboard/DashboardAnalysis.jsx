import { GiProfit } from "react-icons/gi";
import { LuBaggageClaim, LuChartNoAxesCombined } from "react-icons/lu";
import revenue from "../../assets/dashboard/revenue.svg";
import traveler from "../../assets/dashboard/traveler.svg";
import profit from "../../assets/dashboard/profit.svg";
import DashboardCard from "./DashboardCard";
import Chart from "./Chart";
import { useState } from "react";

const DashboardAnalysis = () => {
    const [chartType,setChartType]= useState('Revenue')
  const dashboardData = [
    {
      title: "Revenue",
      amount: "850,930",
      percent: 12,
      bgColor: "bg-teal-50",
      bgColor2: 'bg-teal-100',
      txColor: 'text-teal-500',
      icon: LuChartNoAxesCombined,
      image: revenue,
      revenueData: [
        { x: "Jan", y: 12000 },
        { x: "Feb", y: 15000 },
        { x: "Mar", y: 17000 },
        { x: "Apr", y: 14000 },
        { x: "May", y: 18000 },
        { x: "Jun", y: 20000 },
        { x: "Jul", y: 21000 },
        { x: "Aug", y: 19000 },
        { x: "Sep", y: 22000 },
        { x: "Oct", y: 24000 },
        { x: "Nov", y: 23000 },
        { x: "Dec", y: 25000 },
      ]
    },
    {
      title: "Traveler",
      amount: "8,930",
      percent: 4,
      bgColor: "bg-purple-50",
      bgColor2: 'bg-purple-100',
      txColor: 'text-purple-500',
      icon: LuBaggageClaim,
      image: traveler,
      travelerData: [
        { x: "Jan", y: 500 },
        { x: "Feb", y: 600 },
        { x: "Mar", y: 700 },
        { x: "Apr", y: 650 },
        { x: "May", y: 800 },
        { x: "Jun", y: 900 },
        { x: "Jul", y: 950 },
        { x: "Aug", y: 850 },
        { x: "Sep", y: 1000 },
        { x: "Oct", y: 1100 },
        { x: "Nov", y: 1050 },
        { x: "Dec", y: 1200 },
      ]
    },
    {
      title: "Profit",
      amount: "80,930",
      percent: 6,
      bgColor: "bg-red-50",
      bgColor2: 'bg-red-100',
      txColor: 'text-red-500',
      icon: GiProfit,
      image: profit,
      profitData: [
        { x: "Jan", y: 3000 },
        { x: "Feb", y: 3500 },
        { x: "Mar", y: 4000 },
        { x: "Apr", y: 3700 },
        { x: "May", y: 4500 },
        { x: "Jun", y: 5000 },
        { x: "Jul", y: 5200 },
        { x: "Aug", y: 4800 },
        { x: "Sep", y: 5500 },
        { x: "Oct", y: 6000 },
        { x: "Nov", y: 5900 },
        { x: "Dec", y: 6500 },
      ]
    },
  ];

  return (
    <div>
      <h1 className="text-[32px] font-semibold">Welcome, Wade</h1>
      <p className="text-[#72777F]">Manage your travel agency data easily with us</p>
      <h2 className="text-[24px] font-semibold mt-8">Overview</h2>
      <div className="grid grid-cols-3 gap-5 mt-4">
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
      {/* Pass the different data to the Chart component */}
      {chartType === 'Revenue' ?
      <Chart title="Revenue" color="teal" data={dashboardData[0].revenueData} />
     : chartType === 'Traveler'?
     <Chart title="Traveler" color="purple" data={dashboardData[1].travelerData} />
  :   <Chart title="Profit" color="red" data={dashboardData[2].profitData} />

      }
    </div>
  );
};

export default DashboardAnalysis;
