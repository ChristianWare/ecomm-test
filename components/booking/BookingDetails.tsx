"use client";

import { IBooking } from "../../backend/models/booking";
import { useAppSelector } from "../../redux/hooks";
import Image from "next/image";
import styles from "./BookingDetails.module.css";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import ContentPadding from "../ContentPadding/ContentPadding";
import Button from "../Button/Button";
import FinalCTA1 from "../FinalCTA1/FinalCTA1";

interface Props {
  data: {
    booking: IBooking;
  };
}

const BookingDetails = ({ data }: Props) => {
  const booking = data?.booking;
  const { user } = useAppSelector((state) => state.auth);

  const isPaid = booking?.paymentInfo?.status === "paid" ? true : false;

  const calculateAmountWithTax = () => {
    const amountPaid = booking?.amountPaid || 0;
    const tax = user?.role === "admin" ? 0 : amountPaid * 0.15;
    return amountPaid + tax;
  };

  const amountWithTax = calculateAmountWithTax();

  const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <>
      <LayoutWrapper>
        <ContentPadding>
          <h1 className={styles.h1Heading}>Booking Details</h1>
          <div className={styles.top}>
            <h2 className={styles.heading}>
              Invoice #:
              <br />
            </h2>
            <h2 className={styles.headingii}>{booking?._id}</h2>
            <div className={styles.btnContainer}>
              <Button
                text='See Invoice'
                btnType='secondary'
                href={`/bookings/invoice/${booking?._id}`}
              />
            </div>
          </div>

          <div className={styles.infoBox}>
            <h3>User Info</h3>
            <div className={styles.categoreDetailBox}>
              <div className={styles.category}>Name:</div>
              <div className={styles.detail}>{booking?.user?.name}</div>
            </div>
            <div className={styles.categoreDetailBox}>
              <div className={styles.category}>Email:</div>
              <div className={styles.detail}>{booking?.user?.email}</div>
            </div>
            <div className={styles.categoreDetailBox}>
              <div className={styles.category}>Amount Paid:</div>
              <div className={styles.detail}>
                $
                {amountWithTax.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>

          <h4>Booked Room:</h4>

          <hr />

          {booking?.room ? (
            <div className={styles.bookedRooomDetails}>
              <div className={styles.imgContainer}>
                <Image
                  src={booking?.room?.images[0]?.url}
                  alt={booking?.room?.name}
                  className={styles.img}
                  fill
                />
              </div>

              <div></div>

              <div className={styles.category}>
                Price Per Night:{" "}
                <p>
                  $
                  {booking?.room?.pricePerNight.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className={styles.category}>
                Length of Stay:
                <p>{booking?.daysOfStay} Day(s)</p>
              </div>
              <div className={styles.categoreDetailBox}>
                <div className={styles.category}>Subtotal:</div>
                <div className={styles.detail}>
                  $
                  {booking?.amountPaid?.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
              <div className={styles.categoreDetailBox}>
                <div className={styles.category}>Tax:</div>
                <div className={styles.detail}>
                  {`$${(booking?.amountPaid === 0.5
                    ? 0
                    : booking?.amountPaid * 0.15
                  ).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`}
                </div>
              </div>
              <div className={styles.categoreDetailBox}>
                <div className={styles.category}>Amount Paid:</div>
                <div className={styles.detail}>
                  $
                  {amountWithTax.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
              </div>
              <div className={styles.categoreDetailBox}>
                <div className={styles.category}>Status:</div>
                <b className={isPaid ? "greenColor" : "redColor"}>
                  {isPaid ? "Paid" : "Not Paid"}
                </b>
              </div>
              {user?.role === "admin" && (
                <div className={styles.categoreDetailBox}>
                  <div className={styles.category}>Stripe ID:</div>

                  <b className='redColor'>{booking?.paymentInfo.id}</b>
                </div>
              )}
              <div className={styles.categoreDetailBox}>
                <div className={styles.category}>Check In:</div>
                <div>{formatDate(booking?.checkInDate)}</div>
              </div>
              <div className={styles.categoreDetailBox}>
                <div className={styles.category}>Check Out:</div>
                <div>{formatDate(booking?.checkOutDate)}</div>
              </div>
              <div className={styles.btnContainer}>
                <Button
                  text='Room details'
                  btnType='secondary'
                  href={`/properties/${booking?.room?._id}`}
                />
              </div>
            </div>
          ) : (
            <div>Room no longer exist</div>
          )}
          <hr />
        </ContentPadding>
      </LayoutWrapper>
      <FinalCTA1 />
    </>
  );
};

export default BookingDetails;
