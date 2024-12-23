/* eslint-disable react/prop-types */

const CustomButton = ({ content }) => {
  return (
    <button className="primary_bg text-white text-[18px] font-medium px-6 py-3 rounded-lg shadow-lg  hover:opacity-90">
      {content}
    </button>
  );
};

export default CustomButton;
