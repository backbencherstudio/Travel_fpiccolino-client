import { useDispatch, useSelector } from "react-redux";
import BottomBannerSection from "../../Shared/BottomBannerSection";
import HeroScetion from "../../Shared/HeroComponent/HeroScetion";
import ParentComponent from "../../Shared/ParentComponent/ParentComponent";
import { useEffect, useState } from "react";
import { getFaqPageData } from "../../features/pageData/pageDataSlice";
import axios from "axios";
import { base_url } from "../../utils/base_path";
import CustomHeroSection from "../../Shared/CustomHeroSection";

const Faq = () => {
  const dispatch = useDispatch();
  const [faqData, setFaqData] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  // const { headers } = useSelector((state) => state.header);
  const { faqPageData } = useSelector((state) => state.pageData);
  const { banners } = useSelector((state) => state.texts);

  // Italian translations for categories
  const categoryTranslations = {
    "Booking and Reservations": "Prenotazioni e Riserve",
    "Travel Experience and Itinerary": "Esperienza di Viaggio e Itinerario",
    "Payment and Pricing": "Pagamento e Prezzi",
    "Travel Insurance and Safety": "Assicurazione Viaggio e Sicurezza",
  };

  // Function to get Italian translation
  const getItalianName = (englishName) => {
    return categoryTranslations[englishName] || englishName;
  };

  useEffect(() => {
    // dispatch(getHeader());
    dispatch(getFaqPageData());
    // Fetch FAQ data
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${base_url}/api/faq`);
        const faqsByCategory = {};
        response.data.data.forEach((faq) => {
          faqsByCategory[faq.category] = faq.questions;
        });
        setFaqData(faqsByCategory);
        // Set initial selected category to first category
        if (Object.keys(faqsByCategory).length > 0) {
          setSelectedCategory(Object.keys(faqsByCategory)[0]);
        }
      } catch (error) {
        console.error("Failed to fetch FAQs");
      }
    };
    fetchFAQs();
  }, []);

  const heroContent = faqPageData?.hero;

  if (!faqPageData) {
    return;
  }

  return (
    <div>
      {banners?.faqBanner && (
        <CustomHeroSection pageName="faq" image={banners?.faqBanner} />
      )}

      <div className="bg-[#EFFBFB] py-20">
        <ParentComponent>
          <div className="grid grid-cols-12 lg:gap-5 xl:gap-20 grid-cols-reverse min-h-[80vh]">
            <div className="col-span-12 lg:col-span-9 lg:order-1 bg-[#EFFBFB] rounded-lg">
              <div>
                {/* Show only selected category's FAQs */}

                {selectedCategory && (
                  <div>
                    <h2 className="text-[32px] font-bold text-[#141D2A]">
                      {getItalianName(selectedCategory)}
                    </h2>
                    <div className="text-[#1C1C1C] mt-8 pb-2">
                      {faqData[selectedCategory]?.map((item, index) => (
                        <div
                          key={index}
                          className="collapse collapse-arrow bg-[#E86731] text-[#FFFFFF] mb-7"
                        >
                          <input
                            type="radio"
                            name={`accordion-${selectedCategory}`}
                            defaultChecked={index === 0}
                          />
                          <div className="collapse-title text-xl font-medium flex items-center">
                            <h2 className="text-[20px] font-semibold">
                              {item.question}
                            </h2>
                          </div>
                          <div className="collapse-content">
                            <div>
                              <p>{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar with Italian category names */}
            <div className="col-span-12 lg:col-span-3 mt-5 lg:mt-0">
              <div className="rounded-lg">
                {Object.keys(faqData).map((category, index) => (
                  <h2
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={`font-bold text-[22px] cursor-pointer hover:bg-[#cccccc5b] duration-300 text-[#141D2A] py-[16px] px-6 rounded-md mb-2 ${
                      selectedCategory === category ? "bg-[#fdf0ea]" : ""
                    }`}
                  >
                    {getItalianName(category)}
                  </h2>
                ))}
              </div>
            </div>
          </div>
        </ParentComponent>
      </div>
      <BottomBannerSection />
    </div>
  );
};

export default Faq;
