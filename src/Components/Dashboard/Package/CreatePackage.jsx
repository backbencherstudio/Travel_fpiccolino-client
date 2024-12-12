import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";


const CreatePackage = () => {
    return (
        <div>
            <CustomHeadingDashboard/>
            <div className="flex justify-between">
                <h1 className="text-[24px] font-semibold">Create Package</h1>
                <button className="text-[16px] primary_bg text-white font-medium rounded-md px-4 py-2">Upload Package</button>
                </div>
        </div>
    );
};

export default CreatePackage;