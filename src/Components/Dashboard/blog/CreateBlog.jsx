import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import heroImage2 from "../../../assets/Images/HeroSection/heroImage2.jpg";
import { RiAddBoxLine } from "react-icons/ri";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

const CreateBlog = () => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };

    const inputStyle =
        "w-full my-3 border border-[#E86731] ring-[1px] ring-[#E86731] text-[#E86731] outline-none p-2 rounded-md";

    const [open, setOpen] = useState(false);
    const [contentList, setContentList] = useState([]);
    const [preview, setPreview] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const {
        register,
        setValue,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            headings: [""],
            image: "",
            paragraphs: [{ paragraph: "" }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "paragraphs",
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
            setValue("image", file, { shouldValidate: true });
        } else {
            setPreview(null);
        }
    };

    const onSubmit = (data) => {
        const newContent = {
            headings: data.headings,
            image: preview,
            paragraphs: data.paragraphs.map((p) => p.paragraph),
        };

        setContentList((prevContent) => [...prevContent, newContent]);
        setPreview(null);
        reset();
        handleClose();
    };

    const handleUploadBlog = async () => {
        if (!selectedCategory) {
            alert("Please select a category!");
            return;
        }

        const blogData = {
            contentList,
            category: selectedCategory,
        };

        console.log(blogData)

        try {
            const response = await fetch("http://localhost:3000/api/blogs/createblog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    withCredentials: true,
                },
                body: JSON.stringify(blogData),
            });

           

            if (response.ok) {
                alert("Blog uploaded successfully!");
                setContentList([]);
                setSelectedCategory("");
            } else {
                alert("Failed to upload the blog.");
            }
        } catch (error) {
            console.error("Error uploading blog:", error);
            alert("An error occurred while uploading the blog.");
        }
    };

    return (
        <div>
            <CustomHeadingDashboard />

            <div className="mt-10 flex justify-between items-center">
                <h2 className="text-[#141D2A] font-semibold text-[24px]">Add Blog</h2>
                <button
                    onClick={handleUploadBlog}
                    className="bg-[#E86731] text-[#FFFFFF] px-4 py-2 rounded-md"
                >
                    Upload Blog
                </button>
            </div>

            <div className="grid grid-cols-12 gap-5 mt-5">
                <div className="col-span-12 xl:col-span-8">
                    {contentList.map((content, index) => (
                        <div className="border rounded-lg p-4 mb-5" key={index}>
                            <div>
                                {content.image && (
                                    <img
                                        className="rounded-lg"
                                        src={content.image}
                                        alt="Content Preview"
                                    />
                                )}
                            </div>
                            <div className="mt-4">
                                {content.headings.map((heading, idx) => (
                                    <h3
                                        key={idx}
                                        className="text-[#141D2A] font-semibold mb-2"
                                    >
                                        {heading}
                                    </h3>
                                ))}
                                {content.paragraphs.map((paragraph, idx) => (
                                    <p key={idx} className="text-[#141D2A] mb-2">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <button
                            onClick={handleOpen}
                            className="text-[#FFFFFF] bg-[#E86731] font-semibold flex items-center gap-2 px-4 py-2 rounded-lg"
                        >
                            <RiAddBoxLine /> Add Content
                        </button>
                    </div>
                </div>

                <div className="col-span-12 xl:col-span-4">
                    <div className="border rounded-lg p-4 mb-4">
                        <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
                            Upload Img
                        </h2>
                        <img
                            className="h-[400px] object-cover rounded-lg"
                            src={heroImage2}
                            alt="Placeholder"
                        />
                    </div>
                    <div className="border rounded-lg p-4 mb-4">
                        <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
                            Category
                        </h2>
                        <h2 className="text-[#141D2A] mb-6">Blog Category</h2>
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className={inputStyle}
                        >
                            <option value="">Select a category</option>
                            <option value="technology">Technology</option>
                            <option value="health">Health</option>
                            <option value="travel">Travel</option>
                        </select>
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
                slotProps={{ backdrop: { timeout: 500 } }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            className="text-lg font-bold text-center mb-4"
                        >
                            Add Your Data
                        </Typography>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-4 px-2 max-h-[65vh] overflow-y-auto"
                        >
                            <div>
                                <h3 className="text-md font-semibold mb-2">
                                    Headings
                                </h3>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Heading"
                                        {...register(`headings.0`)}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-md font-semibold mb-2">
                                    Upload Image
                                </h3>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleImageChange}
                                />
                                {preview && (
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="mt-4 w-32 h-32 object-cover rounded-md border"
                                    />
                                )}
                            </div>

                            <div>
                                <h3 className="text-md font-semibold mb-2">
                                    Paragraphs
                                </h3>
                                {fields.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 mb-3"
                                    >
                                        <input
                                            type="text"
                                            placeholder={`Paragraph ${index + 1}`}
                                            {...register(
                                                `paragraphs.${index}.paragraph`
                                            )}
                                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
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

                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                            >
                                Submit
                            </button>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
};

export default CreateBlog;
