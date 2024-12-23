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
const CreatePackage = () => {
  const { register, handleSubmit, control } = useForm();
  const [selectedIncludeItems, setSelectedIncludeItems] = useState([]);
  const [selectedNotIncludeItems, setSelectedNotIncludeItems] = useState([]);
  const [openFlightModal, setOpenFlightModal] = useState(false);
  const [bookedFlights, setBookedFlights] = useState([]);
  const [openInsuranceModal, setOpenInsuranceModal] = useState(false);
  const [insurance, setInsurance] = useState([]);
  const [category, setCategory] = useState("All inclusive");
  const onSubmit = (data) => {
    const packageData = {
      includeItems: selectedIncludeItems,
      notIncludeItems: selectedNotIncludeItems,
      bookedFlights,
      ...data,
    };
    console.log("Form Data:", packageData);
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
                  <p className="text-[16px]">Tour Date</p>
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
                  Upload Img
                </h2>
                <img
                  className="h-[400px] object-cover rounded-lg"
                  src=""
                  alt="Placeholder"
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
