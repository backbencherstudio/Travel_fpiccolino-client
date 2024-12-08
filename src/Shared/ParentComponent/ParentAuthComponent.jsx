/* eslint-disable react/prop-types */
const ParentAuthComponent = ({children}) => {
  return (
    <div className="loginBG min-h-screen p-10 flex flex-col justify-center">
        <div className="bg-white overflow-hidden rounded-[20px]">{children}</div>
    </div>
  );
};

export default ParentAuthComponent;
