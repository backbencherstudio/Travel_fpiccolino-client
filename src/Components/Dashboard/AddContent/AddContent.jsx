import { useForm } from "react-hook-form";
import { createTitle } from "../../../features/sectionTitle/sectionTitleSlice";
import { useDispatch } from "react-redux";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { toast } from "react-toastify";

const AddContent = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Watch the value of the pageName field
  const selectedPageName = watch("pageName");

  const onSubmit = (data) => {
    dispatch(createTitle(data));
    reset();
    toast.success("Content Added Successfully");
  };

  // Define options for each page
  const nameOptions = {
    landing: [
      { value: "landing1", label: "Tour Cards Section" },
      { value: "landing2", label: "Country Slider Section" },
      { value: "landing3", label: "Country Grid Section" },
      { value: "landing4", label: "Stay Connect & Explore Section" },
      { value: "landing5", label: "Review Section" },
      { value: "landing6", label: "Article & Blog Section" },
    ],
    about: [
      { value: "about1", label: "Stay Connect & Explore Section" },
      { value: "about2", label: "Benifits Slider Section" },
      { value: "about3", label: "Why Choose Us Section" },
    ],
    tours: [
      { value: "all_inclusive_tour1", label: "all inclusive tour 1" },
      { value: "all_inclusive_tour2", label: "all inclusive tour 2" },
      { value: "country_wise1", label: "country wise content" },
    ],
    contact: [
      { value: "contact1", label: "Contact 1" },
      { value: "contact2", label: "Contact 2" },
      { value: "contact3", label: "Contact 3" },
    ],
  };

  return (
    <div>
      <CustomHeadingDashboard />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto p-6 bg-white rounded shadow-md mt-10"
      >
        <h2 className="text-[28px] font-bold text-center mb-4">
          Section Title
        </h2>
        {/* Page Name Field */}
        <div className="mb-4">
          <label
            htmlFor="pageName"
            className="block text-sm font-medium text-gray-700"
          >
            Page Name
          </label>
          <select
            id="pageName"
            className={`mt-1 p-1 block w-full rounded border ${
              errors.pageName ? "border-red-500" : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500`}
            {...register("pageName", { required: "Page name is required" })}
          >
            <option value="">Select Page Name</option>
            <option value="landing">Home Page</option>
            <option value="about">About Page</option>
            <option value="tours">Tours Page</option>
            <option value="contact">Contact Page</option>
          </select>
          {errors.pageName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pageName.message}
            </p>
          )}
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <select
            id="name"
            className={`mt-1 p-1 block w-full rounded border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500`}
            {...register("name", { required: "Name is required" })}
          >
            <option value="">Select Name</option>
            {nameOptions[selectedPageName]?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            className={`mt-1 block p-1 w-full rounded border ${
              errors.title ? "border-red-500" : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500`}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            className={`mt-1 block p-1 w-full rounded border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500`}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full primary_bg text-white py-2 px-4 rounded hover:opacity-85 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddContent;
