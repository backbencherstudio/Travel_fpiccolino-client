/* eslint-disable react/prop-types */

const ParentComponent = ({children}) => {
    return (
        <div className="max-w-[1760px] mx-auto " >
            {children}
        </div>
    );
};

export default ParentComponent;