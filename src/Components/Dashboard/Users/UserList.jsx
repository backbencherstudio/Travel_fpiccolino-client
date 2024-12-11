import { useState } from "react";
import CustomTable from "../../../Shared/CustomTable";

const UserList = () => {
  const [tourDateFilter, setTourDateFilter] = useState("all");
  const [columns] = useState({
    username: true,
    phone: true,
    email: true,
    country: true,
  });
  const userData = [
    {
      name: "John Butler",
      customerImg: "https://via.placeholder.com/40?text=JB",
      phone: "0182384384",
      email: "john.butler@gmail.com",
      address: "123 Lakeview St, Rome, Italy",
      city: "Rome",
      country: "Italy",
      bankCard: "2382938498394939",
      paymentSystem: "stripe",
      tourData: [
        {
          bookingId: 901923,
          customerName: "John Butler",
          customerImg: "https://via.placeholder.com/40?text=JB",
          destination: "London",
          destinationImg: "https://via.placeholder.com/40?text=LD",
          amount: "$1200",
          status: "Complete",
          date: "June 12, 2024",
        },
        {
          bookingId: 901924,
          customerName: "John Butler",
          customerImg: "https://via.placeholder.com/40?text=JB",
          destination: "New York",
          destinationImg: "https://via.placeholder.com/40?text=NY",
          amount: "$1500",
          status: "Pending",
          date: "June 13, 2024",
        },
      ],
    },
    {
      name: "Mary Cooper",
      customerImg: "https://via.placeholder.com/40?text=MC",
      phone: "0192382394",
      email: "mary.cooper@gmail.com",
      address: "456 Maple St, Paris, France",
      city: "Paris",
      country: "France",
      bankCard: "3249238492394920",
      paymentSystem: "paypal",
      tourData: [
        {
          bookingId: 901925,
          customerName: "Mary Cooper",
          customerImg: "https://via.placeholder.com/40?text=MC",
          destination: "Paris",
          destinationImg: "https://via.placeholder.com/40?text=PR",
          amount: "$2000",
          status: "Complete",
          date: "June 14, 2024",
        },
        {
          bookingId: 901926,
          customerName: "Mary Cooper",
          customerImg: "https://via.placeholder.com/40?text=MC",
          destination: "Tokyo",
          destinationImg: "https://via.placeholder.com/40?text=TOK",
          amount: "$1700",
          status: "Canceled",
          date: "June 15, 2024",
        },
      ],
    },
    {
      name: "Liam James",
      customerImg: "https://via.placeholder.com/40?text=LJ",
      phone: "0202938492",
      email: "liam.james@gmail.com",
      address: "789 Sunset Blvd, London, UK",
      city: "London",
      country: "UK",
      bankCard: "4859284938492039",
      paymentSystem: "stripe",
      tourData: [
        {
          bookingId: 901927,
          customerName: "Liam James",
          customerImg: "https://via.placeholder.com/40?text=LJ",
          destination: "London",
          destinationImg: "https://via.placeholder.com/40?text=LD",
          amount: "$1300",
          status: "Pending",
          date: "June 16, 2024",
        },
        {
          bookingId: 901928,
          customerName: "Liam James",
          customerImg: "https://via.placeholder.com/40?text=LJ",
          destination: "Sydney",
          destinationImg: "https://via.placeholder.com/40?text=SYD",
          amount: "$1800",
          status: "Complete",
          date: "June 17, 2024",
        },
      ],
    },
    {
      name: "Sophia Williams",
      customerImg: "https://via.placeholder.com/40?text=SW",
      phone: "0213849032",
      email: "sophia.williams@gmail.com",
      address: "101 Oceanview Drive, Los Angeles, USA",
      city: "Los Angeles",
      country: "USA",
      bankCard: "2398483929384932",
      paymentSystem: "paypal",
      tourData: [
        {
          bookingId: 901929,
          customerName: "Sophia Williams",
          customerImg: "https://via.placeholder.com/40?text=SW",
          destination: "Amsterdam",
          destinationImg: "https://via.placeholder.com/40?text=AMS",
          amount: "$1400",
          status: "Complete",
          date: "June 18, 2024",
        },
        {
          bookingId: 901930,
          customerName: "Sophia Williams",
          customerImg: "https://via.placeholder.com/40?text=SW",
          destination: "Rome",
          destinationImg: "https://via.placeholder.com/40?text=RO",
          amount: "$2000",
          status: "Pending",
          date: "June 19, 2024",
        },
      ],
    },
    {
      name: "Chris Evans",
      customerImg: "https://via.placeholder.com/40?text=CE",
      phone: "0223840923",
      email: "chris.evans@gmail.com",
      address: "102 Riverwalk St, Tokyo, Japan",
      city: "Tokyo",
      country: "Japan",
      bankCard: "2394839294948392",
      paymentSystem: "stripe",
      tourData: [
        {
          bookingId: 901931,
          customerName: "Chris Evans",
          customerImg: "https://via.placeholder.com/40?text=CE",
          destination: "Rome",
          destinationImg: "https://via.placeholder.com/40?text=RO",
          amount: "$1600",
          status: "Complete",
          date: "June 20, 2024",
        },
        {
          bookingId: 901932,
          customerName: "Chris Evans",
          customerImg: "https://via.placeholder.com/40?text=CE",
          destination: "Las Vegas",
          destinationImg: "https://via.placeholder.com/40?text=LV",
          amount: "$2200",
          status: "Complete",
          date: "June 21, 2024",
        },
      ],
    },
  ];

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
