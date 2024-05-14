import { methodologies } from "../../lib/data";
import ContentPadding from "../ContentPadding/ContentPadding";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import styles from "./Methodology.module.css";
import House from "../../public/icons/house.svg";

const Methodology = () => {
  return (
    <LayoutWrapper>
      <ContentPadding>
        <section className={styles.container}>
          <div className={styles.top}>
            <h2 className={styles.heading}>Our Values and Principles</h2>
            <p className={styles.copy}>
              We are driven by a set of core values and principles that guide
              everything we do. These values are not just words on a page; they
              are the foundation of the exceptional service we provide to our
              clients.
            </p>
          </div>
          <div className={styles.bottom}>
            {methodologies.map((x, index) => (
              <div key={index} className={styles.box}>
                <House width={30} height={30} className={styles.icon} />
                <p className={styles.methHeading}>{x.heading}</p>
                <p className={styles.methDesc}>{x.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ContentPadding>
    </LayoutWrapper>
  );
};
export default Methodology;
