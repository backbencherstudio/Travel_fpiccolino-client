import { RiAddBoxLine, RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../../utils/base_path";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const UpdateBlog = () => {
  const [heroSection, setHeroSection] = useState({});
  const [contentList, setContentList] = useState([]);
  const [category, setCategory] = useState("");
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
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
        const response = await axios.get(
          "http://localhost:3000/api/blogs/categoryCount"
        );
        updateOptions(response.data);
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

  const { id } = useParams();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${base_url}/api/blogs/blogGet/${id}`);
        const responseData = response.data;

        setData(responseData);
        setHeroSection(responseData?.heroSection?.[0] || {});
        setContentList(responseData?.contentList || []);
        setCategory(responseData?.category || "");
        setSentences(responseData?.learn || []);
        setThought(responseData?.thought || []);
      } catch (err) {
        console.error(
          err.message || "Something went wrong while fetching blogs."
        );
      }
    };

    fetchBlogs();
  }, []);

  const handleHeroEdit = (field, value) => {
    setHeroSection((prevHeroSection) => ({
      ...prevHeroSection,
      [field]: value,
    }));
  };

  const handleContentEdit = (index, field, value, paragraphIndex = 0) => {
    setContentList((prevContentList) => {
      const updatedContent = [...prevContentList];
      if (field === "headings" || field === "paragraphs") {
        updatedContent[index][field][paragraphIndex] = value;
      } else {
        updatedContent[index][field] = value;
      }
      return updatedContent;
    });
  };

  const addNewContent = () => {
    setContentList((prevContentList) => [
      ...prevContentList,
      { headings: ["New Heading"], image: "", paragraphs: ["New paragraph"] },
    ]);
  };

  const deleteContent = async (index) => {
    setContentList((prevContentList) =>
      prevContentList.filter((_, i) => i !== index)
    );
    try {
      const response = await axios.delete(
        `${base_url}/api/blogs/deleteContent/${id}/${index}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Content Delete successfully!");
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Error deleting Hero Section", error);
      toast.error("Error deleting blog.");
    }
  };

  const addParagraph = (event, index) => {
    event.stopPropagation();
    setContentList((prevContentList) =>
      prevContentList.map((content, i) => {
        if (i === index) {
          return {
            ...content,
            paragraphs: content.paragraphs
              ? [...content.paragraphs, "New paragraph"]
              : ["New paragraph"],
          };
        }
        return content;
      })
    );
  };

  const deleteParagraph = (contentIndex, paragraphIndex) => {
    setContentList((prevContentList) =>
      prevContentList.map((content, i) => {
        if (i === contentIndex) {
          return {
            ...content,
            paragraphs: content.paragraphs.filter(
              (_, idx) => idx !== paragraphIndex
            ),
          };
        }
        return content;
      })
    );
  };

  const handleImageChange = (e, isHero = false, index = null) => {
    const file = e.target.files[0];
    if (file) {
      if (isHero) {
        setImages([...images, file]);
        setHeroSection((prevHeroSection) => ({ ...prevHeroSection, file }));
      } else {
        setContentList((prevContentList) => {
          const updatedContent = [...prevContentList];
          updatedContent[index].file = file;
          setImages([...images, file]);
          return updatedContent;
        });
      }
    }
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
      setImages([]);
      return response.data.images;
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading images. Please try again.");
      return null;
    }
  };

  const updateHeroSection = async () => {
    let uploadedImages = {};

    if (heroSection?.file) {
      const file = heroSection.file;
      uploadedImages = await UploadimagePath();

      setImages([]);
    }

    const body = {
      UpdatedImage: uploadedImages[0]?.path || "",
      header: heroSection.header || "",
      text: heroSection.text || "",
      mainHeading: heroSection.mainHeading || "",
      mainSubHeading: heroSection.mainSubHeading || "",
      oldImage: heroSection?.headerImg,
    };

    try {
      const response = await axios.patch(
        `${base_url}/api/blogs/updateHeroSection/${id}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setHeroSection({});
      window.location.reload();
      toast.success("Hero Section updated successfully!");
    } catch (error) {
      console.error("Error updating Hero Section", error);
      toast.error("Error updating blog.");
    }
  };

  const updateIndividualContent = async (index, idd) => {
    let uploadedImages = {};
    const content = contentList[index];
    const formData = new FormData();
    if (content?.file) {
      const file = content?.file;
      uploadedImages = await UploadimagePath();

      setImages([]);
      formData.append("file", content.file);
    }
    const body = {
      UpdatedImage: uploadedImages[0]?.path || "",
      oldImage: content?.image,
      headings: content?.headings[0] || "",
      paragraphs:
        content?.paragraphs.map((paragraph, pIndex) => paragraph) || [],
    };

    try {
      const response = await axios.patch(
        `${base_url}/api/blogs/updateContent/${id}/${index}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setContentList([]);
      toast.success("Blog updated successfully!");
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error(`Error updating Content ${index + 1}`, error);
      toast.error("Error updating blog.");
    }
  };

  const updateCategory = async () => {
    const payload = { category: selectedCategory };

    try {
      const response = await axios.patch(
        `${base_url}/api/blogs/updatecatagory/${id}`,
        payload
      );
      setCategory(response.data.category);
      toast.success("Category updated successfully!");
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Error updating Category", error);
      toast.error("Error updating blog.");
    }
  };

  // --------------------------------------------extra---------------------------------------
  const updateTexContent = async () => {
    const payload = {
      learn: sentences,
      thought: thought,
    };
    try {
      const response = await axios.patch(
        `${base_url}/api/blogs/updateTexContent/${id}`,
        payload
      );
      setCategory(response.data.category);
      toast.success("Text updated successfully!");
    } catch (error) {
      console.error("Error updating Text", error);
      toast.error("Error updating blog.");
    }
  };
  const [sentences, setSentences] = useState([]);
  const [newSentence, setNewSentence] = useState("");
  const handleUpdate = (index, updatedText) => {
    const updatedSentences = sentences.map((sentence, i) =>
      i === index ? updatedText : sentence
    );
    setSentences(updatedSentences);
  };

  const handleAdd = () => {
    if (newSentence.trim()) {
      setSentences([...sentences, newSentence.trim()]);
      setNewSentence("");
    }
  };

  const handleDelete = (index) => {
    const updatedSentences = sentences.filter((_, i) => i !== index);
    setSentences(updatedSentences);
  };
  // --------------------------------------------extra---------------------------------------
  const [thought, setThought] = useState([]);
  const [newLearn, setNewLearn] = useState("");
  const handleUpdatee = (index, updatedText) => {
    const updatedSentences = thought.map((sentence, i) =>
      i === index ? updatedText : sentence
    );
    setThought(updatedSentences);
  };

  const handleAddd = () => {
    if (newLearn.trim()) {
      setThought([...thought, newLearn.trim()]);
      setNewLearn("");
    }
  };

  const handleDeletee = (index) => {
    const updatedSentences = thought.filter((_, i) => i !== index);
    setThought(updatedSentences);
  };

  return (
    <div className="p-6 space-y-6">
      <ToastContainer />
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Edit Blog</h1>
      </div>

      {/* Hero Section */}
      <div className="border rounded-lg p-6 space-y-6 shadow-lg">
        <h2 className="text-xl font-semibold">Hero Section</h2>
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            {heroSection.file ? (
              <img
                src={URL.createObjectURL(heroSection.file)}
                alt="Hero"
                className="w-full max-w-lg h-auto object-cover rounded-md shadow-md"
              />
            ) : (
              <img
                src={`${base_url}/uploads/${heroSection.headerImg}`}
                alt="Hero"
                className="w-full max-w-lg h-auto object-cover rounded-md shadow-md"
              />
            )}
            <input
              type="file"
              onChange={(e) => handleImageChange(e, true)}
              className="mt-2"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Hero Heading</label>
            <textarea
              value={heroSection.header || ""}
              onChange={(e) => handleHeroEdit("header", e.target.value)}
              className="w-full border rounded p-2"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2 font-medium">Hero Sub Heading</label>
            <textarea
              value={heroSection.text || ""}
              onChange={(e) => handleHeroEdit("text", e.target.value)}
              className="w-full border rounded p-2"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2 font-medium">Main Heading</label>
            <textarea
              value={heroSection.mainHeading || ""}
              onChange={(e) => handleHeroEdit("mainHeading", e.target.value)}
              className="w-full border rounded p-2"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2 font-medium">Main Sub Heading</label>
            <textarea
              value={heroSection.mainSubHeading || ""}
              onChange={(e) => handleHeroEdit("mainSubHeading", e.target.value)}
              className="w-full border rounded p-2"
            ></textarea>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={updateHeroSection}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Update Hero Section
          </button>
        </div>
      </div>

      {/* Content List */}
      {contentList.map((content, index) => (
        <div key={index} className="border rounded-lg p-6 space-y-6 shadow-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Content {index + 1}</h2>
            <button
              onClick={() => deleteContent(index)}
              className="text-red-500 border border-red-500 px-2 py-1 rounded-md flex items-center gap-1 hover:bg-red-100"
            >
              <RiDeleteBin5Line /> Delete
            </button>
          </div>
          <div className="flex flex-col items-center">
            {content.file ? (
              <img
                src={URL.createObjectURL(content.file)}
                alt={`Content ${index + 1}`}
                className="w-full max-w-lg h-auto object-cover rounded-md shadow-md"
              />
            ) : (
              <img
                src={`${base_url}/uploads/${content.image}`}
                alt={`Content ${index + 1}`}
                className="w-full max-w-lg h-auto object-cover rounded-md shadow-md"
              />
            )}
            <input
              type="file"
              onChange={(e) => handleImageChange(e, false, index)}
              className="mt-2"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Heading</label>
            <input
              type="text"
              value={content.headings[0] || ""}
              onChange={(e) =>
                handleContentEdit(index, "headings", e.target.value)
              }
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">Paragraphs</label>
            {content.paragraphs.map((paragraph, paragraphIndex) => (
              <div key={paragraphIndex} className="space-y-2">
                <textarea
                  value={paragraph || ""}
                  onChange={(e) =>
                    handleContentEdit(
                      index,
                      "paragraphs",
                      e.target.value,
                      paragraphIndex
                    )
                  }
                  className="w-full border rounded p-2 mt-8"
                ></textarea>
                <button
                  onClick={() => deleteParagraph(index, paragraphIndex)}
                  className="text-red-500 px-2 mb-5 rounded-md bg-red-100 "
                >
                  Delete Paragraph
                </button>
              </div>
            ))}
            <button
              onClick={(event) => addParagraph(event, index)}
              className="primary_bg text-white px-2  mt-5  rounded-md hover:opacity-85"
            >
              Add Paragraph
            </button>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => updateIndividualContent(index, content._id)}
              className="bg-orange-500 text-white px-4 py-2  rounded-md hover:bg-orange-600"
            >
              Update Content {index + 1}
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-end">
        <button
          onClick={addNewContent}
          className="primary_bg text-white px-4 py-2 rounded-md flex items-center gap-2 hover:opacity-85"
        >
          <RiAddBoxLine /> Add Content
        </button>
      </div>

      {/* --------------------------------------------extra--------------------------------------- */}
      <div className="border rounded-lg p-6 space-y-6 shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Learn Basic Local Phrases</h1>
          <ul className="space-y-2">
            {sentences.map((sentence, index) => (
              <li key={index} className="flex items-center space-x-2">
                <textarea
                  type="text"
                  value={sentence}
                  onChange={(e) => handleUpdate(index, e.target.value)}
                  className="border rounded px-2 py-1 flex-1"
                />
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 px-2  rounded-md bg-red-100 "
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <textarea
              type="text"
              value={newSentence}
              onChange={(e) => setNewSentence(e.target.value)}
              placeholder="Add a new sentence"
              className="border rounded px-2 py-1 mr-2"
            />
            <button
              onClick={handleAdd}
              className="primary_bg text-white px-4 py-1 rounded hover:opacity-85"
            >
              Add Sentence
            </button>
          </div>
        </div>

        <div className="p-4">
          <h1 className="text-xl font-bold mb-4">Final Thoughts</h1>
          <ul className="space-y-2">
            {thought.map((sentence, index) => (
              <li key={index} className="flex items-center space-x-2">
                <textarea
                  type="text"
                  value={sentence}
                  onChange={(e) => handleUpdatee(index, e.target.value)}
                  className="border rounded px-2 py-1 flex-1"
                />
                <button
                  onClick={() => handleDeletee(index)}
                  className="text-red-500 px-2  rounded-md bg-red-100 "
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <textarea
              type="text"
              value={newLearn}
              onChange={(e) => setNewLearn(e.target.value)}
              placeholder="Add a new sentence"
              className="border rounded px-2 py-1 mr-2"
            />
            <button
              onClick={handleAddd}
              className="primary_bg text-white px-4 py-1 rounded hover:opacity-85"
            >
              Add Sentence
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={updateTexContent}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 mt-4"
          >
            Update
          </button>
        </div>
      </div>

      {/* Category Section */}
      <div className="border rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Category</h2>
        <select
          value={selectedCategory || ""}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border rounded p-2"
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
              backgroundColor: "#e87316",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Add
          </button>
        </div>
        <div className="flex justify-end">
          <button
            onClick={updateCategory}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 mt-4"
          >
            Update Category
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
