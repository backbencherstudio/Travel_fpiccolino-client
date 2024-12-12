import CustomHeadingDashboard from "../../../Shared/CustomHeadingDashboard";

const UpdateBlog = () => {
    return (
        <div>
           <CustomHeadingDashboard/>

            <div className="mt-10 flex justify-between items-center "  >
                <h2 className="text-[#141D2A] font-semibold text-[24px] " >Edit Blog</h2>
                <button className="bg-[#E86731] text-[#FFFFFF] px-4 py-2 rounded-md " >Update Blog</button>
            </div>

            <div>
                
            </div>

        </div>
    );
};

export default UpdateBlog;