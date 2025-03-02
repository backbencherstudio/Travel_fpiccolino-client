import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaPlusSquare } from "react-icons/fa";
import { base_url } from "../../../utils/base_path";

const UpdateAuthBanners = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerData, setBannerData] = useState({
    loginBanner: null,
    registerBanner: null,
    forgotBanner: null,
    otpBanner: null,
    homeBanner: null,
    countryBanner: null,
    tourBanner: null,
    aboutBanner: null,
    blogBanner: null,
    contactBanner: null,
    policyBanner: null,
    faqBanner: null,
    loginBannerOriginalPath: null,
    registerBannerOriginalPath: null,
    forgotBannerOriginalPath: null,
    otpBannerOriginalPath: null,
    homeBannerOriginalPath: null,
    countryBannerOriginalPath: null,
    tourBannerOriginalPath: null,
    aboutBannerOriginalPath: null,
    blogBannerOriginalPath: null,
    contactBannerOriginalPath: null,
    policyBannerOriginalPath: null,
    faqBannerOriginalPath: null,
  });
  const [existingBanners, setExistingBanners] = useState({
    login: null,
    register: null,
    forgot: null,
    otp: null,
    home: null,
    country: null,
    tour: null,
    about: null,
    blog: null,
    contact: null,
    policy: null,
    faq: null,
  });

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get(`${base_url}/api/auth-banners`);
        if (response.data) {
          setExistingBanners({
            login: response.data.loginBanner
              ? `${base_url}/${response.data.loginBanner}`
              : null,
            register: response.data.registerBanner
              ? `${base_url}/${response.data.registerBanner}`
              : null,
            forgot: response.data.forgotBanner
              ? `${base_url}/${response.data.forgotBanner}`
              : null,
            otp: response.data.otpBanner
              ? `${base_url}/${response.data.otpBanner}`
              : null,
            home: response.data.homeBanner
              ? `${base_url}/${response.data.homeBanner}`
              : null,
            country: response.data.countryBanner
              ? `${base_url}/${response.data.countryBanner}`
              : null,
            tour: response.data.tourBanner
              ? `${base_url}/${response.data.tourBanner}`
              : null,
            about: response.data.aboutBanner
              ? `${base_url}/${response.data.aboutBanner}`
              : null,
            blog: response.data.blogBanner
              ? `${base_url}/${response.data.blogBanner}`
              : null,
            contact: response.data.contactBanner
              ? `${base_url}/${response.data.contactBanner}`
              : null,
            policy: response.data.policyBanner
              ? `${base_url}/${response.data.policyBanner}`
              : null,
            faq: response.data.faqBanner
              ? `${base_url}/${response.data.faqBanner}`
              : null,
          });

          setBannerData({
            loginBannerOriginalPath: response.data.loginBanner || null,
            registerBannerOriginalPath: response.data.registerBanner || null,
            forgotBannerOriginalPath: response.data.forgotBanner || null,
            otpBannerOriginalPath: response.data.otpBanner || null,
            homeBannerOriginalPath: response.data.homeBanner || null,
            countryBannerOriginalPath: response.data.countryBanner || null,
            tourBannerOriginalPath: response.data.tourBanner || null,
            aboutBannerOriginalPath: response.data.aboutBanner || null,
            blogBannerOriginalPath: response.data.blogBanner || null,
            contactBannerOriginalPath: response.data.contactBanner || null,
            policyBannerOriginalPath: response.data.policyBanner || null,
            faqBannerOriginalPath: response.data.faqBanner || null,
            loginBanner: null,
            registerBanner: null,
            forgotBanner: null,
            otpBanner: null,
            homeBanner: null,
            countryBanner: null,
            tourBanner: null,
            aboutBanner: null,
            blogBanner: null,
            contactBanner: null,
            policyBanner: null,
            faqBanner: null,
          });
        }
      } catch (error) {
        console.error("Error fetching banner data:", error);
        toast.error("Failed to load banner data");
      }
    };

    fetchBannerData();
  }, []);

  const handleBannerUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerData((prev) => ({
          ...prev,
          [type]: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getBannerImageSource = (type) => {
    if (bannerData[type] instanceof File) {
      return URL.createObjectURL(bannerData[type]);
    }

    const bannerKey = type.replace("Banner", "");
    if (existingBanners[bannerKey]) {
      return existingBanners[bannerKey];
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const formData = new FormData();

    // Add all existing banner paths to formData
    const bannerTypes = [
      "login",
      "register",
      "forgot",
      "otp",
      "home",
      "country",
      "tour",
      "about",
      "blog",
      "contact",
      "policy",
      "faq",
    ];
    bannerTypes.forEach((type) => {
      // If there's a new file, add it
      if (bannerData[`${type}Banner`] instanceof File) {
        formData.append(`${type}Banner`, bannerData[`${type}Banner`]);
      }

      // Get the original path, preserving the full path structure
      let originalPath = existingBanners[type];
      if (originalPath) {
        // Extract just the filename from the full path
        const pathParts = originalPath.split("/");
        const filename = pathParts[pathParts.length - 1];
        if (filename) {
          formData.append(`${type}BannerOriginalPath`, `uploads/${filename}`);
        }
      }
    });

    try {
      const response = await axios.post(
        `${base_url}/api/auth-banners`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        toast.success("Banners updated successfully");

        // Reset only the uploaded files, keep existing banners
        setBannerData((prev) => ({
          ...prev,
          loginBanner: null,
          registerBanner: null,
          forgotBanner: null,
          otpBanner: null,
          homeBanner: null,
          countryBanner: null,
          tourBanner: null,
          aboutBanner: null,
          blogBanner: null,
          contactBanner: null,
          policyBanner: null,
          faqBanner: null,
        }));

        // Refresh the banner data
        const updatedResponse = await axios.get(`${base_url}/api/auth-banners`);
        if (updatedResponse.data) {
          setExistingBanners({
            login: updatedResponse.data.loginBanner
              ? `${base_url}/${updatedResponse.data.loginBanner}`
              : null,
            register: updatedResponse.data.registerBanner
              ? `${base_url}/${updatedResponse.data.registerBanner}`
              : null,
            forgot: updatedResponse.data.forgotBanner
              ? `${base_url}/${updatedResponse.data.forgotBanner}`
              : null,
            otp: updatedResponse.data.otpBanner
              ? `${base_url}/${updatedResponse.data.otpBanner}`
              : null,
            home: updatedResponse.data.homeBanner
              ? `${base_url}/${updatedResponse.data.homeBanner}`
              : null,
            country: updatedResponse.data.countryBanner
              ? `${base_url}/${updatedResponse.data.countryBanner}`
              : null,
            tour: updatedResponse.data.tourBanner
              ? `${base_url}/${updatedResponse.data.tourBanner}`
              : null,
            about: updatedResponse.data.aboutBanner
              ? `${base_url}/${updatedResponse.data.aboutBanner}`
              : null,
            blog: updatedResponse.data.blogBanner
              ? `${base_url}/${updatedResponse.data.blogBanner}`
              : null,
            contact: updatedResponse.data.contactBanner
              ? `${base_url}/${updatedResponse.data.contactBanner}`
              : null,
            policy: updatedResponse.data.policyBanner
              ? `${base_url}/${updatedResponse.data.policyBanner}`
              : null,
            faq: updatedResponse.data.faqBanner
              ? `${base_url}/${updatedResponse.data.faqBanner}`
              : null,
          });
        }
      }
    } catch (error) {
      console.error("Error updating banners:", error);
      toast.error(error.response?.data?.message || "Failed to update banners");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Update Banners</h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        {/* Login Banner */}
        <div className="border p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Login Screen Banner</h3>
          <div className="relative mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleBannerUpload("loginBanner", e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="h-80 w-full flex items-center justify-center border rounded-lg relative overflow-hidden">
              {getBannerImageSource("loginBanner") ? (
                <img
                  src={getBannerImageSource("loginBanner")}
                  alt="Login Banner"
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
        </div>

        {/* Register Banner */}
        <div className="border p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Register Screen Banner</h3>
          <div className="relative mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleBannerUpload("registerBanner", e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="h-80 w-full flex items-center justify-center border rounded-lg relative overflow-hidden">
              {getBannerImageSource("registerBanner") ? (
                <img
                  src={getBannerImageSource("registerBanner")}
                  alt="Register Banner"
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
        </div>

        {/* Forgot Password Banner */}
        <div className="border p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Forgot Password Banner</h3>
          <div className="relative mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleBannerUpload("forgotBanner", e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="h-80 w-full flex items-center justify-center border rounded-lg relative overflow-hidden">
              {getBannerImageSource("forgotBanner") ? (
                <img
                  src={getBannerImageSource("forgotBanner")}
                  alt="Forgot Password Banner"
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
        </div>

        {/* OTP Banner */}
        <div className="border p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">OTP Screen Banner</h3>
          <div className="relative mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleBannerUpload("otpBanner", e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="h-80 w-full flex items-center justify-center border rounded-lg relative overflow-hidden">
              {getBannerImageSource("otpBanner") ? (
                <img
                  src={getBannerImageSource("otpBanner")}
                  alt="OTP Banner"
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
        </div>

        {/* Home Banner */}
        <div className="border p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Home Screen Banner</h3>
          <div className="relative mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleBannerUpload("homeBanner", e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="h-80 w-full flex items-center justify-center border rounded-lg relative overflow-hidden">
              {getBannerImageSource("homeBanner") ? (
                <img
                  src={getBannerImageSource("homeBanner")}
                  alt="Home Banner"
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
        </div>

        {/* Country Banner */}
        <div className="border p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Country Screen Banner</h3>
          <div className="relative mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleBannerUpload("countryBanner", e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="h-80 w-full flex items-center justify-center border rounded-lg relative overflow-hidden">
              {getBannerImageSource("countryBanner") ? (
                <img
                  src={getBannerImageSource("countryBanner")}
                  alt="Country Banner"
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
        </div>
        {/* Tour Banner */}
        <div className="border p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Tour Screen Banner</h3>
          <div className="relative mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleBannerUpload("tourBanner", e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="h-80 w-full flex items-center justify-center border rounded-lg relative overflow-hidden">
              {getBannerImageSource("tourBanner") ? (
                <img
                  src={getBannerImageSource("tourBanner")}
                  alt="Tour Banner"
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
        </div>

        {/* About Banner */}
        <div className="border p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">About Screen Banner</h3>
          <div className="relative mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleBannerUpload("aboutBanner", e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="h-80 w-full flex items-center justify-center border rounded-lg relative overflow-hidden">
              {getBannerImageSource("aboutBanner") ? (
                <img
                  src={getBannerImageSource("aboutBanner")}
                  alt="About Banner"
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
        </div>

        {/* Blog Banner */}
        <div className="border p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Blog Screen Banner</h3>
          <div className="relative mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleBannerUpload("blogBanner", e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="h-80 w-full flex items-center justify-center border rounded-lg relative overflow-hidden">
              {getBannerImageSource("blogBanner") ? (
                <img
                  src={getBannerImageSource("blogBanner")}
                  alt="Blog Banner"
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
        </div>

        {/* Contact Banner */}
        <div className="border p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Contact Screen Banner</h3>
          <div className="relative mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleBannerUpload("contactBanner", e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="h-80 w-full flex items-center justify-center border rounded-lg relative overflow-hidden">
              {getBannerImageSource("contactBanner") ? (
                <img
                  src={getBannerImageSource("contactBanner")}
                  alt="Contact Banner"
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
        </div>

        {/* Policy Banner */}
        <div className="border p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">Policy Screen Banner</h3>
          <div className="relative mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleBannerUpload("policyBanner", e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="h-80 w-full flex items-center justify-center border rounded-lg relative overflow-hidden">
              {getBannerImageSource("policyBanner") ? (
                <img
                  src={getBannerImageSource("policyBanner")}
                  alt="Policy Banner"
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
        </div>

        {/* FAQ Banner */}
        <div className="border p-4 rounded-lg bg-white">
          <h3 className="text-lg font-semibold mb-4">FAQ Screen Banner</h3>
          <div className="relative mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleBannerUpload("faqBanner", e)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="h-80 w-full flex items-center justify-center border rounded-lg relative overflow-hidden">
              {getBannerImageSource("faqBanner") ? (
                <img
                  src={getBannerImageSource("faqBanner")}
                  alt="FAQ Banner"
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
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`col-span-full mt-4 px-4 py-2 bg-orange-500 text-white rounded ${
            isSubmitting ? "opacity-50" : "hover:opacity-90"
          }`}
        >
          {isSubmitting ? "Updating..." : "Update Banners"}
        </button>
      </form>
    </div>
  );
};

export default UpdateAuthBanners;
