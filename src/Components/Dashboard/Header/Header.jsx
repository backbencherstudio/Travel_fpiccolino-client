import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createHeader } from "../../../features/header/headerSlice";

const Header = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    // Form submission handler

    // const onSubmit = (data) => {
    //     const file = data.heroImageFile[0];
    //     console.log("Form Data:", {...data});
    //     console.log("Form File Data:", {file});
    // };

    
    const onSubmit = async (data) => {
        const headerData = new FormData();
        const file = data?.heroImage[0];
        headerData.append('heroImage', file);
        Object.keys(data).forEach((key) => {
            if (key !== 'heroImage') {
                headerData.append(key, data[key]);
            }
        });
        const response = await dispatch(createHeader(headerData));
        console.log("responce", response);
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-lg mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
            <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
                Hero Content Form
            </h1>

            {/* Blog Details Title */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Blog Details Title
                </label>
                <input
                    type="text"
                    {...register("blogDetailsTitle", { required: "This field is required" })}
                    placeholder="Title"
                    className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.blogDetailsTitle ? "border-red-500" : "border-gray-300"
                        }`}
                />
                {errors.blogDetailsTitle && (
                    <p className="text-red-500 text-xs mt-2">{errors.blogDetailsTitle.message}</p>
                )}
            </div>

            {/* Hero Image URL */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Hero Image File
                </label>
                <input
                    type="file"
                    accept="heroImage/*"
                    {...register("heroImage", { required: "This field is required" })}
                    className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.heroImage ? "border-red-500" : "border-gray-300"
                        }`}
                />
                {errors.heroImage && (
                    <p className="text-red-500 text-xs mt-2">{errors.heroImage.message}</p>
                )}
            </div>


            {/* Title */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                </label>
                <input
                    type="text"
                    {...register("titleOne", { required: "This field is required" })}
                    placeholder="Main Title"
                    className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.titleOne ? "border-red-500" : "border-gray-300"
                        }`}
                />
                {errors.titleOne && (
                    <p className="text-red-500 text-xs mt-2">{errors.titleOne.message}</p>
                )}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    title Two
                </label>
                <input
                    type="text"
                    {...register("titleTwo")}
                    placeholder="Main Title"
                    className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.titleTwo ? "border-red-500" : "border-gray-300"
                        }`}
                />
                {/* {errors.titleTwo && (
                    <p className="text-red-500 text-xs mt-2">{errors.titleTwo.message}</p>
                )} */}
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Page Name
                </label>
                <select
                    {...register("pageName", { required: "This field is required" })}
                    className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.pageName ? "border-red-500" : "border-gray-300"
                        }`}
                    defaultValue=""
                >
                    <option value="" disabled>
                        Select a Page
                    </option>
                    <option value="home">Home</option>
                    <option value="tour">Tour</option>
                    <option value="about">About</option>
                    <option value="blog">Blog</option>
                    <option value="contact">Contact</option>
                    <option value="faq">FAQ</option>
                </select>
                {errors.pageName && (
                    <p className="text-red-500 text-xs mt-2">{errors.pageName.message}</p>
                )}
            </div>


            {/* Description */}
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                </label>
                <textarea
                    {...register("descriptionOne", { required: "This field is required" })}
                    placeholder="Description"
                    className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.descriptionOne ? "border-red-500" : "border-gray-300"
                        }`}
                    rows="4"
                />
                {errors.descriptionOne && (
                    <p className="text-red-500 text-xs mt-2">{errors.descriptionOne.message}</p>
                )}
            </div>

            {/* second  Description */}
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Second Description
                </label>
                <textarea
                    {...register("descriptionTwo")}
                    placeholder="Description"
                    className={`w-full px-3 py-2 border rounded focus:outline-none ${errors.descriptionTwo ? "border-red-500" : "border-gray-300"
                        }`}
                    rows="4"
                />
                {/* {errors.descriptionTwo && (
                    <p className="text-red-500 text-xs mt-2">{errors.descriptionTwo.message}</p>
                )} */}
            </div>

            {/* Submit Button */}
            <div className="text-center">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default Header;