"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./UserSidebar.module.css";

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItem = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      name: "Properties",
      url: "/admin/rooms",
      icon: "fas fa-hotel",
    },
    {
      name: "Bookings",
      url: "/admin/bookings",
      icon: "fas fa-receipt",
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: "fas fa-user",
    },
    {
      name: "Reviews",
      url: "/admin/reviews",
      icon: "fas fa-star",
    },
  ];

  const [activeMenuItem, setActiveMenuItem] = useState(pathname);

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
  };

  return (
    <div className={styles.container}>
      {menuItem.map((x, index) => (
        <Link
          key={index}
          href={x.url}
          className={
            activeMenuItem.includes(x.url) ? styles.active : styles.btn
          }
          onClick={() => handleMenuItemClick(x.url)}
          aria-current={activeMenuItem.includes(x.url) ? "true" : "false"}
        >
          <i className={`${x.icon} fa-fw pe-2`}></i>
          {x.name}
        </Link>
      ))}
    </div>
  );
};
export default AdminSidebar;
