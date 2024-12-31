import HeadLine from "../../Shared/HeadLineComponent/HeadLine";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import natureImage from "../../assets/natureImage.jpg";
import natureImage2 from "../../assets/natureImage2.jpg";
import banner from "../../assets/banner.jpg";
import banner2 from '../../assets/eve.jpg';
import WonderCard from "./WonderCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSectionData } from "../../features/sectionTitle/sectionTitleSlice";
const WondersSection = ({countrySection}) => {

  const dispatch = useDispatch()
  const { title } = useSelector(
    (state) => state.section
  );
  useEffect(() => {
    dispatch(getSectionData())
  }, [])

    

  const cardDetails = [
    {
      image: banner,
      title: "Wonders of the Ancient World",
      location: "London",
      description: "Explore Every Destination Awaiting",
    },
    {
      image: natureImage2,
      title: "Wonders of the Ancient World",
      location: "USA",
      description: "Explore Every Destination Awaiting",
    },
    {
      image: banner,
      title: "Wonders of the Ancient World",
      location: "London",
      description: "Explore Every Destination Awaiting",
    },
    {
      image: banner2,
      title: "Wonders of the Ancient World",
      location: "London",
      description: "Explore Every Destination Awaiting",
    },
    {
      image: natureImage2,
      title: "Wonders of the Ancient World",
      location: "London",
      description: "Explore Every Destination Awaiting",
    },
    {
      image: natureImage,
      title: "Wonders of the Ancient World",
      location: "London",
      description: "Explore Every Destination Awaiting",
    },
    {
      image: banner2,
      title: "Wonders of the Ancient World",
      location: "London",
      description: "Explore Every Destination Awaiting",
    },
  ];



  return (
    <div>
      <ParentComponent>
        <div className="mt-[100px] mb-[56px]">

          <HeadLine
            title={countrySection.title}
            description={countrySection.description}
          />

        </div>
        <div>
          <div className="grid grid-col-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-3">
              <WonderCard item={countrySection?.data[0]} />
            </div>
            <div className="md:col-span-2">
              <WonderCard item={countrySection?.data[1]} />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            {countrySection?.data?.slice(3, 6).map((item, index) => (
              <div key={index}>
                <WonderCard item={item} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="md:col-span-2">
              <WonderCard item={countrySection?.data[5]} />
            </div>
            <div className="md:col-span-3">
              <WonderCard item={countrySection?.data[6]} />
            </div>
          </div>
        </div>
      </ParentComponent>
    </div>
  );
};

export default WondersSection;
