import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";

const CreatePackage = () => {
  return (
    <div>
      <CustomHeadingDashboard />
      <div className="flex justify-between mt-20">
        <h1 className="text-[24px] font-semibold">Create Package</h1>
        <button className="text-[16px] primary_bg text-white font-medium rounded-md px-4 py-2">
          Upload Package
        </button>
       </div>
       <div className="grid grid-cols-5 gap-5 mt-5">
        <div className="col-span-3">
            <div className="border p-4 rounded-lg">
<h2 className="text-[20px] font-medium ">Generel Information</h2>
<p className="text-[16px] mt-3">Tour Name</p>
<input type="text" placeholder="Write Tour Name...." className="border rounded-md w-full p-1 text-[#666666]" />
            </div>
        </div>
        <div className="col-span-2">

        </div>
       </div>
    </div>
  );
};

export default CreatePackage;
