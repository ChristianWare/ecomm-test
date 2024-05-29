import ContentPadding from "../ContentPadding/ContentPadding";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductsSection.module.css";
import { getProducts } from "@/lib/actions";

const ProductsSection = async () => {
  const products = await getProducts();

  return (
    <LayoutWrapper>
      <ContentPadding>
        <h2 className={styles.heading}>Products</h2>
        <div className={styles.productContainer}>
          {products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </ContentPadding>
    </LayoutWrapper>
  );
};
export default ProductsSection;
