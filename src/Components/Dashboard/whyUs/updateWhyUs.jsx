import { useEffect, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { base_url } from "../../../utils/base_path";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateWhyUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whyUsData, setWhyUsData] = useState({
    logos: Array(3).fill({ logo: null, name: "", description: "" }),
    bannerImage: null,
    bannerOriginalPath: null,
    sideImage: null,
    sideImageOriginalPath: null,
    companies: [{ companyLogo: null, companyName: "" }],
  });
  const [existingLogos, setExistingLogos] = useState(Array(3).fill(null));
  const [existingBanner, setExistingBanner] = useState(null);
  const [existingSideImage, setExistingSideImage] = useState(null);
  const [existingCompanyLogos, setExistingCompanyLogos] = useState([]);

  useEffect(() => {
    const fetchWhyUsData = async () => {
      try {
        const response = await axios.get(`${base_url}/api/whyUs`);
        if (response.data) {
          // Map existing data to state
          const logos = response.data.logos.map((logo) => ({
            logo: null,
            name: logo.name || "",
            description: logo.description || "",
            existingLogo: logo.logo || null,
            originalPath: logo.logo || null,
          }));

          const filledLogos = logos.concat(
            Array(3 - logos.length).fill({
              logo: null,
              name: "",
              description: "",
              existingLogo: null,
              originalPath: null,
            })
          );

          // Update the entire whyUsData object at once
          setWhyUsData({
            logos: filledLogos,
            bannerImage: null,
            bannerOriginalPath: response.data.bannerImage || null,
            sideImage: null,
            sideImageOriginalPath: response.data.sideImage || null,
            companies: response.data.companies?.map((company) => ({
              companyLogo: null,
              companyName: company.companyName || "",
              existingLogo: company.companyLogo || null,
              originalPath: company.companyLogo || null,
            })) || [{ companyLogo: null, companyName: "" }],
          });

          // Store existing logo paths for display
          const existingLogoUrls = response.data.logos
            .map((logo) => (logo.logo ? `${base_url}/${logo.logo}` : null))
            .concat(Array(3 - response.data.logos.length).fill(null));

          setExistingLogos(existingLogoUrls);

          // Set banner data
          if (response.data.bannerImage) {
            setExistingBanner(`${base_url}/${response.data.bannerImage}`);
          }

          // Set side image data
          if (response.data.sideImage) {
            setExistingSideImage(`${base_url}/${response.data.sideImage}`);
          }

          // Set existing company logos
          if (response.data.companies) {
            const companyLogoUrls = response.data.companies.map((company) =>
              company.companyLogo ? `${base_url}/${company.companyLogo}` : null
            );
            setExistingCompanyLogos(companyLogoUrls);
          }
        }
      } catch (error) {
        console.error("Error fetching why us data:", error);
        toast.error("Failed to load why us data");
      }
    };

    fetchWhyUsData();
  }, []);

  const handleLogoUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      setWhyUsData((prev) => ({
        ...prev,
        logos: prev.logos.map((item, i) =>
          i === index
            ? {
                ...item,
                logo: file,
                existingLogo: null,
                originalPath: item.originalPath,
              }
            : item
        ),
      }));
    }
  };

  const handleInputChange = (index, field, value) => {
    setWhyUsData((prev) => ({
      ...prev,
      logos: prev.logos.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleBannerUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWhyUsData((prev) => ({
        ...prev,
        bannerImage: file,
        bannerOriginalPath: prev.bannerOriginalPath, // Keep original path for deletion
      }));
    }
  };

  const handleSideImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setWhyUsData((prev) => ({
        ...prev,
        sideImage: file,
        sideImageOriginalPath: prev.sideImageOriginalPath,
      }));
    }
  };

  const handleCompanyLogoUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      setWhyUsData((prev) => ({
        ...prev,
        companies: prev.companies.map((company, i) =>
          i === index
            ? {
                ...company,
                companyLogo: file,
                existingLogo: null,
                originalPath: company.originalPath,
              }
            : company
        ),
      }));
    }
  };

  const handleCompanyNameChange = (index, value) => {
    setWhyUsData((prev) => ({
      ...prev,
      companies: prev.companies.map((company, i) =>
        i === index ? { ...company, companyName: value } : company
      ),
    }));
  };

  const addNewCompany = () => {
    setWhyUsData((prev) => ({
      ...prev,
      companies: [
        ...prev.companies,
        {
          companyLogo: null,
          companyName: "",
          existingLogo: null,
          originalPath: null,
        },
      ],
    }));

    // Add null to existingCompanyLogos array for the new company
    setExistingCompanyLogos((prev) => [...prev, null]);
  };

  const deleteCompany = (indexToDelete) => {
    setWhyUsData((prev) => ({
      ...prev,
      companies: prev.companies.filter((_, index) => index !== indexToDelete),
    }));

    // Also update the existingCompanyLogos array
    setExistingCompanyLogos((prev) =>
      prev.filter((_, index) => index !== indexToDelete)
    );
  };

  const getImageSource = (index) => {
    const logo = whyUsData.logos[index];
    if (logo.logo instanceof File) {
      return URL.createObjectURL(logo.logo);
    }
    return existingLogos[index] || null;
  };

  const getBannerImageSource = () => {
    if (whyUsData.bannerImage instanceof File) {
      return URL.createObjectURL(whyUsData.bannerImage);
    }
    return existingBanner;
  };

  const getSideImageSource = () => {
    if (whyUsData.sideImage instanceof File) {
      return URL.createObjectURL(whyUsData.sideImage);
    }
    return existingSideImage;
  };

  const getCompanyLogoSource = (index) => {
    const company = whyUsData.companies[index];
    if (company.companyLogo instanceof File) {
      return URL.createObjectURL(company.companyLogo);
    }
    return existingCompanyLogos[index] || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const formData = new FormData();

    // Add logos data
    whyUsData.logos.forEach((logo, index) => {
      if (logo.originalPath) {
        formData.append(`originalLogo${index + 1}`, logo.originalPath);
      }
      if (logo.logo instanceof File) {
        formData.append(`logo${index + 1}`, logo.logo);
      }
      formData.append(`name${index + 1}`, logo.name || "");
      formData.append(`description${index + 1}`, logo.description || "");
    });

    // Add banner data
    if (whyUsData.bannerImage instanceof File) {
      formData.append("bannerImage", whyUsData.bannerImage);
    }
    if (whyUsData.bannerOriginalPath) {
      formData.append("originalBannerImage", whyUsData.bannerOriginalPath);
      formData.append("existingBannerImage", whyUsData.bannerOriginalPath);
    }

    // Add side image data
    if (whyUsData.sideImage instanceof File) {
      formData.append("sideImage", whyUsData.sideImage);
    }
    if (whyUsData.sideImageOriginalPath) {
      formData.append("originalSideImage", whyUsData.sideImageOriginalPath);
      formData.append("existingSideImage", whyUsData.sideImageOriginalPath);
    }

    // Update how we send companies data
    whyUsData.companies.forEach((company, index) => {
      if (company.originalPath) {
        formData.append(`companyOriginalLogo${index}`, company.originalPath);
      }
      if (company.companyLogo instanceof File) {
        formData.append(`companyLogo${index}`, company.companyLogo);
      } else if (company.existingLogo) {
        formData.append(`existingCompanyLogo${index}`, company.existingLogo);
      }
      formData.append(`companyName${index}`, company.companyName || "");
    });
    // Make sure to send the total count of companies
    formData.append("companiesCount", whyUsData.companies.length.toString());

    try {
      const response = await axios.post(`${base_url}/api/whyUs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        toast.success("Why us section updated successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update why us section");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Update Why Us Section</h2>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-orange-500 text-white rounded ${
            isSubmitting ? "opacity-50" : "hover:opacity-90"
          }`}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Updating..." : "Update Why Us"}
        </button>
      </div>
      <h3 className="text-lg font-semibold mb-4">Banner Image</h3>
      <div className="relative mb-4">
        <label className="block font-medium mb-2">Upload Banner</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleBannerUpload}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div className="h-96 w-full flex items-center justify-center border rounded-lg relative">
          {getBannerImageSource() ? (
            <img
              src={getBannerImageSource()}
              alt="Banner"
              className="h-full w-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center">
              <FaPlusSquare className="text-gray-400 h-8 w-8 mb-2" />
              <span className="text-gray-500">Click to upload banner</span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-4">
        <div className="mb-6 p-4 rounded-lg  col-span-2">
          <h3 className="text-lg font-semibold mb-4">Side Image</h3>
          <div className="relative mb-4">
            <label className="block font-medium mb-2">Upload Side Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleSideImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="h-96 w-full flex items-center justify-center border rounded-lg relative">
              {getSideImageSource() ? (
                <img
                  src={getSideImageSource()}
                  alt="Side"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center">
                  <FaPlusSquare className="text-gray-400 h-8 w-8 mb-2" />
                  <span className="text-gray-500">
                    Click to upload side image
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
            {[0, 1, 2].map((index) => (
              <div key={index} className="border p-4 rounded-lg bg-white">
                <div className="relative mb-4">
                  <label className="block font-medium mb-2">Upload Logo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(index, e)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="h-40 w-40 flex items-center justify-center border rounded-lg">
                    {getImageSource(index) ? (
                      <img
                        src={getImageSource(index)}
                        alt={`Logo ${index + 1}`}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <FaPlusSquare className="text-gray-400 h-8 w-8" />
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={whyUsData.logos[index].name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-2">Description</label>
                  <textarea
                    value={whyUsData.logos[index].description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    className="w-full p-2 border rounded"
                    rows="3"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold my-4">Companies</h3>
        <button
          type="button"
          onClick={addNewCompany}
          className="mt-4 px-4 py-2 primary_bg text-white rounded hover:opacity-90 flex items-center gap-2"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM200 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"></path>
          </svg>{" "}
          Add Company
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {whyUsData.companies.map((company, index) => (
          <div
            key={index}
            className="border p-4 rounded-lg w-full bg-white relative"
          >
            {/* Add delete button */}
            <button
              onClick={() => deleteCompany(index)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <div className="relative mb-4">
              <label className="block font-medium mb-2">Company Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleCompanyLogoUpload(index, e)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="h-40 w-40 flex items-center justify-center border rounded-lg">
                {getCompanyLogoSource(index) ? (
                  <img
                    src={getCompanyLogoSource(index)}
                    alt={`Company ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaPlusSquare className="text-gray-400 h-8 w-8" />
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block font-medium mb-2">Company Name</label>
              <input
                type="text"
                value={company.companyName}
                onChange={(e) => handleCompanyNameChange(index, e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdateWhyUs;
