import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import heroImage2 from "../../../assets/Images/HeroSection/heroImage2.jpg";
import { RiAddBoxLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../../utils/base_path";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openMainContent, setOpenMainContent] = useState(false);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState([]);
  const [imagepath, setImagePath] = useState([]);
  const [mainimagepath, setMainimagepath] = useState([]);
  const [mainContentList, setMainContentList] = useState([]);
  const [deepCopy, setDeepCopy] = useState([]); // Use state for deepCopy
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleMainContentOpen = () => setOpenMainContent(true);
  const handleMainContentClose = () => setOpenMainContent(false);
  // -----------------------------------------------------------------------------

  const [options, setOptions] = useState([
    { value: "technology", label: "Technology" },
    { value: "health", label: "Health" },
    { value: "travel", label: "Travel" },
  ]);
  const updateOptions = (apiResponse) => {
    const newOptions = apiResponse.Categories.map((categoryObj) => {
      const value = Object.keys(categoryObj)[0];
      const label =
        value.charAt(0).toUpperCase() + value.slice(1).replace(/-/g, " ");
      return { value, label };
    });

    setOptions((prevOptions) => {
      const mergedOptions = [...prevOptions];

      newOptions.forEach((newOption) => {
        if (!prevOptions.some((option) => option.value === newOption.value)) {
          mergedOptions.push(newOption);
        }
      });

      return mergedOptions;
    });
  };

  useEffect(() => {
    const fetchCategoryCount = async () => {
      try {
        const response = await axios.get(`${base_url}/api/blogs/categoryCount`);
        updateOptions(response.data); // Assume the response has the data you need
      } catch (err) {
        setError(err.message || "An error occurred");
      }
    };

    fetchCategoryCount();
  }, []);

  const [newOption, setNewOption] = useState("");

  const handleAddOption = () => {
    if (newOption.trim() !== "") {
      const newOptionValue = newOption
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
      setOptions((prevOptions) => [
        ...prevOptions,
        { value: newOptionValue, label: newOption },
      ]);
      setSelectedCategory(newOptionValue); // Optionally select the newly added option
      setNewOption(""); // Clear the input field
    }
  };
  const [tagvalue, setTagvalue] = useState("");

  const handleChange = (e) => {
    setTagvalue(e.target.value);
  };
  // -----------------------------------------------------------------------------------------------

  const [content, setContent] = useState({
    headings: [""],
    image: null,
    paragraphs: [""],
  });
  const [mainContent, setMainContent] = useState({
    heading: "",
    subHeading: "",
    Heroheading: "",
    HerosubHeading: "",

    image: null,
  });

  const handleInputChange = (event, field, index = null) => {
    if (field === "headings") {
      const updatedHeadings = [...content.headings];
      updatedHeadings[0] = event.target.value;
      setContent({ ...content, headings: updatedHeadings });
    } else if (field === "image") {
      setContent({ ...content, image: event.target.files[0] });
      const file = event.target.files[0];
      setImages([...images, file]);
    } else if (field === "paragraphs") {
      const updatedParagraphs = [...content.paragraphs];
      updatedParagraphs[index] = event.target.value;
      setContent({ ...content, paragraphs: updatedParagraphs });
    } else if (field === "mainHeading") {
      setMainContent({ ...mainContent, heading: event.target.value });
    } else if (field === "mainSubHeading") {
      setMainContent({ ...mainContent, subHeading: event.target.value });
    } else if (field === "HeroHeading") {
      setMainContent({ ...mainContent, Heroheading: event.target.value });
    } else if (field === "HeroSubHeading") {
      setMainContent({ ...mainContent, HerosubHeading: event.target.value });
    } else if (field === "mainImage") {
      setMainContent({ ...mainContent, image: event.target.files[0] });
      const file = event.target.files[0];
      setMainImage([...mainImage, file]);
    }
  };

  const handleAddParagraph = () => {
    setContent({ ...content, paragraphs: [...content.paragraphs, ""] });
  };

  const handleRemoveParagraph = (index) => {
    const updatedParagraphs = content.paragraphs.filter((_, i) => i !== index);
    setContent({ ...content, paragraphs: updatedParagraphs });
  };

  const handleSubmitContent = () => {
    setContentList((prevContent) => [...prevContent, content]);
    setContent({ headings: [""], image: null, paragraphs: [""] });
    handleClose();
  };

  const handleSubmitMainContent = () => {
    setMainContentList((prevContent) => [mainContent]);

    // Create a deep copy of mainContent
    const newEntry = JSON.parse(JSON.stringify(mainContent));

    // Update deepCopy using state updater
    setDeepCopy((prevDeepCopy) => [...prevDeepCopy, newEntry]);

    console.log(mainContent, "here");
    console.log(deepCopy, "deepCopy after push");

    setMainContent({ heading: "", subHeading: "", image: null });
    handleMainContentClose();
  };

  const UploadimagePath = async () => {
    const formData = new FormData();
    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        `${base_url}/api/blogs/uploads`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully", response.data);
      setImagePath(response?.data?.images);
      return response.data.images;
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading images. Please try again.");
      return null;
    }
  };

  const uploadmainimage = async () => {
    const formData = new FormData();
    Array.from(mainImage).forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(
        `${base_url}/api/blogs/uploads`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Image uploaded successfully", response.data);
      setMainimagepath(response?.data?.images);
      return response.data.images;
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading images. Please try again.");
      return null;
    }
  };

  const handleUploadBlog = async () => {
    if (!selectedCategory) {
      alert("Please select a category!");
      return;
    }
    const uploadMainImage = await uploadmainimage();
    const uploadedImages = await UploadimagePath();
    if (!uploadedImages) {
      return;
    }
    if (!uploadMainImage) {
      return;
    }
    // console.log(deepCopy, "last");
    const body = {
      heroSection: [
        {
          headerImg: mainContent ? uploadMainImage[0].path : null,
          header: deepCopy[0]?.Heroheading,
          text: deepCopy[0]?.HerosubHeading,
          mainHeading: deepCopy[0]?.heading,
          mainSubHeading: deepCopy[0]?.subHeading,
        },
      ],
      tag: tagvalue,
      learn: learnlist.Learn,
      thought: thoughtlist.thought,
      category: selectedCategory,
      contentList: contentList.map((content, index) => ({
        headings: content.headings,
        paragraphs: content.paragraphs,
        image: uploadedImages[index] ? uploadedImages[index].path : null,
      })),
    };

    console.log("Blog Data:", body);

    try {
      const response = await fetch(`${base_url}/api/blogs/createblog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        toast.success("Blog uploaded successfully!");
        setContentList([]);
        setSelectedCategory("");
        navigate(`/blog/${id}`);
      } else {
        toast.error("Failed to upload the blog.");
      }
    } catch (error) {
      console.error("Error uploading blog:", error);
      alert("An error occurred while uploading the blog.");
    }
  };

  // -----------------------------------------------------------------------------------------------
  const [learnlist, setLearnlist] = useState({ Learn: [] });
  // Function to handle input changes
  const handlesentenceInputChange = (e, field, index) => {
    const newContentList = { ...learnlist };
    newContentList.Learn[index] = e.target.value;
    setLearnlist(newContentList);
  };

  // Function to add a new sentence
  const handleAddSentence = () => {
    const newContentList = { ...learnlist };
    newContentList.Learn.push(""); // Add an empty string as a new sentence
    setLearnlist(newContentList);
  };

  // Function to remove a sentence
  const handleRemoveSentence = (index) => {
    const newContentList = { ...learnlist };
    newContentList.Learn.splice(index, 1); // Remove the sentence at the given index
    setLearnlist(newContentList);
  };
  // -----------------------------------------------------------------------------------------------
  const [thoughtlist, setThoughtlist] = useState({ thought: [] });
  // Function to handle input changes
  const handlethoughtInputChange = (e, field, index) => {
    const newContentList = { ...thoughtlist };
    newContentList.thought[index] = e.target.value;
    setThoughtlist(newContentList);
  };

  // Function to add a new sentence
  const handleAddthought = () => {
    const newContentList = { ...thoughtlist };
    newContentList.thought.push(""); // Add an empty string as a new sentence
    setThoughtlist(newContentList);
  };

  // Function to remove a sentence
  const handleRemovethought = (index) => {
    const newContentList = { ...thoughtlist };
    newContentList.thought.splice(index, 1); // Remove the sentence at the given index
    setThoughtlist(newContentList);
  };

  return (
    <div>
      <ToastContainer />
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
          {mainContentList.length > 0 && (
            <div className="border rounded-lg p-4 mb-5">
              <h2 className="text-[#141D2A] text-2xl font-semibold mb-2">
                {mainContentList[0].Heroheading}
              </h2>
              <h4 className="text-[#141D2A]  mb-4">
                {mainContentList[0].HerosubHeading}
              </h4>
              {mainContentList[0].image && (
                <img
                  className="rounded-lg"
                  src={URL.createObjectURL(mainContentList[0].image)}
                  alt="Main Content Preview"
                />
              )}
              <h2 className="text-[#141D2A] font-semibold mb-2 text-2xl mt-4">
                {mainContentList[0].heading}
              </h2>
              <h4 className="text-[#141D2A] mb-2">
                {mainContentList[0].subHeading}
              </h4>
            </div>
          )}

          {contentList &&
            contentList?.map((content, index) => (
              <div className="border rounded-lg p-4 mb-5" key={index}>
                <div>
                  {content.image && (
                    <img
                      className="rounded-lg"
                      src={URL.createObjectURL(content.image)}
                      alt="Content Preview"
                    />
                  )}
                </div>
                <div className="mt-4">
                  {content.headings.map((heading, idx) => (
                    <h3 key={idx} className="text-[#141D2A] font-semibold mb-2">
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
              onClick={handleMainContentOpen}
              className="text-[#FFFFFF] bg-[#4CAF50] font-semibold flex items-center gap-2 px-4 py-2 rounded-lg"
            >
              <RiAddBoxLine /> Add Main Content
            </button>
            <button
              onClick={handleOpen}
              className="text-[#FFFFFF] bg-[#E86731] font-semibold flex items-center gap-2 px-4 py-2 rounded-lg"
            >
              <RiAddBoxLine /> Add Content
            </button>
          </div>
        </div>

        <div className="col-span-12 xl:col-span-4">
          {/* <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
              Upload Img
            </h2>
            <img
              className="h-[400px] object-cover rounded-lg"
              src={heroImage2}
              alt="Placeholder"
            />
          </div> */}

          {/* ----------------------------------------------------------------------------------------------------- */}
          <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-[#141D2A] font-semibold text-[20px] mb-2">
              Add Learn Basic Local Phrases
            </h2>

            {learnlist &&
              learnlist?.Learn.map((sentence, index) => (
                <div key={index} className="flex items-center gap-4 mb-3">
                  <input
                    type="text"
                    placeholder={`Sentence ${index + 1}`}
                    value={sentence}
                    onChange={(e) =>
                      handlesentenceInputChange(e, "sentence", index)
                    }
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSentence(index)}
                    className="text-red-500 bg-gray-200 p-1 rounded-md hover:bg-gray-300 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            <button
              type="button"
              onClick={handleAddSentence}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Add Sentence
            </button>
          </div>
          {/* ------------------------------------------------------------------------ */}
          {/* ----------------------------------------------------------------------------------------------------- */}
          <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-[#141D2A] font-semibold text-[20px] mb-2">
              Add Final Thoughts
            </h2>

            {thoughtlist &&
              thoughtlist?.thought.map((sentence, index) => (
                <div key={index} className="flex items-center gap-4 mb-3">
                  <input
                    type="text"
                    placeholder={`Sentence ${index + 1}`}
                    value={sentence}
                    onChange={(e) =>
                      handlethoughtInputChange(e, "sentence", index)
                    }
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemovethought(index)}
                    className="text-red-500 bg-gray-200 p-1 rounded-md hover:bg-gray-300 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            <button
              type="button"
              onClick={handleAddthought}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Add Sentence
            </button>
          </div>
          {/* ------------------------------------------------------------------------ */}

          <div className="border rounded-lg p-4 mb-4">
            <h2 className="text-[#141D2A] font-semibold text-[20px] mb-2">
              Add Category
            </h2>
            <div
              style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}
            >
              <label
                htmlFor="category-select"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              ></label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                  fontSize: "14px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <option value="">Select a category</option>
                {options &&
                  options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  placeholder="Add new category"
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    backgroundColor: "#f9f9f9",
                  }}
                />
                <button
                  onClick={handleAddOption}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            <h2 className="text-[#141D2A] font-semibold text-[20px] mb-2 mt-5">
              Add Tag
            </h2>
            <div>
              <input
                type="text"
                value={tagvalue}
                onChange={handleChange}
                placeholder="Enter text"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
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

            <div className="space-y-4 px-2 max-h-[65vh] overflow-y-auto">
              <div>
                <h3 className="text-md font-semibold mb-2">Headings</h3>
                <div>
                  <input
                    type="text"
                    placeholder="Heading"
                    value={content.headings[0]}
                    onChange={(e) => handleInputChange(e, "headings")}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">Upload Image</h3>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleInputChange(e, "image")}
                />
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">Paragraphs</h3>
                {content.paragraphs.map((paragraph, index) => (
                  <div key={index} className="flex items-center gap-4 mb-3">
                    <input
                      type="text"
                      placeholder={`Paragraph ${index + 1}`}
                      value={paragraph}
                      onChange={(e) =>
                        handleInputChange(e, "paragraphs", index)
                      }
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveParagraph(index)}
                      className="text-red-500 bg-gray-200 p-1 rounded-md hover:bg-gray-300 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddParagraph}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Add Paragraph
                </button>
              </div>

              <button
                onClick={handleSubmitContent}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Submit
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
      <Modal
        open={openMainContent}
        onClose={handleMainContentClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={openMainContent}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="text-lg font-bold text-center mb-4"
            >
              Add Main Content
            </Typography>

            <div className="space-y-4 px-2 max-h-[65vh] overflow-y-auto">
              <div>
                <h3 className="text-md font-semibold mb-2">Hero Heading</h3>
                <input
                  type="text"
                  placeholder="Hero Content Heading"
                  value={mainContent.Heroheading}
                  onChange={(e) => handleInputChange(e, "HeroHeading")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">Hero Sub Heading</h3>
                <input
                  type="text"
                  placeholder="Hero Content Sub Heading"
                  value={mainContent.HerosubHeading}
                  onChange={(e) => handleInputChange(e, "HeroSubHeading")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <h3 className="text-md font-semibold mb-2">Upload Image</h3>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => handleInputChange(e, "mainImage")}
                />
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">Main Heading</h3>
                <input
                  type="text"
                  placeholder="Main Content Heading"
                  value={mainContent.heading}
                  onChange={(e) => handleInputChange(e, "mainHeading")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <h3 className="text-md font-semibold mb-2">Main Sub Heading</h3>
                <input
                  type="text"
                  placeholder="Main Content Sub Heading"
                  value={mainContent.subHeading}
                  onChange={(e) => handleInputChange(e, "mainSubHeading")}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                onClick={handleSubmitMainContent}
                className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
              >
                Submit
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateBlog;
