import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { motion } from "framer-motion";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { base_url } from "../../utils/base_path";
import EditableHeading from "../../Components/Common/EditableHeading";

const ImageGallery = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(1); // Start with the second image as active
  const [selectedImage, setSelectedImage] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef(null);

  // Handle swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      handleNext();
    }
    if (touchStart - touchEnd < -100) {
      // Swipe right
      handlePrev();
    }
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  // Get previous, current and next indices with wrap-around
  const getPrevIndex = (index) => (index - 1 + images.length) % images.length;
  const getNextIndex = (index) => (index + 1) % images.length;

  // Handle image click to open modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = "hidden";
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section
      className="relative w-full py-8 overflow-hidden bg-gradient-to-b from-gray-900 to-blue-900 text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${base_url}${images[activeIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <EditableHeading
            titleKey="reccomended.title"
            defaultTitle="RECOMMENDED EXPERIENCES"
            customTitleClass="text-2xl sm:text-3xl font-bold uppercase border-b-2 border-orange-500 inline-block pb-1 mb-4 text-[#f5f6fa]"
          />
          <EditableHeading
            titleKey="reccomended.description"
            defaultTitle="Discover authentic experiences curated to make your journey truly unforgettable"
            customTitleClass="text-sm sm:text-base max-w-2xl opacity-90 text-[#f5f6fa]"
          />
          <EditableHeading
            titleKey="reccomended.description2"
            defaultTitle="Experiences marked with the 'Included' stamp are complimentary when you book through our website. If a specific experience becomes unavailable, we'll replace it with a similar one to ensure you don't miss out. Plan early though, as some highly rated hot spots easily reach booking capacity."
            customTitleClass="text-sm sm:text-base opacity-90 text-[#f5f6fa] mt-3"
          />
        </div>

        {/* Image Carousel */}
        <div
          ref={carouselRef}
          className="relative h-80 sm:h-96 w-full my-8"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70"
            aria-label="Previous image"
          >
            <IoChevronBackOutline size={24} />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-50 p-2 rounded-full text-white hover:bg-opacity-70"
            aria-label="Next image"
          >
            <IoChevronForwardOutline size={24} />
          </button>

          {/* Image container */}
          <div className="flex justify-center items-center h-full">
            {/* Previous image (smaller) */}
            <div className="relative w-1/4 h-3/4 mx-2 transition-all duration-300 opacity-60 transform hover:opacity-80">
              <img
                src={`${base_url}${images[getPrevIndex(activeIndex)]}`}
                alt="Previous experience"
                className="w-full h-full object-cover rounded-lg cursor-pointer shadow-lg"
                onClick={() => setActiveIndex(getPrevIndex(activeIndex))}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                <p className="text-white text-xs font-medium"></p>
                <p className="text-white text-xs opacity-80"></p>
              </div>
            </div>

            {/* Active image (larger) */}
            <div className="relative w-2/4 h-full mx-2 z-10 transition-all duration-300 transform shadow-xl">
              <img
                src={`${base_url}${images[activeIndex]}`}
                alt="Current experience"
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => handleImageClick(images[activeIndex])}
              />
              <div className="absolute top-2 right-2  text-xs font-bold px-2 py-1 rounded"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                <p className="text-white text-sm sm:text-base font-medium"></p>
                <p className="text-white text-xs sm:text-sm opacity-80"></p>
              </div>
            </div>

            {/* Next image (smaller) */}
            <div className="relative w-1/4 h-3/4 mx-2 transition-all duration-300 opacity-60 transform hover:opacity-80">
              <img
                src={`${base_url}${images[getNextIndex(activeIndex)]}`}
                alt="Next experience"
                className="w-full h-full object-cover rounded-lg cursor-pointer shadow-lg"
                onClick={() => setActiveIndex(getNextIndex(activeIndex))}
              />
              <div className="absolute top-2 right-2  text-xs font-bold px-2 py-1 rounded"></div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                <p className="text-white text-xs font-medium"></p>
                <p className="text-white text-xs opacity-80"></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
              aria-label="Close gallery"
            >
              <IoClose size={28} />
            </button>
            <img
              src={`${base_url}${selectedImage}`}
              alt="Selected"
              className="w-full h-auto max-h-screen object-contain rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default ImageGallery;
