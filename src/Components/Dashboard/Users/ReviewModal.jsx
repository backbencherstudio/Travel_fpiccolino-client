import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createReview } from "../../../features/review/reviewSlice";
import toast from "react-hot-toast";

const ReviewModal = ({ isOpen, onClose, packageId, userId }) => {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);

  const handleReviewSubmit = () => {
    const reviewData = {
      userId,
      packageId,
      comment: review,
      rating,
    };

    dispatch(createReview({ reviewData }));
    toast.success("Review Added Successfully");
    handleClose();
  };

  const handleClose = () => {
    setReview("");
    setRating(5);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
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
          Aggiungi la tua recensione
        </Typography>

        <Stack spacing={1}>
          <Typography variant="body2" mb={1}>
            Valutazione (1-5)
          </Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(_, newRating) => setRating(newRating)}
          />
        </Stack>

        <TextField
          id="review"
          label="La tua recensione"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={review}
          onChange={(e) => setReview(e.target.value)}
          sx={{ my: 2 }}
        />

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button onClick={handleClose} variant="outlined" color="error">
            Cancellare
          </Button>
          <Button
            onClick={handleReviewSubmit}
            variant="contained"
            color="warning"
          >
            Invia
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ReviewModal;
