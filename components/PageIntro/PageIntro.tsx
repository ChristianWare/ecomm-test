"use client";

import styles from "./PageIntro.module.css";
import { PageIntroProps } from "../../lib/interface";
import { FC } from "react";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import ContentPadding from "../ContentPadding/ContentPadding";
import { motion } from "framer-motion";
import { fadeIn } from "../../animation/variants";

const PageIntro: FC<PageIntroProps> = ({ heading, copy }) => {
  return (
    <div className={styles.top}>
      <LayoutWrapper>
        <ContentPadding>
          <motion.h1
            variants={fadeIn("down", 0.3)}
            initial='hidden'
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className={styles.heading}
          >
            {heading}
          </motion.h1>
          <motion.p
            variants={fadeIn("down", 0.3)}
            initial='hidden'
            whileInView={"show"}
            viewport={{ once: false, amount: 0.3 }}
            className={styles.copy}
          >
            {copy}
          </motion.p>
        </ContentPadding>
      </LayoutWrapper>
    </div>
  );
};
export default PageIntro;
