import { useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Stack,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { createReview } from "../../../features/review/reviewSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const TourSlider = ({ userData, title, id, userType }) => {
  const dispatch = useDispatch();
  const swiperRef = useRef(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [packageId, setPackageId] = useState("");
  const [orderId, setOrderId] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setReview("");
    setRating(2); // Reset rating to default value
  };

  const handleReviewSubmit = () => {
    const reviewData = {
      userId: id,
      packageId,
      comment: review,
      rating,
    };

    dispatch(createReview({ reviewData, orderId }));
    toast.success("Review Added Successfully");
    closeModal();
  };

  if (!userData?.length) {
    return (
      <div>
        <h1 className="mt-5 text-[16px] font-medium primary_text">
          {title} (0)
        </h1>
        <div className="my-10 py-10 text-center border border-dashed border-gray-300 rounded-lg">
          <p className="primary_text">Don't have any {title}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mt-5 text-[16px] primary_text font-medium">
        {title} {`(${userData?.length})`}
      </h1>
      <div className="mt-5 border-t pt-3">
        <Swiper
          spaceBetween={15}
          slidesPerView={5}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
          }}
        >
          {userData?.map((item) => (
            <div key={item._id}>
              <SwiperSlide>
                <img
                  src={
                    item?.packageData?.images[0] || "default-placeholder.jpg"
                  }
                  alt="package"
                  className="w-[172px] h-[120px] rounded-lg object-cover"
                />
                <p className="py-2">
                  {item?.packageData?.destination || "Unknown Destination"}
                </p>
                {userType === "user" && title === "Completed Tours" && (
                  <button
                    onClick={() => {
                      openModal();
                      setPackageId(item?.packageData?._id);
                      setOrderId(item?.orderId);
                    }}
                    className="primary_bg text-white px-3 py-1 rounded hover:opacity-85"
                  >
                    Add Review
                  </button>
                )}
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
        <div className="m-4 text-end">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className={`p-3 m-1 ${
              isBeginning
                ? "bg-[#fdf0ea] primary_text"
                : "border bg-white text-black shadow"
            } w-10 h-10 rounded-md transition-opacity `}
            disabled={isBeginning}
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className={`p-3 m-1 ${
              isEnd
                ? "bg-[#fdf0ea] primary_text"
                : "border bg-white text-black shadow"
            }  rounded-md w-10 h-10`}
            disabled={isEnd}
          >
            <FaAngleRight />
          </button>
        </div>
      </div>

      {/* MUI Review Modal */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="add-review-modal"
        aria-describedby="review-form"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <Typography id="add-review-modal" variant="h6" component="h2" mb={2}>
            Add Your Review
          </Typography>

          <Stack spacing={1}>
            <Typography variant="body2" mb={1}>
              Rating (1-5)
            </Typography>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(_, newRating) => setRating(newRating)}
            />
          </Stack>

          <TextField
            id="review"
            label="Your Review"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={review}
            onChange={(e) => setReview(e.target.value)}
            sx={{ my: 2 }}
          />

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={closeModal} variant="outlined" color="error">
              Cancel
            </Button>
            <Button
              onClick={handleReviewSubmit}
              variant="contained"
              color="warning"
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default TourSlider;
