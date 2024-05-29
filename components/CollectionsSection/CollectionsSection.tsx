import Link from "next/link";
import styles from "./CollectionsSection.module.css";
import { getCollections } from "@/lib/actions";
import Image from "next/image";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import ContentPadding from "../ContentPadding/ContentPadding";

const CollectionsSection = async () => {
  const collections = await getCollections();

  return (
    <LayoutWrapper>
      <ContentPadding>
        <h2 className={styles.heading}>Collections</h2>
        <div className={styles.collectionContainer}>
          {collections.map((collection: CollectionType) => (
            <div key={collection._id}>
              <Link
                href={`/collections/${collection._id}`}
                className={styles.imgContainer}
              >
                <Image
                  src={collection.image}
                  alt={collection.title}
                  fill
                  className={styles.img}
                />
              </Link>
              <div className={styles.title}>{collection.title}</div>
            </div>
          ))}
        </div>
      </ContentPadding>
    </LayoutWrapper>
  );
};
export default CollectionsSection;
