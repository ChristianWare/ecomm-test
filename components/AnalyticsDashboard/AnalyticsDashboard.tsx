import { analytics } from "../../utils/analytics";

import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import ReactCountryFlag from "react-country-flag";
import styles from "./AnalyticsDashboard.module.css";

interface AnalyticsDashboardProps {
  avgVisitorsPerDay: string;
  amtVisitorsToday: number;
  timeseriesPageviews: Awaited<ReturnType<typeof analytics.retrieveDays>>;
  topCountries: [string, number][];
}

const Badge = ({ percentage }: { percentage: number }) => {
  const isPositive = percentage > 0;
  const isNeutral = percentage === 0;
  const isNegative = percentage < 0;

  if (isNaN(percentage)) return null;

  return (
    <span className={styles.badge}>
      {isPositive ? <ArrowUpRight className={styles.arrow} /> : null}
      {isNeutral ? <ArrowRight className={styles.arrow} /> : null}
      {isNegative ? <ArrowDownRight className={styles.arrow} /> : null}
      {percentage.toFixed(0)}%
    </span>
  );
};

const AnalyticsDashboard = ({
  avgVisitorsPerDay,
  amtVisitorsToday,
  topCountries,
}: AnalyticsDashboardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.stats}>
        <div className={styles.statContainer}>
          <span className={styles.title}>Avg. visitors/day:</span>
          <p className={styles.stat}>{avgVisitorsPerDay}</p>
        </div>
        <div className={styles.statContainer}>
          <span className={styles.title}>Visitors today:</span>
          <p className={styles.stat}>{amtVisitorsToday}</p>
        </div>
      </div>
      <div className={styles.statsii}>
        <div className={styles.statContainer}>
          <span className={styles.title}>This weeks top visitors:</span>
          {topCountries?.map(([countryCode, number]) => {
            return (
              <div key={countryCode} className=''>
                <p className=''>{countryCode}</p>
                <ReactCountryFlag svg countryCode={countryCode} />
                <p className=''>{number}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default AnalyticsDashboard;
