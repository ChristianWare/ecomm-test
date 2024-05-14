"use client";

import styles from "./Footer.module.css";
import Link from "next/link";
import { useState } from "react";
import ArrowRight from "../../public/icons/arrowRight.svg";
import Logo from "../../public/icons/logo.svg";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import ContentPadding from "../ContentPadding/ContentPadding";

const Footer = () => {
  const [selected, setSelected] = useState(null);

  const toggle = (i: any) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  const currentYear = new Date().getFullYear();

  const footer = [
    {
      id: 1,
      heading: "About",
      section: [
        {
          id: 2,
          name: "Terms",
          href: "/terms",
        },
        {
          id: 3,
          name: "Privacy",
          href: "/privacy",
        },
        {
          id: 4,
          name: "Accessibility",
          href: "/accessibility",
        },
        {
          id: 5,
          name: "California Disclosures",
          href: "/california",
        },
      ],
    },
    {
      id: 6,
      heading: "Homes",
      section: [
        {
          id: 7,
          name: "183rd",
          href: "/services",
        },
        {
          id: 8,
          name: "Goodyear",
          href: "/services",
        },
        {
          id: 9,
          name: "Coolidge",
          href: "/services",
        },
        {
          id: 10,
          name: "Scottsdale",
          href: "/services",
        },
      ],
    },
    {
      id: 11,
      heading: "Booking",
      section: [
        {
          id: 12,
          name: "24/7",
          href: "/contact",
        },
        {
          id: 13,
          name: "Phoenix",
          href: "/contact",
        },
        {
          id: 146,
          name: "Scottsdale",
          href: "/contact",
        },
        {
          id: 15,
          name: "West Valley",
          href: "/contact",
        },
      ],
    },
    {
      id: 16,
      heading: "Contact",
      section: [
        {
          id: 17,
          name: "Phone",
          href: "/contact",
        },
        {
          id: 18,
          name: "Email",
          href: "/contact",
        },
        {
          id: 19,
          name: "Address",
          href: "/contact",
        },
        {
          id: 20,
          name: "Phone",
          href: "/contact",
        },
      ],
    },
  ];

  return (
    <footer className={styles.container}>
      <LayoutWrapper>
        <ContentPadding>
          <div className={styles.content}>
            <div className={styles.topTop}>
              <div className={styles.left}>
                <Link href='/' className={styles.logo}>
                  <Logo width={50} height={50} className={styles.icon} />
                  <span className={styles.span}>Elite Retreat Rentals</span>
                </Link>
                <p className={styles.desc}>
                  Welcome to Elite Retreat Rentals, Arizona&lsquo;s top
                  destination for unforgettable vacations, where each stay
                  promises luxury and sophistication beyond compare.
                </p>
                <p className={styles.desc}>
                  <strong>Admin Office: </strong>
                  <br />
                  10105 E Vía Linda Suite A- 101 <br />
                  Scottsdale, AZ 85258
                  <br />
                  <br />
                  <strong>
                    Phone: <br />
                  </strong>
                  623-665-6778
                  <br />
                  <br />
                  <strong>
                    Email <br />
                  </strong>
                  reservations@eliteretreatrentals.com
                </p>
              </div>
              <div className={styles.right}>
                <div className={styles.middleDesktop}>
                  {footer.map((f, index) => (
                    <div key={index} className={styles.sectionContainer}>
                      <div className={styles.headingContainer}>
                        <p className={styles.heading}>{f.heading}</p>
                      </div>
                      <div className={styles.footerItemContainer}>
                        {f.section.map((s, index) => (
                          <Link
                            href={s.href}
                            key={index}
                            className={styles.footerItem}
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.bottomDesktop}>
                  <div className={styles.bottomLeft}>
                    <div className={styles.copy}>
                      &copy; {currentYear} Elite Retreat Rentals || All Rights
                      Reserved || Designed and Developed by{" "}
                      <Link
                        href='https://www.fontsandfooters.com/'
                        target='_blank'
                        className={styles.target}
                      >
                        The Chris Ware Agency
                      </Link>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.middleMobile}>
              {footer.map((f, i) => (
                <div key={f.id} className={styles.sectionContainer}>
                  <div
                    className={styles.headingContainer}
                    onClick={() => toggle(i)}
                  >
                    <p className={styles.heading}>{f.heading}</p>
                    <span className={styles.arrow}>
                      {selected === i ? (
                        <ArrowRight
                          className={styles.arrowFlip}
                          height={20}
                          width={20}
                        />
                      ) : (
                        <ArrowRight
                          className={styles.arrow}
                          height={20}
                          width={20}
                        />
                      )}
                    </span>
                  </div>
                  <div
                    className={
                      selected === i
                        ? styles.answer + " " + styles.show
                        : styles.answer
                    }
                  >
                    <div className={styles.footerItemContainer}>
                      {f.section.map((s, index) => (
                        <Link
                          href={s.href}
                          key={index}
                          className={styles.footerItem}
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.bottom}>
              <div className={styles.bottomLeft}>
                <div className={styles.copy}>
                  &copy; {currentYear} Elite Retreat Rentals || All Rights
                  Reserved || Designed and Developed by{" "}
                  <Link
                    href='https://www.fontsandfooters.com/'
                    target='_blank'
                    className={styles.target}
                  >
                    The Chris Ware Agency
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </ContentPadding>
      </LayoutWrapper>
    </footer>
  );
};
export default Footer;
