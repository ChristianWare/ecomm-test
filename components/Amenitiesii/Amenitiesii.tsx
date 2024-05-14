"use client";

import styles from "./Amenitiesii.module.css";
import Button from "../Button/Button";
import Game from "../../public/icons/game.svg";
import Sunny from "../../public/icons/sunny.svg";
import Restaurant from "../../public/icons/restaurant.svg";
import Garage from "../../public/icons/garage.svg";
import Basketball from "../../public/icons/basketball.svg";
import Spa from "../../public/icons/spa.svg";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import ContentPadding from "../ContentPadding/ContentPadding";
import { motion } from "framer-motion";
import { fadeIn } from "../../animation/variants";

const Amenitiesii = () => {
  const data = [
    {
      icon: <Game width={50} height={50} className={styles.icon} />,
      service: "Gaming console",
    },
    {
      icon: <Sunny width={50} height={50} className={styles.icon} />,
      service: "Always sunny weather",
    },
    {
      icon: <Restaurant width={50} height={50} className={styles.icon} />,
      service: "80+ restaurants nearby",
    },
    {
      icon: <Garage width={50} height={50} className={styles.icon} />,
      service: "Private garage",
    },
    {
      icon: <Basketball width={50} height={50} className={styles.icon} />,
      service: "Basketball Courts",
    },
    {
      icon: <Spa width={50} height={50} className={styles.icon} />,
      service: "Spa near 100m",
    },
  ];

  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <ContentPadding>
          <div className={styles.content}>
            <div className={styles.right}>
              {data.map((x, index) => (
                <div className={styles.card} key={index}>
                  <motion.div
                    variants={fadeIn("left", 0.3)}
                    initial='hidden'
                    whileInView={"show"}
                    viewport={{ once: false, amount: 0.3 }}
                    className={styles.iconContainer}
                  >
                    {x.icon}
                  </motion.div>
                  <motion.h3
                    variants={fadeIn("left", 0.3)}
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
            <div className={styles.left}>
              <h2 className={styles.heading}>
                Outdoor - your leisure and nearby attractions
              </h2>
              <div className={styles.copyContainer}>
                <p className={styles.copy}>
                  Embrace the outdoors and nearby attractions with Elite Retreat
                  Rentals, offering a range of leisure activities and easy
                  access to exciting local sights, making every moment of your
                  stay an adventure.
                </p>
              </div>
              <div className={styles.btnContainer}>
                <Button
                  text='Explore all listings'
                  btnType='primaryii'
                  href='/properties'
                />
              </div>
            </div>
          </div>
          <div className={styles.btnContainerii}>
            <Button
              text='Explore all listings'
              btnType='primaryii'
              href='/properties'
            />
          </div>
        </ContentPadding>
      </LayoutWrapper>
    </section>
  );
};
export default Amenitiesii;
