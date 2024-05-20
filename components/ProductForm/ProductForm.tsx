"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./ProductForm.module.css";
import FalseButton from "../FalseButton/FalseButton";
import ImageUpload from "../ImageUpload/ImageUpload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import { ProductType, CollectionType } from "@/interfaces";
import MultiText from "../MultiText/MultiText";

interface ProductFormProps {
  initialData?: ProductType | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState<CollectionType[]>([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
      toast.error("Something went wrong! Please try again.");
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  const defaultValues: ProductType = initialData || {
    _id: "",
    title: "",
    description: "",
    media: [] as string[],
    category: "",
    collections: [] as CollectionType[],
    tags: [] as string[],
    sizes: [] as string[],
    colors: [] as string[],
    price: 0.1,
    expense: 0.1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: ProductType) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success(`Product ${initialData ? "updated" : "created"}`);
        router.push("/admin/dashboard/products");
      } else if (
        res.status === 400 &&
        data.error === "Product with that name already exists"
      ) {
        setError("title", {
          type: "manual",
          message: "Product with that name already exists",
        });
      } else {
        throw new Error(data.error || "Failed to create product");
      }
    } catch (err) {
      console.log("[products_POST]", err);
      setError("root", {
        type: "manual",
        message: "Something went wrong, please try again.",
      });
      setLoading(false);
    }
  };

  const imageValue = watch("media");
    const tagsValue = watch("tags");


  const handleImageChange = (url: string) => {
    setValue("media", [...imageValue, url]);
  };

  const handleImageRemove = (url?: string) => {
    if (url) {
      setValue(
        "media",
        imageValue.filter((image: string) => image !== url)
      );
    } else {
      setValue("media", []);
    }
  };

  const handleTagsChange = (tags: string[]) => {
    setValue("tags", tags);
  };

  const renderError = (error: any) => {
    if (typeof error === "string") {
      return <p className={styles.error}>{error}</p>;
    }
    return null;
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        {initialData ? "Edit Product" : "Create Product"}
      </h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.labelInputBox}>
          <label htmlFor='title_field' className={styles.label}>
            Title
          </label>
          <input
            className={styles.input}
            type='text'
            id='title_field'
            placeholder='Product Title'
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 2,
                message: "Title must be at least 2 characters",
              },
              maxLength: {
                value: 20,
                message: "Title too long, must be at most 20 characters",
              },
            })}
            onKeyDown={handleKeyPress}
          />
          {renderError(errors.title?.message)}
        </div>
        <div className={styles.labelInputBox}>
          <label htmlFor='description' className={styles.label}>
            Description
          </label>
          <textarea
            className={styles.textarea}
            id='description'
            rows={5}
            placeholder='Product Description'
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 2,
                message: "Description must be at least 2 characters",
              },
              maxLength: {
                value: 500,
                message: "Description must be at most 500 characters",
              },
            })}
            onKeyDown={handleKeyPress}
          />
          {renderError(errors.description?.message)}
        </div>
        <div className={styles.labelInputBox}>
          <label htmlFor='image' className={styles.label}>
            Media
          </label>
          <ImageUpload
            value={imageValue}
            onChange={handleImageChange}
            onRemove={handleImageRemove}
            multiple={true} // Indicate that this component handles multiple images
          />
          {renderError(errors.media?.message)}
        </div>
        <div className={styles.priceExpenseCategoryBox}>
          <div className={styles.labelInputBox}>
            <label htmlFor='price_field' className={styles.label}>
              Price ($)
            </label>
            <input
              className={styles.input}
              type='number'
              id='price_field'
              placeholder='Price'
              {...register("price", {
                required: "Price is required",
              })}
              onKeyDown={handleKeyPress}
            />
            {renderError(errors.price?.message)}
          </div>
          <div className={styles.labelInputBox}>
            <label htmlFor='expense_field' className={styles.label}>
              Expense ($)
            </label>
            <input
              className={styles.input}
              type='number'
              id='expense_field'
              placeholder='Expense'
              {...register("expense", {
                required: "Expense is required",
              })}
              onKeyDown={handleKeyPress}
            />
            {renderError(errors.expense?.message)}
          </div>
          <div className={styles.labelInputBox}>
            <label htmlFor='category_field' className={styles.label}>
              Category
            </label>
            <input
              className={styles.input}
              type='text'
              id='category_field'
              placeholder='Category'
              {...register("category", {
                required: "Category is required",
              })}
              onKeyDown={handleKeyPress}
            />
            {renderError(errors.category?.message)}
          </div>
        </div>
        <div className={styles.labelInputBox}>
          <label htmlFor='category_field' className={styles.label}>
            Tags
          </label>
          <MultiText
            placeholder='Tags'
            value={tagsValue}
            onChange={handleTagsChange}
          />
          {renderError(errors.category?.message)}
        </div>
        <div className={styles.btnContainer}>
          <FalseButton
            btnType='primaryii'
            text={loading ? "Submitting..." : "Submit"}
            disabled={loading} // Disable the button while submitting
          />
          <Button
            btnType='primaryii'
            text='Discard'
            href='/admin/dashboard/products'
          />
        </div>
        {renderError(errors.root?.message)}
      </form>
    </div>
  );
};

export default ProductForm;
