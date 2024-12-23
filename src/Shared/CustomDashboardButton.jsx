/* eslint-disable react/prop-types */

const CustomDashboardButton = ({ content, handleSubmit }) => {
  return (
    <button
      onClick={handleSubmit}
      className="primary_bg  text-white text-[16px] font-medium px-4 py-2 rounded-md shadow-lg hover:opacity-90"
    >
      {content}
    </button>
  );
};

export default CustomDashboardButton;
