"use client";

import CategoryForm from "@/components/CategoryForm/CategoryForm";
import { useState, useEffect } from "react";

type CategoryType = {
  _id: string;
  title: string;
  description: string;
};

const CategoryDetailsPage = ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [categoryDetails, setCategoryDetails] = useState<CategoryType | null>(
    null
  );

  const getCategoryDetails = async () => {
    try {
      const res = await fetch(`/api/categories/${params.categoryId}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch category details");
      }
      const data = await res.json();
      setCategoryDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[categoryId_GET]", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.categoryId) {
      getCategoryDetails();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.categoryId]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CategoryForm initialData={categoryDetails} />
      )}
    </div>
  );
};

export default CategoryDetailsPage;
