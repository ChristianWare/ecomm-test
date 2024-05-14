import styles from "./Testimonials.module.css";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import StarCluster from "../StarCluster/StarCluster";
import Person from "../../public/icons/person.svg";
import ContentPadding from "../ContentPadding/ContentPadding";

const reviews = [
  {
    id: 71,
    review:
      "Absolutely loved the convenience and comfort of Elite Retreat Rentals, a true home away from home!",
    reviewer: "Michael Jones.",
  },
  {
    id: 72,
    review:
      "The attention to detail in every aspect of our stay with Elite Retreat Rentals made our vacation truly exceptional.",
    reviewer: "Ryan Lindenburg",
  },
  {
    id: 73,
    review:
      "Fantastic experience with Elite Retreat Rentals—impeccable service, stunning accommodations, and unbeatable value!",
    reviewer: "Miguel Sanchez",
  },
  {
    id: 74,
    review:
      "Highly recommend Elite Retreat Rentals for anyone looking for a perfect blend of luxury and affordability in Phoenix.",
    reviewer: "Pietro Flores",
  },
  {
    id: 75,
    review:
      "Our stay with Elite Retreat Rentals exceeded all expectations; we can't wait to return!",
    reviewer: "Carol Turner",
  },
];

const Testimonials = () => {
  return (
    <section className={styles.container}>
      <LayoutWrapper>
        <ContentPadding>
          <div className={styles.content}>
            <h2 className={styles.heading}>Reviews</h2>
            <p className={styles.copy}>
              Read What Our Clients Have to Say About Their Journey with Us. We
              use the latest technologies and tools to ensure that our solutions
              are scalable, efficient, and secure. Our team follows agile
              methodologies to deliver projects on time and on budget.
            </p>
            <div className={styles.bottom}>
              <div className={styles.top}>
                {/* <StarCluster color='tan' /> */}
              </div>
              <div className={styles.cardContainer1}>
                {reviews.map((x) => (
                  <div key={x.id} className={styles.card}>
                    <p className={styles.review}>&rdquo;{x.review}&rdquo;</p>
                    <div className={styles.personBox}>
                      <Person
                        width={50}
                        height={50}
                        className={styles.personImage}
                      />
                      <p className={styles.reviewer}>
                        {x.reviewer}
                        {/* <span className={styles.company}>{x.company}</span> */}
                        <StarCluster />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ContentPadding>
      </LayoutWrapper>
    </section>
  );
};

export default Testimonials;
