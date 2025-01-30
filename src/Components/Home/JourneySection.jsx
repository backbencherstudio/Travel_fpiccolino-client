import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import CustomButton from "../../Shared/CustomButton";
import { base_url } from "../../utils/base_path";
import { useEffect, useState } from "react";
import { getBlog } from "../../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const JourneySection = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.blog);
  const [randomBlog, setRandomBlog] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    dispatch(getBlog({ search: "", startDate: "", endDate: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (blogs.length > 0) {
      const randomIndex = Math.floor(Math.random() * blogs.length);
      setRandomBlog(blogs[randomIndex]);
    }
  }, [blogs]);

  if (!randomBlog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#fff] lg:p-20 lg:pt-0">
      <ParentComponent>
        <div className="mt-[100px]">
          <h2 className="font-duera-expanded text-[#000000] text-[30px] lg:text-[32px] font-extrabold leading-[41.6px] text-start decoration-skip-ink">
            Il tuo viaggio, la nostra passione
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-[74px] mt-14">
            <div className="lg:col-span-2 h-[600px]">
              <img
                className="h-full object-cover rounded-[20px]"
                src={`${base_url}/uploads/${randomBlog.heroSection[0]?.headerImg}`}
                alt=""
              />
            </div>
            <div className="lg:col-span-3">
              <div className="text-[18px] w-full">
                {randomBlog.heroSection[0]?.text.slice(0, 200)}
                <br />
                {randomBlog.contentList[0]?.paragraphs?.map((para, index) => (
                  <div key={`para-${index}`} className="my-2">
                    {para.slice(0, 300)}
                  </div>
                ))}
              </div>
              <div className="mt-5 mb-8">
                {/* <CustomButton content={"Read More"} /> */}
              </div>
              <img
                className="h-[365px] w-full rounded-[20px] object-cover"
                src={`${base_url}/uploads/${randomBlog.contentList[0]?.image}`}
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          ref={ref}
          className="mt-14 mb-20 lg:mb-0 flex md:flex-row flex-col justify-center lg:gap-40 gap-10"
        >
          <div className="text-center">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px]">
              {inView && <CountUp end={10} duration={2} />}+
            </h1>
            <div className="text-[24px] text-[#72777F] mt-2">
              Anni di esperienza
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px]">
              {inView && <CountUp end={500} duration={2} />}+
            </h1>
            <div className="text-[24px] text-[#72777F] mt-2">
              Viaggio completato
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px]">
              {inView && <CountUp end={1500} duration={2} />}+
            </h1>
            <div className="text-[24px] text-[#72777F] mt-2">
              Recensioni felici
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-[56px] text-[#000000] font-extrabold leading-[41.6px]">
              {inView && <CountUp end={99} duration={2} />}%
            </h1>
            <div className="text-[24px] text-[#72777F] mt-2">
              Valutazione di successo
            </div>
          </div>
        </div>
      </ParentComponent>
    </div>
  );
};

export default JourneySection;
