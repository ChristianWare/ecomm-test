"use client";

import styles from "./LeftSideBar.module.css";
import Link from "next/link";
import Dashboard from "../../public/icons/dashboard.svg";
import Collections from "../../public/icons/collection.svg";
import Categories from "../../public/icons/category.svg";
import Products from "../../public/icons/products.svg";
import Orders from "../../public/icons/orders.svg";
import Customers from "../../public/icons/customers.svg";
import { usePathname } from "next/navigation";

const data = [
  {
    icon: <Dashboard width={25} height={25} className={styles.icon} />,
    title: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: <Collections width={25} height={25} className={styles.icon} />,
    title: "Collections",
    href: "/admin/dashboard/collections",
  },
  {
    icon: <Categories width={25} height={25} className={styles.icon} />,
    title: "Categories",
    href: "/admin/dashboard/categories",
  },
  {
    icon: <Products width={25} height={25} className={styles.icon} />,
    title: "Products",

    href: "/admin/dashboard/products",
  },
  {
    icon: <Orders width={25} height={25} className={styles.icon} />,
    title: "Orders",
    href: "/admin/dashboard/orders",
  },
  {
    icon: <Customers width={30} height={30} className={styles.icon} />,
    title: "Customers",
    href: "/admin/dashboard/customers",
  },
];

const LeftSideBar = () => {
  const pathanme = usePathname();

  return (
    <div className={styles.container}>
      <ul>
        {data.map((x) => (
          <li key={x.title}>
            <Link href={x.href} className={styles.iconTitleContainer}>
              {x.icon}
              {x.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default LeftSideBar;
