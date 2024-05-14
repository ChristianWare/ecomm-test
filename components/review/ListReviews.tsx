import { IReview } from "../../backend/models/room";
import Image from "next/image";
import StarRatings from "react-star-ratings";
import styles from "./ListReviews.module.css";

interface Props {
  reviews: IReview[];
}

const ListReviews = ({ reviews }: Props) => {
  return (
    <section className={styles.container}>
      <div className=''>
        <h2 className={styles.heading}>
          {reviews.length > 0 ? "Reviews" : "No Reviews Yet"}
        </h2>
        {reviews.length > 0 && (
          <div className={styles.bottom}>
            <>
              {reviews?.slice().reverse().map((review, index) => (
                <div className={styles.reviewContainer} key={index}>
                  {review?.user !== null && (
                    <div className={styles.content}>
                      <div className={styles.imgContainer}>
                        <Image
                          src={
                            review?.user?.avatar
                              ? review?.user?.avatar?.url
                              : "/images/default_avatar.jpg"
                          }
                          alt={review?.user?.name}
                          fill
                          className={styles.img}
                        />
                      </div>
                      <div className={styles.topRight}>
                        <p className={styles.reviewerName}>
                          {review?.user?.name}
                        </p>
                        <p className={styles.date}>
                          Member Since{" "}
                          {new Date(review?.user?.createdAt).toLocaleDateString(
                            "en-US",
                            { month: "2-digit", year: "numeric" }
                          )}
                        </p>
                        <div className={styles.starContainer}>
                          <StarRatings
                            rating={review?.rating}
                            starRatedColor='#7065f0'
                            numberOfStars={5}
                            starDimension='24px'
                            starSpacing='1px'
                            name='rating'
                          />
                        </div>
                        <p className={styles.comment}>{review?.comment}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          </div>
        )}
      </div>
    </section>
  );
};
export default ListReviews;
