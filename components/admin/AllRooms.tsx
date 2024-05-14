"use client";

import { IRoom } from "../../backend/models/room";
import { useDeleteRoomMutation } from "../../redux/api/roomApi";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import styles from "./AllRooms.module.css";
import Modal from "../Modal/Modal";
import FalseButton from "../FalseButton/FalseButton";
import NewRoom from "./NewRoom";

interface Props {
  data: {
    rooms: IRoom[];
  };
}

const AllRooms = ({ data }: Props) => {
  const rooms = data?.rooms;
  const router = useRouter();
  const [modalRoomId, setModalRoomId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenii, setIsModalOpenii] = useState(false);

  const [deleteRoom, { isLoading, error, isSuccess }] = useDeleteRoomMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      router.refresh();
      toast.success("Room deleted");
    }
  }, [error, isSuccess, router]);

  const deleteRoomHandler = async (id: string) => {
    try {
      await deleteRoom(id);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleDeleteModal = (id: string) => {
    setModalRoomId(id);
    setIsModalOpen(true);
  };

  const setRooms = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: <div className={styles.theadContainer}>Room ID</div>,
          field: "id",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Name</div>,
          field: "name",
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

    rooms
      ?.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .forEach((room) => {
        data?.rows?.push({
          id: room._id,
          name: room.name,
          actions: (
            <div className={styles.actions}>
              <Link href={`/admin/rooms/${room._id}`}>
                <i className='fa fa-pencil'></i>
              </Link>
              <Link href={`/admin/rooms/${room._id}/upload_images`}>
                <i className='fa fa-images'></i>
              </Link>
              <div className={styles.trash}>
                <i
                  onClick={() => handleDeleteModal(room._id)}
                  className='fa fa-trash'
                ></i>
              </div>
            </div>
          ),
        });
      });

    return data;
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "50px",
        }}
      >
        <h2 className={styles.heading}>
          {rooms?.length > 1
            ? rooms?.length + " Properties"
            : rooms?.length + " Property"}
        </h2>
        <FalseButton
          btnType='secondary'
          text='New Property'
          onClick={() => setIsModalOpenii(true)}
        />
        <Modal
          isOpen={isModalOpen && modalRoomId !== null}
          onClose={() => {
            setIsModalOpen(false);
            setModalRoomId(null);
          }}
        >
          <p>
            Are you sure you want to delete property? This can not be undone.{" "}
          </p>
          <div className={styles.btnContainer}>
            <FalseButton
              btnType='secondary'
              text={isLoading ? "Deleting..." : "Delete Property"}
              onClick={() => deleteRoomHandler(modalRoomId!)}
              disabled={isLoading}
            />
            <FalseButton
              btnType='primary'
              text='Cancel'
              onClick={() => {
                setIsModalOpen(false);
                setModalRoomId(null);
              }}
            />
          </div>{" "}
        </Modal>
        <Modal
          onClose={() => {
            setIsModalOpenii(false);
          }}
          isOpen={isModalOpenii}
        >
          <NewRoom onClose={() => setIsModalOpenii(false)} />
        </Modal>
      </div>
      <MDBDataTable data={setRooms()} className={styles.dataTable} />
    </div>
  );
};
export default AllRooms;
