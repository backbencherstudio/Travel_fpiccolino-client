import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  createShorts,
  getShorts,
  deleteShorts,
} from "../../../features/pckage/packageSlice";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { getCountry } from "../../../features/country/countrySlice";
import { MenuItem, Select } from "@mui/material";

const UploadShorts = () => {
  const dispatch = useDispatch();
  const { countries } = useSelector((state) => state.country);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");

  useEffect(() => {
    dispatch(getCountry({ search: "", startDate: "", endDate: "" }));
    dispatch(getShorts());
  }, []);

  const { shorts, shortsLoading, shortsError } = useSelector(
    (state) => state.package
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    if (selectedCountry === "All Countries") {
      return; // Prevent form submission if no country is selected
    }
    dispatch(createShorts(data)).then(() => {
      reset();
      dispatch(getShorts());
    });
  };

  const handleDeleteShort = (shortId) => {
    dispatch(deleteShorts(shortId)).then(() => dispatch(getShorts()));
  };
  const shortsList = Array.isArray(shorts) ? shorts : []; // Ensure it's an array

  // Modified handleCountryChange function
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    // Manually set the form value when country changes
    if (e.target.value !== "All Countries") {
      setValue("countryId", e.target.value);
    }
  };

  // Modified filtering logic
  const filteredShorts =
    selectedCountry === "All Countries"
      ? shortsList
      : shortsList.filter((short) => short?.countryId?._id === selectedCountry);

  return (
    <div>
      <CustomHeadingDashboard />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto p-6 bg-white rounded shadow-md mt-10"
      >
        <h2 className="text-[28px] font-bold text-center mb-4">
          Upload Shorts
        </h2>

        {/* Modified Country Dropdown */}
        <div className="mb-4">
          <label
            htmlFor="countryId"
            className="block text-sm font-medium text-gray-700"
          >
            Country<span className="text-red-500">*</span>
          </label>
          <Select
            sx={{
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              padding: "3px",
            }}
            size="small"
            id="countryId"
            value={selectedCountry}
            className={`mt-1 block p-1 w-full rounded border ${
              selectedCountry === "All Countries"
                ? "border-red-500"
                : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500`}
            {...register("countryId", {
              required: "Country is required",
              validate: (value) =>
                value !== "All Countries" || "Please select a country",
            })}
            onChange={handleCountryChange}
          >
            <MenuItem value="All Countries" disabled>
              Select a Country
            </MenuItem>
            {countries?.map((country) => (
              <MenuItem
                key={country._id}
                value={country._id}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={country.image}
                  alt={country.name}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "8px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                {country.name}
              </MenuItem>
            ))}
          </Select>
          {(errors.countryId || selectedCountry === "All Countries") && (
            <p className="text-red-500 text-sm mt-1">
              {errors.countryId?.message || "Please select a country"}
            </p>
          )}
        </div>

        {/* URL Input */}
        <div className="mb-4">
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            URL
          </label>
          <input
            id="url"
            className={`mt-1 block p-1 w-full rounded border ${
              errors.url ? "border-red-500" : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500`}
            {...register("url", { required: "URL is required" })}
          />
          {errors.url && (
            <p className="text-red-500 text-sm mt-1">{errors.url.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full primary_bg text-white py-2 px-4 rounded hover:opacity-85 focus:outline-none"
        >
          Submit
        </button>
      </form>

      {/* Shorts List Table */}
      <div className="mt-8 p-6 bg-white rounded shadow-md">
        <h2 className="text-[24px] font-bold mb-4">Shorts List</h2>
        {shortsLoading ? (
          <p className="text-center text-gray-600">Loading shorts...</p>
        ) : shortsError ? (
          <p className="text-center text-red-500">{shortsError}</p>
        ) : shorts?.length === 0 ? (
          <p className="text-center text-gray-600">No shorts available.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">S/N</th>
                <th className="border border-gray-300 px-4 py-2">URL</th>
                <th className="border border-gray-300 px-4 py-2">Country</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {shorts &&
                filteredShorts?.map((short, index) => (
                  <tr key={short?._id} className="hover:bg-[#fdf0ea]">
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a
                        href={short?.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        {short.url}
                      </a>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {short.countryId?.name || "Unknown"}
                    </td>
                    <td className="border px-4 py-3 text-center flex justify-center items-center">
                      <div
                        onClick={() => handleDeleteShort(short?._id)}
                        className="text-[#eb3d4d] border border-[#eb3d4d] hover:bg-[#eb3d4f1e] rounded-full h-10 w-10 text-[24px] text-center flex justify-center items-center"
                      >
                        <MdDeleteOutline />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UploadShorts;
