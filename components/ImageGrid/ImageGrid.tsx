import Image from "next/image";
import styles from "./ImageGrid.module.css";
import { IImage } from "../../backend/models/room";

interface Props {
  images: IImage[];
}

const ImageGrid = ({ images }: Props) => {
  return (
    <div className={styles.imgGrid}>
      <div className={styles.gridLeft}>
        <div className={styles.imgContainer}>
          <Image
            src={images[0]?.url}
            alt={images[0]?.url}
            fill
            className={styles.img}
          />
        </div>
      </div>
      <div className={styles.gridRight}>
        <div className={styles.imgContainer2}>
          <Image
            src={images[1]?.url}
            alt={images[1]?.url}
            fill
            className={styles.img}
          />
        </div>
        <div className={styles.imgContainer3}>
          <Image
            src={images[2]?.url}
            alt={images[2]?.url}
            fill
            className={styles.img}
          />
        </div>
        <div className={styles.imgContainer3}>
          <Image
            src={images[3]?.url}
            alt={images[3]?.url}
            fill
            className={styles.img}
          />
        </div>
      </div>
    </div>
  );
};
export default ImageGrid;
