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
import { MdDeleteOutline, MdOutlinePreview } from "react-icons/md";
import { FaRegSquarePlus } from "react-icons/fa6";
import CustomDashboardButton from "./CustomDashboardButton";
import { base_url } from "../utils/base_path";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getBlog } from "../features/blog/blogSlice";
import moment from "moment";

import { getDateRange } from "./CustomDateRange";
import { deletePackage, getPackage } from "../features/pckage/packageSlice";
import { getUser } from "../features/users/userSlice";
import { getOrders } from "../features/order/orderSlice";
import { deleteCountry } from "../features/country/countrySlice";
import { deleteNewsletter } from "../features/newsLetter/newsLetterSlice";
import ReviewModal from "../Components/Dashboard/Users/ReviewModal";
import { CiImageOn } from "react-icons/ci";
import { deleteReview } from "../features/review/reviewSlice";

const CustomTable = ({ tableType = "", title, data, columns }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authorization);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Delete modal state
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Store the id of the blog to delete

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [packageId, setPackageId] = useState("");
  // Details dialog for dashboard/package rows
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [detailsItem, setDetailsItem] = useState(null);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (id, item) => {
    if (tableType === "user" || tableType === "blog") {
      return navigate(`${id}`);
    }
    if (tableType === "dashboard" || tableType === "order") {
      setDetailsItem(item);
      setOpenDetailsDialog(true);
    }
    return null;
  };

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
        } else if (tableType === "country") {
          await dispatch(deleteCountry(deleteId));
        } else if (tableType === "newsLetter") {
          await dispatch(deleteNewsletter(deleteId));
        } else if (tableType === "review") {
          console.log("deleteId", deleteId);
          await dispatch(deleteReview(deleteId));
        } else {
          console.log("Invalid table type:", tableType);
        }
        handleCloseDeleteDialog();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };
  const handleSearch = async (e) => {
    setSearchQuery(e.target.value);
    if (tableType === "blog") {
      await dispatch(
        getBlog({ search: e.target.value, startDate: "", endDate: "" })
      );
    }
    if (tableType === "package" || tableType === "dashboard") {
      await dispatch(
        getPackage({ search: e.target.value, startDate: "", endDate: "" })
      );
    }
    if (tableType === "user") {
      await dispatch(
        getUser({ search: e.target.value, startDate: "", endDate: "" })
      );
    }
    if (tableType === "order") {
      await dispatch(
        getOrders({ search: e.target.value, startDate: "", endDate: "" })
      );
    }
  };
  const handleDateFilterChange = async (e) => {
    const selectedFilter = e.target.value;
    setDateFilter(selectedFilter);
    const { startDate, endDate } = getDateRange(selectedFilter);

    if (tableType === "blog") {
      await dispatch(getBlog({ search: searchQuery, startDate, endDate }));
    }
    if (tableType === "package" || tableType === "dashboard") {
      await dispatch(getPackage({ search: searchQuery, startDate, endDate }));
    }
    if (tableType === "user") {
      await dispatch(getUser({ search: searchQuery, startDate, endDate }));
    }
    if (tableType === "order") {
      await dispatch(getOrders({ search: searchQuery, startDate, endDate }));
    }
  };
  return (
    <div>
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packageId={packageId}
        userId={user?._id}
      />
      <Paper>
        <div className="flex mt-8 p-5 justify-between flex-wrap">
          <h1 className="font-semibold text-[24px]">{title}</h1>
          {(tableType === "blog" ||
            tableType === "package" ||
            tableType === "country") && (
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
        {tableType === "country" ||
        tableType === "contact" ||
        tableType === "newsLetter" ? (
          <></>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 items-center mb-5 gap-3 px-4">
            <div className="relative md:col-span-2">
              <input
                type="text"
                placeholder="Search..."
                className="py-1.5 pl-10 border border-zinc-300 rounded-md focus:outline-none focus:border-orange-400 w-full lg:w-[80%]"
                onChange={(e) => handleSearch(e)}
              />
              <FaSearch className="absolute top-3 left-3 text-zinc-400" />
            </div>
            <select
              className="md:col-span-1"
              value={dateFilter}
              onChange={handleDateFilterChange}
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
              <option value="thisWeek">This Week</option>
              <option value="lastWeek">Last Week</option>
              <option value="thisMonth">This Month</option>
              <option value="lastMonth">Last Month</option>
              <option value="thisYear">This Year</option>
              <option value="lastYear">Last Year</option>
            </select>
          </div>
        )}
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
                {columns?.countryName && <TableCell>Country</TableCell>}
                {columns?.packageImg && <TableCell>Package Image</TableCell>}
                {columns?.Name && <TableCell>Name</TableCell>}
                {columns?.orderUser && <TableCell>User</TableCell>}
                {columns?.title && <TableCell>Title</TableCell>}
                {columns?.category && <TableCell>Category</TableCell>}
                {columns?.email && <TableCell>Email</TableCell>}
                {columns?.phone && <TableCell>Phone</TableCell>}
                {columns?.passenger && <TableCell>Passenger</TableCell>}
                {columns?.packageAmount && <TableCell>Package Price</TableCell>}
                {columns?.flightAmount && <TableCell>Flight Amount</TableCell>}
                {columns?.totalAmount && <TableCell>Total </TableCell>}
                {columns?.tourDate && <TableCell>Tour Date</TableCell>}
                {columns?.phone && <TableCell>Phone</TableCell>}
                {columns?.traveler && <TableCell>Traveler</TableCell>}
                {columns?.destination && <TableCell>Destination</TableCell>}
                {columns?.duration && <TableCell>Duration</TableCell>}
                {columns?.isHome && <TableCell>Show on Home Page</TableCell>}
                {columns?.homeOrder && <TableCell>Home Order</TableCell>}
                {columns?.date && <TableCell>CreatedAt</TableCell>}
                {columns?.amount && <TableCell>Amount</TableCell>}
                {columns?.country && <TableCell>Country</TableCell>}
                {columns?.status && <TableCell>Status</TableCell>}
                {columns?.rating && <TableCell>Rating</TableCell>}
                {columns?.comment && <TableCell>Review Comment</TableCell>}
                {columns?.action && <TableCell>Action</TableCell>}
                {columns?.firstName && <TableCell>First Name</TableCell>}
                {columns?.lastName && <TableCell>Last Name</TableCell>}
                {columns?.message && <TableCell>Message</TableCell>}
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
                    onClick={() => handleRowClick(item._id, item)}
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
                    {columns?.countryName && (
                      <TableCell
                      // style={{ width: "400px", textWrap: "break-word" }}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            className="rounded-full"
                            src={`${item?.image}`}
                            alt=""
                            style={{ width: "40px", height: "40px" }}
                          />
                          <span
                            style={{ wordWrap: "break-word" }}
                            className="mr-10"
                          >
                            {item?.name}
                          </span>
                        </div>
                      </TableCell>
                    )}
                    {columns?.orderUser && (
                      <TableCell
                      // style={{ width: "400px", textWrap: "break-word" }}
                      >
                        <div className="flex items-center gap-3">
                          {item?.userId?.image ? (
                            <img
                              className="rounded-full"
                              src={`${item?.userId?.image}`}
                              alt=""
                              style={{ width: "40px", height: "40px" }}
                            />
                          ) : (
                            <FaRegUserCircle className="h-9 w-9 primary_text" />
                          )}
                          <span
                            style={{ wordWrap: "break-word" }}
                            className="mr-10"
                          >
                            {item?.userId?.name}
                          </span>
                        </div>
                      </TableCell>
                    )}
                    {columns?.packageImg && (
                      <TableCell
                        style={{ width: "400px", textWrap: "break-word" }}
                      >
                        <div className="flex items-center gap-3">
                          {item?.pakageImg &&
                          item?.pakageImg !== "undefined" ? (
                            <img
                              className="rounded-lg object-cover"
                              src={`${base_url}${item?.pakageImg}`}
                              alt=""
                              style={{ width: "200px" }}
                              onError={(e) => {
                                e.target.onerror = null; // Prevent infinite loop
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "block";
                              }}
                            />
                          ) : (
                            <CiImageOn className="text-4xl text-gray-400" />
                          )}
                        </div>
                      </TableCell>
                    )}
                    {columns?.title && (
                      <TableCell>{item.contentTitle}</TableCell>
                    )}
                    {columns?.category && (
                      <TableCell>{item.category}</TableCell>
                    )}
                    {columns?.Name && <TableCell>{item.name}</TableCell>}
                    {columns?.email && <TableCell>{item.email}</TableCell>}
                    {columns?.phone && <TableCell>{item.phone}</TableCell>}

                    {columns?.passenger && (
                      <TableCell>{item?.person}</TableCell>
                    )}
                    {columns?.packageAmount && (
                      <TableCell>{item?.totalPackageAmount}</TableCell>
                    )}
                    {columns?.flightAmount && (
                      <TableCell>{item?.flightPrice}</TableCell>
                    )}
                    {columns?.totalAmount && (
                      <TableCell>{item?.toureAmount}</TableCell>
                    )}
                    {columns?.tourDate && (
                      <TableCell>
                        {moment(item.tourDate).format("DD/MM/yyyy")}
                      </TableCell>
                    )}
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
                            src={item.images[0]}
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
                    {columns?.isHome && (
                      <TableCell>{item.isHome ? "Yes" : "No"}</TableCell>
                    )}
                    {columns?.homeOrder && (
                      <TableCell>{item.homeOrder}</TableCell>
                    )}
                    {columns?.date && (
                      <TableCell>
                        {moment(item.createdAt).format("DD/MM/yyyy")}
                      </TableCell>
                    )}
                    {columns?.amount && <TableCell>{item.amount}</TableCell>}
                    {columns?.country && <TableCell>{item.country}</TableCell>}
                    {columns?.status && <TableCell>{item.status}</TableCell>}
                    {columns?.rating && <TableCell>{item?.rating}</TableCell>}
                    {columns?.comment && (
                      <TableCell>
                        {" "}
                        <div className="text-wrap">{item?.comment}</div>
                      </TableCell>
                    )}
                    {columns?.action && (
                      <TableCell>
                        <div className="flex gap-5 cursor-pointer">
                          {tableType === "package" && (
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(true);
                                setPackageId(item?._id);
                              }}
                              className="text-[#e86731] border border-[#e86731] rounded-full h-10 w-10 text-[24px] text-center flex justify-center items-center hover:bg-[#e867311e]"
                            >
                              <MdOutlinePreview />
                            </div>
                          )}
                          {tableType !== "newsLetter" &&
                            tableType !== "review" && (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`update/${item._id}`);
                                }}
                                className="text-[#1a9835] border border-[#1a9835] rounded-full h-10 w-10 text-[24px] text-center flex justify-center items-center hover:bg-[#1a983528]"
                              >
                                <FiEdit3 />
                              </div>
                            )}
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

                    {columns?.firstName && (
                      <TableCell>{item?.firstName}</TableCell>
                    )}
                    {columns?.lastName && (
                      <TableCell>{item?.lastName}</TableCell>
                    )}
                    {columns?.message && <TableCell>{item.message}</TableCell>}
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
      {/* Details Dialog for dashboard rows */}
      <Dialog open={openDetailsDialog} onClose={() => setOpenDetailsDialog(false)} maxWidth="lg" fullWidth>
        <DialogTitle style={{ fontSize: "20px", fontWeight: 600, paddingBottom: "16px" }}>
          {tableType === "order" ? "Order Details" : "Package Details"}
        </DialogTitle>
        <DialogContent dividers style={{ padding: "20px" }}>
          {detailsItem && (
            <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
              {tableType === "order" ? (
                <>
                  {/* Summary Card - Most Important Info */}
                  <div className="mb-6 p-5 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Customer</div>
                        <div className="font-bold text-lg text-gray-900">
                          {detailsItem?.userId?.firstName && detailsItem?.userId?.lastName 
                            ? `${detailsItem.userId.firstName} ${detailsItem.userId.lastName}` 
                            : (detailsItem?.userId?.name || "Guest")}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {detailsItem?.userId?.email || detailsItem?.email || "No email"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Order Total</div>
                        <div className="font-bold text-2xl text-orange-600">€{detailsItem?.toureAmount}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {detailsItem?.person} {detailsItem?.person === 1 ? "person" : "persons"}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Tour Date</div>
                        <div className="font-semibold text-lg text-gray-900">
                          {detailsItem?.tourDate ? moment(detailsItem.tourDate).format("DD MMM YYYY") : "Not set"}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          Order: {detailsItem?.createdAt ? moment(detailsItem.createdAt).format("DD MMM YYYY") : "-"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Customer Information */}
                  <div className="p-5 bg-white rounded-lg border border-gray-200 mb-4 shadow-sm">
                    <h3 className="font-semibold text-base mb-4 text-gray-800 border-b pb-2">Customer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Full Name</div>
                          <div className="text-sm font-medium">{detailsItem?.userId?.firstName && detailsItem?.userId?.lastName ? `${detailsItem.userId.firstName} ${detailsItem.userId.lastName}` : (detailsItem?.userId?.name || "Guest")}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Email Address</div>
                          <div className="text-sm">{detailsItem?.userId?.email || detailsItem?.email || "Not provided"}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Phone Number</div>
                          <div className="text-sm">{detailsItem?.userId?.phone || "Not provided"}</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {detailsItem?.userId?.address && (
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Address</div>
                            <div className="text-sm">{detailsItem.userId.address}</div>
                          </div>
                        )}
                        {(detailsItem?.userId?.city || detailsItem?.userId?.country) && (
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Location</div>
                            <div className="text-sm">
                              {detailsItem?.userId?.city && detailsItem?.userId?.country 
                                ? `${detailsItem.userId.city}, ${detailsItem.userId.country}`
                                : (detailsItem?.userId?.city || detailsItem?.userId?.country || "Not provided")}
                            </div>
                          </div>
                        )}
                        <div>
                          <div className="text-xs text-gray-500 mb-1">User ID</div>
                          <div className="text-xs font-mono text-gray-600">{detailsItem?.userId?._id || "Guest User"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Information */}
                  <div className="p-5 bg-white rounded-lg border border-gray-200 mb-4 shadow-sm">
                    <h3 className="font-semibold text-base mb-4 text-gray-800 border-b pb-2">Order Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Order ID</div>
                          <div className="text-xs font-mono text-gray-700 break-all">{detailsItem?._id}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Payment ID</div>
                          <div className="text-xs font-mono text-gray-700 break-all">{detailsItem?.paymentId}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Number of Persons</div>
                          <div className="text-sm font-medium">{detailsItem?.person}</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Package Amount</div>
                          <div className="text-sm font-semibold">€{detailsItem?.totalPackageAmount}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Flight Price</div>
                          <div className="text-sm font-semibold">€{detailsItem?.flightPrice || 0}</div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Order Date & Time</div>
                          <div className="text-sm">{detailsItem?.createdAt ? moment(detailsItem.createdAt).format("DD MMM YYYY, HH:mm") : "-"}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Package Information */}
                  {detailsItem?.packageId && (
                    <div className="p-5 bg-white rounded-lg border border-gray-200 mb-4 shadow-sm">
                      <h3 className="font-semibold text-base mb-4 text-gray-800 border-b pb-2">Package Information</h3>
                      {detailsItem.packageId.images && detailsItem.packageId.images[0] && (
                        <div className="mb-4">
                          <img src={detailsItem.packageId.images[0]} alt="Package" className="w-full max-w-md h-48 object-cover rounded-lg" />
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Package Name</div>
                            <div className="text-sm font-semibold">{detailsItem.packageId.tourName || detailsItem.packageId.destination}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Destination</div>
                            <div className="text-sm">{detailsItem.packageId.destination}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Country</div>
                            <div className="text-sm">{detailsItem.packageId.country}</div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="text-xs text-gray-500 mb-1">Duration</div>
                            <div className="text-sm font-medium">{detailsItem.packageId.tourDuration?.nights || 0} Nights & {detailsItem.packageId.tourDuration?.days || 0} Days</div>
                          </div>
                          {detailsItem.packageId.hotelName && (
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Hotel Name</div>
                              <div className="text-sm">{detailsItem.packageId.hotelName}</div>
                            </div>
                          )}
                          {detailsItem.packageId.amount && (
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Package Price</div>
                              <div className="text-sm font-semibold text-green-600">€{detailsItem.packageId.amount}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      {detailsItem.packageId.tourDescription && (
                        <div className="mb-3">
                          <div className="text-xs text-gray-500 mb-1">Description</div>
                          <p className="text-sm text-gray-700 leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>{detailsItem.packageId.tourDescription}</p>
                        </div>
                      )}
                      {detailsItem.packageId.hotelAbout && (
                        <div>
                          <div className="text-xs text-gray-500 mb-1">Hotel Information</div>
                          <p className="text-sm text-gray-700 leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>{detailsItem.packageId.hotelAbout}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Travelers */}
                  {Array.isArray(detailsItem?.travelers) && detailsItem.travelers.length > 0 && (
                    <div className="p-5 bg-white rounded-lg border border-gray-200 mb-4 shadow-sm">
                      <h3 className="font-semibold text-base mb-4 text-gray-800 border-b pb-2">Travelers ({detailsItem.travelers.length})</h3>
                      <div className="space-y-3">
                        {detailsItem.travelers.map((t, idx) => (
                          <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <div>
                                  <div className="text-xs text-gray-500 mb-1">Full Name</div>
                                  <div className="text-sm font-medium">{t.fullName || t.name} {t.lastName ? ` ${t.lastName}` : ""}</div>
                                </div>
                                {t.email && (
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">Email</div>
                                    <div className="text-sm">{t.email}</div>
                                  </div>
                                )}
                              </div>
                              <div className="space-y-2">
                                {t.phone && (
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">Phone</div>
                                    <div className="text-sm">{t.phone}</div>
                                  </div>
                                )}
                                {t.gender && (
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">Gender</div>
                                    <div className="text-sm capitalize">{t.gender}</div>
                                  </div>
                                )}
                                {t.date && (
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">Date of Birth</div>
                                    <div className="text-sm">{moment(t.date).format("DD MMM YYYY")}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Flights */}
                  {Array.isArray(detailsItem?.flight) && detailsItem.flight.length > 0 && (
                    <div className="p-5 bg-white rounded-lg border border-gray-200 mb-4 shadow-sm">
                      <h3 className="font-semibold text-base mb-4 text-gray-800 border-b pb-2">Flight Details</h3>
                      <div className="space-y-3">
                        {detailsItem.flight.map((f, idx) => (
                          <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <div>
                                  <div className="text-xs text-gray-500 mb-1">Route</div>
                                  <div className="text-sm font-semibold">{f.flightFrom} → {f.flightTo}</div>
                                </div>
                                {f.departureTime && (
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">Departure Time</div>
                                    <div className="text-sm">{f.departureTime}</div>
                                  </div>
                                )}
                              </div>
                              <div className="space-y-2">
                                {f.arrivalTime && (
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">Arrival Time</div>
                                    <div className="text-sm">{f.arrivalTime}</div>
                                  </div>
                                )}
                                {f.price && (
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">Price</div>
                                    <div className="text-sm font-semibold text-green-600">€{f.price}</div>
                                  </div>
                                )}
                                {f.flightClass && (
                                  <div>
                                    <div className="text-xs text-gray-500 mb-1">Class</div>
                                    <div className="text-sm capitalize">{f.flightClass}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Insurance */}
                  {Array.isArray(detailsItem?.insurance) && detailsItem.insurance.filter(i => Number(i?.price) > 0).length > 0 && (
                    <div className="p-5 bg-white rounded-lg border border-gray-200 mb-4 shadow-sm">
                      <h3 className="font-semibold text-base mb-4 text-gray-800 border-b pb-2">Insurance</h3>
                      <div className="space-y-3">
                        {detailsItem.insurance.filter(i => Number(i?.price) > 0).map((ins, idx) => (
                          <div key={idx} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="text-sm font-semibold mb-1">{ins.insuranceName}</div>
                                {ins.description && (
                                  <div className="text-xs text-gray-600">{ins.description}</div>
                                )}
                              </div>
                              <div className="text-sm font-bold text-green-600 ml-4">€{ins.price}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    {detailsItem?.images?.[0] && (
                      <img src={detailsItem.images[0]} alt="pkg" style={{ width: 90, height: 60, objectFit: "cover", borderRadius: 6 }} />
                    )}
                    <div>
                      <div className="font-semibold">{detailsItem?.destination}</div>
                      <div className="text-sm text-gray-600">{detailsItem?.country}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div><strong>Duration:</strong> {detailsItem?.tourDuration?.nights} Nights & {detailsItem?.tourDuration?.days} Days</div>
                    <div><strong>Amount:</strong> {detailsItem?.amount}</div>
                    <div><strong>Created At:</strong> {moment(detailsItem?.createdAt).format("DD/MM/yyyy")}</div>
                    <div><strong>Package ID:</strong> {detailsItem?._id}</div>
                  </div>
                  {detailsItem?.hotelAbout && (
                    <div>
                      <strong>About Hotel:</strong>
                      <p className="text-sm text-gray-700 mt-1" style={{ whiteSpace: "pre-wrap" }}>{detailsItem.hotelAbout}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetailsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
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
