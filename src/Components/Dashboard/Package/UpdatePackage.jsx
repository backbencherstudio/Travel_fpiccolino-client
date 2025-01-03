import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import CustomIcons from "./CustomIcons";
import dayjs from "dayjs";
import { FaRegSquarePlus } from "react-icons/fa6";
import FlightBookingForm from "./FlightForm";
import { Controller, useForm } from "react-hook-form";
import InsuranceForm from "./InsuranceForm";
import CustomDashboardButton from "../../../Shared/CustomDashboardButton";
import SelectCategory from "./SelectCategory";
import { DeleteOutlined } from "@mui/icons-material";
import { FaPlusSquare } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { base_url } from "../../../utils/base_path";
import SelectCountry from "./SelectCountry";
import { useDispatch } from "react-redux";
import { updatePackage } from "../../../features/pckage/packageSlice";
import { toast } from "react-toastify";
const UpdatePackage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [selectedIncludeItems, setSelectedIncludeItems] = useState([]);
  const [selectedNotIncludeItems, setSelectedNotIncludeItems] = useState([]);
  const [openFlightModal, setOpenFlightModal] = useState(false);
  const [bookedFlights, setBookedFlights] = useState([]);
  const [openInsuranceModal, setOpenInsuranceModal] = useState(false);
  const [insurance, setInsurance] = useState([]);
  const [category, setCategory] = useState("");
  const [uploadedImages, setUploadedImages] = useState([]);
  const [images, setImages] = useState([]);
  const [updateImageIndex, setUpdateImageIndex] = useState(null);
  const [uploadedHotelImages, setUploadedHotelImages] = useState([]);
  const [hotelImages, setHotelImages] = useState([]); // State for hotel images
  const [hotelName, setHotelName] = useState(""); // State for hotel name
  const [hotelAbout, setHotelAbout] = useState("");
  const [updateHotelImageIndex, setUpdateHotelImageIndex] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  // const { packageDetails } = useSelector((state) => state.package);
  const [includeIconName, setIncludeIconName] = useState([]);
  const [notIncludeIconName, setNotIncludeIconName] = useState([]);
  const [packageDetails, setPackageDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({});
  useEffect(() => {
    const fetchData = async () => {
      if (!params.id) return;

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${base_url}/package/${params.id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setPackageDetails(result);
        setBookedFlights(result?.bookedFlights);
        setInsurance(result?.insurance);
        setSelectedIncludeItems(result?.includeItems);
        setSelectedNotIncludeItems(result?.notIncludeItems);
        setUploadedImages(result?.images || []);
        setUploadedHotelImages(result?.hotelImages || []);
        setSelectedCountry(result?.country);
        setCategory(result?.category);
        setValue("tourName", result?.tourName);
        setValue("tourDescription", result?.tourDescription);
        setValue("destination", result?.destination);
        setValue("amount", result?.amount);
        setValue("tourDate", dayjs(result?.tourDate));
        setValue("tourDuration.nights", result?.tourDuration?.nights);
        setValue("tourDuration.days", result?.tourDuration?.days);
        setValue("hotelName", result?.hotelName);
        setValue("hotelAbout", result?.hotelAbout);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);
  const onSubmit = (data) => {
    const allImages = [...uploadedImages, ...images];
    const allHotelImages = [...uploadedHotelImages, ...hotelImages];

    if (allImages.length < 2) {
      toast.warn("At least 2 images required for this package.");
      return;
    }

    if (allHotelImages.length < 2) {
      toast.warn("At least 2 hotel images required for this package.");
      return;
    }
    const combinedIncludeItems = [
      ...selectedIncludeItems.map((item) => ({
        name: typeof item.name === "object" ? item.name.name : item.name,
        text: item.text || "",
      })),
      ...includeIconName.map((icon) => ({
        name: typeof icon === "string" ? icon : icon.name,
        text: icon.text || "",
      })),
    ];
    const combinedNotIncludeItems = [
      ...selectedNotIncludeItems.map((item) => ({
        name: typeof item.name === "object" ? item.name.name : item.name,
        text: item.text || "",
      })),
      ...notIncludeIconName.map((icon) => ({
        name: typeof icon === "string" ? icon : icon.name,
        text: icon.text || "",
      })),
    ];
    const packageData = {
      includeItems: combinedIncludeItems,
      notIncludeItems: combinedNotIncludeItems,
      bookedFlights,
      insurance,
      category,
      country: selectedCountry,
      images: allImages,
      hotelImages: allHotelImages,
      ...data,
    };
    if (isUpdate) {
      dispatch(updatePackage({ packageId: params.id, data: packageData }))
        .unwrap()
        .then((response) => {
          console.log("Package updated successfully:", response);
          toast.success("Package Updated Successfully");
          setIsUpdate(false);
        })
        .catch((error) => {
          console.error("Failed to update package:", error);
          toast.error(`Failed to update package`);
          setIsUpdate(false);
        });
    }
  };
  const handleImageUpload = (e) => {
    e.stopPropagation();
    const files = Array.from(e.target.files);
    if (updateImageIndex !== null) {
      setImages(
        (prevImages) =>
          prevImages.map((img, i) => (i === updateImageIndex ? files[0] : img)) // Replace the image at the updateImageIndex
      );
      setUpdateImageIndex(null);
    } else {
      setImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handleDeleteImage = (index, isUploaded = false) => {
    if (isUploaded) {
      setUploadedImages((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
    } else {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  const handleUpdateImage = (index, isUploaded = false) => {
    if (isUploaded) {
      toast.warning(
        "Updating previously uploaded images is not supported directly."
      );
      return;
    }
    setUpdateImageIndex(index);
    document.getElementById("imageUpdateInput").click();
  };

  const handleHotelImageUpload = (e) => {
    e.stopPropagation();
    const files = Array.from(e.target.files);

    if (updateHotelImageIndex !== null) {
      setHotelImages((prevImages) =>
        prevImages.map((img, i) =>
          i === updateHotelImageIndex ? files[0] : img
        )
      );
      setUpdateHotelImageIndex(null);
    } else {
      setHotelImages((prevImages) => [...prevImages, ...files]);
    }
  };

  const handleDeleteHotelImage = (index, isUploaded = false) => {
    if (isUploaded) {
      setUploadedHotelImages((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
    } else {
      setHotelImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
  };

  const handleUpdateHotelImage = (index, isUploaded = false) => {
    if (isUploaded) {
      toast.warning(
        "Updating previously uploaded images is not supported directly."
      );
      return;
    }
    setUpdateHotelImageIndex(index);
    document.getElementById("imageUpdateInput").click();
  };

  return (
    <div>
      <CustomHeadingDashboard />
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="flex justify-between mt-20">
          <h1 className="text-[24px] font-semibold">Update Package</h1>
          <div className="flex justify-end">
            <div onClick={() => setIsUpdate(true)}>
              <CustomDashboardButton content={<p> Update Package</p>} />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-5 gap-5 mt-5">
          <div className="md:col-span-3">
            <div className="border p-4 rounded-2xl">
              <h2 className="text-[20px] font-medium ">General Information</h2>

              <p className="text-[16px] mt-3">Tour Name</p>
              <input
                {...register("tourName")}
                defaultValue={packageDetails?.tourName}
                type="text"
                placeholder="Write Tour Name...."
                className="border rounded-md w-full p-1 mt-1 text-[#333333]"
              />

              <p className="text-[16px] mt-3">Tour Description</p>
              <textarea
                {...register("tourDescription")}
                defaultValue={packageDetails?.tourDescription}
                type="text"
                placeholder="Write Description...."
                className="border rounded-md min-h-[100px] w-full p-1 mt-1 text-[#333333]"
              />
              <p className="text-[16px] mt-3">Tour Destination</p>
              <input
                {...register("destination")}
                defaultValue={packageDetails?.destination}
                type="text"
                placeholder="Write Destination...."
                className="border rounded-md w-full p-1 mt-1 text-[#666666]"
              />
              <p className="text-[16px] mt-3">Amount</p>
              <input
                {...register("amount")}
                defaultValue={packageDetails?.amount}
                type="number"
                placeholder="Enter Amount...."
                className="border rounded-md w-full p-1 mt-1 text-[#666666]"
              />

              <div className="grid xl:grid-cols-2 mt-3">
                <div>
                  <p className="text-[16px] mb-2">Tour Date</p>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Controller
                      name="tourDate"
                      control={control}
                      defaultValue={dayjs(packageDetails?.tourDate)}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          label="Tour Date"
                          value={field.value || dayjs(packageDetails?.tourDate)}
                          object
                          onChange={(date) => field.onChange(date)}
                          slotProps={{ textField: { size: "small" } }}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>

                <div className="xl:mt-0 mt-3 ">
                  <p className="text-[16px]">Tour Duration</p>
                  <div className="flex gap-5 mt-2">
                    <p className="text-[16px] mb-2">Nights:</p>
                    <input
                      {...register("tourDuration.nights")}
                      defaultValue={packageDetails?.tourDuration?.nights}
                      type="number"
                      placeholder="Nights"
                      className="border rounded-md w-full p-1 mt-1 text-[#666666]"
                    />
                    <p className="text-[16px] mb-2">Days:</p>
                    <input
                      {...register("tourDuration.days")}
                      defaultValue={packageDetails?.tourDuration?.days}
                      type="number"
                      placeholder="Days"
                      className="border rounded-md w-full p-1 mt-1 text-[#666666]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border p-4 rounded-2xl mt-5">
              <h2 className="text-[20px] font-medium ">Include Travel</h2>
              <CustomIcons
                title="include"
                selectedIcons={selectedIncludeItems}
                setSelectedIcons={setSelectedIncludeItems}
                iconName={includeIconName}
                setIconName={setIncludeIconName}
              />
            </div>

            <div className="border p-4 rounded-2xl mt-5">
              <h2 className="text-[20px] font-medium ">Not Include</h2>
              <CustomIcons
                title="not include"
                selectedIcons={selectedNotIncludeItems}
                setSelectedIcons={setSelectedNotIncludeItems}
                iconName={notIncludeIconName}
                setIconName={setNotIncludeIconName}
              />
            </div>

            <div className="border p-4 rounded-2xl mt-5">
              <div className="flex justify-between items-center">
                <h2 className="text-[20px] font-medium ">Flight</h2>
                <FaRegSquarePlus
                  onClick={() => setOpenFlightModal(true)}
                  className="text-xl primary_text cursor-pointer"
                />
              </div>
              <FlightBookingForm
                openModal={openFlightModal}
                setOpenModal={setOpenFlightModal}
                setBookedFlights={setBookedFlights}
                bookedFlights={bookedFlights}
              />
            </div>
            <div className="border p-4 rounded-2xl mt-5">
              <div className="flex justify-between items-center">
                <h2 className="text-[20px] font-medium ">Insurance</h2>
                <FaRegSquarePlus
                  onClick={() => setOpenInsuranceModal(true)}
                  className="text-xl primary_text cursor-pointer"
                />
              </div>
              <InsuranceForm
                openModal={openInsuranceModal}
                setOpenModal={setOpenInsuranceModal}
                setInsurance={setInsurance}
                insurance={insurance}
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="">
              <div className="border rounded-lg p-4 mb-4">
                <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
                  Upload Images
                </h2>

                {/* Big Image */}
                {uploadedImages.slice(0, 1).map((img, index) => (
                  <div key={index} className="relative my-2">
                    <img
                      className="h-[200px] lg:h-[400px] w-full object-cover rounded-lg cursor-pointer"
                      src={`${base_url}${img}`}
                      alt={`Uploaded Preview ${index + 1}`}
                      onClick={() => handleUpdateImage(index, true)}
                    />
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:opacity-90"
                      onClick={() => handleDeleteImage(index, true)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                ))}

                {/* Small Images */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {uploadedImages.slice(1, 100).map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        className="h-[100px] w-full object-cover rounded-lg cursor-pointer"
                        src={`${base_url}${img}`}
                        alt={`Uploaded Preview ${index + 1}`}
                        onClick={() => handleUpdateImage(index, true)}
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:opacity-90"
                        onClick={() => handleDeleteImage(index + 1, true)}
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  ))}
                  {images.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        className="h-[100px] w-full object-cover rounded-lg cursor-pointer"
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${index + 1}`}
                        onClick={() => handleUpdateImage(index)}
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:opacity-90"
                        onClick={() => handleDeleteImage(index)}
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  ))}
                  <div className="relative inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center bg-[#fdf0ea] text-white rounded-lg cursor-pointer h-[100px] w-full">
                      <FaPlusSquare className="primary_text h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Hidden Update Input */}
                <input
                  id="imageUpdateInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
            <div className="border rounded-lg p-4 my-4">
              <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
                Hotel Information
              </h2>

              <p className="text-[16px] mt-3">Hotel Name</p>
              <input
                {...register("hotelName")}
                defaultValue={packageDetails?.hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                type="text"
                placeholder="Write Hotel Name...."
                className="border rounded-md w-full p-1 mt-1 text-[#666666]"
              />

              <p className="text-[16px] mt-3">Hotel About</p>
              <textarea
                {...register("hotelAbout")}
                defaultValue={packageDetails?.hotelAbout}
                onChange={(e) => setHotelAbout(e.target.value)}
                placeholder="Write Hotel Description...."
                className="border min-h-[100px] rounded-md w-full p-1 mt-1 text-[#666666]"
              />

              <div className="border rounded-lg p-4 mb-4">
                <h2 className="text-[#141D2A] font-semibold text-[20px] mb-6">
                  Upload Hotel Images
                </h2>

                {/* Big Image */}
                {uploadedHotelImages.slice(0, 1).map((img, index) => (
                  <div key={index} className="relative my-2">
                    <img
                      className="lg:h-[400px] h-[200px] w-full object-cover rounded-lg cursor-pointer"
                      src={`${base_url}${img}`} // Use base_url to resolve paths
                      alt={`Uploaded Preview ${index + 1}`}
                      onClick={() => handleUpdateHotelImage(index, true)}
                    />
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:opacity-90"
                      onClick={() => handleDeleteHotelImage(index, true)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                ))}

                {/* Small Images */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {uploadedHotelImages.slice(1, 100).map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        className="h-[100px] w-full object-cover rounded-lg cursor-pointer"
                        src={`${base_url}${img}`} // Use base_url to resolve paths
                        alt={`Uploaded Preview ${index + 1}`}
                        onClick={() => handleUpdateHotelImage(index + 1, true)}
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:opacity-90"
                        onClick={() => handleDeleteHotelImage(index + 1, true)}
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  ))}
                  {hotelImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        className="h-[100px] w-full object-cover rounded-lg cursor-pointer"
                        src={URL.createObjectURL(img)}
                        alt={`Preview ${index + 1}`}
                        onClick={() => handleUpdateHotelImage(index)}
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:opacity-90"
                        onClick={() => handleDeleteHotelImage(index)}
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  ))}
                  <div className="relative inline-block">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleHotelImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex items-center justify-center bg-[#fdf0ea] text-white rounded-lg cursor-pointer h-[100px] w-full">
                      <FaPlusSquare className="primary_text h-6 w-6" />
                    </div>
                  </div>
                </div>

                {/* Hidden Update Input */}
                <input
                  id="imageUpdateInput"
                  type="file"
                  accept="image/*"
                  onChange={handleHotelImageUpload}
                  className="hidden"
                />
              </div>
            </div>
            <SelectCountry
              country={selectedCountry}
              setCountry={setSelectedCountry}
            />
            {/* <SelectCategory category={category} setCategory={setCategory} /> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdatePackage;
