import Image from "next/image";
import styles from "./SlugConclusion.module.css";
import Person from "../../public/images/person.png";

const SlugConclusion = ({ copy }: { copy: string }) => {
  return (
    <div className={styles.copyContainer}>
      <p className={styles.copy}>{copy}</p>
      <div className={styles.personBox}>
        <Image
          src={Person}
          alt='person'
          title='person'
          width={50}
          height={50}
          className={styles.personImage}
        />
        <div className={styles.reviewerTitleContainer}>
          <div className={styles.reviewer}>Elite Retreat Rentals</div>
          <span className={styles.title}>Arizona Vacation Homes</span>
        </div>
      </div>
    </div>
  );
};
export default SlugConclusion;
