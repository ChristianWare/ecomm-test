"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./UserSidebar.module.css";

const UserSidebar = () => {
  const pathname = usePathname();

  const menuItem = [
    {
      name: "Update Profile",
      url: "/me/update",
      icon: "fas fa-user",
    },
    {
      name: "Upload Avatar",
      url: "/me/upload_avatar",
      icon: "fas fa-user-circle",
    },
    {
      name: "Update Password",
      url: "/me/update_password",
      icon: "fas fa-lock",
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
          className={activeMenuItem === x.url ? styles.active : styles.btn}
          onClick={() => handleMenuItemClick(x.url)}
          aria-current={activeMenuItem === x.url ? "true" : "false"}
        >
          <i className={`${x.icon} fa-fw pe-2 mr-10`}></i>
          {x.name}
        </Link>
      ))}
    </div>
  );
};
export default UserSidebar;
