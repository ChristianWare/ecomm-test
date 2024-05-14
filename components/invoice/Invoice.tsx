"use client";

import { IBooking } from "../../backend/models/booking";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import ContentPadding from "../ContentPadding/ContentPadding";
import styles from "./Invoice.module.css";
import FalseButton from "../FalseButton/FalseButton";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";

interface Props {
  data: {
    booking: IBooking;
  };
}

const Invoice = ({ data }: Props) => {
  const booking = data?.booking;

  const [tax, setTax] = useState(0);

  const { user } = useAppSelector((state) => state.auth);

  const amountPaid = booking?.amountPaid || 0;

  let calculatedTax = 0;
  if (user?.role !== "admin") {
    calculatedTax = amountPaid * 0.15;
  }

  const formatDate = (date: any) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleDownload = () => {
    const input = document.getElementById("booking_invoice");

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("/image/png");

        const pdf = new jsPDF();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        pdf.addImage(imgData, 0, 0, pdfWidth, 0);
        pdf.save(`invoice_${booking?._id}.pdf`);
      });
    }
  };

  return (
    <LayoutWrapper>
      <ContentPadding>
        <div>
          <div className={styles.btnContainer}>
            <FalseButton
              btnType='secondary'
              text='Download Invoice'
              onClick={handleDownload}
            />
          </div>
          <div>
            <div id='booking_invoice'>
              <div className={styles.top}>
                <div className={styles.left}>
                  <div className={styles.logo}>Elite Retreat Rentals</div>
                </div>
                <div className={styles.right}>
                  <h1 className={styles.heading}>Invoice</h1>
                  <div className={styles.categorySpanContainer}>
                    <div className={styles.category}>Invoice Number:</div>
                    <span>{booking?._id}</span>
                  </div>
                  <div className={styles.categorySpanContainer}>
                    <div className={styles.category}>Date:</div>
                    <span>{formatDate(booking.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className={styles.middle}>
                <div className={styles.middleLeft}>
                  <b>Bill To:</b>
                  <div>{booking?.user.name}</div>
                  <div>{booking?.user.email}</div>
                  <br />
                  <b>Status:</b>
                  <div className={styles.status}>
                    {booking?.paymentInfo?.status?.toUpperCase()}
                  </div>
                  <br />
                  <b>Check In Date:</b>
                  <div>{formatDate(booking?.checkInDate)}</div>
                  <br />
                  <b>Check Out Date:</b>
                  <div>{formatDate(booking?.checkOutDate)}</div>
                </div>
                <div className={styles.middleRight}>
                  <b>Bill From:</b>
                  <div>Elite Retreat Rentals</div>
                  <div>
                    455 Foggy Heights,
                    <br />
                    AZ 85004, US
                  </div>
                  <br />
                  <b>Phone:</b>
                  <div>(602) 519-0450</div>
                  <br />
                  <b>Email:</b>
                  <div>info@eliteretreatrentals.com</div>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.bottomTop}>
                  <div className={styles.btl}>
                    <b>Property</b>
                  </div>
                  <div className={styles.btr}>
                    <b>Cost per Day</b>
                    <b>Days</b>
                    <b>Price</b>
                  </div>
                </div>
                <div className={styles.bottomBottom}>
                  <div className={styles.bbl}>
                    <b>{booking?.room?.name}</b>
                  </div>
                  <div className={styles.bbr}>
                    <div>
                      $
                      {booking?.room?.pricePerNight.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                    <div>{booking?.daysOfStay}</div>
                    <div>
                      {" "}
                      $
                      {booking?.amountPaid?.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>
                <div className={styles.bottomBottom2}>
                  <div className={styles.bbl2}></div>
                  <div className={styles.bbr2}>
                    <div className={styles.box}>
                      <div>Subtotal</div>
                      <div>
                        {" "}
                        $
                        {booking?.amountPaid?.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                    <div className={styles.box}>
                      <div>Tax</div>
                      <div>
                        $
                        {calculatedTax.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                    <div className={styles.box}>
                      <div>Invoice Total</div>
                      <div>
                        $
                        {(amountPaid + calculatedTax).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                    <div className={styles.box}>
                      <div>Paid</div>
                      <div>
                        $
                        {(
                          (booking?.amountPaid || 0) +
                          (user?.role === "admin" ? 0 : calculatedTax)
                        ).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                    <div className={styles.amntDue}>
                      <b>Amount Due</b>
                      <b>$0.00</b>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <div className={styles.notice}>
                  <b>NOTICE:</b>
                  <div>
                    A finance charge of 1.5% will be made on unpaid balances
                    after 30 days.
                  </div>
                  <footer className={styles.footer}>
                    Invoice was created on a computer and is valid without the
                    signature.
                  </footer>
                </div>
              </div>
              <main>
                <div></div>
              </main>
            </div>
          </div>
        </div>
      </ContentPadding>
    </LayoutWrapper>
  );
};
export default Invoice;
