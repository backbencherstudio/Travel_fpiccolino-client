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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegSquarePlus } from "react-icons/fa6";
import CustomDashboardButton from "./CustomDashboardButton";
import { base_url } from "../utils/base_path";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../features/blog/blogSlice";
import moment from "moment";
import { deletePackage } from "../features/pckage/packageSlice";

const CustomTable = ({
  tableType = "",
  title,
  setDateFilter,
  dateFilter,
  data,
  columns,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Delete modal state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Store the id of the blog to delete

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (id) =>
    tableType === "user" || tableType === "blog" ? navigate(`${id}`) : null;

  const handleCreatePackage = () => navigate("create/new");

  const handleOpenDeleteDialog = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    if (deleteId) {
      try {
        if (tableType === "blog") {
          await dispatch(deleteBlog(deleteId));
        } else if (tableType === "package") {
          await dispatch(deletePackage(deleteId));
        } else {
          console.log("Invalid table type:", tableType);
        }
        handleCloseDeleteDialog();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div>
      <Paper>
        <div className="flex mt-8 p-5 justify-between flex-wrap">
          <h1 className="font-semibold text-[24px]">{title}</h1>
          {(tableType === "blog" || tableType === "package") && (
            <CustomDashboardButton
              content={
                <div className="flex items-center gap-1.5 ">
                  <FaRegSquarePlus className="text-xl" /> Add{" "}
                  {tableType.charAt(0).toUpperCase() + tableType.slice(1)}
                </div>
              }
              handleSubmit={handleCreatePackage}
            />
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center mb-5 gap-3 px-4">
          <div className="relative md:col-span-2">
            <input
              type="text"
              placeholder="Search..."
              className="py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[80%]"
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
        <TableContainer sx={{ padding: "16px" }}>
          <Table
            sx={{
              border: "1px solid #e0e0e0",
            }}
          >
            <TableHead>
              <TableRow>
                {columns?.bookingId && <TableCell>Booking Id</TableCell>}
                {columns?.tourId && <TableCell>Tour Id</TableCell>}
                {columns?.name && <TableCell>Customer Name</TableCell>}
                {columns?.username && <TableCell>User Name</TableCell>}
                {columns?.blogName && <TableCell>Blog Name</TableCell>}
                {columns?.category && <TableCell>Category</TableCell>}
                {columns?.email && <TableCell>Email</TableCell>}
                {columns?.phone && <TableCell>Phone</TableCell>}
                {columns?.country && <TableCell>Country</TableCell>}
                {columns?.traveler && <TableCell>Traveler</TableCell>}
                {columns?.destination && <TableCell>Destination</TableCell>}
                {columns?.duration && <TableCell>Duration</TableCell>}
                {columns?.date && <TableCell>Date</TableCell>}
                {columns?.amount && <TableCell>Amount</TableCell>}
                {columns?.status && <TableCell>Status</TableCell>}
                {columns?.action && <TableCell>Action</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody className="text-nowrap">
              {data
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                ?.map((item) => (
                  <TableRow
                    className={`${
                      (tableType === "user" || tableType === "blog") &&
                      "cursor-pointer hover:bg-[#fdf0ea]"
                    }`}
                    key={item?.bookingId}
                    onClick={() => handleRowClick(item._id)}
                  >
                    {columns?.bookingId && (
                      <TableCell>{item.bookingId}</TableCell>
                    )}
                    {columns?.tourId && <TableCell>{item.bookingId}</TableCell>}
                    {columns?.name && (
                      <TableCell style={{ minWidth: "200px" }}>
                        <div className="flex items-center gap-3">
                          <img
                            className="rounded-full"
                            src={item.customerImg}
                            alt={item.customerName}
                            style={{ width: "40px", height: "40px" }}
                          />
                          <span className="truncate">{item.customerName}</span>
                        </div>
                      </TableCell>
                    )}
                    {columns?.username && (
                      <TableCell style={{ minWidth: "200px" }}>
                        <div className="flex items-center gap-3">
                          {item?.image ? (
                            <img
                              className="rounded-full"
                              src={`${item?.image}`}
                              alt={item.customerName}
                              style={{ width: "40px", height: "40px" }}
                            />
                          ) : (
                            <FaRegUserCircle className="h-9 w-9 primary_text" />
                          )}
                          <span className="truncate">{item.name}</span>
                        </div>
                      </TableCell>
                    )}
                    {columns?.blogName && (
                      <TableCell
                        style={{ width: "400px", textWrap: "break-word" }}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            className="rounded-full"
                            src={`${base_url}/uploads/${item?.heroSection[0]?.headerImg}`}
                            alt=""
                            style={{ width: "40px", height: "40px" }}
                          />
                          <span
                            className="truncate"
                            style={{ wordWrap: "break-word" }}
                          >
                            {item?.heroSection[0]?.mainHeading}
                          </span>
                        </div>
                      </TableCell>
                    )}
                    {columns?.category && (
                      <TableCell>{item.category}</TableCell>
                    )}
                    {columns?.email && <TableCell>{item.email}</TableCell>}
                    {columns?.phone && <TableCell>{item.phone}</TableCell>}
                    {columns?.country && <TableCell>{item.country}</TableCell>}
                    {columns?.traveler && (
                      <TableCell style={{ minWidth: "200px" }}>
                        <div className="flex items-center gap-3">
                          <img
                            className="rounded-full"
                            src={item.customerImg}
                            alt={item.customerName}
                            style={{ width: "40px", height: "40px" }}
                          />
                          <span className="truncate">{item.customerName}</span>
                        </div>
                      </TableCell>
                    )}
                    {columns?.destination && (
                      <TableCell style={{ minWidth: "200px" }}>
                        <div className="flex items-center gap-3">
                          <img
                            className="rounded-full"
                            src={item.imageUrl[0]}
                            alt={item.destination}
                            style={{ width: "40px", height: "40px" }}
                          />
                          <span className="truncate">{item.destination}</span>
                        </div>
                      </TableCell>
                    )}

                    {columns?.duration && (
                      <TableCell style={{ minWidth: "200px" }}>
                        {item.tourDuration?.nights} Nights &{" "}
                        {item.tourDuration?.days} Days
                      </TableCell>
                    )}
                    {columns?.date && (
                      <TableCell>
                        {moment(item.createdAt).format("DD/MM/yyyy")}
                      </TableCell>
                    )}
                    {columns?.amount && <TableCell>{item.amount}</TableCell>}
                    {columns?.status && <TableCell>{item.status}</TableCell>}
                    {columns?.action && (
                      <TableCell>
                        <div className="flex gap-5 ">
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`update/${item._id}`);
                            }}
                            className="text-[#1a9835] border border-[#1a9835] rounded-full h-10 w-10 text-[24px] text-center flex justify-center items-center hover:bg-[#1a983528]"
                          >
                            <FiEdit3 />
                          </div>
                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDeleteDialog(item._id);
                            }}
                            className="text-[#eb3d4d] border border-[#eb3d4d] hover:bg-[#eb3d4f1e] rounded-full h-10 w-10 text-[24px] text-center flex justify-center items-center"
                          >
                            <MdDeleteOutline />
                          </div>
                        </div>
                      </TableCell>
                    )}
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
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>
          Delete {tableType.charAt(0).toUpperCase() + tableType.slice(1)}
        </DialogTitle>
        <DialogContent>
          <p>
            Are you sure you want to delete this {tableType}? This action cannot
            be undone.
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomTable;
