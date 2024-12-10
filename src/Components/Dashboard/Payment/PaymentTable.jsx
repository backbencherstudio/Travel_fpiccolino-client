/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

const PaymentTable = ({ data, title,dateFilter,setDateFilter }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filtered booking data based on search query and title status
  const filteredBookingData = data
    .filter((booking) => {
      if (title === "Pending Tours") {
        return booking.status === "Pending";
      } else if (title === "Complete Tours") {
        return booking.status === "Complete";
      }
      // If title is not "Pending" or "Complete", show all bookings
      return true;
    })
    .filter(
      (booking) =>
        booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="border rounded-xl px-4 mt-10">
      <h2 className="text-[24px] font-semibold my-4">{title}</h2>
      {/* Search */}
      <div className="flex justify-between items-center mb-5">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Bookings..."
            className="md:w-96 py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute top-3 left-3 text-zinc-400" />
        </div>
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            border: "1px solid #e86731",
            borderRadius: "4px",
            margin: "0 8px",
            color:'#e86731',
          }}
        >
          <option value="all">All</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Bookings Table */}
      <div className="mt-5 overflow-auto max-w-full h-[80vh] custom-scroll">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Tour Id
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Traveler
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
          Amount
              </th> 
            </tr>
          </thead>
          <tbody>
            {filteredBookingData.length > 0 ? (
              filteredBookingData.map((booking) => (
                <tr key={booking.bookingId}>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    {booking.bookingId}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    <div className="flex items-center space-x-3">
                      <img
                        src={booking.customerImg}
                        alt={booking.customerName}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{booking.customerName}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    {booking.amount}
                  </td>
                 
                 
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="py-2 px-4 h-[200px] text-center text-gray-700"
                >
                  {filteredBookingData.length === 0 ? (
                    "No bookings found"
                  ) : (
                    <CircularProgress />
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
