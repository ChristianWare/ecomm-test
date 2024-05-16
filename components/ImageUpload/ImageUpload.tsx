import { CldUploadWidget } from "next-cloudinary";
import FalseButton from "../FalseButton/FalseButton";
import Image from "next/image";
import styles from "./ImageUpload.module.css";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const onSuccess = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div>
        {value.map((url) => (
          <div key={url} className={styles.imgContainer}>
            <Image
              src={url}
              alt='collection'
              layout='fill'
              className={styles.img}
            />
            <FalseButton
              text='Remove Image'
              btnType='danger'
              onClick={() => onRemove()}
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset='kqmegwb6' onSuccess={onSuccess}>
        {({ open }) => {
          return (
            <div className={styles.btnContainer}>
              <FalseButton
                text={value.length ? "Change Image" : "+ Upload Image"}
                btnType='primaryii'
                onClick={() => open()}
              />
            </div>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
export default ImageUpload;
