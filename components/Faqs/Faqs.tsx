"use client";

import ContentPadding from "../ContentPadding/ContentPadding";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import styles from "./Faqs.module.css";
import { faqs } from "../../lib/data";
import { useState } from "react";
import Plus from "../../public/icons/plus.svg";
import { motion } from "framer-motion";
import { fadeIn } from "../../animation/variants";

const Faqs = () => {
  const [selected, setSelected] = useState(0);

  const toggle = (i: any) => {
    setSelected(i);
  };

  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <ContentPadding>
          <div className={styles.content}>
            <div className={styles.top}>
              <h2 className={styles.heading}>FAQ&#39;s</h2>
              <p className={styles.copy}>
                Commonly asked questions and answers. If you do not see your
                question here, feel free to call us anytime to ask, and we will
                gladly give you a satisfactory answer.
              </p>
            </div>
            <div className={styles.bottom}>
              {faqs.slice(0, 5).map((x, i) => (
                <div
                  key={x.id}
                  className={`${styles.qaContainer} ${
                    selected === i ? styles.active : ""
                  }`}
                  onClick={() => toggle(i)}
                >
                  <div className={styles.headingArrowContainer}>
                    <motion.h3
                      variants={fadeIn("left", 0.3)}
                      initial='hidden'
                      whileInView={"show"}
                      viewport={{ once: false, amount: 0.3 }}
                      className={styles.question}
                      lang='en'
                    >
                      {x.question}
                    </motion.h3>
                    {selected === i ? (
                      <Plus
                        className={styles.iconFlip}
                        width={35}
                        height={35}
                      />
                    ) : (
                      <Plus className={styles.icon} width={30} height={30} />
                    )}
                  </div>
                  <div
                    className={
                      selected === i
                        ? styles.answerContainer + " " + styles.show
                        : styles.answerContainer
                    }
                  >
                    <motion.p
                      variants={fadeIn("left", 0.3)}
                      initial='hidden'
                      whileInView={"show"}
                      viewport={{ once: false, amount: 0.3 }}
                      className={styles.answer}
                      lang='en'
                    >
                      {x.answer}
                    </motion.p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentPadding>
      </LayoutWrapper>
    </section>
  );
};
export default Faqs;
