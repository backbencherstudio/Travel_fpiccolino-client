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
        console.log(data);
        try {
            const response = await dispatch(createCountry(data));
            console.log("responce", response?.payload);
            toast.success(response?.payload?.message)
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
