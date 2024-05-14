import Image from "next/image";
import styles from "./BlogPreview.module.css";
import { BlogPreviewProps } from "../../lib/interface";
import { FC } from "react";
import Link from "next/link";
import Button from "../Button/Button";

const BlogPreview: FC<BlogPreviewProps> = ({ mapData, key }) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Link href={`/blog/${mapData.slug}`}>
            <Image
              src={mapData.meta.thumbnaillUrl}
              alt='image'
              fill
              className={styles.img}
            />
          </Link>
        </div>
      </div>
      <div className={styles.right}>
        <h3 className={styles.title}>{mapData.meta.title}</h3>
        <span className={styles.perDay}>{mapData.meta.date}</span>
        <div className={styles.feature}>{mapData.meta.description}</div>
      </div>
      <div className={styles.btnContainer}>
        <Button
          text='Read Article'
          btnType='secondary'
          href={`/blog/${mapData.slug}`}
        />
      </div>
    </div>
  );
};
export default BlogPreview;
