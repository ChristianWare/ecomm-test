import Button from "@/components/Button/Button";
import styles from "../Dashboard.module.css";

const ProductsPage = () => {
  return (
    <div>
      <h1 className={styles.heading}>Products Page</h1>
      <Button
        btnType='primaryii'
        href='/admin/dashboard/products/new'
        text='+ New Product'
      />
    </div>
  );
};
export default ProductsPage;
