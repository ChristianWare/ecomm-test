"use client";

import Image from "next/image";
import ContentPadding from "../ContentPadding/ContentPadding";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import styles from "./Hero.module.css";
import Img from "../../public/images/newhero.webp";
import Button from "../Button/Button";
import { motion } from "framer-motion";
import { fadeIn } from "../../animation/variants";

const Hero = () => {
  return (
    <div className={styles.container}>
      <LayoutWrapper>
        <ContentPadding>
          <div className={styles.content}>
            <motion.div
              variants={fadeIn("right", 0.3)}
              initial='hidden'
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className={styles.left}
            >
              <h1 className={styles.heading} lang='en'>
                The Perfect Stay for your Perfect Vacation.
              </h1>
              <p className={styles.copy}>
                Discover a curated selection of meticulously designed houses,
                each offering a unique blend of modern amenities and scenic
                beauty.
              </p>
              <div className={styles.btnContainer}>
                <Button
                  text='See all properties'
                  btnType='primary'
                  href='/properties'
                />
                <Button text='About us' btnType='secondary' href='/about' />
              </div>
            </motion.div>
            <motion.div
              variants={fadeIn("left", 0.3)}
              initial='hidden'
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className={styles.right}
            >
              <div className={styles.imgContainer}>
                <Image src={Img} alt='image' fill className={styles.img} />
              </div>
            </motion.div>
          </div>
        </ContentPadding>
      </LayoutWrapper>
    </div>
  );
};
export default Hero;
