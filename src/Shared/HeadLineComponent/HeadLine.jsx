/* eslint-disable react/prop-types */

const HeadLine = ({ title, description }) => {
    return (
        <div>
            <h2 className="font-duera-expanded text-[#000000] text-[30px] lg:text-[32px] font-extrabold leading-[41.6px] text-center decoration-skip-ink lg:w-[35%] mx-auto">
                {title}
            </h2>

            <p className="font-poppins text-[#72777F] text-[18px] font-normal leading-[27px] text-center decoration-skip-ink mt-2">
                {description}
            </p>
        </div>
    );
};

export default HeadLine;