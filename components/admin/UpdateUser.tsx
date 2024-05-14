"use client";

import { IUser } from "../../backend/models/user";
import { useUpdateUserMutation } from "../../redux/api/userApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ButtonLoader from "../layout/ButtonLoader";
import toast from "react-hot-toast";
import styles from "./UpdateUser.module.css";
import ContentPadding from "../ContentPadding/ContentPadding";
import FalseButton from "../FalseButton/FalseButton";

interface Props {
  data: {
    user: IUser;
  };
}

const UpdateUser = ({ data }: Props) => {
  const [name, setName] = useState(data?.user?.name);
  const [email, setEmail] = useState(data?.user?.email);
  const [role, setRole] = useState(data?.user?.role);

  const router = useRouter();

  const [updateUser, { error, isSuccess, isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      router.refresh();
      toast.success("User updated");
    }
  }, [error, isSuccess, router]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      role,
    };

    updateUser({ id: data?.user?._id, body: userData });
  };

  return (
    <>
      <ContentPadding>
        <h2 className={styles.heading}>Update User</h2>
        <form onSubmit={submitHandler} className={styles.container}>
          <div className={styles.lableInputBox}>
            <label htmlFor='name_field'>Name</label>
            <input
              type='text'
              id='name_field'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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
              required
            />
          </div>

          <div className={styles.lableInputBox}>
            <label htmlFor='role_field'>Role</label>
            <select
              id='role_field'
              name='role'
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value='user'>user</option>
              <option value='admin'>admin</option>
            </select>
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
};
export default UpdateUser;
