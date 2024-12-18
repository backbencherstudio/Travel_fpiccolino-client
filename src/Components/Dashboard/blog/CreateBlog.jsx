import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import heroImage2 from "../../../assets/Images/HeroSection/heroImage2.jpg"
import { RiAddBoxLine, RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const CreateBlog = () => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const inputStyle = "w-full my-3 border border-[#E86731] border-[#E86731] ring-[1px] ring-[#E86731] text-[#E86731] outline-none p-2 rounded-md"

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
        register,
        setValue,
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            headings: ["", "", ""],
            image: "",
            subHeading: "",
            paragraphs: [{ paragraph: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "paragraphs",
    });
    const [preview, setPreview] = useState(null);

    // Handle file selection and preview
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result); // Generate preview URL
            };
            reader.readAsDataURL(file);

            // Update form data with the selected file
            setValue("image", file, { shouldValidate: true });
        } else {
            setPreview(null); // Clear preview if no file is selected
        }
    };

    const onSubmit = (data) => {
        const mainHeading = data.mainHeading
        console.log("Main Heading:", mainHeading);
        console.log("Collected Data:", data);

        reset()
    };

    return (
        <div>
            <CustomHeadingDashboard />

            <div className="mt-10 flex justify-between items-center "  >
                <h2 className="text-[#141D2A] font-semibold text-[24px] " >Add Blog</h2>
                <button className="bg-[#E86731] text-[#FFFFFF] px-4 py-2 rounded-md " >Upload Blog</button>
            </div>

            <div className="grid grid-cols-12 gap-5 mt-5 " >
                <div className=" col-span-12 xl:col-span-8  " >

                    <div className="border rounded-lg p-4 mb-5">
                        <div>
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Header Image</h2>
                            </span>
                            {/* ========================= need condition in image follow the figma ========================= */}
                            <img className="rounded-lg" src={heroImage2} alt="" />

                        </div>
                        <div className="mt-4" >
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Header Text</h2>
                            </span>
                            <p className="text-[#141D2A]  " >Essential Travel Hacks for Stress-Free Adventures</p>
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 mb-5">
                        <div>
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Body Image</h2>
                                <span className="flex items-center gap-5" >
                                    <button className="border border-[#EB3D4D] text-[30px] rounded " > <RiDeleteBin5Line className="text-[#EB3D4D]   " /> </button>
                                </span>
                            </span>
                            {/* ========================= need condition in image follow the figma ========================= */}
                            <img className="rounded-lg" src={heroImage2} alt="" />
                        </div>

                        <div className="mt-4" >
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Body text</h2>
                            </span>
                            <p className="text-[#141D2A]  " >Traveling is one of life’s greatest joys, but the logistics can sometimes be overwhelming. From packing to navigating new places, small inconveniences can add up. That’s why we’ve compiled this guide of essential travel hacks to ensure your journey is smooth, stress-free, and full of unforgettable memories.</p>
                        </div>
                    </div>

                    <div className="border rounded-lg p-4 mb-5">
                        <span className="flex justify-between items-center mb-5" >
                            <h2 className="font-semibold text-[24px] " >Sub-Header</h2>
                        </span>

                        <h2 className="font-semibold text-[#141D2A] mb-2 " >Pack Smart, Pack Light</h2>

                        <div>
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Body Image</h2>
                                <span className="flex items-center gap-5" >
                                    <button className="border border-[#EB3D4D] text-[30px] rounded " > <RiDeleteBin5Line className="text-[#EB3D4D]   " /> </button>
                                </span>
                            </span>
                            {/* ========================= need condition in image follow the figma ========================= */}
                            <img className="rounded-lg" src={heroImage2} alt="" />
                        </div>

                        <div className="mt-4" >
                            <span className="flex justify-between items-center mb-5" >
                                <h2 className="font-semibold text-[24px] " >Body text</h2>
                            </span>
                            <p className="text-[#141D2A]  " >Traveling is one of life’s greatest joys, but the logistics can sometimes be overwhelming. From packing to navigating new places, small inconveniences can add up. That’s why we’ve compiled this guide of essential travel hacks to ensure your journey is smooth, stress-free, and full of unforgettable memories.</p>
                        </div>
                    </div>


                    <div className="flex justify-end" >
                        <button onClick={handleOpen} className="text-[#FFFFFF] bg-[#E86731] font-semibold  flex items-center gap-2 px-4 py-2 rounded-lg " > <RiAddBoxLine /> Add Content</button>
                    </div>

                </div>


                <div className=" col-span-12 xl:col-span-4 " >
                    <div className="border rounded-lg p-4 mb-4">
                        <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6 " >Upload Img</h2>
                        <img className="h-[400px] object-cover rounded-lg " src={heroImage2} alt="" />
                    </div>
                    <div className="border rounded-lg p-4 mb-4">
                        <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6 " >Category</h2>
                        <h2 className="text-[#141D2A]  mb-6 " >Blog Category</h2>
                        <select
                            className={inputStyle}
                        >
                            <option value="">All inclusive</option>
                            <option value="option">Option</option>
                        </select>

                        <div className="flex justify-end" >
                            <button className="text-[#FFFFFF] bg-[#E86731] font-semibold  flex items-center gap-2 px-4 py-2 rounded-lg " > <RiAddBoxLine /> Add Content</button>
                        </div>

                    </div>

                </div>
            </div>


            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2" className="text-lg font-bold text-center mb-4">
                            Add Your Data
                        </Typography>

                        <Typography id="transition-modal-description">
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <h3 className="text-md font-semibold mb-2">Main Heading</h3>
                                    <input
                                        type="text"
                                        placeholder="Main Heading"
                                        {...register("mainHeading")}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.mainHeading && <p className="text-sm text-red-500 mt-1">{errors.mainHeading.message}</p>}
                                </div>
                                {/* Headings */}
                                <div>
                                    <h3 className="text-md font-semibold mb-2">Headings</h3>
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <div key={`heading-${index}`} className="mb-3">
                                            <input
                                                type="text"
                                                placeholder={`Heading ${index + 1}`}
                                                {...register(`headings.${index}`)}
                                                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            {errors.headings?.[index] && (
                                                <p className="text-sm text-red-500 mt-1">{errors.headings[index].message}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Image */}
                                <div>
                                    <h3 className="text-md font-semibold mb-2">Upload Image</h3>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={handleImageChange} // Handle image file and preview
                                    />
                                    {errors.image && (
                                        <p className="text-sm text-red-500 mt-1">{errors.image.message}</p>
                                    )}
                                    {preview && (
                                        <div className="mt-4">
                                            <h4 className="text-sm font-medium mb-2">Image Preview:</h4>
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="w-32 h-32 object-cover rounded-md border"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Sub Heading */}
                                <div>
                                    <h3 className="text-md font-semibold mb-2">Sub Heading</h3>
                                    <input
                                        type="text"
                                        placeholder="Sub Heading"
                                        {...register("subHeading")}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    {errors.subHeading && <p className="text-sm text-red-500 mt-1">{errors.subHeading.message}</p>}
                                </div>

                                {/* Paragraphs */}
                                <div>
                                    <h3 className="text-md font-semibold mb-2">Paragraphs (To-Do List)</h3>
                                    {fields.map((item, index) => (
                                        <div key={item.id} className="flex items-center gap-4 mb-3">
                                            <input
                                                type="text"
                                                placeholder={`Paragraph ${index + 1}`}
                                                {...register(`paragraphs.${index}.paragraph`)}
                                                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            {errors.paragraphs?.[index]?.paragraph && (
                                                <p className="text-sm text-red-500">{errors.paragraphs[index].paragraph.message}</p>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                className="text-red-500 bg-gray-200 p-1 rounded-md hover:bg-gray-300 transition"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={() => append({ paragraph: "" })}
                                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                                    >
                                        Add Paragraph
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                                >
                                    Submit
                                </button>
                            </form>
                        </Typography>
                    </Box>
                </Fade>


            </Modal>


        </div>
    );
};

export default CreateBlog;