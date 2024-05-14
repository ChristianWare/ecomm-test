"use client";

import ContentPadding from "../ContentPadding/ContentPadding";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import styles from "./Amenities.module.css";
import Button from "../Button/Button";
import Bed from "../../public/icons/bed.svg";
import Fire from "../../public/icons/firef.svg";
import Kitchen from "../../public/icons/kitchen.svg";
import Pillow from "../../public/icons/pillow.svg";
import Towel from "../../public/icons/towel.svg";
import Storage from "../../public/icons/storage.svg";
import { motion } from "framer-motion";
import { fadeIn } from "../../animation/variants";

const Amenities = () => {
  const data = [
    {
      icon: <Bed width={50} height={50} className={styles.icon} />,
      service: "King Size Beds",
    },
    {
      icon: <Fire width={50} height={50} className={styles.icon} />,
      service: "Cozy Fireplace",
    },
    {
      icon: <Kitchen width={50} height={50} className={styles.icon} />,
      service: "Kitchen Essentials",
    },
    {
      icon: <Pillow width={50} height={50} className={styles.icon} />,
      service: "Comfortable Pillows",
    },
    {
      icon: <Towel width={50} height={50} className={styles.icon} />,
      service: "Towels and Bed Linen",
    },
    {
      icon: <Storage width={50} height={50} className={styles.icon} />,
      service: "Ample Personal Storage",
    },
  ];

  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <ContentPadding>
          <div className={styles.content}>
            <div className={styles.left}>
              <h2 className={styles.heading}>
                Indoor - facilities and all equipments
              </h2>
              <div className={styles.copyContainer}>
                <p className={styles.copy}>
                  Elevate your stay with our comprehensive indoor facilities and
                  top-notch equipment, ensuring comfort and convenience
                  throughout your vacation.
                </p>
              </div>
              <div className={styles.btnContainer}>
                <Button
                  text='Explore all listings'
                  btnType='secondary'
                  href='/properties'
                />
              </div>
            </div>
            <div className={styles.right}>
              {data.map((x, index) => (
                <div className={styles.card} key={index}>
                  <motion.div
                    variants={fadeIn("right", 0.3)}
                    initial='hidden'
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.3 }}
                    className={styles.iconContainer}
                  >
                    {x.icon}
                  </motion.div>
                  <motion.h3
                    variants={fadeIn("right", 0.3)}
                    initial='hidden'
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.3 }}
                    className={styles.title}
                  >
                    {x.service}
                  </motion.h3>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.btnContainerii}>
            <Button
              text='Explore all listings'
              btnType='secondary'
              href='/properties'
            />
          </div>
        </ContentPadding>
      </LayoutWrapper>
    </section>
  );
};
export default Amenities;
