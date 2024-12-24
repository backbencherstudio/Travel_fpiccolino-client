/* eslint-disable react/prop-types */
import { useState } from "react";
import { TextField, Grid, Typography, Slider, Box, Modal } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DeleteOutlineOutlined } from "@mui/icons-material";

const FlightBookingForm = ({
  openModal,
  setOpenModal,
  setBookedFlights,
  bookedFlights,
}) => {
  const [formData, setFormData] = useState({
    flyingFrom: "",
    flyingTo: "",
    departureTime: null,
    arrivalTime: null,
    breakTime: null,
    flightClass: "",
    price: 500,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTimeChange = (key, newValue) => {
    setFormData({
      ...formData,
      [key]: newValue,
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
    e.stopPropagation();
    // Add the current flight data to the bookedFlights state
    setBookedFlights([
      ...bookedFlights,
      { ...formData, id: bookedFlights.length + 1 },
    ]);

    // Reset form after submission
    setFormData({
      flyingFrom: "",
      flyingTo: "",
      departureTime: null,
      arrivalTime: null,
      breakTime: null,
      flightClass: "",
      price: 500,
    });
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    // Remove the flight with the given id from the bookedFlights array
    setBookedFlights(bookedFlights.filter((flight) => flight.id !== id));
  };

  const formatTime = (time) => {
    return time?.format("HH:mm") || "N/A";
  };

  const getSliderMarks = (flight) => {
    const marks = [
      {
        value: 0,
        label: `${formatTime(flight.departureTime)}`,
      },
      {
        value: 50,
        label: flight.breakTime
          ? `Break: ${formatTime(flight.breakTime)}`
          : "No Break",
      },
      {
        value: 100,
        label: `${formatTime(flight.arrivalTime)}`,
      },
    ];
    return marks;
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
              Flight Booking Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Flying From */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Flying From"
                    name="flyingFrom"
                    value={formData.flyingFrom}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                {/* Flying To */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Flying To"
                    name="flyingTo"
                    value={formData.flyingTo}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Grid>

                {/* Departure Time */}
                <Grid item xs={12} sm={6}>
                  <TimePicker
                    label="Departure Time"
                    value={formData.departureTime}
                    onChange={(newValue) =>
                      handleTimeChange("departureTime", newValue)
                    }
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Grid>

                {/* Arrival Time */}
                <Grid item xs={12} sm={6}>
                  <TimePicker
                    label="Arrival Time"
                    value={formData.arrivalTime}
                    onChange={(newValue) =>
                      handleTimeChange("arrivalTime", newValue)
                    }
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Grid>

                {/* Break Time */}
                <Grid item xs={12}>
                  <TimePicker
                    label="Break Time"
                    value={formData.breakTime}
                    onChange={(newValue) =>
                      handleTimeChange("breakTime", newValue)
                    }
                    renderInput={(params) => (
                      <TextField {...params} fullWidth />
                    )}
                  />
                </Grid>

                {/* Price Range */}
                <Grid item xs={12}>
                  <Typography gutterBottom>Price Per Person</Typography>
                  <Slider
                    value={formData.price}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `€${value}`}
                    color="warning"
                    min={100}
                    max={5000}
                    step={50}
                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <button
                    type="submit"
                    className="primary_bg w-full text-white font-semibold text-[16px] py-2 rounded-md hover:opacity-90"
                  >
                    Add Flight
                  </button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Modal>

        {/* Display Booked Flights */}
        {bookedFlights.length > 0 ? (
          <Box mt={1}>
            {bookedFlights.map((flight) => (
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
                  <div>
                    Price Per Person:{" "}
                    <span className="primary_text">€{flight.price}</span>
                  </div>

                  <DeleteOutlineOutlined
                    onClick={() => handleDelete(flight.id)}
                    className="text-red-500 cursor-pointer"
                  />
                </Typography>
                <div className="flex justify-between mt-5">
                  <p className="font-semibold text-[20px]">
                    {flight.flyingFrom}
                  </p>
                  <p className="font-semibold text-[20px]">{flight.flyingTo}</p>
                </div>

                <Slider
                  defaultValue={50}
                  valueLabelDisplay="auto"
                  marks={getSliderMarks(flight)}
                  min={0}
                  max={100}
                  step={null}
                  disabled
                  sx={{
                    "& .MuiSlider-thumb": {
                      backgroundColor: "#e86731",
                    },
                    "& .MuiSlider-markLabel": {
                      fontSize: ".75rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <p
            onClick={() => setOpenModal(true)}
            className="text-center mt-4 border py-5 border-dashed text-gray-400 rounded-lg cursor-pointer"
          >
            Add A Flight
          </p>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default FlightBookingForm;
