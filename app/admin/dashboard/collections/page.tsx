"use client";

import Button from "@/components/Button/Button";
import styles from "../Dashboard.module.css";
import { useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import Trash from "../../../../public/icons/trash.svg";
import Modal from "@/components/Modal/Modal";
import FalseButton from "@/components/FalseButton/FalseButton";
import Link from "next/link";
import toast from "react-hot-toast";

interface Collection {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const CollectionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [modalCollectionId, setModalCollectionId] = useState<string | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.text();

      const parsedData = data ? JSON.parse(data) : [];

      setCollections(parsedData);
      setLoading(false);
    } catch (err) {
      console.log("[collection_GET]", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  const deleteCollection = async (id: string) => {
    try {
      const res = await fetch(`/api/collections/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      toast.success("Collection deleted");
      getCollections(); // Refresh the collections list
    } catch (err) {
      console.log("[collection_DELETE]", err);
      toast.error("Failed to delete collection");
    }
  };

  const handleDeleteModal = (id: string) => {
    setModalCollectionId(id);
    setIsModalOpen(true);
  };

  const setCollectionsTable = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: <div className={styles.theadContainer}>Title</div>,
          field: "title",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Produtcs</div>,
          field: "products",
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

    collections
      ?.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .forEach((collection) => {
        data?.rows?.push({
          id: collection._id,
          title: collection.title,
          products: collection.products.length,
          actions: (
            <div className={styles.actions}>
              <Link href={`/admin/dashboard/collections/${collection._id}`}>
                edit
              </Link>
              <div className={styles.trash}>
                <Trash
                  onClick={() => handleDeleteModal(collection._id)}
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
      <h1 className={styles.heading}>Collections Page</h1>
      <Button
        btnType='primaryii'
        href='/admin/dashboard/collections/new'
        text='+ New Collection'
      />
      <Modal
        isOpen={isModalOpen && modalCollectionId !== null}
        onClose={() => {
          setIsModalOpen(false);
          setModalCollectionId(null);
        }}
      >
        <h6 className={styles.modalHeading}>Are you absolutely sure?</h6>
        <p className={styles.modalText}>
          This action cannot be undone. This will permanently delete your
          collection.
        </p>
        <div className={styles.btnContainer}>
          <FalseButton
            btnType='delete'
            text='Continue'
            onClick={() => {
              deleteCollection(modalCollectionId!);
              setIsModalOpen(false);
            }}
          />
          <FalseButton
            btnType='primaryii'
            text='Cancel'
            onClick={() => {
              setIsModalOpen(false);
              setModalCollectionId(null);
            }}
          />
        </div>
      </Modal>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* <MDBDataTable
          data={setCollectionsTable()}
          className={styles.dataTable}
        /> */}
            <div className={styles.headingContainer}>
              <div>Title</div>
              <div>Products</div>
              <div>Actions</div>
            </div>
          <div className={styles.box}>
            {collections.map((x, index) => (
              <div key={index} className={styles.tableContainerr}>
                <div className={styles.tableContainer}>
                  <p>{x.title}</p>
                  <p className={styles.products}>{x.products.length}</p>
                  <div className={styles.actions}>
                    <Link
                      href={`/admin/dashboard/collections/${x._id}`}
                    >
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
export default CollectionsPage;
