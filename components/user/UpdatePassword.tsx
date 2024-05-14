"use client";

import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./UpdatePassword.module.css";
import ContentPadding from "../ContentPadding/ContentPadding";
import FalseButton from "../FalseButton/FalseButton";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const router = useRouter();

  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      toast.success("Password updated");
      console.log("new password:", password);
      console.log("old password:", oldPassword);
      router.refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isSuccess]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwords = { password, oldPassword };

    updatePassword(passwords);
  };

  return (
      <ContentPadding>
        <h2 className={styles.heading}>Change Password</h2>

        <form className={styles.container} onSubmit={submitHandler}>
          <div className={styles.lableInputBox}>
            <label className='form-label' htmlFor='old_password_field'>
              Old Password
            </label>
            <input
              type='password'
              id='old_password_field'
              className='form-control'
              name='oldPassword'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className={styles.lableInputBox}>
            <label className='form-label' htmlFor='new_password_field'>
              New Password
            </label>
            <input
              type='password'
              id='new_password_field'
              className='form-control'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* <button
            type='submit'
            className='btn form-btn w-100 py-2'
            disabled={isLoading}
          >
            {isLoading ? <ButtonLoader /> : "Set Password"}
          </button> */}
          <div className={styles.btnContainer}>
            <FalseButton
              btnType='secondary'
              text={isLoading ? "Loading..." : "Set Password"}
            />
          </div>
        </form>
      </ContentPadding>
  );
};
export default UpdatePassword;
