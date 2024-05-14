import styles from "./PropPreviewii.module.css";
import Image from "next/image";
import { IRoom } from "../../backend/models/room";
import Button from "../Button/Button";
import Link from "next/link";

interface Props {
  room: IRoom;
}

const PropPreviewii = ({ room }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Link href={`/properties/${room?._id}`}>
            <Image
              src={
                room?.images?.length > 0
                  ? room.images[0].url
                  : "/images/default_room_image.jpg"
              }
              alt='image'
              fill
              className={styles.img}
            />
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.rightTop}>
          <span className={styles.price}>
            $ {room.pricePerNight}{" "}
            <span className={styles.perDay}>/ per day</span>
          </span>
          <div className={styles.available}>Available</div>
        </div>
        <div className={styles.featuresBox}>
          <div className={styles.feature}>{room.numOfBeds} Beds</div>
          <div className={styles.feature}>{room.guestCapacity} Guests</div>
        </div>
        <div className={styles.box}>
          <h3 className={styles.title}>{room?.name}</h3>
          {/* <span className={styles.perDay}>
            hey!
          </span> */}
          <div className={styles.featureii}>{room.description}</div>
        </div>

        <div className={styles.btnContainer}>
          <Button
            text='View Details'
            btnType='secondary'
            href={`/properties/${room?._id}`}
          />
        </div>
      </div>
    </div>
  );
};

export default PropPreviewii;
