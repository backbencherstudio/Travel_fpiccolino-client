import { useForm } from "react-hook-form";
import { createTitle } from "../../../features/sectionTitle/sectionTitleSlice";
import { useDispatch } from "react-redux";

const AddContent = () => {
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        dispatch(createTitle(data))
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto p-6 bg-white rounded shadow-md"
        >
            <h2 className="text-2xl font-bold text-center mb-4">Add Content</h2>

            <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <input
                    id="title"
                    className={`mt-1 block p-1 w-full rounded border ${errors.title ? "border-red-500" : "border-gray-300"
                        } focus:ring-blue-500 focus:border-blue-500`}
                    {...register("title", { required: "Title is required" })}
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    className={`mt-1 block p-1 w-full rounded border ${errors.description ? "border-red-500" : "border-gray-300"
                        } focus:ring-blue-500 focus:border-blue-500`}
                    {...register("description", { required: "Description is required" })}
                />
                {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
            </div>

            {/* Name Field */}
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <select
                    id="name"
                    className={`mt-1 block w-full rounded border ${errors.name ? "border-red-500" : "border-gray-300"
                        } focus:ring-blue-500 focus:border-blue-500`}
                    {...register("name", { required: "Name is required" })}
                >
                    <option value="">Select Name</option>
                    <option value="landing1">Landing 1</option>
                    <option value="landing2">Landing 2</option>
                    <option value="landing3">Landing 3</option>
                    <option value="landing4">Landing 4</option>
                    <option value="landing5">Landing 5</option>
                    <option value="landing6">Landing 6</option>
                </select>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            {/* Page Name Field */}
            <div className="mb-4">
                <label htmlFor="pageName" className="block text-sm font-medium text-gray-700">
                    Page Name
                </label>
                <select
                    id="pageName"
                    className={`mt-1 block w-full rounded border ${errors.pageName ? "border-red-500" : "border-gray-300"
                        } focus:ring-blue-500 focus:border-blue-500`}
                    {...register("pageName", { required: "Page name is required" })}
                >
                    <option value="">Select Page Name</option>
                    <option value="home">Landing Page</option>
                    <option value="about">About Page</option>
                    <option value="tours">Tours Page</option>
                    <option value="contact">Contact Page</option>
                </select>
                {errors.pageName && (
                    <p className="text-red-500 text-sm mt-1">{errors.pageName.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Submit
            </button>
        </form>
    );
};

export default AddContent;
