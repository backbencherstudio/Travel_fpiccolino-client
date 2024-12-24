import { RiAddBoxLine, RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";

const UpdateBlog = () => {
  const [heroSection, setHeroSection] = useState({});
  const [contentList, setContentList] = useState([]);
  const [category, setCategory] = useState("");
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/blogs/blogGet/676a52407856362ce9bd9526"
        );
        const responseData = response.data;

        setData(responseData);
        setHeroSection(responseData?.heroSection?.[0] || {});
        setContentList(responseData?.contentList || []);
        setCategory(responseData?.category || "");
      } catch (err) {
        console.error(err.message || "Something went wrong while fetching blogs.");
      }
    };

    fetchBlogs();
  }, []);

  const handleHeroEdit = (field, value) => {
    setHeroSection((prevHeroSection) => ({ ...prevHeroSection, [field]: value }));
  };

  const handleContentEdit = (index, field, value) => {
    setContentList((prevContentList) => {
      const updatedContent = [...prevContentList];
      if (field === "headings" || field === "paragraphs") {
        updatedContent[index][field][0] = value;
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
    console.log(contentList)
  };

  const deleteContent = async(index) => {

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/blogs/deleteContent/676a52407856362ce9bd9526/${index}`, 
        {
          headers: {
            "Content-Type": "application/json", 
          },
        }
      );
      console.log("Hero Section Deleted", response.data);
      setContentList((prevContentList) =>
        prevContentList.filter((_, i) => i !== index)
      );
    } catch (error) {
      console.error("Error deleting Hero Section", error);
    }
    

  };

  const addParagraph = (event, index) => {
    event.stopPropagation();
    console.log(index);
    console.log("Clicked add paragraph button");
    setContentList((prevContentList) => {
        const updatedContent = [...prevContentList];
        updatedContent[index].paragraphs.push("New paragraph");
        console.log(updatedContent[index].paragraphs);
        return updatedContent;
    });
};

  

  const deleteParagraph = (contentIndex, paragraphIndex) => {
    setContentList((prevContentList) => {
      const updatedContent = [...prevContentList];
      updatedContent[contentIndex].paragraphs.splice(paragraphIndex, 1);
      return updatedContent;
    });
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
        const response = await axios.post("http://localhost:3000/api/blogs/uploads", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        console.log("Image uploaded successfully", response.data);
        setImages([])
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
    // console.log(heroSection, "lalala");
    uploadedImages = await UploadimagePath();

    setImages([]);
    // console.log(uploadedImages);
    // console.log(uploadedImages[0]?.path);
  }

  console.log(heroSection);

  const body = {
    UpdatedImage: uploadedImages[0]?.path || "",
    header: heroSection.header || "",
    text: heroSection.text || "",
    mainHeading: heroSection.mainHeading || "",
    mainSubHeading: heroSection.mainSubHeading || "",
    oldImage : heroSection?.headerImg
  };

  try {
    const response = await axios.patch(
      "http://localhost:3000/api/blogs/updateHeroSection/676a52407856362ce9bd9526",
      body, 
      {
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );
    console.log("Hero Section Updated", response.data);
    setHeroSection({})
  } catch (error) {
    console.error("Error updating Hero Section", error);
  }
};

  const updateIndividualContent = async (index, id) => {
    let uploadedImages = {};
    const content = contentList[index];
    const formData = new FormData();
    if (content?.file) {
      const file = content?.file;
      console.log(content)
      uploadedImages = await UploadimagePath();

    setImages([]);
    console.log(uploadedImages);
    console.log(uploadedImages[0]?.path);
      formData.append("file", content.file);
    }
    const body = {
      UpdatedImage: uploadedImages[0]?.path || "",
      oldImage : content?.image,
      headings: content?.headings[0] || "",
      paragraphs: content?.paragraphs.map((paragraph, pIndex) => paragraph) || [],
    };


    console.log("this is body", body)
    
    console.log(index, "jhljervhbrejvcrewufhe")
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/blogs/updateContent/676a52407856362ce9bd9526/${index}`,
        body,
        {
          headers: {
           "Content-Type": "application/json", 
          },
        }
      );
      console.log(`Content ${index + 1} Updated`, response.data);
      setContentList([]);
    } catch (error) {
      console.error(`Error updating Content ${index + 1}`, error);
    }
  };

  const updateCategory = async () => {
    const payload = { category };
    console.log(payload)
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/blogs/updatecatagory/676a52407856362ce9bd9526",
        payload
      );
      console.log("Category Updated", response.data);
    } catch (error) {
      console.error("Error updating Category", error);
    }
  };

  return (
    <div className="p-6 space-y-6">
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
                src={`http://localhost:3000/uploads/${heroSection.headerImg}`}
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
            <label className="block mb-2 font-medium">Header Main Text</label>
            <textarea
              value={heroSection.header || ""}
              onChange={(e) => handleHeroEdit("header", e.target.value)}
              className="w-full border rounded p-2"
            ></textarea>
          </div>
          <div>
            <label className="block mb-2 font-medium">Header Text</label>
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
            <label className="block mb-2 font-medium">Main Subheading</label>
            <textarea
              value={heroSection.mainSubHeading || ""}
              onChange={(e) => handleHeroEdit("mainSubHeading", e.target.value)}
              className="w-full border rounded p-2"
            ></textarea>
          </div>
        </div>
        <button
          onClick={updateHeroSection}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          Update Hero Section
        </button>
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
                src={`http://localhost:3000/uploads/${content.image}`}
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
              onChange={(e) => handleContentEdit(index, "headings", e.target.value)}
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
                    handleContentEdit(index, "paragraphs", e.target.value)
                  }
                  className="w-full border rounded p-2"
                ></textarea>
                <button
                  onClick={() => deleteParagraph(index, paragraphIndex)}
                  className="text-red-500 px-2 py-1 rounded-md hover:bg-red-100"
                >
                  Delete Paragraph
                </button>
              </div>
            ))}
            <button
               onClick={(event) => addParagraph(event, index)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Paragraph
            </button>
          </div>
          <button
            onClick={() => updateIndividualContent(index, content._id)}
            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
          >
            Update Content {index + 1}
          </button>
        </div>
      ))}

      <button
        onClick={addNewContent}
        className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-600"
      >
        <RiAddBoxLine /> Add Content
      </button>

      {/* Category Section */}
      <div className="border rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-semibold">Category</h2>
        <select
          value={category || ""}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="travel">Travel</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="tech">Tech</option>
        </select>
        <button
          onClick={updateCategory}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 mt-4"
        >
          Update Category
        </button>
      </div>
    </div>
  );
};

export default UpdateBlog;