"use client";

import { IBooking } from "../../backend/models/booking";
import { MDBDataTable } from "mdbreact";
import Link from "next/link";
import styles from "./MyBookings.module.css";

interface Props {
  data: {
    bookings: IBooking[];
  };
}

const MyBookings = ({ data }: Props) => {
  const bookings = data?.bookings;

  const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

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

    const addedPaymentInfoIds: Set<string> = new Set();

    bookings
      ?.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .forEach((booking) => {
        if (!addedPaymentInfoIds.has(booking.paymentInfo.id)) {
          // const tax = (booking.amountPaid || 0) * 0.15;
          // const amountWithTax = (booking.amountPaid || 0) + tax;

          data?.rows?.push({
            id: booking._id,
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
                <Link
                  href={`/bookings/${booking._id}`}
                  className='btn btn-primary'
                >
                  <i className='fa fa-eye'></i>
                </Link>
                <Link
                  href={`/bookings/invoice/${booking._id}`}
                  className='btn btn-success ms-2'
                >
                  <i className='fa fa-receipt'></i>
                </Link>
              </div>
            ),
          });
          addedPaymentInfoIds.add(booking.paymentInfo.id);
        }
      });

    return data;
  };

  return (
    <div>
      <h1>My Bookings</h1>
      <MDBDataTable data={setBookings()} className={styles.dataTable} />
    </div>
  );
};
export default MyBookings;
