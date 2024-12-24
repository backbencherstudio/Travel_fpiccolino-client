/* eslint-disable react/prop-types */
import { useState } from "react";
import { TextField, Grid, Typography, Slider, Box, Modal } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DeleteOutlineOutlined } from "@mui/icons-material";

const InsuranceForm = ({
  openModal,
  setOpenModal,
  setInsurance,
  insurance,
}) => {
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

  const handleSliderChange = (e, newValue) => {
    setFormData({
      ...formData,
      price: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation()
      // Add the current flight data to the insurance state
      .setInsurance([...insurance, { ...formData, id: insurance.length + 1 }]);

    // Reset form after submission
    setFormData({
      InsuranceName: "",
      description: "",
      price: 500,
    });
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    // Remove the flight with the given id from the insurance array
    setInsurance(insurance.filter((flight) => flight.id !== id));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        className="form-container"
        style={{ padding: "", maxWidth: "800px", margin: "0 auto" }}
      >
        {/* Modal for Form */}
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
              Insurance Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Flying From */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Insurance Name"
                    name="InsuranceName"
                    value={formData.InsuranceName}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                {/* Flying To */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                {/* Price Range */}
                <Grid item xs={12}>
                  <Typography gutterBottom>Price</Typography>
                  <Slider
                    value={formData.price}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `€${value}`}
                    color="warning"
                    min={10}
                    max={100}
                    step={5}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <button
                    type="submit"
                    className="primary_bg w-full text-white font-semibold text-[16px] py-2 rounded-md hover:opacity-90"
                  >
                    Add Insurance
                  </button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>

        {/* Display Booked Flights */}
        {insurance.length > 0 ? (
          <Box mt={1}>
            {insurance.map((flight) => (
              <Box
                key={flight.id}
                sx={{
                  border: "1px solid #ddd",
                  padding: "16px",
                  marginY: "16px",
                  paddingInline: "24px",
                  marginBottom: "16px",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
                  overflow: "wrap", // Prevent content overflow
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className="flex justify-between"
                >
                  <div className=" mt-5">
                    <p className="text-[#141D2A] text-[14px]">
                      Insurance Name :{" "}
                      <span className="text-[#72777F]">
                        {flight.InsuranceName}
                      </span>
                    </p>
                    <p className="text-[#141D2A] text-[14px]">Description :</p>
                    <p className="text-[#72777F]">{flight.description}</p>
                    <div className="text-[#141D2A] text-[14px]">
                      Price:{" "}
                      <span className="primary_text">€{flight.price}</span>
                    </div>
                  </div>
                  <DeleteOutlineOutlined
                    onClick={() => handleDelete(flight.id)}
                    className="text-red-500 cursor-pointer"
                  />
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <p
            onClick={() => setOpenModal(true)}
            className="text-center mt-4 border py-5 border-dashed text-gray-400 rounded-lg cursor-pointer"
          >
            Add Insurance
          </p>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default InsuranceForm;
