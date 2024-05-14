import ContentPadding from "../ContentPadding/ContentPadding";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import styles from "./FinalCTA1.module.css";
import Image from "next/image";
import Img from "../../public/images/img1.jpg";
import Button from "../Button/Button";
import House from "../../public/icons/logo.svg";

const FinalCTA1 = () => {
  return (
    <LayoutWrapper>
      <ContentPadding>
        <div className={styles.content}>
          {/* <div className={styles.imgContainer}>
            <Image
              src={Img}
              alt='image'
              width={60}
              height={60}
              className={styles.img}
            />
          </div> */}
          <House width={80} height={80} className={styles.icon} />
          <h3 className={styles.heading}>Elite Retreat Rentals</h3>
          <p className={styles.copy}>
            Discover a curated selection of meticulously designed houses, each
            offering a unique blend of modern amenities and scenic beauty.
          </p>
          <div className={styles.btnContainer}>
            <Button text='Contact us' btnType='secondary' href='/contact' />
            <Button
              text='See All Properties'
              btnType='primaryii'
              href='/properties'
            />
          </div>
        </div>
      </ContentPadding>
    </LayoutWrapper>
  );
};
export default FinalCTA1;
