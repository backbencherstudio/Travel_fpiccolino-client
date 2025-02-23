import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountryById,
  updateCountry,
} from "../../../features/country/countrySlice";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import CustomDashboardButton from "../../../Shared/CustomDashboardButton";
import { DeleteOutlined } from "@mui/icons-material";
import { FaPlusSquare } from "react-icons/fa";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const CountryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { country } = useSelector((state) => state.country);
  const [isUpdate, setIsUpdate] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [updateImageIndex, setUpdateImageIndex] = useState(null);

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    if (id) {
      dispatch(getCountryById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (country) {
      setUploadedImages(country.image ? [country.image] : []);
      setValue("name", country.name);
      setValue("contentTitle", country.contentTitle);
      setValue("contentDescription", country.contentDescription);
    }
  }, [country, setValue]);

  const handleImageUpload = (e) => {
    e.stopPropagation();
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setImages([files[0]]); // Only keep the latest image
      setUploadedImages([]); // Clear any previously uploaded images
    }
  };

  const handleDeleteImage = (index, isUploaded = false) => {
    if (isUploaded) {
      setUploadedImages([]);
    } else {
      setImages([]);
    }
  };

  const onSubmit = (data) => {
    if (isUpdate) {
      // Create the data object
      const countryData = {
        name: data.name,
        contentTitle: data.contentTitle,
        contentDescription: data.contentDescription,
      };

      // If there's a new image, use it
      if (images.length > 0) {
        countryData.image = images[0]; // Use the first new image
      }

      dispatch(
        updateCountry({
          countryId: id,
          data: countryData,
        })
      )
        .unwrap()
        .then(() => {
          toast.success("Country Updated Successfully");
          setIsUpdate(false);
          // Refresh the country data
          dispatch(getCountryById(id));
        })
        .catch((error) => {
          console.error("Failed to update country:", error);
          toast.error("Failed to update country");
          setIsUpdate(false);
        });
    }
  };

  return (
    <div>
      <CustomHeadingDashboard />
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex justify-between mt-20">
          <h1 className="text-[24px] font-semibold">Update Country</h1>
          <div className="flex justify-end">
            <div onClick={() => setIsUpdate(true)}>
              <CustomDashboardButton content={<p>Update Country</p>} />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-5 mt-5">
          <div className="md:col-span-3">
            <div className="border p-4 rounded-2xl">
              <h2 className="text-[20px] font-medium">General Information</h2>

              <p className="text-[16px] mt-3">Country Name</p>
              <input
                {...register("name")}
                type="text"
                placeholder="Write Country Name..."
                className="border rounded-md w-full p-1 mt-1 text-[#333333]"
              />

              <p className="text-[16px] mt-3">Content Title</p>
              <input
                {...register("contentTitle")}
                type="text"
                placeholder="Write Content Title..."
                className="border rounded-md w-full p-1 mt-1 text-[#333333]"
              />

              <p className="text-[16px] mt-3">Content Description</p>
              <textarea
                {...register("contentDescription")}
                placeholder="Write Description..."
                className="border rounded-md min-h-[100px] w-full p-1 mt-1 text-[#333333]"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="border rounded-lg p-4 mb-4">
              <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
                Upload Image
              </h2>

              {/* Show either uploaded image or new image */}
              {uploadedImages.length > 0 ? (
                <div className="relative my-2">
                  <img
                    className="h-[200px] w-full object-cover rounded-lg"
                    src={uploadedImages[0]}
                    alt="Uploaded Preview"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:opacity-90"
                    onClick={() => handleDeleteImage(0, true)}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              ) : images.length > 0 ? (
                <div className="relative my-2">
                  <img
                    className="h-[200px] w-full object-cover rounded-lg"
                    src={URL.createObjectURL(images[0])}
                    alt="Preview"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:opacity-90"
                    onClick={() => handleDeleteImage(0)}
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              ) : (
                <div className="relative inline-block w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex items-center justify-center bg-[#fdf0ea] text-white rounded-lg cursor-pointer h-[100px] w-full">
                    <FaPlusSquare className="primary_text h-6 w-6" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CountryDetails;
