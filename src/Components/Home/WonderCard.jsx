/* eslint-disable react/prop-types */

const WonderCard = ({ item }) => {
    const { image, title,location,discription } = item

    return (
        <div>

            <div className="relative" >
                <img className="h-[360px] w-full object-cover rounded-xl " src={image} alt="" />
                <div className="w-full h-full absolute top-0 left-0  rounded-xl group-hover:bg-[#E867311A] duration-300 " ></div>
                <div className="p-8 absolute bottom-4" >
                    
                <h2 className="inline border border-[#E86731] text-[#E86731] bg-[#FDF0EA] px-4 py-2 rounded-full " > {location} </h2>
                    <h2 className="font-semibold text-[25px] text-white mt-5" >{title}</h2>
                    <p className="font-normal text-white  " >{title}</p>
                    <p className="text-[#E86731] text-[18px] font-semibold " >{discription}</p>
                </div>
            </div>

        </div>
    );
};

export default WonderCard;