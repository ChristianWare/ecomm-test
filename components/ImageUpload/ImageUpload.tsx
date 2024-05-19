import { CldUploadWidget } from "next-cloudinary";
import FalseButton from "../FalseButton/FalseButton";
import Image from "next/image";
import styles from "./ImageUpload.module.css";
import Trash from "../../public/icons/trash.svg";

interface ImageUploadProps {
  value: string | string[];
  onChange: (value: string) => void;
  onRemove: (value?: string) => void;
  multiple?: boolean; // Add a new prop to indicate if multiple images are allowed
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  multiple = false,
}) => {
  const onSuccess = (result: any) => {
    const newUrl = result.info.secure_url;
    onChange(newUrl);
  };

  const handleUploadClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    open: () => void
  ) => {
    e.preventDefault();
    open();
  };

  return (
    <div>
      <div>
        {multiple && Array.isArray(value)
          ? value.map((url) => (
              <div key={url} className={styles.imgContainer}>
                <Image
                  src={url}
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
            ))
          : typeof value === "string" && (
              <div className={styles.imgContainer}>
                <Image
                  src={value}
                  alt='image'
                  layout='fill'
                  className={styles.img}
                />
                <Trash
                  width={35}
                  height={35}
                  className={styles.icon}
                  onClick={() => onRemove(value)}
                />
              </div>
            )}
      </div>
      <CldUploadWidget uploadPreset='kqmegwb6' onSuccess={onSuccess}>
        {({ open }) => (
          <div className={styles.btnContainer}>
            <FalseButton
              text={
                value
                  ? multiple
                    ? "Add Image"
                    : "Change Image"
                  : "+ Upload Image"
              }
              btnType='primaryii'
              onClick={(e) => handleUploadClick(e, open)}
            />
          </div>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
