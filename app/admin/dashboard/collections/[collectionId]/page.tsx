"use client";

import CollectionForm from "@/components/collections/CollectionForm";
import { useState, useEffect } from "react";

type CollectionType = {
  id: string;
  name: string;
  description: string;
  items: any[];
};

const CollectionDetailsPage = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);

  const getCollectionDetails = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch collection details");
      }
      const data = await res.json();
      setCollectionDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[collectionId_GET]", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCollectionDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* <h1>{loading ? "Loading..." : "Collection Details Page"}</h1> */}
      {!loading && <CollectionForm initialData={collectionDetails} />}
    </div>
  );
};
export default CollectionDetailsPage;
