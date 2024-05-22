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
import { MDBDataTable } from "mdbreact";

const ProductsPage = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[] | null>([]);
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

  const setProductsTable = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: <div className={styles.theadContainer}>Title</div>,
          field: "title",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Category</div>,
          field: "category",
          sort: "asc",
        },
        // {
        //   label: <div className={styles.theadContainer}>Collections</div>,
        //   field: "collections",
        //   sort: "asc",
        // },
        {
          label: <div className={styles.theadContainer}>Price</div>,
          field: "price",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Expense</div>,
          field: "expense",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Profit</div>,
          field: "profit",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Actions</div>,
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    products
      ?.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .forEach((product) => {
        data?.rows?.push({
          id: product._id,
          title: product.title,
          category: product.category,
          // collections: product.collections
          //   .map((collection) => collection.title)
          //   .join(", "),
          price: `$${product.price}`,
          expense: `$${product.expense}`,
          profit: `$${product.price - product.expense}`,
          actions: (
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
          ),
        });
      });

    return data;
  };

  return (
    <div>
      <h1 className={styles.heading}>Products Page</h1>
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
        <MDBDataTable data={setProductsTable()} className={styles.dataTable} />
      )}
    </div>
  );
};

export default ProductsPage;
