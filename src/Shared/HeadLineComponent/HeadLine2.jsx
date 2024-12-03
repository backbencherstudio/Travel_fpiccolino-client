/* eslint-disable react/prop-types */

const HeadLine2 = ({ title, description }) => {
    return (
        <div>
            <h2 className="font-duera-expanded text-[rgb(255,255,255)] text-[24px] lg:text-[32px] font-extrabold leading-[41.6px] text-center decoration-skip-ink mx-auto">
                {title}
            </h2>

            <p className="font-poppins text-[#E9E9EA] lg:text-[18px] font-normal leading-[27px] text-center decoration-skip-ink mt-2">
                {description}
            </p>
        </div>
    );
};

export default HeadLine2;