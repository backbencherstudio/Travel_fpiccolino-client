/* eslint-disable react/prop-types */

const CustomButton = ({content}) => {
    return (
        <button className="primary_bg text-white text-[18px] font-medium px-6 py-3 rounded-lg shadow-lg  hover:scale-105 transition-all ease-linear ">{content}</button>
    );
};

export default CustomButton;