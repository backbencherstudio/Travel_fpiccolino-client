import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { base_url } from "../../../utils/base_path";
import { FaTrash } from "react-icons/fa";

const UpdateFAQ = () => {
  const categories = [
    "Booking and Reservations",
    "Travel Experience and Itinerary",
    "Payment and Pricing",
    "Travel Insurance and Safety",
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const [existingFAQs, setExistingFAQs] = useState({});
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Fetch existing FAQs on component mount
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${base_url}/api/faq`);
        const faqsByCategory = {};
        response.data.data.forEach((faq) => {
          faqsByCategory[faq.category] = faq.questions;
        });
        setExistingFAQs(faqsByCategory);
        if (faqsByCategory[selectedCategory]) {
          setQuestions(faqsByCategory[selectedCategory]);
        }
      } catch (error) {
        toast.error("Failed to fetch FAQs");
      }
    };
    fetchFAQs();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsCreatingNew(false);
    setQuestions(existingFAQs[category] || [{ question: "", answer: "" }]);
  };

  const startNewFAQ = () => {
    setIsCreatingNew(true);
    setQuestions([{ question: "", answer: "" }]);
  };

  const editExisting = () => {
    setIsCreatingNew(false);
    setQuestions(
      existingFAQs[selectedCategory] || [{ question: "", answer: "" }]
    );
  };

  // Handle input changes
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };
    setQuestions(updatedQuestions);
  };

  // Add new question field
  const addQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  // Remove question field
  const removeQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}/api/faq/upsert`, {
        category: selectedCategory,
        questions: questions,
      });
      if (response.data.success) {
        toast.success("FAQ updated successfully");
        setExistingFAQs({
          ...existingFAQs,
          [selectedCategory]: questions,
        });
      }
    } catch (error) {
      toast.error("Failed to update FAQ");
    }
  };

  return (
    <div className="bg-[#f3f4f6] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">FAQ Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Category Selection */}
        <div className="md:mb-6">
          <label className="block mb-2 font-semibold">Select Category:</label>
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
            Edit Existing FAQs
          </button>
          <button
            type="button"
            onClick={startNewFAQ}
            className={`px-4 py-2 rounded ${
              isCreatingNew
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Create New FAQs
          </button>
        </div>
      </div>

      {/* Display Existing FAQs */}
      {!isCreatingNew && existingFAQs[selectedCategory] && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold my-4">Current FAQs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {existingFAQs[selectedCategory].map((faq, index) => (
              <div key={index} className="p-4 border rounded bg-gray-50">
                <p className="font-semibold text-red-500">Q: {faq.question}</p>
                <p className="mt-2 text-green-500">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Edit/Create Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <h3 className="text-xl font-semibold">
          {isCreatingNew ? "Create New FAQs" : "Edit FAQs"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((item, index) => (
            <div key={index} className="p-4 border rounded space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block mb-2 text-red-500 font-semibold">
                    Question {index + 1}:
                  </label>
                  {questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestion(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash fontSize={18} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) =>
                    handleQuestionChange(index, "question", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-green-500 font-semibold">
                  Answer:
                </label>
                <textarea
                  value={item.answer}
                  onChange={(e) =>
                    handleQuestionChange(index, "answer", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  rows="3"
                  required
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            type="submit"
            className="block w-full bg-orange-500 text-white px-6 py-2 rounded hover:opacity-90"
          >
            {isCreatingNew ? "Create FAQs" : "Update FAQs"}
          </button>
          <button
            type="button"
            onClick={addQuestion}
            className="bg-green-500 text-white px-4 py-2 rounded hover:opacity-90"
          >
            Add New Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateFAQ;
