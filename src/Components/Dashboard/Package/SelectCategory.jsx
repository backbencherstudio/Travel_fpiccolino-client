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
import {
  createCategory,
  getCategory,
} from "../../../features/category/categorySlice";
import { DeleteOutlineOutlined } from "@mui/icons-material";

const SelectCategory = ({ category, setCategory }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  // Access Redux state
  const { categories, categoryCreateLoading, categoryCreateLoadingError } =
    useSelector((state) => state.category);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenModal(true);
  };

  const handleAddCategory = () => {
    if (formData.category.trim()) {
      dispatch(createCategory({ category: formData.category })); // Dispatch createCategory action
      setFormData({ category: "" });
      setOpenModal(false);
    }
  };

  return (
    <div>
      <div className="border rounded-lg p-4 mb-4">
        <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
          Category
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
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories && categories.length > 0 ? (
            categories?.map((element, index) => (
              <MenuItem
                className="flex"
                key={index}
                value={`${element.category}`}
              >
                <div> {element.category}</div> <DeleteOutlineOutlined />
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">No Categories Available</MenuItem>
          )}
        </Select>
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <button
                type="button"
                onClick={handleAddCategory}
                className="primary_bg w-full text-white font-semibold text-[16px] py-2 rounded-md hover:opacity-90"
                disabled={categoryCreateLoading} // Disable button during loading
              >
                {categoryCreateLoading ? "Adding..." : "Add Category"}
              </button>
              {categoryCreateLoadingError && (
                <Typography color="error" variant="body2" mt={2}>
                  {categoryCreateLoadingError}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default SelectCategory;
