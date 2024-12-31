import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createCountry } from "../../../features/country/countrySlice";
import { toast } from "react-toastify";

const AddCountry = () => {
    const dispatch = useDispatch();
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
            console.log("response", response?.payload);
            toast.success(response?.payload?.message);
            reset();
        } catch (error) {
            console.error("Error creating package:", error);
            alert("Failed to create package. Please try again.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
            encType="multipart/form-data" // Required for file uploads
        >
            <h2 className="text-xl font-bold text-gray-800 text-center">Add Country</h2>

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
                    <span className="text-sm text-red-500 mt-1">{errors.name.message}</span>
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
                />
                {errors.image && (
                    <span className="text-sm text-red-500 mt-1">{errors.image.message}</span>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Submit
            </button>
        </form>
    );
};

export default AddCountry;
