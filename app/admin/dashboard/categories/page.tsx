"use client";

import Button from "@/components/Button/Button";
import styles from "../Dashboard.module.css";
import { useState, useEffect } from "react";
import Trash from "../../../../public/icons/trash.svg";
import Modal from "@/components/Modal/Modal";
import FalseButton from "@/components/FalseButton/FalseButton";
import Link from "next/link";
import toast from "react-hot-toast";

interface Category {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const CategoriesPage = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalCategoryId, setModalCategoryId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCategories = async () => {
    try {
      const res = await fetch("/api/categories", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setCategories(data);
      setLoading(false);
    } catch (err) {
      console.log("[categories_GET]", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/categories`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Send the category ID in the request body
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      toast.success("Category deleted");
      getCategories(); // Refresh the categories list
    } catch (err) {
      console.log("[categories_DELETE]", err);
      toast.error("Failed to delete category");
    }
  };

  const handleDeleteModal = (id: string) => {
    setModalCategoryId(id);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1 className={styles.heading}>Categories</h1>
      <Button
        btnType='primaryii'
        href='/admin/dashboard/categories/new'
        text='+ New Category'
      />
      <Modal
        isOpen={isModalOpen && modalCategoryId !== null}
        onClose={() => {
          setIsModalOpen(false);
          setModalCategoryId(null);
        }}
      >
        <h6 className={styles.modalHeading}>Are you absolutely sure?</h6>
        <p className={styles.modalText}>
          This action cannot be undone. This will permanently delete your
          category.
        </p>
        <div className={styles.btnContainer}>
          <FalseButton
            btnType='delete'
            text='Continue'
            onClick={() => {
              deleteCategory(modalCategoryId!);
              setIsModalOpen(false);
            }}
          />
          <FalseButton
            btnType='primaryii'
            text='Cancel'
            onClick={() => {
              setIsModalOpen(false);
              setModalCategoryId(null);
            }}
          />
        </div>
      </Modal>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles.headingContainer}>
            <div>Title</div>
            <div>Actions</div>
          </div>
        {categories.length <= 0 && <span>No Categories</span>}
          <div className={styles.box}>
            {categories.map((x, index) => (
              <div key={index} className={styles.tableContainerr}>
                <div className={styles.categoryTableContainer}>
                  <p>{x.title}</p>
                  <div className={styles.actions}>
                    <Link href={`/admin/dashboard/categories/${x._id}`}>
                      edit
                    </Link>
                    <div className={styles.trash}>
                      <Trash
                        onClick={() => handleDeleteModal(x._id)}
                        className={styles.icon}
                        width={30}
                        height={30}
                      ></Trash>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoriesPage;
