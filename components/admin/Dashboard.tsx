"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalesStats from "./SalesStats";
import { SalesChart } from "../charts/SalesCharts";
// import { TopPerformingChart } from "../charts/TopPerforming";
import { useLazyGetSalesStatsQuery } from "../../redux/api/bookingApi";
import toast from "react-hot-toast";
import Loading from "../../app/loading";
import styles from "./Dashboard.module.css";
import FalseButton from "../FalseButton/FalseButton";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [getSalesStats, { error, data, isLoading }] =
    useLazyGetSalesStatsQuery();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (startDate && endDate && !data) {
      getSalesStats({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });
    }
  }, [data, endDate, error, getSalesStats, startDate]);

  const submitHandler = () => {
    getSalesStats({
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  if (!data) return <Loading />;

  return (
    <div>
      <div className={styles.dates}>
        <div className={styles.dateContainer}>
          <label htmlFor=''>Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className={styles.datePicker}
          />
        </div>
        <div className={styles.dateContainer}>
          <label htmlFor=''>End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date: any) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className={styles.datePicker}
          />
        </div>
        <div className={styles.btnContainer}>
          <FalseButton
            btnType='secondary'
            text={isLoading ? "Loading..." : "Get data"}
            disabled={isLoading}
            onClick={submitHandler}
          />
        </div>
      </div>
      <SalesStats data={data} />

      <div>
        <div>
          <h4>Sales History</h4>
          <SalesChart salesData={data?.sixMonthSalesData} />
        </div>

        {/* <div className='col-12 col-lg-4 text-center'>
          <h4 className='my-5'>Top Performing Rooms</h4>
          <TopPerformingChart />
        </div> */}
      </div>
    </div>
  );
};
export default Dashboard;
