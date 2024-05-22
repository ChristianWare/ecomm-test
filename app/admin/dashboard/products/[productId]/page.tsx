"use client";

import ProductForm from "@/components/ProductForm/ProductForm";
import { ProductType } from "@/interfaces";
import { useEffect, useState } from "react";

const ProductDetails = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );

  const getProductDetails = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch collection details");
      }
      const data = await res.json();
      setProductDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[productId_GET]", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{!loading && <ProductForm initialData={productDetails} />}</div>;
};
export default ProductDetails;
