"use client";

import { IUser } from "../../backend/models/user";
import { useDeleteUserMutation } from "../../redux/api/userApi";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./AllUsers.module.css";
import FalseButton from "../FalseButton/FalseButton";
import Modal from "../Modal/Modal";

interface Props {
  data: {
    users: IUser[];
  };
}

const AllUsers = ({ data }: Props) => {
  const users = data?.users;
  const router = useRouter();
  const [modalUserId, setModalUserId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteUser, { error, isLoading, isSuccess }] = useDeleteUserMutation();

  const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      router.refresh();
      toast.success("User deleted");
      setIsModalOpen(false);
    }
  }, [error, isSuccess, router]);

  const deleteUserHandler = (id: string) => {
    deleteUser(id);
  };

  const handleDeleteModal = (id: string) => {
    setModalUserId(id);
    setIsModalOpen(true);
  };

  const setUsers = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: <div className={styles.theadContainer}>ID</div>,
          field: "id",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Name</div>,
          field: "name",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Email</div>,
          field: "email",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Role</div>,
          field: "role",
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

    users
      ?.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .forEach((user) => {
        data?.rows?.push({
          id: user._id,
          name: user?.name,
          email: user?.email,
          role: user?.role,

          actions: (
            <div className={styles.actions}>
              <Link
                href={`/admin/users/${user._id}`}
                className='btn btn-outline-primary'
              >
                <i className='fa fa-pencil'></i>
              </Link>

              <button
                className={styles.trash}
                disabled={isLoading}
                onClick={() => handleDeleteModal(user?._id)}
              >
                <i className='fa fa-trash'></i>
              </button>
            </div>
          ),
        });
      });

    return data;
  };

  return (
    <div className='container'>
      <h2 className={styles.heading}>{users?.length} Users</h2>
      <MDBDataTable data={setUsers()} className={styles.dataTable} />
      <Modal
        isOpen={isModalOpen && modalUserId !== null}
        onClose={() => {
          setIsModalOpen(false);
          setModalUserId(null);
        }}
      >
        <p>Are you sure you want to delete user? This can not be undone.</p>
        <div className={styles.btnContainer}>
          <FalseButton
            btnType='secondary'
            text={isLoading ? "Deleting..." : "Delete User"}
            onClick={() => deleteUserHandler(modalUserId!)}
            disabled={isLoading}
          />
          <FalseButton
            btnType='primary'
            text='Cancel'
            onClick={() => {
              setIsModalOpen(false);
              setModalUserId(null);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
export default AllUsers;
