"use client";

import ContentPadding from "../ContentPadding/ContentPadding";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import styles from "./Owner.module.css";
import Image from "next/image";
import Img from "../../public/images/owner.png";
import Quote from "../../public/icons/quote.svg";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { OwnerProps } from "../../lib/interface";
import { motion } from "framer-motion";
import { fadeIn } from "../../animation/variants";

const Owner: FC<OwnerProps> = ({ heading, copy, reverse = "" }) => {
  const pathname = usePathname();

  return (
    <div className={styles.bgColor}>
      <LayoutWrapper>
        <ContentPadding>
          {pathname === "/" && (
            <div className={styles.top}>
              <Quote width={130} height={130} className={styles.quote} />
            </div>
          )}
          <div className={`${styles.content} ${styles[reverse]} `}>
            <motion.div
              variants={fadeIn("right", 0.3)}
              initial='hidden'
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
              className={styles.left}
            >
              <h3 className={styles.heading}>{heading}</h3>
              <p className={styles.copy}>{copy}</p>
              {pathname === "/about" && (
                <div className={styles.aboutContainer}>
                  <h2 className={styles.heading}>
                    We have created a real and lasting impact
                  </h2>
                  <div className={styles.statsBox}>
                    <div className={styles.box}>
                      <h2 className={styles.heading}>10+</h2>
                      <p className={styles.copyii}>Years in Business</p>
                    </div>
                    <div className={styles.box}>
                      <h2 className={styles.heading}>7</h2>
                      <p className={styles.copyii}>Properties</p>
                    </div>
                    <div className={styles.box}>
                      <h2 className={styles.heading}>35 + </h2>
                      <p className={styles.copyii}>Intergration Partners</p>
                    </div>
                    <div className={styles.box}>
                      <h2 className={styles.heading}>1000 + </h2>
                      <p className={styles.copyii}>guests</p>
                    </div>
                  </div>
                </div>
              )}
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
              <div className={styles.statsContainer}>
                <div className={styles.statsLeft}>
                  <h4 className={styles.statsHeading}>Kristin Watson</h4>
                  <p className={styles.statsTitle}>Property Manager</p>
                </div>
                <div className={styles.statsRight}>
                  <Image
                    src={Img}
                    alt='image'
                    width={80}
                    height={80}
                    className={styles.imgii}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </ContentPadding>
      </LayoutWrapper>
    </div>
  );
};
export default Owner;
