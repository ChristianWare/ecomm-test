import Button from "@/components/Button/Button";
import styles from "../Dashboard.module.css";

const CollectionsPage = () => {
  return (
    <div>
      <h1 className={styles.heading}>Collections Page</h1>
      <Button
        btnType='primaryii'
        href='/admin/dashboard/collections/new'
        text='+ New Collection'
      />
    </div>
  );
};
export default CollectionsPage;
