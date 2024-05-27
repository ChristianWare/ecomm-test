import styles from "./CollectionsSection.module.css";
import { getCollections } from "@/lib/actions";

const CollectionsSection = async () => {
  const collections = await getCollections();
  console.log(collections)

  return (
    <div>
      <h2>Collections Section</h2>
    </div>
  );
};
export default CollectionsSection;
