import { CldUploadWidget } from "next-cloudinary";
import FalseButton from "../FalseButton/FalseButton";
import Image from "next/image";
import styles from "./ImageUpload.module.css";
import Trash from "../../public/icons/trash.svg";

interface ImageUploadProps {
  value: string[];
  onChange: (url: string) => void;
  onRemove: (url: string) => void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const onSuccess = (result: any) => {
    const newUrl = result.info.secure_url;
    onChange(newUrl);
  };

  return (
    <div>
      <div>
        {value.map((url, index) => (
          <div key={index} className={styles.imgContainer}>
            <Image
              src={url}
              alt='collection'
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
      </div>
      <CldUploadWidget uploadPreset='kqmegwb6' onSuccess={onSuccess}>
        {({ open }) => (
          <div className={styles.btnContainer}>
            <FalseButton
              text={value.length ? "Change Image" : "+ Upload Image"}
              btnType='primaryii'
              onClick={() => open()}
            />
          </div>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
