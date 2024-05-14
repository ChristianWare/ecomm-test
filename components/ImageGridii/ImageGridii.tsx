import Image from "next/image";
import styles from "./ImageGridii.module.css";
import House from "../../public/images/house.jpg";
import Pool from "../../public/images/pool.jpg";
import Wifi from "../../public/images/wifi.jpg";
import Backyard from "../../public/images/backyard.jpg";
import Grill from "../../public/images/grill.jpg";
import Key from "../../public/images/key.jpg";

const ImageGridii = () => {
  return (
    <div className={styles.content}>
      <div className={styles.boxContainer}>
        <div className={styles.box1}>
          <Image
            src={Pool}
            alt='Nacho fries'
            layout='fill'
            objectFit='cover'
            className={styles.img}
          />
        </div>
        <div className={styles.box2}>
          <Image
            src={Wifi}
            alt='drone image 2'
            layout='fill'
            objectFit='cover'
            className={styles.img}
          />
        </div>
        <div className={styles.box3}>
          <h5>Wifi</h5>
        </div>

        <div className={styles.box4}>
          <h5>Swimming Pool</h5>
          <a></a>
        </div>

        <div className={styles.box5}>
          <Image
            src={Key}
            alt='drone image 3'
            layout='fill'
            objectFit='cover'
            className={styles.img}
          />
        </div>
      </div>
      <div className={styles.boxContainer2}>
        <div className={styles.box1B}>
          <Image
            src={Backyard}
            alt='drone image 4'
            layout='fill'
            objectFit='cover'
            className={styles.img}
          />
        </div>
        <div className={styles.box2B}>
          <h5>Backyard</h5>
        </div>
        <div className={styles.box3B}>
          <Image
            src={House}
            alt='drone image 5'
            layout='fill'
            objectFit='cover'
            className={styles.img}
          />
        </div>
        <div className={styles.box4B}>
          <h5>Outdoor Grill</h5>
        </div>
        <div className={styles.box5B}>
          <Image
            src={Grill}
            alt='drone image 6'
            layout='fill'
            objectFit='cover'
            className={styles.img}
          />
        </div>
      </div>
    </div>
  );
};
export default ImageGridii;
