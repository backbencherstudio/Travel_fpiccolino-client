import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHomePageData,
  updateFooter,
} from "../../../features/pageData/pageDataSlice";
import { FaPlusSquare, FaTrash } from "react-icons/fa";
import { base_url } from "../../../utils/base_path";
import { toast } from "react-toastify";

const UpdateFooter = () => {
  const dispatch = useDispatch();
  const { homePageData } = useSelector((state) => state.pageData);
  const [logoImg, setLogoImg] = useState(null);
  const [bannerImg, setBannerImg] = useState(null); // New state for banner image
  const [emailModalImg, setEmailModalImg] = useState(null); // New state
  const [existingLogoUrl, setExistingLogoUrl] = useState("");
  const [existingBannerUrl, setExistingBannerUrl] = useState(""); // New state for existing banner URL
  const [existingEmailModalUrl, setExistingEmailModalUrl] = useState(""); // New state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    description: "",
    contactInfo: {
      phone: "",
      email: "",
    },
    copyright: "",
  });
  const [paymentLogos, setPaymentLogos] = useState([]);
  const [existingPaymentLogos, setExistingPaymentLogos] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  // Fetch footer data
  useEffect(() => {
    dispatch(getHomePageData());
  }, [dispatch]);

  // Populate formData when data is loaded
  useEffect(() => {
    if (homePageData?.footer?.[0]) {
      const footerData = homePageData.footer[0];
      setFormData((prevState) => ({
        ...prevState,
        companyName: footerData.companyName ?? "",
        description: footerData.description ?? "",
        contactInfo: {
          phone: footerData.contactInfo?.phone ?? "",
          email: footerData.contactInfo?.email ?? "",
        },
        copyright: footerData.copyright ?? "",
      }));

      // Set existing logo URL if it exists
      if (footerData.logoImg) {
        setExistingLogoUrl(
          footerData.logoImg.startsWith("http")
            ? footerData.logoImg
            : `${base_url}/${footerData.logoImg}`
        );
      }

      // Set existing banner URL if it exists
      if (footerData.bannerImg) {
        setExistingBannerUrl(
          footerData.bannerImg.startsWith("http")
            ? footerData.bannerImg
            : `${base_url}/${footerData.bannerImg}`
        );
      }

      // Set existing email modal URL if it exists
      if (footerData.emailModalImg) {
        setExistingEmailModalUrl(
          footerData.emailModalImg.startsWith("http")
            ? footerData.emailModalImg
            : `${base_url}/${footerData.emailModalImg}`
        );
      }

      // Set existing payment logos if they exist
      if (footerData.paymentLogos && Array.isArray(footerData.paymentLogos)) {
        setExistingPaymentLogos(
          footerData.paymentLogos.map((logo) =>
            logo.startsWith("http") ? logo : `${base_url}/${logo}`
          )
        );
      }

      // Set social links if they exist
      setSocialLinks(footerData.socialLinks || []);
    }
  }, [homePageData]);

  // Update form state for general fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Update nested fields like contactInfo
  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      contactInfo: { ...formData.contactInfo, [name]: value },
    });
  };

  // Handle logo image upload
  const handleLogoUpload = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    if (file) {
      setLogoImg(file);
    }
  };

  // Handle banner image upload
  const handleBannerUpload = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    if (file) {
      setBannerImg(file);
    }
  };

  // Add handler for email modal image
  const handleEmailModalUpload = (e) => {
    e.stopPropagation();
    const file = e.target.files[0];
    if (file) {
      setEmailModalImg(file);
    }
  };

  // Add handler for payment logos upload
  const handlePaymentLogoUpload = (e) => {
    e.stopPropagation();
    const files = Array.from(e.target.files);
    setPaymentLogos((prev) => [...prev, ...files]);
  };

  // Add handler to remove payment logo
  const removePaymentLogo = (index) => {
    setPaymentLogos((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingPaymentLogo = (index) => {
    setExistingPaymentLogos((prev) => prev.filter((_, i) => i !== index));
  };

  // Add handler for social links
  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { name: "", url: "" }]);
  };

  const handleRemoveSocialLink = (index) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index));
  };

  const handleSocialLinkChange = (index, field, value) => {
    const updatedLinks = [...socialLinks];
    updatedLinks[index][field] = value;
    setSocialLinks(updatedLinks);
  };

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.companyName?.trim()) {
      toast.warn("Company name is required");
      return;
    }

    if (!formData.description?.trim()) {
      toast.warn("Description is required");
      return;
    }

    if (isSubmitting) return;
    setIsSubmitting(true);

    const formDataToSend = new FormData();

    // Append basic fields
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("copyright", formData.copyright);

    // Append contact info fields individually
    formDataToSend.append("contactInfo.phone", formData.contactInfo.phone);
    formDataToSend.append("contactInfo.email", formData.contactInfo.email);

    // Append logo if exists
    if (logoImg) {
      formDataToSend.append("logoImg", logoImg);
    }

    // Append banner if exists
    if (bannerImg) {
      formDataToSend.append("bannerImg", bannerImg);
    }

    // Append email modal image if exists
    if (emailModalImg) {
      formDataToSend.append("emailModalImg", emailModalImg);
    }

    // Append payment logos
    paymentLogos.forEach((logo, index) => {
      formDataToSend.append(`paymentLogos`, logo);
    });

    // Append existing payment logos that weren't removed
    formDataToSend.append(
      "existingPaymentLogos",
      JSON.stringify(existingPaymentLogos)
    );

    // Append social links
    formDataToSend.append("socialLinks", JSON.stringify(socialLinks));

    // Debug log
    for (let pair of formDataToSend.entries()) {
      console.log("Form Data:", pair[0], pair[1]);
    }

    dispatch(updateFooter(formDataToSend))
      .unwrap()
      .then((response) => {
        toast.success("Footer updated successfully!");
      })
      .catch((error) => {
        console.error("Update failed:", error);
        toast.error(
          error.message || "Failed to update footer. Please try again."
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Update Footer</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-5">
          {/* Upload Banner */}
          <div className="relative inline-block">
            <label htmlFor="bannerImg" className="block font-medium mb-2">
              Upload Banner
            </label>
            <input
              type="file"
              id="bannerImg"
              accept="image/*"
              onChange={handleBannerUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex items-center justify-center bg-white text-white rounded-lg cursor-pointer">
              {bannerImg ? (
                <img
                  src={URL.createObjectURL(bannerImg)}
                  alt="Banner Preview"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : existingBannerUrl ? (
                <img
                  src={existingBannerUrl}
                  alt="Existing Banner"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <FaPlusSquare className="primary_text h-6 w-6" />
              )}
            </div>
          </div>
          <div>
            {/* Company Name */}
            <div className="md:mt-10">
              <label htmlFor="companyName" className="block font-medium mb-2">
                Banner Content
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            {/* Description */}
            <div className="mt-5">
              <label htmlFor="description" className="block font-medium mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded xl:min-h-[200px]"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-2 gap-5">
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
          <div>
            <label htmlFor="copyright" className="block font-medium mb-2">
              Copyright Text
            </label>
            <input
              type="text"
              id="copyright"
              name="copyright"
              value={formData.copyright}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="© 2024 Your Company. All rights reserved."
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="grid grid-cols-1 gap-4">
            {/* Upload Logo */}
            <div className="relative justify-evenly flex items-center gap-10 border p-3 rounded-lg border-orange-500 border-dashed">
              <label htmlFor="logoImg" className="block font-bold mb-2">
                Upload Logo :
              </label>
              <input
                type="file"
                id="logoImg"
                accept="image/*"
                onChange={handleLogoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center justify-center bg-white text-white rounded-lg cursor-pointer">
                {logoImg ? (
                  <img
                    src={URL.createObjectURL(logoImg)}
                    alt="Logo Preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : existingLogoUrl ? (
                  <img
                    src={existingLogoUrl}
                    alt="Existing Logo"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <FaPlusSquare className="primary_text h-6 w-6" />
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {/* Email Modal Image Upload */}
            <div className="relative justify-evenly flex items-center gap-10 border p-3 rounded-lg border-orange-500 border-dashed">
              <label htmlFor="emailModalImg" className="block font-bold mb-2">
                Email Modal Image :
              </label>
              <input
                type="file"
                id="emailModalImg"
                accept="image/*"
                onChange={handleEmailModalUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex items-center justify-center bg-white text-white rounded-lg cursor-pointer">
                {emailModalImg ? (
                  <img
                    src={URL.createObjectURL(emailModalImg)}
                    alt="Email Modal Preview"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : existingEmailModalUrl ? (
                  <img
                    src={existingEmailModalUrl}
                    alt="Existing Email Modal"
                    className="h-full w-full object-cover rounded-lg"
                  />
                ) : (
                  <FaPlusSquare className="primary_text h-6 w-6" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add this before the Submit Button */}
        <div className="space-y-4 grid grid-cols-1 lg:grid-cols-8 gap-4">
          <div className="relative col-span-2">
            <label htmlFor="paymentLogos" className="block font-medium mb-2">
              Payment System Logos
            </label>
            <input
              type="file"
              id="paymentLogos"
              accept="image/*"
              multiple
              onChange={handlePaymentLogoUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center">
              <FaPlusSquare className="primary_text h-6 w-6 mx-auto mb-2" />
              <p>Click to upload payment system logos</p>
            </div>
          </div>

          {/* Display uploaded and existing payment logos */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 col-span-6 ">
            {paymentLogos.map((logo, index) => (
              <div key={index} className="relative my-auto">
                <img
                  src={URL.createObjectURL(logo)}
                  alt={`Payment Logo ${index + 1}`}
                  className="h-20 w-full object-contain border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removePaymentLogo(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <FaTrash className="text-white" />
                </button>
              </div>
            ))}
            {existingPaymentLogos.map((logo, index) => (
              <div key={`existing-${index}`} className="relative my-auto">
                <img
                  src={logo}
                  alt={`Existing Payment Logo ${index + 1}`}
                  className="h-20 w-full object-contain border rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeExistingPaymentLogo(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <FaTrash className="text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add this before the Submit Button */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="block font-medium">Social Links</label>
            <button
              type="button"
              onClick={handleAddSocialLink}
              className="px-4 py-2 primary_bg text-white rounded hover:opacity-90"
            >
              Add Social Link
            </button>
          </div>

          {socialLinks.map((link, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Platform Name (e.g., Facebook)"
                  value={link.name}
                  onChange={(e) =>
                    handleSocialLinkChange(index, "name", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="flex-1">
                <input
                  type="url"
                  placeholder="URL"
                  value={link.url}
                  onChange={(e) =>
                    handleSocialLinkChange(index, "url", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveSocialLink(index)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 primary_bg text-white rounded ${
            isSubmitting ? "opacity-50" : "hover:opacity-90"
          }`}
        >
          {isSubmitting ? "Updating..." : "Update Footer"}
        </button>
      </form>
    </div>
  );
};

export default UpdateFooter;
