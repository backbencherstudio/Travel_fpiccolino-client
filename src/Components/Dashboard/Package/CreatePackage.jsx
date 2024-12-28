import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import CustomIcons from "./CustomIcons";
import { TextField } from "@mui/material";
import { FaRegSquarePlus } from "react-icons/fa6";
import FlightBookingForm from "./FlightForm";
import { Controller, useForm } from "react-hook-form";
import InsuranceForm from "./InsuranceForm";
import CustomDashboardButton from "../../../Shared/CustomDashboardButton";
import SelectCategory from "./SelectCategory";
import { DeleteOutlined } from "@mui/icons-material";
import { FaPlusSquare } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { createPackage } from "../../../features/pckage/packageSlice";
const CreatePackage = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, control } = useForm();
  const [selectedIncludeItems, setSelectedIncludeItems] = useState([]);
  const [selectedNotIncludeItems, setSelectedNotIncludeItems] = useState([]);
  const [openFlightModal, setOpenFlightModal] = useState(false);
  const [openInsuranceModal, setOpenInsuranceModal] = useState(false);
  const [bookedFlights, setBookedFlights] = useState([]);
  const [insurance, setInsurance] = useState([]);
  const [category, setCategory] = useState("All inclusive");
  const [images, setImages] = useState([]);
  const [updateImageIndex, setUpdateImageIndex] = useState(null);
  const [includeIconName, setIncludeIconName] = useState([]);
  const [notIncludeIconName, setNotIncludeIconName] = useState([]);

  // console.log({insurance});
  

  const onSubmit = async (data) => {

    const packageData = {
      ...data,
      tourDate: data.tourDate,
      includeItems: includeIconName,
      notIncludeItems: notIncludeIconName,
      insurance,
      bookedFlights,
      category,
      images,
    };

    try {
      const response = await dispatch(createPackage(packageData));
      console.log("responce", response);

    } catch (error) {
      console.error("Error creating package:", error);
      alert("Failed to create package. Please try again.");
    }
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

  return (
    <div>
      <CustomHeadingDashboard />

      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex justify-between mt-20">
          <h1 className="text-[24px] font-semibold">Create Package</h1>
          <div className=" flex justify-end">
            <CustomDashboardButton content={<p> Create Package</p>} />
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-5 mt-5">
          <div className="md:col-span-3">
            <div className="border p-4 rounded-2xl">
              <h2 className="text-[20px] font-medium ">General Information</h2>

              <p className="text-[16px] mt-3">Tour Name</p>
              <input
                {...register("tourName")}
                type="text"
                placeholder="Write Tour Name...."
                className="border rounded-md w-full p-1 mt-1 text-[#666666]"
              />

              <p className="text-[16px] mt-3">Tour Description</p>
              <input
                {...register("tourDescription")}
                type="text"
                placeholder="Write Description...."
                className="border rounded-md w-full p-1 mt-1 text-[#666666]"
              />

              <div className="grid grid-cols-2 gap-10 mt-3">
                <div>
                  <p className="text-[16px] mb-2">Tour Date</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="tourDate"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          label="Tour Date"
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
                iconName={includeIconName}
                setIconName={setIncludeIconName}
              />
            </div>

            <div className="border p-4 rounded-2xl mt-5">
              <h2 className="text-[20px] font-medium ">Not Include</h2>
              <CustomIcons
                title="not include"
                selectedIcons={selectedNotIncludeItems}
                setSelectedIcons={setSelectedNotIncludeItems}
                iconName={notIncludeIconName}
                setIconName={setNotIncludeIconName}
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
              <SelectCategory category={category} setCategory={setCategory} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePackage;
