import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import CustomIcons from "./CustomIcons";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { FaRegSquarePlus } from "react-icons/fa6";
import FlightBookingForm from "./FlightForm";
import { Controller, useForm } from "react-hook-form";
import InsuranceForm from "./InsuranceForm";
import CustomDashboardButton from "../../../Shared/CustomDashboardButton";
import SelectCategory from "./SelectCategory";
import { DeleteOutlined } from "@mui/icons-material";
import { FaPlusSquare } from "react-icons/fa";
import CountryDropdown from "./SelectCountry";
import { useDispatch, useSelector } from "react-redux";
import {
  getPackageDetails,
  resetPackageDetails,
} from "../../../features/pckage/packageSlice";
import { useParams } from "react-router-dom";
const UpdatePackage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [selectedIncludeItems, setSelectedIncludeItems] = useState([]);
  const [selectedNotIncludeItems, setSelectedNotIncludeItems] = useState([]);
  const [openFlightModal, setOpenFlightModal] = useState(false);
  const [bookedFlights, setBookedFlights] = useState([]);
  const [openInsuranceModal, setOpenInsuranceModal] = useState(false);
  const [insurance, setInsurance] = useState([]);
  const [category, setCategory] = useState("All inclusive");
  const [images, setImages] = useState([]);
  const [updateImageIndex, setUpdateImageIndex] = useState(null);
  const [hotelImages, setHotelImages] = useState([]); // State for hotel images
  const [hotelName, setHotelName] = useState(""); // State for hotel name
  const [hotelAbout, setHotelAbout] = useState("");
  const [updateHotelImageIndex, setUpdateHotelImageIndex] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const { packageDetails } = useSelector((state) => state.package);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    dispatch(resetPackageDetails());
    dispatch(getPackageDetails(params.id));
  }, [dispatch, params.id]);

  const onSubmit = (data) => {
    const packageData = {
      includeItems: selectedIncludeItems,
      notIncludeItems: selectedNotIncludeItems,
      bookedFlights,
      category,
      images,
      ...data,
    };
    console.log("Form Data:", packageData);
  };
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (updateImageIndex !== null) {
      setImages((prevImages) =>
        prevImages.map((img, i) => (i === updateImageIndex ? files[0] : img))
      );
      setUpdateImageIndex(null);
    } else {
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handleDeleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleUpdateImage = (index) => {
    setUpdateImageIndex(index);
    document.getElementById("imageUpdateInput").click();
  };
  const handleHotelImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (updateHotelImageIndex !== null) {
      setHotelImages((prevImages) =>
        prevImages.map((img, i) =>
          i === updateHotelImageIndex ? files[0] : img
        )
      );
      setUpdateHotelImageIndex(null);
    } else {
      setHotelImages((prevImages) => [...prevImages, ...files]);
    }
  };
  const handleDeleteHotelImage = (index) => {
    setHotelImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  const handleUpdateHotelImage = (index) => {
    setUpdateHotelImageIndex(index);
    document.getElementById("imageUpdateInput").click();
  };

  return (
    <div>
      <CustomHeadingDashboard />

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex justify-between mt-20">
          <h1 className="text-[24px] font-semibold">Update Package</h1>
          <div className=" flex justify-end">
            <CustomDashboardButton content={<p> Update Package</p>} />
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-5 mt-5">
          <div className="md:col-span-3">
            <div className="border p-4 rounded-2xl">
              <h2 className="text-[20px] font-medium ">General Information</h2>

              <p className="text-[16px] mt-3">Tour Name</p>
              <input
                {...register("tourName")}
                defaultValue={packageDetails?.tourName}
                type="text"
                placeholder="Write Tour Name...."
                className="border rounded-md w-full p-1 mt-1 text-[#333333]"
              />

              <p className="text-[16px] mt-3">Tour Description</p>
              <textarea
                {...register("tourDescription")}
                defaultValue={packageDetails?.tourDescription}
                type="text"
                placeholder="Write Description...."
                className="border rounded-md w-full p-1 mt-1 text-[#333333]"
              />

              <div className="grid grid-cols-2 gap-10 mt-3">
                <div>
                  <p className="text-[16px] mb-2">Tour Date</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="tourDate"
                      control={control}
                      defaultValue={dayjs(packageDetails?.tourDate)}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          label="Tour Date"
                          value={field.value || dayjs(packageDetails?.tourDate)}
                          object
                          onChange={(date) => field.onChange(date)}
                          slotProps={{ textField: { size: "small" } }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>

                <div>
                  <p className="text-[16px]">Tour Duration</p>
                  <div className="flex mt-2 gap-1">
                    <Controller
                      name="tourDuration.nights"
                      control={control}
                      defaultValue={packageDetails?.tourDuration?.nights || ""} // Ensure defaultValue is provided directly to the Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size="small"
                          placeholder="Night"
                          type="number"
                        />
                      )}
                    />

                    <Controller
                      name="tourDuration.days"
                      control={control}
                      defaultValue={packageDetails?.tourDuration?.days || ""} // Ensure defaultValue is provided directly to the Controller
                      render={({ field }) => (
                        <TextField
                          {...field}
                          size="small"
                          placeholder="Day"
                          type="number"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border p-4 rounded-2xl mt-5">
              <h2 className="text-[20px] font-medium ">Include Travel</h2>
              <CustomIcons
                title="include"
                selectedIcons={selectedIncludeItems}
                setSelectedIcons={setSelectedIncludeItems}
              />
            </div>

            <div className="border p-4 rounded-2xl mt-5">
              <h2 className="text-[20px] font-medium ">Not Include</h2>
              <CustomIcons
                title="not include"
                selectedIcons={selectedNotIncludeItems}
                setSelectedIcons={setSelectedNotIncludeItems}
              />
            </div>

            <div className="border p-4 rounded-2xl mt-5">
              <div className="flex justify-between items-center">
                <h2 className="text-[20px] font-medium ">Flight</h2>
                <FaRegSquarePlus
                  onClick={() => setOpenFlightModal(true)}
                  className="text-xl primary_text cursor-pointer"
                />
              </div>
              <FlightBookingForm
                openModal={openFlightModal}
                setOpenModal={setOpenFlightModal}
                setBookedFlights={setBookedFlights}
                bookedFlights={bookedFlights}
              />
            </div>
            <div className="border p-4 rounded-2xl mt-5">
              <div className="flex justify-between items-center">
                <h2 className="text-[20px] font-medium ">Insurance</h2>
                <FaRegSquarePlus
                  onClick={() => setOpenInsuranceModal(true)}
                  className="text-xl primary_text cursor-pointer"
                />
              </div>
              <InsuranceForm
                openModal={openInsuranceModal}
                setOpenModal={setOpenInsuranceModal}
                setInsurance={setInsurance}
                insurance={insurance}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="">
              <div className="border rounded-lg p-4 mb-4">
                <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
                  Upload Images
                </h2>

                {/* Big Image */}
                {images.length > 0 && (
                  <div className="relative mb-4">
                    <img
                      className="h-[400px] w-full object-cover rounded-lg cursor-pointer"
                      src={URL.createObjectURL(images[0])}
                      alt={`Preview 0`}
                      onClick={() => handleUpdateImage(0)}
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:opacity-90"
                      onClick={() => handleDeleteImage(0)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                )}

                {/* Small Images */}
                <div className="grid grid-cols-4 gap-4">
                  {images.slice(1).map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        className="h-[100px] w-full object-cover rounded-lg cursor-pointer"
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${index + 1}`}
                        onClick={() => handleUpdateImage(index + 1)}
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:opacity-90"
                        onClick={() => handleDeleteImage(index + 1)}
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  ))}
                  <div className="relative inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center bg-[#fdf0ea] text-white rounded-lg cursor-pointer h-[100px] w-full">
                      <FaPlusSquare className="primary_text h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Hidden Update Input */}
                <input
                  id="imageUpdateInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
            <div className="border rounded-lg p-4 my-4">
              <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
                Hotel Information
              </h2>

              <p className="text-[16px] mt-3">Hotel Name</p>
              <input
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                type="text"
                placeholder="Write Hotel Name...."
                className="border rounded-md w-full p-1 mt-1 text-[#666666]"
              />

              <p className="text-[16px] mt-3">Hotel About</p>
              <textarea
                value={hotelAbout}
                onChange={(e) => setHotelAbout(e.target.value)}
                placeholder="Write Hotel Description...."
                className="border rounded-md w-full p-1 mt-1 text-[#666666]"
              />

              <div className="border rounded-lg p-4 mb-4">
                <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
                  Upload Hotel Images
                </h2>

                {/* Big Image */}
                {hotelImages.length > 0 && (
                  <div className="relative mb-4">
                    <img
                      className="h-[400px] w-full object-cover rounded-lg cursor-pointer"
                      src={URL.createObjectURL(hotelImages[0])}
                      alt={`Preview 0`}
                      onClick={() => handleUpdateHotelImage(0)}
                    />
                    <button
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:opacity-90"
                      onClick={() => handleDeleteHotelImage(0)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                )}

                {/* Small Images */}
                <div className="grid grid-cols-4 gap-4">
                  {hotelImages.slice(1).map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        className="h-[100px] w-full object-cover rounded-lg cursor-pointer"
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${index + 1}`}
                        onClick={() => handleUpdateHotelImage(index + 1)}
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:opacity-90"
                        onClick={() => handleDeleteHotelImage(index + 1)}
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  ))}
                  <div className="relative inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleHotelImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center bg-[#fdf0ea] text-white rounded-lg cursor-pointer h-[100px] w-full">
                      <FaPlusSquare className="primary_text h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Hidden Update Input */}
                <input
                  id="imageUpdateInput"
                  type="file"
                  accept="image/*"
                  onChange={handleHotelImageUpload}
                  className="hidden"
                />
              </div>
            </div>
            <CountryDropdown
              value={selectedCountry}
              setValue={setSelectedCountry}
            />
            <SelectCategory category={category} setCategory={setCategory} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePackage;
