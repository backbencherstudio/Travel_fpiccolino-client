import { CiEdit } from "react-icons/ci";
import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";
import heroImage2 from "../../../assets/Images/HeroSection/heroImage2.jpg";

const UpdatePackage = () => {
  return (
    <div>
      <CustomHeadingDashboard />

      <div className="mt-10 flex justify-between items-center ">
        <h2 className="text-[#141D2A] font-semibold text-[24px] ">Edit Blog</h2>
        <button className="bg-[#E86731] text-[#FFFFFF] px-4 py-2 rounded-md ">
          Update Blog
        </button>
      </div>

      <div className="grid grid-cols-12 gap-5 ">
        <div className="col-span-8 border rounded-lg p-4 ">
          <div>
            <span className="flex justify-between items-center mb-5">
              <h2 className="font-semibold text-[24px] ">Header Image</h2>
              <button className="border border-[#1A9835] text-[30px] rounded ">
                {" "}
                <CiEdit className="text-[#1A9835]   " />{" "}
              </button>
            </span>
            <img className="rounded-lg" src={heroImage2} alt="" />
          </div>

          <div className="mt-4">
            <span className="flex justify-between items-center mb-5">
              <h2 className="font-semibold text-[24px] ">Header Text</h2>
              <button className="border border-[#1A9835] text-[30px] rounded ">
                {" "}
                <CiEdit className="text-[#1A9835]   " />{" "}
              </button>
            </span>
            <p className="text-[#141D2A]  ">
              Essential Travel Hacks for Stress-Free Adventures
            </p>
          </div>
        </div>

        <div className="col-span-4 border rounded-lg p-4">
          <div>
            <h2>Upload Img</h2>
            <img src={heroImage2} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePackage;
