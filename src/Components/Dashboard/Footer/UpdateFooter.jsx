import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHomePageData,
  updateFooter,
} from "../../../features/pageData/pageDataSlice";

const UpdateFooter = () => {
  const dispatch = useDispatch();
  const { homePageData } = useSelector((state) => state.pageData);

  // State for form fields
  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    contactInfo: {
      phone: "",
      email: "",
    },
    copyright: "",
  });

  // Fetch footer data and update local state
  useEffect(() => {
    dispatch(getHomePageData());
  }, [dispatch]);

  // Update formData when footer data is loaded
  useEffect(() => {
    if (homePageData?.footer?.[0]) {
      const footerData = homePageData.footer[0];
      setFormData({
        companyName: footerData.companyName || "",
        description: footerData.description || "",
        contactInfo: {
          phone: footerData.contactInfo?.phone || "",
          email: footerData.contactInfo?.email || "",
        },
        copyright: footerData.copyright || "",
      });
    }
  }, [homePageData]);

  // Handler for updating form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handler for updating nested fields like contactInfo
  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      contactInfo: { ...formData.contactInfo, [name]: value },
    });
  };

  // Submit handler for form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateFooter(formData))
      .unwrap()
      .then((response) => {
        console.log("Footer updated successfully:", response);
        alert("Footer updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating footer:", error);
        alert("Failed to update footer. Please try again.");
      });
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Update Footer</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block font-medium mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Contact Info */}
        <div>
          <label htmlFor="phone" className="block font-medium mb-2">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.contactInfo.phone}
            onChange={handleContactInfoChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.contactInfo.email}
            onChange={handleContactInfoChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Copyright */}
        <div>
          <label htmlFor="copyright" className="block font-medium mb-2">
            Copyright
          </label>
          <input
            type="text"
            id="copyright"
            name="copyright"
            value={formData.copyright}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 primary_bg text-white rounded hover:opacity-90"
        >
          Update Footer
        </button>
      </form>
    </div>
  );
};

export default UpdateFooter;
