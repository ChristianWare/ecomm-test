"use client";

import { useState } from "react";
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
    setError,
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

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };
  

  const onSubmit = async (values: any) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/collections/${initialData._id}`
        : "/api/collections";
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
        toast.success(`Collection ${initialData ? "updated" : "created"}`);
        router.push("/admin/dashboard/collections");
      } else if (
        res.status === 400 &&
        data.error === "Collection with that name already exists"
      ) {
        setError("title", {
          type: "manual",
          message: "Collection with that name already exists",
        });
      } else {
        throw new Error(data.error || "Failed to create collection");
      }
    } catch (err) {
      console.log("[collections_POST]", err);
      setError("form", {
        type: "manual",
        message: "Something went wrong, please try again.",
      });
      setLoading(false);
    }
  };

  const imageValue = watch("image");

  const handleImageChange = (url: string) => {
    setValue("image", url);
  };

  const handleImageRemove = () => {
    setValue("image", "");
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
            onKeyDown={handleKeyPress}
          />
          {renderError(errors.description?.message)}
        </div>
        <div className={styles.labelInputBox}>
          {/* <label htmlFor='image'>Image</label> */}
          <ImageUpload
            value={imageValue}
            onChange={handleImageChange}
            onRemove={handleImageRemove}
          />
          {renderError(errors.image?.message)}
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
