import React from "react";

const UserDetails = () => {
  const userData = {
    name: "John butler",
    customerImg: "https://via.placeholder.com/40?text=RD",
    phone: "0182384384",
    email: "john@gmail.com",
    address : "john city lake , Italy",
    city: "Rom",
    country: "Italy",
    bankCard: "2382938498394939",
    paymentSystem:'stripe',
    tourData: [
      {
        bookingId: 901923,
        customerName: "John butler",
        customerImg: "https://via.placeholder.com/40?text=RD",
        destination: "London",
        destinationImg: "https://via.placeholder.com/40?text=LD",
        amount: "$1200",
        status: "Complete",
        date: "June 12, 2024",
      },
      {
        bookingId: 901924,
        customerName: "John butler",
        customerImg: "https://via.placeholder.com/40?text=JD",
        destination: "New York",
        destinationImg: "https://via.placeholder.com/40?text=NY",
        amount: "$1500",
        status: "Pending",
        date: "June 13, 2024",
      },
      {
        bookingId: 901925,
        customerName: "John butler",
        customerImg: "https://via.placeholder.com/40?text=JS",
        destination: "Paris",
        destinationImg: "https://via.placeholder.com/40?text=PR",
        amount: "$2000",
        status: "Complete",
        date: "June 14, 2024",
      },
      {
        bookingId: 901926,
        customerName: "John butler",
        customerImg: "https://via.placeholder.com/40?text=MJ",
        destination: "Tokyo",
        destinationImg: "https://via.placeholder.com/40?text=TOK",
        amount: "$1700",
        status: "Canceled",
        date: "June 15, 2024",
      },
    ],
  };
  return (
    <div>
      <h1 className="text-[32px] font-semibold">Welcome, Wade</h1>
      <p className="text-[#72777F]">
        Manage your travel agency data easily with us
      </p>
      <h2 className="text-[24px] font-semibold mt-8">User Details</h2>
      <img
        src={userData.customerImg}
        className="rounded-full w-[120px] h-[120px] mt-5"
        alt=""
      />
      <h1 className="mt-5 text-[20px] font-medium">Personal Details</h1>
      <div className="mt-3 max-w-[680px]">
        <div className="grid grid-cols-2">
          <div>
            <h1 className="text-[16px]">Name</h1>
            <p className="text-[#72777F] text-[14px]">{userData.name}</p>
          </div>{" "}
          <div>
            <h1 className="text-[16px]">Email</h1>
            <p className="text-[#72777F] text-[14px]">{userData.email}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-3">
          <div>
            <h1 className="text-[16px]">Phone</h1>
            <p className="text-[#72777F] text-[14px]">{userData.phone}</p>
          </div>{" "}
          <div>
            <h1 className="text-[16px]">Address</h1>
            <p className="text-[#72777F] text-[14px]">{userData.address}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 mt-3">
          <div>
            <h1 className="text-[16px]">City</h1>
            <p className="text-[#72777F] text-[14px]">{userData.city}</p>
          </div>{" "}
          <div>
            <h1 className="text-[16px]">Country</h1>
            <p className="text-[#72777F] text-[14px]">{userData.country}</p>
          </div>
        </div>
        <h1 className="mt-5 text-[20px] font-medium">Bank Details</h1>
        <div className="grid grid-cols-2 mt-3">
          <div>
            <h1 className="text-[16px]">Bank Card</h1>
            <p className="text-[#72777F] text-[14px]">{userData.bankCard}</p>
          </div>{" "}
          <div>
            <h1 className="text-[16px]">Payment System</h1>
            <p className="text-[#72777F] text-[14px]">{userData.paymentSystem}</p>
          </div>
        </div>
      </div>
      <h1 className="mt-5 text-[20px] font-medium">Tour Details</h1>
      
    </div>
  );
};

export default UserDetails;
