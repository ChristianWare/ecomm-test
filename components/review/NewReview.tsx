"use client";

import { revalidateTag } from "../../helpers/revalidate";
import {
  useCanUserReviewQuery,
  usePostReviewMutation,
} from "../../redux/api/roomApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";
import Modal from "../Modal/Modal";
import FalseButton from "../FalseButton/FalseButton";
import styles from "./NewReview.module.css";

const NewReview = ({ roomId }: { roomId: string }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const { data: { canReview } = {} } = useCanUserReviewQuery(roomId);

  const [postReview, { error, isSuccess }] = usePostReviewMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      revalidateTag("RoomDetails");
      toast.success("Review Posted");
      router.refresh();
    }
  }, [error, isSuccess, router]);

  const submitHandler = () => {
    const reviewData = {
      rating,
      comment,
      roomId,
    };

    postReview(reviewData);
    setIsModalOpen(false);
  };

  return (
    <section>
      <div className={styles.btnContainer}>
        <FalseButton
          text={
            canReview ? "Submit your review" : "Make a reservation to review"
          }
          btnType='secondary'
          onClick={() => {
            setIsModalOpen(true);
          }}
        />
      </div>
      <Modal
        onClose={() => {
          setIsModalOpen(false);
        }}
        isOpen={isModalOpen}
      >
        {canReview ? (
          <div className={styles.container}>
            <h3 className={styles.heading}>Submit Review</h3>
            <button type='button' aria-label='Close'></button>
            <div className={styles.stars}>
              <StarRatings
                rating={rating}
                starHoverColor='#7065f0'
                starRatedColor='#7065f0'
                numberOfStars={5}
                starDimension='35px'
                starSpacing='1px'
                name='rating'
                changeRating={(e: any) => setRating(e)}
              />
            </div>
            <div className={styles.lableInputBox}>
              <textarea
                id='review_field'
                placeholder='Leave your review'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              ></textarea>
              <label htmlFor='review_field'>Comment</label>
            </div>
            <div className={styles.btnContainer}>
              <FalseButton
                btnType='secondary'
                text='Submit'
                onClick={submitHandler}
              />
            </div>
          </div>
        ) : (
          <>
            <h4>You can submit reviews once you make a reservstion.</h4>
          </>
        )}
      </Modal>
    </section>
  );
};
export default NewReview;
