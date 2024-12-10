import { useState } from "react";
import { FaPlaneDeparture } from "react-icons/fa6";
import { FaPlaneCircleCheck } from "react-icons/fa6";
import { FaPlaneCircleExclamation } from "react-icons/fa6";
import revenue from "../../assets/dashboard/revenue.svg";
import traveler from "../../assets/dashboard/traveler.svg";
import profit from "../../assets/dashboard/profit.svg";
import DashboardCard from "./DashboardCard";
import TourTable from "./TourTable";

const TourAnalysis = () => {
  const [chartType, setChartType] = useState("Total Tour");
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const dashboardData = [
    {
      title: "Total Tours",
      amount: "730",
      percent: 12,
      bgColor: "bg-teal-50",
      bgColor2: "bg-teal-100",
      txColor: "text-teal-500",
      icon: FaPlaneDeparture,
      image: revenue,
    },
    {
      title: "Complete Tours",
      amount: "580",
      percent: 4,
      bgColor: "bg-purple-50",
      bgColor2: "bg-purple-100",
      txColor: "text-purple-500",
      icon: FaPlaneCircleCheck,
      image: traveler,
    },
    {
      title: "Pending Tours",
      amount: "150",
      percent: 6,
      bgColor: "bg-red-50",
      bgColor2: "bg-red-100",
      txColor: "text-red-500",
      icon: FaPlaneCircleExclamation,
      image: profit,
    },
  ];
  const bookingData = [
    {
      bookingId: 901923,
      customerName: "Robert Downi",
      customerImg: "https://via.placeholder.com/40?text=RD",
      destination: "London",
      destinationImg: "https://via.placeholder.com/40?text=LD",
      amount: "$1200",
      status: "Complete",
      date: "June 12, 2024",
    },
    {
      bookingId: 901924,
      customerName: "John Doe",
      customerImg: "https://via.placeholder.com/40?text=JD",
      destination: "New York",
      destinationImg: "https://via.placeholder.com/40?text=NY",
      amount: "$1500",
      status: "Pending",
      date: "June 13, 2024",
    },
    {
      bookingId: 901925,
      customerName: "Jane Smith",
      customerImg: "https://via.placeholder.com/40?text=JS",
      destination: "Paris",
      destinationImg: "https://via.placeholder.com/40?text=PR",
      amount: "$2000",
      status: "Complete",
      date: "June 14, 2024",
    },
    {
      bookingId: 901926,
      customerName: "Michael Johnson",
      customerImg: "https://via.placeholder.com/40?text=MJ",
      destination: "Tokyo",
      destinationImg: "https://via.placeholder.com/40?text=TOK",
      amount: "$1700",
      status: "Canceled",
      date: "June 15, 2024",
    },
    {
      bookingId: 901927,
      customerName: "Emily Davis",
      customerImg: "https://via.placeholder.com/40?text=ED",
      destination: "Sydney",
      destinationImg: "https://via.placeholder.com/40?text=SYD",
      amount: "$1800",
      status: "Complete",
      date: "June 16, 2024",
    },
    {
      bookingId: 901928,
      customerName: "William Brown",
      customerImg: "https://via.placeholder.com/40?text=WB",
      destination: "Berlin",
      destinationImg: "https://via.placeholder.com/40?text=BR",
      amount: "$1300",
      status: "Pending",
      date: "June 17, 2024",
    },
    {
      bookingId: 901929,
      customerName: "Olivia White",
      customerImg: "https://via.placeholder.com/40?text=OW",
      destination: "Rome",
      destinationImg: "https://via.placeholder.com/40?text=RO",
      amount: "$1100",
      status: "Complete",
      date: "June 18, 2024",
    },
    {
      bookingId: 901930,
      customerName: "James Black",
      customerImg: "https://via.placeholder.com/40?text=JB",
      destination: "Amsterdam",
      destinationImg: "https://via.placeholder.com/40?text=AMS",
      amount: "$1400",
      status: "Complete",
      date: "June 19, 2024",
    },
    {
      bookingId: 901931,
      customerName: "Sophia Harris",
      customerImg: "https://via.placeholder.com/40?text=SH",
      destination: "Rome",
      destinationImg: "https://via.placeholder.com/40?text=RO",
      amount: "$1600",
      status: "Complete",
      date: "June 20, 2024",
    },
    {
      bookingId: 901932,
      customerName: "Benjamin Wilson",
      customerImg: "https://via.placeholder.com/40?text=BW",
      destination: "Dubai",
      destinationImg: "https://via.placeholder.com/40?text=DU",
      amount: "$2500",
      status: "Canceled",
      date: "June 21, 2024",
    },
    {
      bookingId: 901933,
      customerName: "Charlotte Moore",
      customerImg: "https://via.placeholder.com/40?text=CM",
      destination: "London",
      destinationImg: "https://via.placeholder.com/40?text=LD",
      amount: "$1400",
      status: "Complete",
      date: "June 22, 2024",
    },
    {
      bookingId: 901934,
      customerName: "Liam Taylor",
      customerImg: "https://via.placeholder.com/40?text=LT",
      destination: "Las Vegas",
      destinationImg: "https://via.placeholder.com/40?text=LV",
      amount: "$2200",
      status: "Complete",
      date: "June 23, 2024",
    },
    {
      bookingId: 901935,
      customerName: "Amelia Clark",
      customerImg: "https://via.placeholder.com/40?text=AC",
      destination: "Madrid",
      destinationImg: "https://via.placeholder.com/40?text=MA",
      amount: "$1300",
      status: "Pending",
      date: "June 24, 2024",
    },
    {
      bookingId: 901936,
      customerName: "Ethan Lewis",
      customerImg: "https://via.placeholder.com/40?text=EL",
      destination: "Paris",
      destinationImg: "https://via.placeholder.com/40?text=PR",
      amount: "$1900",
      status: "Complete",
      date: "June 25, 2024",
    },
    {
      bookingId: 901937,
      customerName: "Ava Walker",
      customerImg: "https://via.placeholder.com/40?text=AW",
      destination: "New York",
      destinationImg: "https://via.placeholder.com/40?text=NY",
      amount: "$1600",
      status: "Pending",
      date: "June 26, 2024",
    },
    {
      bookingId: 901938,
      customerName: "Mason Scott",
      customerImg: "https://via.placeholder.com/40?text=MS",
      destination: "Tokyo",
      destinationImg: "https://via.placeholder.com/40?text=TOK",
      amount: "$2100",
      status: "Complete",
      date: "June 27, 2024",
    },
    {
      bookingId: 901939,
      customerName: "Isabella Adams",
      customerImg: "https://via.placeholder.com/40?text=IA",
      destination: "Dubai",
      destinationImg: "https://via.placeholder.com/40?text=DU",
      amount: "$2300",
      status: "Complete",
      date: "June 28, 2024",
    },
    {
      bookingId: 901940,
      customerName: "Lucas Nelson",
      customerImg: "https://via.placeholder.com/40?text=LN",
      destination: "Barcelona",
      destinationImg: "https://via.placeholder.com/40?text=BCN",
      amount: "$1600",
      status: "Complete",
      date: "June 29, 2024",
    },
    {
      bookingId: 901941,
      customerName: "Mia Perez",
      customerImg: "https://via.placeholder.com/40?text=MP",
      destination: "Sydney",
      destinationImg: "https://via.placeholder.com/40?text=SYD",
      amount: "$1500",
      status: "Pending",
      date: "June 30, 2024",
    },
  ];

  return (
    <div>
      <h1 className="text-[32px] font-semibold">Welcome, Wade</h1>
      <p className="text-[#72777F]">
        Manage your travel agency data easily with us
      </p>
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

      <TourTable
        title={chartType}
        data={bookingData}
        setDateFilter={setTourDateFilter}
        dateFilter={tourDateFilter}
      />
    </div>
  );
};

export default TourAnalysis;
