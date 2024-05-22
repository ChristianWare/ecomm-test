import { useState, useRef } from "react";
import { CldUploadWidget } from "next-cloudinary";
import FalseButton from "../FalseButton/FalseButton";
import Image from "next/image";
import styles from "./ImageUpload.module.css";
import Trash from "../../public/icons/trash.svg";
import Person from "../../public/images/default_avatar.jpg";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  multiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  multiple = false,
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const dragImageRef = useRef<HTMLDivElement>(null);

  const onUpload = (result: any) => {
    const newUrl = result.info.secure_url;
    if (multiple) {
      onChange([...value, newUrl]);
    } else {
      onChange([newUrl]);
    }
  };

  const handleUploadClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    open: () => void
  ) => {
    e.preventDefault();
    open();
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    setDraggedIndex(index);

    // Set a custom drag image or disable it
    if (dragImageRef.current) {
      e.dataTransfer.setDragImage(dragImageRef.current, 0, 0);
    }

    // Add the dragging class to the body
    document.body.classList.add(styles.dragging);
  };

  const handleDragOver = (index: number) => {
    if (draggedIndex === null) return;
    if (index === draggedIndex) return;

    const newValue = [...value];
    const [draggedItem] = newValue.splice(draggedIndex, 1);
    newValue.splice(index, 0, draggedItem);

    setDraggedIndex(index);
    onChange(newValue);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    // Remove the dragging class from the body
    document.body.classList.remove(styles.dragging);
  };

  return (
    <div>
      <div className={styles.imageBox}>
        {multiple &&
          value.map((url, index) => (
            <div
              key={url}
              className={styles.imgContainer}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={() => handleDragOver(index)}
              onDragEnd={handleDragEnd}
            >
              <Image
                src={url || Person}
                alt='image'
                layout='fill'
                className={styles.img}
              />
              <Trash
                width={35}
                height={35}
                className={styles.icon}
                onClick={() => onRemove(url)}
              />
            </div>
          ))}

        {value.length === 1 && (
          <div className={styles.imgContainer}>
            <Image
              src={value[0] || Person}
              alt='image'
              layout='fill'
              className={styles.img}
            />
            <Trash
              width={35}
              height={35}
              className={styles.icon}
              onClick={() => onRemove(value[0])}
            />
          </div>
        )}
      </div>
      <CldUploadWidget uploadPreset='kqmegwb6' onUpload={onUpload}>
        {({ open }) => (
          <div className={styles.btnContainer}>
            <FalseButton
              text={
                value.length
                  ? multiple
                    ? "+ Add Image(s)"
                    : "Change Image"
                  : "+ Upload Image"
              }
              btnType='primaryii'
              onClick={(e) => handleUploadClick(e, open)}
            />
          </div>
        )}
      </CldUploadWidget>
      {/* Hidden div used to set a custom drag image */}
      <div ref={dragImageRef} style={{ display: "none" }} />
    </div>
  );
};

export default ImageUpload;
