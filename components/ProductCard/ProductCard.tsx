import Image from "next/image";
import styles from "./ProductCard.module.css";
import Link from "next/link";
import Button from "../Button/Button";
import Heart from "../../public/icons/heart.svg";

const ProductCard = ({ product }: { product: ProductType }) => {
  return (
    <div>
      <Link href={`/products/${product._id}`} className={styles.imgContainer}>
        <Image
          src={product.media[0]}
          alt='product'
          fill
          className={styles.img}
        />
      </Link>
      <h3>{product.title}</h3>
      <p>{product.category}</p>
      <div className={styles.bottom}>
        <p>${product.price}</p>
        {/* <Button btnType='primaryii' text='buy now' /> */}
        <Heart width={30} height={30} className={styles.icon} />
      </div>
    </div>
  );
};
export default ProductCard;
