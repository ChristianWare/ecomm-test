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

  return (
    <div>
      <div className={styles.imageBox}>
        {multiple &&
          value.map((url) => (
            <div key={url} className={styles.imgContainer}>
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
    </div>
  );
};

export default ImageUpload;
