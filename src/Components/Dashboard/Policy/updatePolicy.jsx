import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { base_url } from "../../../utils/base_path";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdatePolicy = () => {
  const categories = [
    "Candidate information",
    "Newsletter information",
    "Website privacy policy",
    "Purchase information",
    "Categories responsible for processing",
    "Privacy Area",
    "Appointment Request Information",
    "Gift Card Information",
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [content, setContent] = useState("");
  const [existingPolicies, setExistingPolicies] = useState({});
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Enhanced Quill modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      ["link"],
      ["clean"],
    ],
  };

  // Quill formats (specify which formats we want to allow)
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "indent",
    "link",
  ];

  // Fetch existing policies on component mount
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get(`${base_url}/api/policy`);
        const policiesByCategory = {};
        response.data.data.forEach((policy) => {
          policiesByCategory[policy.category] = policy.content;
        });
        setExistingPolicies(policiesByCategory);
        if (policiesByCategory[selectedCategory]) {
          setContent(policiesByCategory[selectedCategory]);
        }
      } catch (error) {
        toast.error("Failed to fetch policies");
      }
    };
    fetchPolicies();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsCreatingNew(false);
    setContent(existingPolicies[category] || "");
  };

  const startNewPolicy = () => {
    setIsCreatingNew(true);
    setContent("");
  };

  const editExisting = () => {
    setIsCreatingNew(false);
    setContent(existingPolicies[selectedCategory] || "");
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/api/policy/upsert`, {
        category: selectedCategory,
        content: content,
      });
      if (response.data.success) {
        toast.success("Policy updated successfully");
        setExistingPolicies({
          ...existingPolicies,
          [selectedCategory]: content,
        });
      }
    } catch (error) {
      toast.error("Failed to update policy");
    }
  };

  return (
    <div className="bg-[#f3f4f6] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Policy Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Selection */}
        <div className="md:mb-6">
          <label className="block mb-2 font-semibold">Select Section:</label>
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-4 items-center">
          <button
            type="button"
            onClick={editExisting}
            className={`px-4 py-2 h-10 rounded ${
              !isCreatingNew
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Edit Existing Policy
          </button>
          <button
            type="button"
            onClick={startNewPolicy}
            className={`px-4 py-2 rounded ${
              isCreatingNew
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Create New Policy
          </button>
        </div>
      </div>

      {/* Display Current Policy */}
      {!isCreatingNew && existingPolicies[selectedCategory] && (
        <div className="mb-6 ql-editor">
          <h3 className="text-xl font-semibold my-4">Current Policy</h3>
          <div className="p-4 border rounded bg-gray-50">
            <div
              dangerouslySetInnerHTML={{
                __html: existingPolicies[selectedCategory],
              }}
            />
          </div>
        </div>
      )}

      {/* Edit/Create Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-xl font-semibold">
          {isCreatingNew ? "Create New Policy" : "Edit Policy"}
        </h3>

        <div className="border rounded">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            className="bg-white min-h-[300px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="submit"
            className="block w-full bg-orange-500 text-white px-6 py-2 rounded hover:opacity-90"
          >
            {isCreatingNew ? "Create Policy" : "Update Policy"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePolicy;
