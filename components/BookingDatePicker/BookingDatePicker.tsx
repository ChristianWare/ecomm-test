"use client";

import { IRoom } from "../../backend/models/room";
import { calculateDaysOfStay } from "../../helpers/helpers";
import {
  useGetBookedDatesQuery,
  useLazyCheckBookingAvailabilityQuery,
  useLazyStripeCheckoutQuery,
  useNewBookingsMutation,
} from "../../redux/api/bookingApi";
import { useAppSelector } from "../../redux/hooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import styles from "./BookingDatePicker.module.css";

interface Props {
  room: IRoom;
}

const BookingDatePicker = ({ room }: Props) => {
  const [checkInDate, setCheckInDate] = useState<null | Date>(null);
  const [checkOutDate, setCheckOutDate] = useState<null | Date>(null);
  const [daysOfStay, setDaysOfStay] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  const [tax, setTax] = useState(0);
  const [amountDue, setAmountDue] = useState(0);

  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [newBooking] = useNewBookingsMutation();

  const [checkBookingAvailability, { data }] =
    useLazyCheckBookingAvailabilityQuery();

  const isAvailable = data?.isAvailable;

  const { data: { bookedDates: dates } = {} } = useGetBookedDatesQuery(
    room._id
  );

  const excludeDates = dates?.map((date: string) => new Date(date)) || [];

  const onChange = (dates: Date[]) => {
    const [checkInDate, checkOutDate] = dates;

    setCheckInDate(checkInDate);
    setCheckOutDate(checkOutDate);

    if (checkInDate && checkOutDate) {
      const days = calculateDaysOfStay(checkInDate, checkOutDate);
      const totalCost = room.pricePerNight * days;

      let calculatedTax = 0;
      if (user?.role !== "admin") {
        calculatedTax = totalCost * 0.15; // 15% tax for non-admin users
      }

      const amount = user?.role === "admin" ? 0.5 : totalCost;
      const amountWithTax = amount + calculatedTax;

      setDaysOfStay(days);
      setTotalCost(totalCost);
      setTax(calculatedTax);
      setAmountDue(amountWithTax);

      // check Booking Availability:
      checkBookingAvailability({
        id: room._id,
        checkInDate: checkInDate.toISOString(),
        checkOutDate: checkOutDate.toISOString(),
      });
    }
  };

  const [stripeCheckout, { error, isLoading, data: checkoutData }] =
    useLazyStripeCheckoutQuery();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (checkoutData) {
      router.replace(checkoutData?.url);
    }
  }, [error, checkoutData, router]);

  const bookRoom = () => {
    if (checkInDate && checkOutDate) {
      if (isAuthenticated) {
        const total = room.pricePerNight * daysOfStay;
        const tax = total * 0.15;
        const amount = user?.role === "admin" ? 0.5 : total + tax;

        const checkoutData = {
          checkInDate: checkInDate.toISOString(),
          checkOutDate: checkOutDate.toISOString(),
          daysOfStay,
          amount,
        };

        stripeCheckout({ id: room?._id, checkoutData });
      } else {
        toast.error("Login to book the room");
        router.push("/login");
      }
    } else {
      console.error("Check-in and check-out dates are required.");
    }
  };

  const clearDates = () => {
    setCheckInDate(null);
    setCheckOutDate(null);
  };

  const formatDate = (date: any) => {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const day = date.getDate();
    const dayStr = day.toString();
    const lastDigit = day % 10;

    let suffix = "th";
    if (day > 10 && day < 20) {
      suffix = "th"; // Special case for teens
    } else if (lastDigit === 1) {
      suffix = "st";
    } else if (lastDigit === 2) {
      suffix = "nd";
    } else if (lastDigit === 3) {
      suffix = "rd";
    }

    const formattedWithSuffix = formattedDate.replace(dayStr, dayStr + suffix);

    return formattedWithSuffix;
  };

  return (
    <div className={styles.container}>
      <DatePicker
        selected={checkInDate}
        onChange={onChange}
        startDate={checkInDate}
        endDate={checkOutDate}
        minDate={new Date()}
        excludeDates={excludeDates}
        selectsRange
        inline
      />

      {isAvailable === true && checkInDate && checkOutDate && (
        <>
          <div className={styles.available}>Room is available. Book now.</div>
          <br />
          <div className={styles.info}>
            <div className={styles.box}>
              <b>Length of stay: </b>
              {daysOfStay} {daysOfStay === 1 ? "day" : "days"}
            </div>
            <div className={styles.box}>
              <b>Check-In:</b> {formatDate(checkInDate)} @ 10:00 AM
            </div>
            <div className={styles.box}>
              <b>Check-Out:</b> {formatDate(checkOutDate)} @ 3:00 PM
            </div>

            <div className={styles.box}>
              <b>Subtotal:</b> $
              {user?.role === "admin"
                ? "0.50"
                : totalCost.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
            </div>
            <div className={styles.box}>
              <b>Tax (15%):</b> $
              {tax.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
            <div className={styles.box}>
              <b>Amount Due:</b> $
              {amountDue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
            </div>
          </div>
        </>
      )}
      {isAvailable === false && (
        <div className={styles.notAvailable}>
          Room not available. Try different dates.
        </div>
      )}

      {isAvailable && !isAuthenticated && (
        <div className='alert alert-danger' my-3>
          Login to book room.
        </div>
      )}
      {checkInDate && checkOutDate && (
        <div className={styles.btnContainerii}>
          <button
            className={styles.btnii}
            onClick={clearDates}
            disabled={
              !checkInDate || !checkOutDate || !isAvailable || isLoading
            }
          >
            Clear Dates
          </button>
        </div>
      )}
      <div className={styles.btnContainer}>
        <button
          className={styles.btn}
          onClick={bookRoom}
          disabled={!checkInDate || !checkOutDate || !isAvailable || isLoading}
        >
          {isLoading
            ? "Loading..."
            : !checkInDate || !checkOutDate
            ? "Select Dates to Book"
            : "Book Now"}
        </button>
      </div>
    </div>
  );
};
export default BookingDatePicker;
