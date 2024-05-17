"use client";

import { useEffect, useState } from "react";
import ContentPadding from "../../components/ContentPadding/ContentPadding";
import LayoutWrapper from "../../components/LayoutWrapper/LayoutWrapper";
import { useAppSelector } from "../../redux/hooks";
import Link from "next/link";
import Button from "../../components/Button/Button";
import styles from "./AccountPage.module.css";

const options = [
  {
    option: "My Bookings",
    desc: "See all of your bookings, and view receipts and confirmation statements.",
    href: "/bookings/me",
  },
  {
    option: "Update Account",
    desc: "Update your username, email and password",
    href: "/me/update",
  },
];

const AccountPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) {
    return (
      <LayoutWrapper>
        <ContentPadding>
          <h1 className={styles.heading}>Loading...</h1>
        </ContentPadding>
      </LayoutWrapper>
    );
  }

  return (
    <>
      <LayoutWrapper>
        <ContentPadding>
          {user ? (
            <>
              <div className={styles.top}>
                <h1 className={styles.heading}>
                  Hi, <span className={styles.userName}>{user?.name} 👋</span>
                </h1>
                <h2>What would you like to do today?</h2>
              </div>
              <div className={styles.bottom}>
                {options.map((x, index) => (
                  <Link href={x.href} key={index} className={styles.box}>
                    <h3 className={styles.option}>{x.option}</h3>
                    <p className={styles.desc}>{x.desc}</p>
                  </Link>
                ))}
                {user?.role === "admin" && (
                  <Link href='/admin/dashboard' className={styles.box}>
                    <h3 className={styles.option}>Admin Dashboard</h3>
                    <p className={styles.desc}>
                      View Sales dashboard, update property details, manage
                      bookings, view usuers, and verify reviews.
                    </p>
                  </Link>
                )}
              </div>
            </>
          ) : (
            <h1 className={styles.heading}>Loading...</h1>
          )}
        </ContentPadding>
      </LayoutWrapper>
    </>
  );
};
export default AccountPage;
