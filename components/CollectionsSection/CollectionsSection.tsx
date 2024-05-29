import Link from "next/link";
import styles from "./CollectionsSection.module.css";
import { getCollections } from "@/lib/actions";

const CollectionsSection = async () => {
  const collections = await getCollections();

  return (
    <div>
      <h2>Collections Section</h2>
      <div>
        {collections.map((collection: CollectionType, index: number) => (
          <Link href={`/collections/${collection._id}`}></Link>
        ))}
      </div>
    </div>
  );
};
export default CollectionsSection;
