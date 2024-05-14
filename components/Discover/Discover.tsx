"use client";

import ContentPadding from "../ContentPadding/ContentPadding";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import styles from "./Discover.module.css";
import Image from "next/image";
import Img from "../../public/images/img1ii.png";
import Button from "../Button/Button";
import { motion } from "framer-motion";
import { fadeIn } from "../../animation/variants";

const Discover = () => {
  return (
    <LayoutWrapper>
      <ContentPadding>
        <div className={styles.container}>
          <Image src={Img} alt='img' fill className={styles.img} />
          <div className={styles.content}>
            <motion.div
              variants={fadeIn("right", 0.3)}
              initial='hidden'
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className={styles.left}
            >
              <h3 className={styles.heading}>
                <span className={styles.highlight}>Our vacation homes</span>
                <br />
                will improve your stay in Phoenix.
              </h3>
              <p className={styles.copy}>
                Immerse yourself in a personalized booking experience, ensuring
                that your getaway is not just a vacation but an unforgettable
                journey in your very own dream house.
              </p>
              <Button
                btnType='navBtnii'
                text='All Properties'
                href='/properties'
              />
            </motion.div>
            <div className={styles.right}></div>
          </div>
        </div>
      </ContentPadding>
    </LayoutWrapper>
  );
};
export default Discover;
