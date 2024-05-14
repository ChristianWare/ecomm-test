"use client";

import {
  useLazyUpdateSessionQuery,
  useUpdateProfileMutation,
} from "../../redux/api/userApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { setUser } from "../../redux/features/userSlice";
import ContentPadding from "../ContentPadding/ContentPadding";
import styles from "./UpdateProfile.module.css";
import FalseButton from "../FalseButton/FalseButton";

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [nameError, setNameError] = useState("");
  // const [emailError, setEmailError] = useState("");

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [updateProfile, { isLoading, isSuccess, error }] =
    useUpdateProfileMutation();

  const [updateSession, { data }] = useLazyUpdateSessionQuery();

  if (data) dispatch(setUser(data?.user));

  // console.log(data);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser?.name);
      setEmail(currentUser?.email);
    }

    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      //@ts-ignore
      updateSession();
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, error, isSuccess, router]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = { name, email };

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Invalid email format");
      return;
    }

    updateProfile(userData);
    toast.success("Successfully updated profile");
  };

  return (
      <>
        <ContentPadding>
          <h2 className={styles.heading}>Update Profile Name</h2>
          <form className={styles.container} onSubmit={submitHandler}>
            <div className={styles.lableInputBox}>
              <label htmlFor='name_field'>Name</label>
              <input
                type='text'
                id='name_field'
                name='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.lableInputBox}>
              <label htmlFor='email_field'>Email</label>
              <input
                type='email'
                id='email_field'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.btnContainer}>
              <FalseButton
                btnType='secondary'
                text={isLoading ? "Loading..." : "Update"}
              />
            </div>
          </form>
        </ContentPadding>
      </>
  );
  2;
};
export default UpdateProfile;
