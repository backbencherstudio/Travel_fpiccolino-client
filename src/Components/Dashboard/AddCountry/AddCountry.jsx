import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCountry } from "../../../features/country/countrySlice";
import { toast } from "react-toastify";
import { useState } from "react";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";

const AddCountry = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Convert image file to FormData for uploading
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("contentTitle", data.contentTitle);
      formData.append("contentDescription", data.contentDescription);
      formData.append("image", data.image[0]); // Adding image file

      const response = await dispatch(createCountry(formData));
      toast.success(response?.payload?.message);
      reset();
      setImagePreview(null); // Reset image preview after submit
    } catch (error) {
      console.error("Error creating package:", error);
      alert("Failed to create package. Please try again.");
    }
  };

  // Function to handle image selection and display the preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <CustomHeadingDashboard />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-10"
        encType="multipart/form-data" // Required for file uploads
      >
        <h2 className="text-[28px] font-bold text-gray-800 text-center">
          Add Country
        </h2>

        {/* Name Field */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-600 mb-1">
            Country Name
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-sm text-red-500 mt-1">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* Content Title Field */}
        <div className="flex flex-col">
          <label htmlFor="contentTitle" className="text-gray-600 mb-1">
            Content Title
          </label>
          <input
            id="contentTitle"
            type="text"
            {...register("contentTitle")}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content Description Field */}
        <div className="flex flex-col">
          <label htmlFor="contentDescription" className="text-gray-600 mb-1">
            Content Description
          </label>
          <textarea
            id="contentDescription"
            {...register("contentDescription")}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
          />
        </div>

        {/* Image Upload Field */}
        <div className="flex flex-col">
          <label htmlFor="image" className="text-gray-600 mb-1">
            Upload Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleImageChange} // Handle image selection
          />
          {errors.image && (
            <span className="text-sm text-red-500 mt-1">
              {errors.image.message}
            </span>
          )}
          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Image Preview"
                className="w-full h-auto rounded-md"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full primary_bg text-white p-2 rounded-md hover:opacity-85 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddCountry;
