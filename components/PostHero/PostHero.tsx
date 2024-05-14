import ContentPadding from "../ContentPadding/ContentPadding";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import styles from "./PostHero.module.css";
import Airbnb from "../../public/icons/airbnb.svg";
import Houzz from "../../public/icons/houzz.svg";
import Trip from "../../public/icons/trip.svg";
import Hotel from "../../public/icons/hotels.svg";

const PostHero = () => {
  return (
    <LayoutWrapper>
      <ContentPadding>
        <h2 className={styles.heading}>
          No need to go through these guys, book directly with us!
        </h2>
        <div className={styles.content}>
          <Airbnb width={100} height={100} className={styles.icon} />
          <Houzz width={100} height={100} className={styles.icon} />
          <Trip width={100} height={100} className={styles.icon} />
          <Hotel width={100} height={100} className={styles.icon} />
        </div>
      </ContentPadding>
    </LayoutWrapper>
  );
};
export default PostHero;
