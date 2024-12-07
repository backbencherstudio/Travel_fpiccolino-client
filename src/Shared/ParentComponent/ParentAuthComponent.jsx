/* eslint-disable react/prop-types */
const ParentAuthComponent = ({children}) => {
  return (
    <div className="loginBG">
      <div className="flex justify-center items-center align-middle">
        <div className="bg-white mt-[120px]  h-[80vh] w-[80%]">{children}</div>
      </div>
    </div>
  );
};

export default ParentAuthComponent;
