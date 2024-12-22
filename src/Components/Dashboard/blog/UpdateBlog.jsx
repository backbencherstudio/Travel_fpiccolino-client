import { RiAddBoxLine, RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";

const UpdateBlog = () => {
  const [heroSection, setHeroSection] = useState({});
  const [contentList, setContentList] = useState([]);
  const [category, setCategory] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/blogs/blogGet/6767e5072150596bdf5dc89c"
        );
        const responseData = response.data;

        setData(responseData);
        console.log(data)
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
  };

  const deleteContent = (index) => {
    setContentList((prevContentList) =>
      prevContentList.filter((_, i) => i !== index)
    );
  };

  const addParagraph = (index) => {
    setContentList((prevContentList) => {
      const updatedContent = [...prevContentList];
      updatedContent[index].paragraphs.push("New paragraph");
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
  console.log(heroSection)
  const handleImageChange = (e, isHero = false, index = null) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isHero) {
          setHeroSection((prevHeroSection) => ({ ...prevHeroSection, headerImg: reader.result }));
        } else {
          setContentList((prevContentList) => {
            const updatedContent = [...prevContentList];
            updatedContent[index].image = reader.result;
            return updatedContent;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    const payload = {
      category,
      heroSection: [heroSection],
      contentList,
    };
    console.log("Updated Data:", payload);
    // Replace the below with an API call to update the blog
    // Example: axios.post('/api/update-blog', payload);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Edit Blog</h1>
        <button
          onClick={handleUpdate}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
        >
          Update Blog
        </button>
      </div>

      {/* Hero Section */}
      <div className="border rounded-lg p-6 space-y-6 shadow-lg">
        <h2 className="text-xl font-semibold">Hero Section</h2>
        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <img
              src={`http://localhost:3000/${heroSection.headerImg}`} 
              alt="Hero"
              className="w-full max-w-lg h-auto object-cover rounded-md shadow-md"
            />
            <input
              type="file"
              onChange={(e) => handleImageChange(e, true)}
              className="mt-2"
            />
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
            <img
              src={ `http://localhost:3000/${content.image}`}
              alt={`Content ${index + 1}`}
              className="w-full max-w-lg h-auto object-cover rounded-md shadow-md"
            />
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
              onClick={() => addParagraph(index)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Paragraph
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addNewContent}
        className="bg-orange-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-orange-600"
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
      </div>
    </div>
  );
};

export default UpdateBlog;
