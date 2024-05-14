"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter } from "next/navigation";
import {
  useLazyUpdateSessionQuery,
  useUploadAvatarMutation,
} from "../../redux/api/userApi";
import { setUser } from "../../redux/features/userSlice";
import toast from "react-hot-toast";
import Image from "next/image";
import styles from "./UploadAvatar.module.css";
import FalseButton from "../FalseButton/FalseButton";
import ContentPadding from "../ContentPadding/ContentPadding";

const UploadAvatar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [uploadAvatar, { isLoading, error, isSuccess }] =
    useUploadAvatarMutation();

  const [updateSession, { data }] = useLazyUpdateSessionQuery();

  if (data) dispatch(setUser(data?.user));

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    "/images/default_avatar.jpg"
  );

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user?.avatar) {
      setAvatarPreview(user?.avatar.url);
    }
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      //@ts-ignore
      updateSession();
      router.refresh();
      toast.success("Successfully updated profile avatar");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, error, isSuccess]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { avatar };

    uploadAvatar(userData);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files || []);

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result as string);
        setAvatarPreview(reader.result as string);
      }
    };

    reader.readAsDataURL(files[0]);
  };

  return (
    <ContentPadding>
      <h2 className={styles.heading}>Update Profile Picture</h2>
      <form className={styles.container} onSubmit={submitHandler}>
        <div className='form-group'>
          <div className={styles.box}>
            <div className={styles.avatarContainer}>
              <Image
                src={avatarPreview}
                className={styles.img}
                alt='image'
                fill
              />
            </div>
            <div className={styles.lableInputBox}>
              <label className='form-label' htmlFor='customFile'>
                Choose a new Avatar
              </label>
              <input
                type='file'
                name='avatar'
                className='form-control'
                id='customFile'
                accept='images/*'
                onChange={onChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <FalseButton
            btnType='secondary'
            text={isLoading ? "Loading..." : "Upload"}
            disabled={isLoading}
          />
        </div>
      </form>
    </ContentPadding>
  );
};
export default UploadAvatar;
