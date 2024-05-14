import Image from "next/image";
import styles from "./SlugIntro.module.css";
import { FC } from "react";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import ContentPadding from "../ContentPadding/ContentPadding";
import { StaticImageData } from "next/image";

interface SlugIntroProps {
  title: string;
  description?: string;
  date?: string;
  src: StaticImageData;
}

const SlugIntro: FC<SlugIntroProps> = ({ title, description, date, src }) => {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <ContentPadding>
          <div className={styles.content}>
            <div className={styles.left}>
              <h1 className={styles.heading} lang='en'>
                {title}
              </h1>
              <p className={styles.date}>{date}</p>
              <p className={styles.copy}>{description}</p>
            </div>
            <div className={styles.right}>
              <div className={styles.imgContainer}>
                <Image
                  src={src}
                  alt='Nier Transportation'
                  fill
                  className={styles.img}
                />
              </div>
            </div>
          </div>
        </ContentPadding>
      </LayoutWrapper>
    </section>
  );
};
export default SlugIntro;
