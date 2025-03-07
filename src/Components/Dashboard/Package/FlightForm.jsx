/* eslint-disable react/prop-types */
import { useState } from "react";
import { TextField, Grid, Typography, Slider, Box, Modal } from "@mui/material";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";

import { DeleteOutlineOutlined } from "@mui/icons-material";

const FlightBookingForm = ({
  openModal,
  setOpenModal,
  setBookedFlights,
  bookedFlights,
}) => {
  const [formData, setFormData] = useState({
    flightType: "single",
    flightFrom: "",
    flightTo: "",
    departureTime: null,
    arrivalTime: null,
    duration1: { hours: 2, minutes: 0 },
    flightFrom2: "",
    flightTo2: "",
    departureTime2: null,
    arrivalTime2: null,
    duration2: { hours: 2, minutes: 0 },
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

  const handleDurationChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [type]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add the current flight data to the bookedFlights state
    const formattedFormData = {
      ...formData,
      departureTime: formData.departureTime
        ? formData.departureTime.format("HH:mm")
        : null,
      arrivalTime: formData.arrivalTime
        ? formData.arrivalTime.format("HH:mm")
        : null,
      departureTime2: formData.departureTime2
        ? formData.departureTime2.format("HH:mm")
        : null,
      arrivalTime2: formData.arrivalTime2
        ? formData.arrivalTime2.format("HH:mm")
        : null,
      duration1: `${formData.duration1.hours}h ${formData.duration1.minutes}m`,
      duration2: `${formData.duration2.hours}h ${formData.duration2.minutes}m`,
    };

    // Add the current flight data to the bookedFlights state
    setBookedFlights([
      ...bookedFlights,
      { ...formattedFormData, id: bookedFlights.length + 1 },
    ]);
    // Reset form after submission
    setFormData({
      flightType: "single",
      flightFrom: "",
      flightTo: "",
      departureTime: null,
      arrivalTime: null,
      flightFrom2: "",
      flightTo2: "",
      departureTime2: null,
      arrivalTime2: null,
      duration1: { hours: 2, minutes: 0 },
      duration2: { hours: 2, minutes: 0 },
      price: 500,
    });
    setOpenModal(false);
  };

  const handleDelete = (id) => {
    // Remove the flight with the given id from the bookedFlights array
    setBookedFlights(
      bookedFlights.filter(
        (flight) => (flight._id ? flight._id : flight.id) !== id
      )
    );
  };

  const calculateDuration = (departureTime, arrivalTime) => {
    let start = moment(departureTime, "HH:mm");
    let end = moment(arrivalTime, "HH:mm");

    // If end time is before start time, assume it's the next day
    if (end.isBefore(start)) {
      end.add(1, "days");
    }

    const duration = moment.duration(end.diff(start));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    return `${hours}h ${minutes}m`;
  };

  const getSliderMarks = (flight) => {
    const duration = calculateDuration(
      flight.departureTime,
      flight.arrivalTime
    );

    const marks = [
      {
        value: 0,
        label: `${flight.departureTime}`,
      },
      {
        value: 50,
        label: `Duration: ${duration}`,
      },
      {
        value: 100,
        label: `${flight.arrivalTime}`,
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
              maxWidth: formData.flightType === "multiple" ? "900px" : "500px",
              maxHeight: "90vh",
              overflowY: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#e86731",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#d45a2a",
              },
            }}
          >
            <Typography variant="h5" gutterBottom>
              Flight Booking Form
            </Typography>
            <form onSubmit={handleSubmit} className="overflow-y-auto">
              <Grid container spacing={2} sx={{ pb: 2 }}>
                {/* Flight Type Selection */}
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>
                    Flight Type
                  </Typography>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        className="accent-orange-500"
                        name="flightType"
                        value="single"
                        checked={formData.flightType === "single"}
                        onChange={handleChange}
                      />
                      Single Flight
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="flightType"
                        className="accent-orange-500"
                        value="multiple"
                        checked={formData.flightType === "multiple"}
                        onChange={handleChange}
                      />
                      Multiple Flights
                    </label>
                  </div>
                </Grid>

                {/* Create two columns for multiple flights */}
                {formData.flightType === "multiple" ? (
                  <>
                    {/* First Flight Column */}
                    <Grid item xs={12} md={6} sx={{ pr: { md: 2 } }}>
                      <Typography variant="subtitle1" gutterBottom>
                        First Flight
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Flight From"
                            name="flightFrom"
                            value={formData.flightFrom}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Flight To"
                            name="flightTo"
                            value={formData.flightTo}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TimePicker
                            label="Departure Time"
                            value={formData.departureTime}
                            onChange={(newValue) =>
                              handleTimeChange("departureTime", newValue)
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TimePicker
                            label="Arrival Time"
                            value={formData.arrivalTime}
                            onChange={(newValue) =>
                              handleTimeChange("arrivalTime", newValue)
                            }
                          />
                        </Grid>
                        <Grid item xs={12} marginLeft={2}>
                          <Typography variant="subtitle2" gutterBottom>
                            Flight Duration
                          </Typography>
                          <div className=" grid grid-cols-2 gap-4">
                            <div>
                              <Typography variant="body2" color="textSecondary">
                                Hours: {formData.duration1.hours}
                              </Typography>
                              <Slider
                                value={formData.duration1.hours}
                                onChange={(_, value) =>
                                  handleDurationChange(
                                    "hours",
                                    "duration1",
                                    value
                                  )
                                }
                                min={0}
                                max={24}
                                step={1}
                                color="warning"
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `${value}h`}
                              />
                            </div>
                            <div>
                              <Typography variant="body2" color="textSecondary">
                                Minutes: {formData.duration1.minutes}
                              </Typography>
                              <Slider
                                value={formData.duration1.minutes}
                                onChange={(_, value) =>
                                  handleDurationChange(
                                    "minutes",
                                    "duration1",
                                    value
                                  )
                                }
                                min={0}
                                max={59}
                                step={5}
                                color="warning"
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `${value}m`}
                              />
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Second Flight Column */}
                    <Grid item xs={12} md={6} sx={{ pl: { md: 2 } }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Second Flight
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Flight From"
                            name="flightFrom2"
                            value={formData.flightFrom2}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Flight To"
                            name="flightTo2"
                            value={formData.flightTo2}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TimePicker
                            label="Departure Time"
                            value={formData.departureTime2}
                            onChange={(newValue) =>
                              handleTimeChange("departureTime2", newValue)
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TimePicker
                            label="Arrival Time"
                            value={formData.arrivalTime2}
                            onChange={(newValue) =>
                              handleTimeChange("arrivalTime2", newValue)
                            }
                          />
                        </Grid>
                        <Grid item xs={12} marginRight={2}>
                          <Typography variant="subtitle2" gutterBottom>
                            Flight Duration
                          </Typography>
                          <div className=" grid grid-cols-2 gap-4">
                            <div>
                              <Typography variant="body2" color="textSecondary">
                                Hours: {formData.duration2.hours}
                              </Typography>
                              <Slider
                                value={formData.duration2.hours}
                                onChange={(_, value) =>
                                  handleDurationChange(
                                    "hours",
                                    "duration2",
                                    value
                                  )
                                }
                                min={0}
                                max={24}
                                step={1}
                                color="warning"
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `${value}h`}
                              />
                            </div>
                            <div>
                              <Typography variant="body2" color="textSecondary">
                                Minutes: {formData.duration2.minutes}
                              </Typography>
                              <Slider
                                value={formData.duration2.minutes}
                                onChange={(_, value) =>
                                  handleDurationChange(
                                    "minutes",
                                    "duration2",
                                    value
                                  )
                                }
                                min={0}
                                max={59}
                                step={5}
                                color="warning"
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `${value}m`}
                              />
                            </div>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                ) : (
                  <>
                    {/* First Flight Fields */}
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" gutterBottom>
                        First Flight
                      </Typography>
                    </Grid>

                    {/* Flight From */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Flight From"
                        name="flightFrom"
                        value={formData.flightFrom}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </Grid>

                    {/* Flight To */}
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Flight To"
                        name="flightTo"
                        value={formData.flightTo}
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
                      />
                    </Grid>
                    {/* Duration for first flight */}
                    <Grid item xs={12} marginInline={2}>
                      <Typography variant="subtitle1" gutterBottom>
                        Flight Duration
                      </Typography>
                      <div className=" grid grid-cols-2 gap-4">
                        <div>
                          <Typography variant="body2" color="textSecondary">
                            Hours: {formData.duration1.hours}
                          </Typography>
                          <Slider
                            value={formData.duration1.hours}
                            onChange={(_, value) =>
                              handleDurationChange("hours", "duration1", value)
                            }
                            min={0}
                            max={24}
                            step={1}
                            color="warning"
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `${value}h`}
                          />
                        </div>
                        <div>
                          <Typography variant="body2" color="textSecondary">
                            Minutes: {formData.duration1.minutes}
                          </Typography>
                          <Slider
                            value={formData.duration1.minutes}
                            onChange={(_, value) =>
                              handleDurationChange(
                                "minutes",
                                "duration1",
                                value
                              )
                            }
                            min={0}
                            max={59}
                            step={5}
                            color="warning"
                            valueLabelDisplay="auto"
                            valueLabelFormat={(value) => `${value}m`}
                          />
                        </div>
                      </div>
                    </Grid>
                  </>
                )}

                {/* Price Range */}
                <Grid item xs={12} marginInline={2}>
                  <Typography gutterBottom>Price Per Person</Typography>
                  <Slider
                    value={formData.price}
                    onChange={handleSliderChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `€${value}`}
                    color="warning"
                    min={0}
                    max={10000}
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
                  border: "1px solid orange",
                  padding: "16px",
                  marginY: "16px",
                  paddingInline: "24px",
                  marginBottom: "16px",
                  borderRadius: "8px",
                  boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
                  overflow: "wrap",
                }}
              >
                <Typography
                  variant="subtitle1"
                  color="textSecondary"
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Flight Type:</span>
                    <span className="primary_text capitalize">
                      {flight.flightType}
                    </span>
                    <span className="ml-4">
                      Price:{" "}
                      <span className="primary_text">€{flight.price}</span>
                    </span>
                  </div>
                  <DeleteOutlineOutlined
                    onClick={() =>
                      handleDelete(flight._id ? flight._id : flight.id)
                    }
                    className="text-red-500 cursor-pointer"
                  />
                </Typography>

                <div className="mt-4 space-y-6">
                  {/* First Flight */}
                  <div>
                    {flight.flightType === "multiple" && (
                      <Typography
                        variant="subtitle2"
                        className="text-gray-500 mb-2 font-medium"
                      >
                        First Flight
                      </Typography>
                    )}
                    <div className="bg-[#fdf0ea] p-3 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gray-500 text-sm">From</p>
                          <p className="font-semibold">{flight.flightFrom}</p>
                          <p className="text-sm text-gray-600">
                            {flight.departureTime}
                          </p>
                        </div>
                        <div className="flex-1 border-t-2 border-dashed mx-4 border-orange-200"></div>
                        <div>
                          <p className="text-gray-500 text-sm">To</p>
                          <p className="font-semibold">{flight.flightTo}</p>
                          <p className="text-sm text-gray-600">
                            {flight.arrivalTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex-1 flex flex-col items-center">
                        <div className="border-t-2 border-dashed w-full border-orange-200"></div>
                        <p className="text-sm text-gray-600 mt-1">
                          Duration: {flight.duration1}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Second Flight for multiple flights */}
                  {flight.flightType === "multiple" && (
                    <div>
                      <Typography
                        variant="subtitle2"
                        className="text-gray-500 mb-2 font-medium"
                      >
                        Second Flight
                      </Typography>
                      <div className="bg-[#fdf0ea] p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-gray-500 text-sm">From</p>
                            <p className="font-semibold">
                              {flight.flightFrom2}
                            </p>
                            <p className="text-sm text-gray-600">
                              {flight.departureTime2}
                            </p>
                          </div>
                          <div className="flex-1 border-t-2 border-dashed mx-4 border-orange-200"></div>
                          <div>
                            <p className="text-gray-500 text-sm">To</p>
                            <p className="font-semibold">{flight.flightTo2}</p>
                            <p className="text-sm text-gray-600">
                              {flight.arrivalTime2}
                            </p>
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center">
                          <div className="border-t-2 border-dashed w-full border-orange-200"></div>
                          <p className="text-sm text-gray-600 mt-1">
                            Duration: {flight.duration2}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
