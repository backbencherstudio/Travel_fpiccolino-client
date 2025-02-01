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
  });
  const [existingLogos, setExistingLogos] = useState(Array(3).fill(null));
  const [existingBanner, setExistingBanner] = useState(null);
  const [existingSideImage, setExistingSideImage] = useState(null);

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
            existingLogo: logo.logo || null, // Store the original file path
            originalPath: logo.logo || null, // Keep track of the original path
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

          setWhyUsData({ logos: filledLogos });

          // Store existing logo paths for display
          const existingLogoUrls = response.data.logos
            .map((logo) => (logo.logo ? `${base_url}/${logo.logo}` : null))
            .concat(Array(3 - response.data.logos.length).fill(null));

          setExistingLogos(existingLogoUrls);

          // Set banner data
          if (response.data.bannerImage) {
            setExistingBanner(`${base_url}/${response.data.bannerImage}`);
            setWhyUsData((prev) => ({
              ...prev,
              bannerOriginalPath: response.data.bannerImage,
            }));
          }

          // Set side image data
          if (response.data.sideImage) {
            setExistingSideImage(`${base_url}/${response.data.sideImage}`);
            setWhyUsData((prev) => ({
              ...prev,
              sideImageOriginalPath: response.data.sideImage,
            }));
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
        logos: prev.logos.map((item, i) =>
          i === index
            ? {
                ...item,
                logo: file,
                existingLogo: null, // Clear existing logo reference
                originalPath: item.originalPath, // Keep original path for deletion
              }
            : item
        ),
      }));
    }
  };

  const handleInputChange = (index, field, value) => {
    setWhyUsData((prev) => ({
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

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Update Why Us Section</h2>
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
        <div className="mb-6 border p-4 rounded-lg bg-white col-span-2">
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

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 col-span-3"
        >
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

          <button
            type="submit"
            disabled={isSubmitting}
            className={`col-span-full mt-4 px-4 py-2 bg-orange-500 text-white rounded ${
              isSubmitting ? "opacity-50" : "hover:opacity-90"
            }`}
          >
            {isSubmitting ? "Updating..." : "Update Why Us"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateWhyUs;
