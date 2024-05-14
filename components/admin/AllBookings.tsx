"use client";

import { IBooking } from "../../backend/models/booking";
import { useDeleteBookingMutation } from "../../redux/api/bookingApi";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import styles from "./AllBookings.module.css";
import Modal from "../Modal/Modal";
import FalseButton from "../FalseButton/FalseButton";
import { useAppSelector } from "../../redux/hooks";

interface Props {
  data: {
    bookings: IBooking[];
  };
}

const AllBookings = ({ data }: Props) => {
  const bookings = data?.bookings;
  const router = useRouter();

  const { user } = useAppSelector((state) => state.auth);

  const [modalBookingId, setModalBookingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [deleteBooking, { error, isLoading, isSuccess }] =
    useDeleteBookingMutation();

  const deleteBookingHandler = async (id: string) => {
    try {
      await deleteBooking(id);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleDeleteModal = (id: string) => {
    setModalBookingId(id);
    setIsModalOpen(true);
  };

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
      toast.success("Booking deleted");
    }
  }, [error, isSuccess, router]);

  const setBookings = () => {
    const data: { columns: any[]; rows: any[] } = {
      columns: [
        {
          label: <div className={styles.theadContainer}>Reservation ID</div>,
          field: "id",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Date Booked</div>,
          field: "datebooked",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Check In</div>,
          field: "checkin",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Check Out</div>,
          field: "checkout",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Subtotal</div>,
          field: "amountpaid",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Tax</div>,
          field: "tax",
          sort: "asc",
        },
        {
          label: <div className={styles.theadContainer}>Amonut Paid</div>,
          field: "amountPaid",
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

    const addedPaymentInfoIds: Set<string> = new Set(); // To track added paymentInfo IDs

    bookings
      ?.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .forEach((booking) => {
        if (!addedPaymentInfoIds.has(booking.paymentInfo.id)) {
          data?.rows?.push({
            id: booking._id, // Use paymentInfo ID as the unique identifier
            datebooked: formatDate(booking.createdAt),
            checkin: formatDate(booking?.checkInDate),
            checkout: formatDate(booking?.checkOutDate),
            amountpaid: `$${booking?.amountPaid?.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
            tax: `$${(booking?.amountPaid === 0.5
              ? booking?.amountPaid * 0
              : booking?.amountPaid * 0.15
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
            amountPaid: `$${(booking?.amountPaid === 0.5
              ? booking?.amountPaid + 0
              : booking?.amountPaid + booking?.amountPaid * 0.15
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
            actions: (
              <div className={styles.actions}>
                <Link href={`/bookings/${booking._id}`} className={styles.link}>
                  <i className='fa fa-eye'></i>
                </Link>
                <Link href={`/bookings/invoice/${booking._id}`}>
                  <i className='fa fa-receipt'></i>
                </Link>

                <div className={styles.trash}>
                  <i
                    className='fa fa-trash'
                    onClick={() => handleDeleteModal(booking._id)}
                  ></i>
                </div>
              </div>
            ),
          });
          addedPaymentInfoIds.add(booking.paymentInfo.id); // Add the paymentInfo ID to the Set
        }
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
          {/* {bookings?.length > 1
            ? bookings?.length / 2 + " Bookings"
            : bookings?.length + " Bookings"} */}
          Bookings
        </h2>
      </div>
      <MDBDataTable
        data={setBookings()}
        className={styles.dataTable}
      />
      <Modal
        isOpen={isModalOpen && modalBookingId !== null}
        onClose={() => {
          setIsModalOpen(false);
          setModalBookingId(null);
        }}
      >
        <p>Are you sure you want to delete booking? This can not be undone.</p>
        <div className={styles.btnContainer}>
          <FalseButton
            btnType='secondary'
            text={isLoading ? "Deleting..." : "Delete Booking"}
            onClick={() => deleteBookingHandler(modalBookingId!)}
            disabled={isLoading}
          />
          <FalseButton
            btnType='primary'
            text='Cancel'
            onClick={() => {
              setIsModalOpen(false);
              setModalBookingId(null);
            }}
          />
        </div>
      </Modal>
    </div>
  );
};
export default AllBookings;
