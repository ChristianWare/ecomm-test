"use client";

import styles from "./PropPreview.module.css";
import Image from "next/image";
import { IRoom } from "../../backend/models/room";
import Link from "next/link";
import Button from "../Button/Button";
import { motion } from "framer-motion";
import { fadeIn } from "../../animation/variants";

interface Props {
  room: IRoom;
}

const PropPreview = ({ room }: Props) => {
  return (
    <div className={styles.container}>
      <motion.div
        variants={fadeIn("right", 0.3)}
        initial='hidden'
        whileInView={"show"}
        viewport={{ once: false, amount: 0.3 }}
        className={styles.left}
      >
        <div className={styles.imgContainer}>
          <Image
            src={
              room?.images?.length > 0
                ? room.images[0].url
                : "/images/default_room_image.jpg"
            }
            alt={room.name}
            fill
            className={styles.img}
          />
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("left", 0.3)}
        initial='hidden'
        whileInView={"show"}
        viewport={{ once: false, amount: 0.3 }}
        className={styles.right}
      >
        <div className={styles.rightTop}>
          <span className={styles.price}>
            $ {room.pricePerNight}{" "}
            <span className={styles.perDay}>/ per night</span>
          </span>
        </div>
        <Link href={`/properties/${room?._id}`} className={styles.title}>
          {room?.name}
        </Link>
        <p className={styles.copy}>{room.description}</p>
        <div className={styles.featuresBox}>
          <div className={styles.feature}>Beds available: {room.numOfBeds}</div>
          <div className={styles.feature}>
            Guest Capacity: {room.guestCapacity}
          </div>
          <div className={styles.feature}>Average Ratings: {room.ratings}</div>
        </div>
        <div className={styles.btnContainer}>
          <Button
            text='View Details'
            btnType='secondary'
            href={`/properties/${room?._id}`}
          />
        </div>
      </motion.div>
    </div>
  );
};
export default PropPreview;
