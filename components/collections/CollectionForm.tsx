"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./CollectionForm.module.css";
import FalseButton from "../FalseButton/FalseButton";
import ImageUpload from "../ImageUpload/ImageUpload";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "../Button/Button";

interface CollectionFormProps {
  initialData?: any | null;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      title: "",
      description: "",
      image: "",
    },
  });

  const watchedImages = watch("image");

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const res = await fetch("/api/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success("Collection Created");
        router.push("/admin/dashboard/collections");
      } else {
        throw new Error("Failed to create collection");
      }
    } catch (err) {
      console.log("[collections_POST]", err);
      toast.error("Something went wrong, please try again.");
      setLoading(false);
    }
  };

  const handleImageChange = (url: string) => {
    setValue("image", url);
  };

  const handleImageRemove = () => {
    setValue("image", ""); 
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        {initialData ? "Edit Collection" : "Create Collection"}
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
            placeholder='Collection Title'
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 2,
                message: "Title must be at least 2 characters",
              },
              maxLength: {
                value: 20,
                message: "Title must be at most 20 characters",
              },
            })}
          />
          {/* {errors.title && (
            <p className={styles.error}>{errors.title.message}</p>
          )} */}
        </div>
        <div className={styles.labelInputBox}>
          <label htmlFor='description' className={styles.label}>
            Description
          </label>
          <textarea
            className={styles.textarea}
            id='description'
            rows={5}
            placeholder='Collection Description'
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
          />
          {/* {errors.description && (
            <p className={styles.error}>{errors.description.message}</p>
          )} */}
        </div>
        <div className={styles.labelInputBox}>
          {/* <label htmlFor='image'>Image</label> */}
          <ImageUpload
            value={getValues("image")}
            onChange={handleImageChange}
            onRemove={handleImageRemove}
          />
          {/* {errors.image && (
            <p className={styles.error}>{errors.image.message}</p>
          )} */}
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
            href='/admin/dashboard/collections'
          />
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;
