import ContentPadding from "../ContentPadding/ContentPadding";
import styles from "./AboutSection.module.css";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";

const AboutSection = () => {
  return (
    <div className={styles.container}>
      <LayoutWrapper>
        <ContentPadding>
          <div className={styles.content}>
            <h2 className={styles.heading}>
              {/* TACO BELL IS A{" "}
              <span className={styles.span}>FLAVORFUL FEASTING </span>
              ADVENTURE. INDULGE, SIP, AND ENJOY THE{" "}
              <span className={styles.span}>TASTY DELIGHTS </span> WITH YOUR
              COMPANIONS. */}
              Discover your dream getaway with us and enjoy{" "}
              <span className={styles.span} lang='en'>
                seamless
              </span>{" "}
              seamless booking,{" "}
              <span className={styles.span} lang='en'>
                expert
              </span>{" "}
              support, and{" "}
              <span className={styles.span} lang='en'>
                unforgettable
              </span>{" "}
              experiences tailored just for you.
            </h2>
          </div>
        </ContentPadding>
      </LayoutWrapper>
    </div>
  );
};
export default AboutSection;
