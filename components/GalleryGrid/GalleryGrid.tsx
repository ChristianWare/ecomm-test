"use client";

import Image from "next/image";
import styles from "./GalleryGrid.module.css";
import { IImage } from "../../backend/models/room";
import { useState } from "react";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import ContentPadding from "../ContentPadding/ContentPadding";
import Back from "../../public/icons/back.svg";
import Next from "../../public/icons/next.svg";
import Cancel from "../../public/icons/cancel.svg";

interface Props {
  images: IImage[];
}

const GalleryGrid = ({ images }: Props) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index: any) => {
    setSlideNumber(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(images.length - 1)
      : setSlideNumber(slideNumber - 1);
  };

  const nextSlide = () => {
    slideNumber + 1 === images.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading2}>Featured gallery</h2>
      <div className={styles.gallery}>
        {images.map((slide, index) => (
          <div key={index} className={styles.imgContainer4}>
            <Image
              src={slide?.url}
              alt={slide?.url}
              fill
              className={styles.img}
              onClick={() => handleOpenModal(index)}
            />
          </div>
        ))}
        {openModal && (
          <LayoutWrapper>
            <ContentPadding>
              <div className={styles.modalContainer}>
                <Cancel
                  className={styles.close}
                  onClick={handleCloseModal}
                  width={40}
                  height={40}
                />
                <div className={styles.fullScreenImage}>
                  <Back
                    className={styles.prev}
                    onClick={prevSlide}
                    width={40}
                    height={40}
                  />
                  <Image
                    src={images[slideNumber].url}
                    alt={images[slideNumber].url}
                    fill
                    className={styles.modalImg}
                  />
                  <Next
                    className={styles.next}
                    onClick={nextSlide}
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </ContentPadding>
          </LayoutWrapper>
        )}
      </div>
    </div>
  );
};
export default GalleryGrid;
