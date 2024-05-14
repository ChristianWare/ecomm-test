import ContentPadding from "../ContentPadding/ContentPadding";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import styles from "./ContactSection.module.css";
import Image from "next/image";
import Img from "../../public/images/owner.png";
import ContactForm from "../ContactForm/ContactForm";

const ContactSection = () => {
  const contactInfo = [
    {
      feature: "Email",
      value: "hello@eliteretreatrentals.com",
    },
    {
      feature: "Phone",
      value: "623-450-6589",
    },
    {
      feature: "Instagram",
      value: "@eliteRetreatRentals",
    },
    {
      feature: "Facebook",
      value: "facebook.com/eliteretreatrentals",
    },
  ];

  return (
    <LayoutWrapper>
      <ContentPadding>
        <div className={styles.content}>
          <div className={styles.left}>
            <h2 className={styles.heading}>Contact Form</h2>
            {/* <h1 className={styles.heading}>Stay in touch</h1>
            <p className={styles.copy}>
              We look forward to spesking with you soon. Feel free to reach out
              to us anytime.
            </p> */}
            <ContactForm />
            {/* <div className={styles.statsContainer}>
              {contactInfo.map((x, index) => (
                <div key={index} className={styles.box}>
                  <p className={styles.feature}>{x.feature}</p>
                  <p className={styles.value}>{x.value}</p>
                </div>
              ))}
            </div> */}
          </div>
          <div className={styles.right}>
            <div className={styles.imgContainer}>
              <Image src={Img} alt='image' fill className={styles.img} />
            </div>
          </div>
        </div>
      </ContentPadding>
    </LayoutWrapper>
  );
};
export default ContactSection;
