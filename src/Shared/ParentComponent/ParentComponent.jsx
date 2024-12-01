/* eslint-disable react/prop-types */

const ParentComponent = ({children}) => {
    return (
        <div className="max-w-[1760px] mx-auto px-2 md:px-4 " >
            {children}
        </div>
    );
};

export default ParentComponent;