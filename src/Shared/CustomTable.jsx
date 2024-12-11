/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";

const CustomTable = ({ title, setDateFilter, dateFilter, data, columns }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="">
      <Paper>
        <div className="flex mt-8 p-5 justify-between flex-wrap">
          <h1 className="font-semibold text-[24px] mb-3">{title}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 items-center mb-5  gap-3">
            <div className="relative md:col-span-2">
              <input
                type="text"
                placeholder="Search..."
                className="py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute top-3 left-3 text-zinc-400" />
            </div>
            <select
              className="md:col-span-1"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{
                // width:'100%',
                padding: "8px 16px",
                cursor: "pointer",
                fontSize: "14px",
                border: "1px solid #e86731",
                borderRadius: "4px",
                color: "#e86731",
              }}
            >
              <option value="all">All</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        <TableContainer sx={{ overflow: "scroll" }}>
          <Table
            sx={{
              border: "1px solid gray",
              "& th, & td": { border: "1px solid #E0E5E5", color: "gray" },
            }}
          >
            <TableHead>
              <TableRow>
                {columns?.bookingId && <TableCell>Booking Id</TableCell>}
                {columns?.tourId && <TableCell>Tour Id</TableCell>}
                {columns?.name && <TableCell>Customer Name</TableCell>}
                {columns?.traveler && <TableCell>Traveler</TableCell>}
                {columns?.date && <TableCell>Date</TableCell>}
                {columns?.destination && <TableCell>Destination</TableCell>}
                {columns?.amount && <TableCell>Amount</TableCell>}
                {columns?.status && <TableCell>Status</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody className="text-nowrap">
              {data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((item) => (
                  <TableRow key={item?.bookingId}>
                    {columns?.bookingId && (
                      <TableCell>{item.bookingId}</TableCell>
                    )}
                    {columns?.tourId && <TableCell>{item.bookingId}</TableCell>}
                    {columns?.name && (
                      <TableCell style={{ minWidth: "200px" }}>
                        {/* Added minWidth for Name column */}
                        <div className="flex items-center gap-3">
                          <img
                            className="rounded-full"
                            src={item.customerImg}
                            alt={item.customerName}
                            style={{ width: "40px", height: "40px" }} // fixed size for the image
                          />
                          <span className="truncate">{item.customerName}</span>{" "}
                          {/* Added truncate to prevent overflow */}
                        </div>
                      </TableCell>
                    )}
                    {columns?.traveler && (
                      <TableCell style={{ minWidth: "200px" }}>
                        {/* Added minWidth for Name column */}
                        <div className="flex items-center gap-3">
                          <img
                            className="rounded-full"
                            src={item.customerImg}
                            alt={item.customerName}
                            style={{ width: "40px", height: "40px" }} // fixed size for the image
                          />
                          <span className="truncate">{item.customerName}</span>{" "}
                          {/* Added truncate to prevent overflow */}
                        </div>
                      </TableCell>
                    )}

                    {columns?.date && <TableCell>{item.date}</TableCell>}
                    {columns?.destination && (
                      <TableCell style={{ minWidth: "200px" }}>
                        {/* Added minWidth for Name column */}
                        <div className="flex items-center gap-3">
                          <img
                            className="rounded-full"
                            src={item.destinationImg}
                            alt={item.destination}
                            style={{ width: "40px", height: "40px" }} // fixed size for the image
                          />
                          <span className="truncate">{item.destination}</span>{" "}
                          {/* Added truncate to prevent overflow */}
                        </div>
                      </TableCell>
                    )}
                    {columns?.amount && <TableCell>{item.amount}</TableCell>}
                    {columns?.status && <TableCell>{item.status}</TableCell>}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default CustomTable;
