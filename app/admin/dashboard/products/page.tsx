"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button/Button";
import styles from "../Dashboard.module.css";
import { ProductType } from "@/interfaces";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import FalseButton from "@/components/FalseButton/FalseButton";
import toast from "react-hot-toast";
import Link from "next/link";
import Trash from "../../../../public/icons/trash.svg";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [modalProductId, setModalProductId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      });
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.log("[products_GET]", err);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      toast.success("Product deleted");
      getProducts(); // Refresh the products list
    } catch (err) {
      console.log("[products_DELETE]", err);
      toast.error("Failed to delete product");
    }
  };

  const handleDeleteModal = (id: string) => {
    setModalProductId(id);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1 className={styles.heading}>Products Page</h1>
      <p className={styles.copy}>
        Products are a group of items that you sell, and they can belong to
        categories, collections and tags. You can create, edit, and delete all
        of your products here.
      </p>
      <Button
        btnType='primaryii'
        href='/admin/dashboard/products/new'
        text='+ New Product'
      />
      <Modal
        isOpen={isModalOpen && modalProductId !== null}
        onClose={() => {
          setIsModalOpen(false);
          setModalProductId(null);
        }}
      >
        <h6 className={styles.modalHeading}>Are you absolutely sure?</h6>
        <p className={styles.modalText}>
          This action cannot be undone. This will permanently delete your
          product.
        </p>
        <div className={styles.btnContainer}>
          <FalseButton
            btnType='delete'
            text='Continue'
            onClick={() => {
              deleteProduct(modalProductId!);
              setIsModalOpen(false);
            }}
          />
          <FalseButton
            btnType='primaryii'
            text='Cancel'
            onClick={() => {
              setIsModalOpen(false);
              setModalProductId(null);
            }}
          />
        </div>
      </Modal>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className={styles.headingContainer}>
            <div>Title</div>
            <div>Category</div>
            <div>Price</div>
            <div>Actions</div>
          </div>
          <div className={styles.box}>
            {products.map((product, index) => (
              <div key={index} className={styles.tableContainerr}>
                <div className={styles.productTableContainer}>
                  <p>{product.title}</p>
                  <p>
                    {typeof product.category === "string"
                      ? product.category
                      : product.category?.title}
                  </p>{" "}
                  {/* Ensure category title is rendered */}
                  <p>${product.price}</p>
                  <div className={styles.actions}>
                    <Link href={`/admin/dashboard/products/${product._id}`}>
                      edit
                    </Link>
                    <div className={styles.trash}>
                      <Trash
                        onClick={() => handleDeleteModal(product._id)}
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
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
