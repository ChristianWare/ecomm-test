import styles from './Dashboard.module.css'

export const metadata = {
  title: "Dashboard - Admin || BookIT",
  description: "This is the description for the home page of this application.",
};

const DashboardPage = async () => {
  return (
    <>
      <h1 className={styles.heading}>dashboard page</h1>
    </>
  );
};
export default DashboardPage;
