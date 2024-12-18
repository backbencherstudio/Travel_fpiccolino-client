import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import CustomIcons from "./CustomIcons";
import { TextField } from "@mui/material";
import { FaRegSquarePlus } from "react-icons/fa6";
import FlightBookingForm from "./FlightForm";
const CreatePackage = () => {
  const [selectedInclueItems, setSelectedIncludeItems] = useState([]);
  const [selectedNotInclueItems, setSelectedNotIncludeItems] = useState([]);
  const [openFlightModal, setOpenFlightModal] = useState(false);
  return (
    <div>
      <CustomHeadingDashboard />
      <div className="flex justify-between mt-20">
        <h1 className="text-[24px] font-semibold">Create Package</h1>
        <button className="text-[16px] primary_bg text-white font-medium rounded-md px-4 py-2">
          Upload Package
        </button>
      </div>
      <div className="grid grid-cols-5 gap-5 mt-5">
        <div className="col-span-3">
          <div className="border p-4 rounded-2xl">
            <h2 className="text-[20px] font-medium ">Generel Information</h2>
            <p className="text-[16px] mt-3">Tour Name</p>
            <input
              type="text"
              placeholder="Write Tour Name...."
              className="border rounded-md w-full p-1 mt-1  text-[#666666]"
            />
            <p className="text-[16px] mt-3">Tour Description</p>
            <input
              type="text"
              placeholder="Write Description...."
              className="border rounded-md w-full p-1 mt-1  text-[#666666]"
            />
            <div className="grid grid-cols-2 gap-10 mt-3">
              <div className="">
                <p className="text-[16px]">Tour Date</p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      label="Tour Date"
                      slotProps={{ textField: { size: "small" } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div>
                <p className="text-[16px] ">Tour Duration</p>
                <div className="flex mt-2 gap-1">
                  <TextField size="small" placeholder="Night" type="number" />
                  <TextField size="small" placeholder="Day" type="number" />
                </div>
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-2xl mt-5">
            <h2 className="text-[20px] font-medium ">Include Travel</h2>
            <CustomIcons
              title="include"
              selectedIcons={selectedInclueItems}
              setSelectedIcons={setSelectedIncludeItems}
            />
          </div>
          <div className="border p-4 rounded-2xl mt-5">
            <h2 className="text-[20px] font-medium ">Not Include</h2>
            <CustomIcons
              title="not include"
              selectedIcons={selectedNotInclueItems}
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
            />
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
};

export default CreatePackage;
