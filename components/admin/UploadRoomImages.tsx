"use client";

import { IImage, IRoom } from "../../backend/models/room";
import { revalidateTag } from "../../helpers/revalidate";
import {
  useDeleteRoomImageMutation,
  useUploadRoomImagesMutation,
} from "../../redux/api/roomApi";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import styles from "./UploadRoomImages.module.css";
import FalseButton from "../FalseButton/FalseButton";
import Close from "../../public/icons/close.svg";

interface Props {
  data: {
    room: IRoom;
  };
}

const UploadRoomImages = ({ data }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [uploadImages, setUploadImages] = useState<IImage[]>([]);

  useEffect(() => {
    if (data) {
      setUploadImages(data?.room?.images);
    }
  }, [data]);

  const router = useRouter();

  const [uploadRoomImages, { error, isLoading, isSuccess }] =
    useUploadRoomImagesMutation();

  const [
    deleteRoomImage,
    {
      error: deleteError,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteRoomImageMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      revalidateTag("RoomDetails");
      setImagesPreview([]);
      router.refresh();
      toast.success("Images uploaded");
      // router.push("/admin/rooms");
    }
  }, [error, isSuccess, router]);

  useEffect(() => {
    if (deleteError && "data" in deleteError) {
      toast.error(deleteError?.data?.errMessage);
    }

    if (isDeleteSuccess) {
      revalidateTag("RoomDetails");
      router.refresh();
      toast.success("Image deleted");
    }
  }, [deleteError, isDeleteSuccess, router]);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files || []);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result as string]);
          setImagesPreview((oldArray) => [
            ...oldArray,
            reader.result as string,
          ]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const submitHandler = () => {
    uploadRoomImages({ id: data?.room?._id, body: { images } });
  };

  const removeImagePreview = (imgUrl: string) => {
    const filteredImagesPreview = imagesPreview.filter((img) => img != imgUrl);

    setImagesPreview(filteredImagesPreview);
    setImages(filteredImagesPreview);
  };

  const handleImageDelete = (imgId: string) => {
    deleteRoomImage({ id: data?.room?._id, body: { imgId } });
  };

  const handleResetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div>
      <form className={styles.container}>
        <h2 className={styles.heading}>Upload Room Images</h2>
        <div className={styles.lableInputBox}>
          <label htmlFor='customFile' className='form-label'>
            Choose New Images
          </label>
          <input
            ref={fileInputRef}
            type='file'
            name='product_images'
            id='customFile'
            onChange={onChange}
            onClick={handleResetFileInput}
            multiple
            required
          />

          {imagesPreview?.length > 0 && (
            <div>
              <span className={styles.msg}>New Images:</span>
              <div className={styles.newImageGrid}>
                {imagesPreview?.map((img, index) => (
                  <div key={index}>
                    <div className={styles.imgContainer}>
                      <Image
                        src={img}
                        alt='Image Preview'
                        className={styles.img}
                        fill
                      />
                    </div>
                    <button
                      type='button'
                      onClick={() => removeImagePreview(img)}
                      className={styles.closeBtn}
                    >
                      <Close width={30} height={30} />
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.btnContainer}>
                <FalseButton
                  btnType='secondary'
                  text={isLoading ? "Uploading..." : "Upload"}
                  onClick={submitHandler}
                  disabled={isLoading || isDeleteLoading}
                />
              </div>
            </div>
          )}

          {uploadImages?.length > 0 && (
            <div className={styles.imgGridContainer}>
              <span>Current Images:</span>
              <div className={styles.imageGrid}>
                {uploadImages?.map((img, index) => (
                  <div key={index}>
                    <div className={styles.imgContainer}>
                      <Image
                        src={img?.url}
                        alt={img?.url}
                        className={styles.img}
                        fill
                      />
                    </div>
                    <button
                      onClick={() => handleImageDelete(img.public_id)}
                      disabled={isDeleteLoading || isLoading}
                      className={styles.closeBtn}
                    >
                      <Close width={30} height={30} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* <button
          id='register_button'
          type='submit'
          className='btn form-btn w-100 py-2'
          onClick={submitHandler}
          disabled={isLoading || isDeleteLoading}
        >
          {isLoading ? <ButtonLoader /> : "Upload"}
        </button> */}
        {/* <div className={styles.btnContainer}>
          <FalseButton
            btnType='secondary'
            text={isLoading ? "Uploading..." : "Upload"}
            onClick={submitHandler}
            disabled={isLoading || isDeleteLoading}
          />
        </div> */}
      </form>
    </div>
  );
};
export default UploadRoomImages;
