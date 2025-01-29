import { useEffect, useState } from "react";
import { FaPlusSquare } from "react-icons/fa";
import { base_url } from "../../../utils/base_path";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateApproach = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [approachData, setApproachData] = useState({
    logos: Array(3).fill({ logo: null, name: "", description: "" }),
  });
  const [existingLogos, setExistingLogos] = useState(Array(3).fill(null));

  useEffect(() => {
    const fetchApproachData = async () => {
      try {
        const response = await axios.get(`${base_url}/api/approach`);
        if (response.data && response.data.logos) {
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

          setApproachData({ logos: filledLogos });

          // Store existing logo paths for display
          const existingLogoUrls = response.data.logos
            .map((logo) => (logo.logo ? `${base_url}/${logo.logo}` : null))
            .concat(Array(3 - response.data.logos.length).fill(null));

          setExistingLogos(existingLogoUrls);
        }
      } catch (error) {
        console.error("Error fetching approach data:", error);
        toast.error("Failed to load approach data");
      }
    };

    fetchApproachData();
  }, []);

  const handleLogoUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      setApproachData((prev) => ({
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
    setApproachData((prev) => ({
      logos: prev.logos.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const formData = new FormData();

    approachData.logos.forEach((logo, index) => {
      // Add original path for deletion if being replaced
      if (logo.originalPath) {
        formData.append(`originalLogo${index + 1}`, logo.originalPath);
      }

      // Add existing logo path if it's being kept
      if (logo.existingLogo) {
        formData.append(`existingLogo${index + 1}`, logo.existingLogo);
      }

      // Add new file if it exists
      if (logo.logo instanceof File) {
        formData.append(`logo${index + 1}`, logo.logo);
      }

      // Always add name and description
      formData.append(`name${index + 1}`, logo.name);
      formData.append(`description${index + 1}`, logo.description);
    });

    try {
      const response = await axios.post(`${base_url}/api/approach`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data) {
        toast.success("Approach section updated successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update approach section");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getImageSource = (index) => {
    const logo = approachData.logos[index];
    if (logo.logo instanceof File) {
      return URL.createObjectURL(logo.logo);
    }
    return existingLogos[index] || null;
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Update Approach Section</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
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
                value={approachData.logos[index].name}
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
                value={approachData.logos[index].description}
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
          className={`px-4 py-2 bg-orange-500 text-white rounded ${
            isSubmitting ? "opacity-50" : "hover:opacity-90"
          }`}
        >
          {isSubmitting ? "Updating..." : "Update Approach"}
        </button>
      </form>
    </div>
  );
};

export default UpdateApproach;
