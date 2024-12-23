import { useState } from "react";
import CustomDashboardButton from "../../../Shared/CustomDashboardButton";
import { FaRegSquarePlus } from "react-icons/fa6";
import { Box, Grid, Modal, TextField, Typography } from "@mui/material";
const SelectCategory = ({ category, setCategory }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    InsuranceName: "",
    description: "",
    departureTime: null,
    arrivalTime: null,
    breakTime: null,
    flightClass: "",
    price: 30,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  return (
    <div>
      <div className="border rounded-lg p-4 mb-4">
        <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
          Category
        </h2>
        <h2 className="text-[#141D2A] mb-6">Blog Category</h2>
        <select
          style={{
            width: "100%",
            padding: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            border: "1px solid #e86731",
            borderRadius: "4px",
            color: "#e86731",
          }}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All inclusive">All inclusive</option>
        </select>
        <div className="mt-3 flex justify-end">
          <CustomDashboardButton
            handleSubmit={handleOpenModal}
            content={
              <div className="flex items-center gap-1.5 ">
                <FaRegSquarePlus className="text-xl" /> Add Category
              </div>
            }
          />
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="flight-booking-modal"
        aria-describedby="form-for-flight-booking"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: "90%",
            maxWidth: "500px",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Add New Category
          </Typography>
          <Grid container spacing={2}>
            {/* Flying From */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                name="InsuranceName"
                value={formData.InsuranceName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <button
                type="submit"
                className="primary_bg w-full text-white font-semibold text-[16px] py-2 rounded-md hover:opacity-90"
              >
                Add Category
              </button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default SelectCategory;
