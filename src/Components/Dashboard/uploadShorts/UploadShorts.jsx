import { useForm } from "react-hook-form";
import { createTitle } from "../../../features/sectionTitle/sectionTitleSlice";
import { useDispatch } from "react-redux";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { createShorts } from "../../../features/pckage/packageSlice";

const UploadShorts = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(createShorts(data));
  };

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

        {/* URL-1 */}
        <div className="mb-4">
          <label
            htmlFor="url1"
            className="block text-sm font-medium text-gray-700"
          >
            URL-1
          </label>
          <input
            id="url1"
            className={`mt-1 block p-1 w-full rounded border ${
              errors.url1 ? "border-red-500" : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500`}
            {...register("url1", { required: "URL 1 is required" })}
          />
          {errors.url1 && (
            <p className="text-red-500 text-sm mt-1">{errors.url1.message}</p>
          )}
        </div>

        {/* URL-2 */}
        <div className="mb-4">
          <label
            htmlFor="url2"
            className="block text-sm font-medium text-gray-700"
          >
            URL-2
          </label>
          <input
            id="url2"
            className={`mt-1 block p-1 w-full rounded border ${
              errors.url2 ? "border-red-500" : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500`}
            {...register("url2", { required: "URL 2 is required" })}
          />
          {errors.url2 && (
            <p className="text-red-500 text-sm mt-1">{errors.url2.message}</p>
          )}
        </div>

        {/* URL-3 */}
        <div className="mb-4">
          <label
            htmlFor="url3"
            className="block text-sm font-medium text-gray-700"
          >
            URL-3
          </label>
          <input
            id="url3"
            className={`mt-1 block p-1 w-full rounded border ${
              errors.url3 ? "border-red-500" : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500`}
            {...register("url3", { required: "URL 3 is required" })}
          />
          {errors.url3 && (
            <p className="text-red-500 text-sm mt-1">{errors.url3.message}</p>
          )}
        </div>

        {/* URL-4 */}
        <div className="mb-4">
          <label
            htmlFor="url4"
            className="block text-sm font-medium text-gray-700"
          >
            URL-4
          </label>
          <input
            id="url4"
            className={`mt-1 block p-1 w-full rounded border ${
              errors.url4 ? "border-red-500" : "border-gray-300"
            } focus:ring-blue-500 focus:border-blue-500`}
            {...register("url4", { required: "URL 4 is required" })}
          />
          {errors.url4 && (
            <p className="text-red-500 text-sm mt-1">{errors.url4.message}</p>
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

export default UploadShorts;
