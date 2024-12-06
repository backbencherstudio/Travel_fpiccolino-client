/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const TestimonialCard = ({ item }) => {
    const { name, image, date, reating, title, description } = item
    return (
        <div>
            <div className="flex items-center" >
                <img className="size-10 rounded-full " src={image} alt="" />
                <span>
                    <h2>{name}</h2>
                    <p>{date}</p>
                </span>
            </div>
            {reating}

            <div>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>

        </div>
    );

};

export default TestimonialCard;