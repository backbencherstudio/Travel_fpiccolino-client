/* eslint-disable react/prop-types */

const ParentComponent = ({children, styles}) => {
    return (
        <div className={`max-w-[1760px] mx-auto px-2 md:px-4 ${styles}`} >
            {children}
        </div>
    );
};

export default ParentComponent;