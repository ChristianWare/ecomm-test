"use client";

import styles from "../Dashboard.module.css";
import Button from "@/components/Button/Button";
import { useState, useEffect } from "react";
import Trash from "../../../../public/icons/trash.svg";
import Modal from "@/components/Modal/Modal";
import FalseButton from "@/components/FalseButton/FalseButton";
import Link from "next/link";
import toast from "react-hot-toast";

const CategoriesPage = () => {
  return (
    <div>
      <h1 className={styles.heading}>Categories</h1>
      <p className={styles.copy}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quidem
        libero impedit incidunt numquam quibusdam dolorem cupiditate nam dolor,
        quod quae eveniet accusamus hic atque, odio porro. Facilis, tempora
        perferendis!
      </p>
      <Button
        btnType='primaryii'
        href='/admin/dashboard/categories/new'
        text='+ New Category'
      />
    </div>
  );
};
export default CategoriesPage;
