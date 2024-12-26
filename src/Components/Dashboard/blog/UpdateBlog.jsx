import { RiAddBoxLine, RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../../utils/base_path";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const UpdateBlog = () => {
  const [heroSection, setHeroSection] = useState({});
  const [contentList, setContentList] = useState([]);
  const [category, setCategory] = useState("");
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { id } = useParams();
   console.log(id)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/blogs/blogGet/${id}`
        );
        const responseData = response.data;

        setData(responseData);
        setHeroSection(responseData?.heroSection?.[0] || {});
        setContentList(responseData?.contentList || []);
        setCategory(responseData?.category || "");
      } catch (err) {
        console.error(
          err.message || "Something went wrong while fetching blogs."
        );
      }
    };

    fetchBlogs();
  }, []);

  // useEffect(() => {
  //   fetchBlogs();
  // }, [refresh]);

  const handleHeroEdit = (field, value) => {
    setHeroSection((prevHeroSection) => ({
      ...prevHeroSection,
      [field]: value,
    }));
  };

  const handleContentEdit = (index, field, value, paragraphIndex=0) => {
    setContentList((prevContentList) => {
      const updatedContent = [...prevContentList];
      if (field === "headings" || field === "paragraphs" ) {
        updatedContent[index][field][paragraphIndex] = value;
      } 
      
      else {
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
        `${base_url}/api/blogs/deleteContent/676a52407856362ce9bd9526/${index}`, 
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
      toast.success("Content Delete successfully!");
    } catch (error) {
      console.error("Error deleting Hero Section", error);
      toast.error("Error deleting blog.");
    }
    

  };

  // const addParagraph = (event, index) => {
  //   event.stopPropagation();
  //   setContentList((prevContentList) => {
      
  //     const updatedContent = [...prevContentList];
  
  //     // Add a single "New paragraph" field to the correct index
  //     if (updatedContent[index] && updatedContent[index].paragraphs) {
  //       updatedContent[index].paragraphs = [
  //         ...updatedContent[index].paragraphs,
  //         "New paragraph",
  //       ];
  //     }
  
  //     // Return the updated state
  //     return updatedContent;
  //   });
  // };
  const addParagraph = (event, index) => {
    event.stopPropagation();
    setContentList((prevContentList) => 
      prevContentList.map((content, i) => {
        if (i === index) {
          return {
            ...content,
            paragraphs: content.paragraphs ? [...content.paragraphs, "New paragraph"] : ["New paragraph"],
          };
        }
        return content;
      })
    );
  };
  
  

  

  // const deleteParagraph = (contentIndex, paragraphIndex) => {
  //   setContentList((prevContentList) => {
  //     const updatedContent = [...prevContentList];
  //     updatedContent[contentIndex].paragraphs.splice(paragraphIndex, 1);
  //     return updatedContent;
  //   });
  // };
  const deleteParagraph = (contentIndex, paragraphIndex) => {
    setContentList((prevContentList) => 
      prevContentList.map((content, i) => {
        if (i === contentIndex) {
          return {
            ...content,
            paragraphs: content.paragraphs.filter((_, idx) => idx !== paragraphIndex),
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
        const response = await axios.post(`${base_url}/api/blogs/uploads`, formData, {
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
      `${base_url}/api/blogs/updateHeroSection/${id}`,
      body, 
      {
        headers: {
          "Content-Type": "application/json", 
        },
      }
    );
    console.log("Hero Section Updated", response.data);
    setHeroSection({})
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
    console.log(id, index)
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
      console.log(`Content ${index + 1} Updated`, response.data);
      setContentList([]);
      toast.success("Blog updated successfully!");
    } catch (error) {
      console.error(`Error updating Content ${index + 1}`, error);
      toast.error("Error updating blog.");
    }
  };

  const updateCategory = async () => {
    const payload = { category };
    console.log(payload)
    try {
      const response = await axios.patch(
        `${base_url}/api/blogs/updatecatagory/${id}`,
        payload
      );
      console.log("Category Updated", response.data);
      setCategory( response.data.category)
      toast.success("Category updated successfully!");
    } catch (error) {
      console.error("Error updating Category", error);
      toast.error("Error updating blog.");
    }
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
          {/* <div>
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
          </div> */}
          <div>
  <label className="block mb-2 font-medium">Paragraphs</label>
  {content.paragraphs.map((paragraph, paragraphIndex) => (
    <div key={paragraphIndex} className="space-y-2">
      <textarea
        value={paragraph || ""}
        onChange={(e) =>
          handleContentEdit(index, "paragraphs", e.target.value, paragraphIndex)
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
    className="bg-blue-500 text-white px-4 py-2 mt-5  rounded-md hover:bg-blue-600"
  >
    Add Paragraph
  </button>
</div>

          <button
            onClick={() => updateIndividualContent(index, content._id)}
            className="bg-orange-500 text-white px-4 py-2  rounded-md hover:bg-orange-600"
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