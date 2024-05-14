import styles from "./SalesStats.module.css";

interface Props {
  data: {
    totalSales: number;
    numberOfBookings: string;
  };
}

const SalesStats = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.box}>
          <i
            className='fas fa-dollar-sign fa-4x'
            style={{ color: "#7065f0" }}
          ></i>
          <div>
            <p>Sales:</p>
            <p>
              <b>
                {(data?.totalSales / 2).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </b>
            </p>
          </div>
        </div>
        <div className={styles.box}>
          <i
            className='fas fa-file-invoice fa-4x'
            style={{ color: "#7065f0" }}
          ></i>

          <div>
            <p>Bookings:</p>
            <p>
              <b>{Math.floor(parseFloat(data?.numberOfBookings) / 2)}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SalesStats;
