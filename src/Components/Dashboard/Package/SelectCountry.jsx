/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomDashboardButton from "../../../Shared/CustomDashboardButton";
import { FaRegSquarePlus } from "react-icons/fa6";
import {
  Box,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import {
  createCountry,
  deleteCountry,
  getCountry,
} from "../../../features/country/countrySlice";

const SelectCountry = ({ country, setCountry }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    country: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountry()); // Fetch countries when the component mounts
  }, [dispatch]);

  const { countries, countryCreateLoadingError, countryCreateLoading } =
    useSelector((state) => state.country);
  console.log(countries);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleOpenModal = (e) => {
    e.stopPropagation(); // Stop propagation
    e.preventDefault(); // Prevent form submission or default button action
    setOpenModal(true); // Open modal
  };

  const handleAddCountry = async (e) => {
    e.stopPropagation();
    if (formData.country.trim()) {
      try {
        // Dispatch createCountry action to add the country
        await dispatch(createCountry({ country: formData.country }));

        // Fetch the updated country list after creation
        dispatch(getCountry());

        // Close modal and reset form
        setOpenModal(false);
        setFormData({ country: "" });
      } catch (error) {
        console.error("Error creating country:", error);
      }
    }
  };

  const handleDeleteCountry = async (countryId) => {
    try {
      // Dispatch deleteCountry action to remove the country
      await dispatch(deleteCountry(countryId));

      // Optionally, you can re-fetch countries to ensure list is updated
      dispatch(getCountry());
    } catch (error) {
      console.error("Error deleting country:", error);
    }
  };

  return (
    <div>
      <div className="border rounded-lg p-4 mb-4">
        <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
          Country
        </h2>

        <Select
          style={{
            width: "100%",
            cursor: "pointer",
            fontSize: "14px",
            border: "1px solid #e86731",
            borderRadius: "4px",
          }}
          size="small"
          value={country}
          // onChange={(e) => setCountry(e.target.value.name)}
          onOpen={() => setIsDropdownOpen(true)}
          onClose={() => setIsDropdownOpen(false)}
        >
          {countries && countries.length > 0 ? (
            countries.map((element, index) => (
              <MenuItem
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
                key={index}
                value={element.name}
              >
                <div>{element.name}</div>
                {isDropdownOpen && country !== element.name && (
                  <DeleteOutlineOutlined
                    className="text-[red] z-20 bg-[#fdf0ea] rounded-full hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCountry(element._id); // Delete country
                    }}
                  />
                )}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">No Countries Available</MenuItem>
          )}
        </Select>
        <div className="mt-3 flex justify-end">
          <CustomDashboardButton
            handleSubmit={(e) => handleOpenModal(e)}
            content={
              <div className="flex items-center gap-1.5 ">
                <FaRegSquarePlus className="text-xl" /> Add Country
              </div>
            }
          />
        </div>
      </div>

      <Modal
        open={openModal}
        onClose={(e) => {
          e.stopPropagation(); // Prevents the event from bubbling when closing
          setOpenModal(false); // Closes the modal
        }}
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
            Add New Country
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <button
                type="button"
                onClick={(e) => handleAddCountry(e)}
                className="primary_bg w-full text-white font-semibold text-[16px] py-2 rounded-md hover:opacity-90"
              >
                {"Add Country"}
              </button>
              {countryCreateLoading && (
                <Typography variant="body2" color="textSecondary" mt={2}>
                  Adding country...
                </Typography>
              )}
              {countryCreateLoadingError && (
                <Typography color="error" variant="body2" mt={2}>
                  {countryCreateLoadingError}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default SelectCountry;
