import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

const TourTable = ({ data, title }) => {
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
      </div>

      {/* Bookings Table */}
      <div className="mt-5 overflow-auto max-w-full h-[80vh] custom-scroll">
        <table className="min-w-full bg-white border border-gray-300 rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Booking Id
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Customer Name
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Destination
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Amount
              </th>
              <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Status
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
                    {booking.date}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    <div className="flex items-center space-x-3">
                      <img
                        src={booking.destinationImg}
                        alt={booking.destination}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{booking.destination}</span>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-800">
                    {booking.amount}
                  </td>
                  <td className="px-4 m-2 rounded-lg border-b border-gray-300 text-sm text-gray-800">
                    <p
                      className={`${
                        booking.status === "Complete"
                          ? "bg-[#ddf0e1] text-[#1a9835]"
                          : "bg-[#fef2db] text-[#f09b71]"
                      } px-3 py-1 text-center rounded-full`}
                    >
                      {booking.status}
                    </p>
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

export default TourTable;
