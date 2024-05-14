/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useRegisterMutation } from "../../redux/api/authApi";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";
import styles from "./Login.module.css";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import ContentPadding from "../ContentPadding/ContentPadding";
import FalseButton from "../FalseButton/FalseButton";
import Button from "../Button/Button";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const router = useRouter();

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      router.push("/login");
      toast.success("Account Registered. You can login now");
    }
  }, [error, isSuccess]);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      password,
    };

    if (name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    if (isSuccess) {
      router.push("/login");
      toast.success("Account Registered. You can login now");
    }

    register(userData);
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <LayoutWrapper>
      <ContentPadding>
        <h1 className={styles.heading}>New User Register</h1>
        <form className={styles.container} onSubmit={submitHandler}>
          <div className={styles.lableInputBox}>
            <label htmlFor='name_field' className='form-label'>
              {" "}
              Full Name{" "}
            </label>
            <input
              type='text'
              id='name_field'
              name='name'
              value={name}
              onChange={onChange}
            />
          </div>

          <div className={styles.lableInputBox}>
            <label className='form-label' htmlFor='email_field'>
              {" "}
              Email{" "}
            </label>
            <input
              type='email'
              id='email_field'
              name='email'
              value={email}
              onChange={onChange}
            />
          </div>

          <div className={styles.lableInputBox}>
            <label className='form-label' htmlFor='password_field'>
              {" "}
              Password{" "}
            </label>
            <input
              type='password'
              id='password_field'
              name='password'
              value={password}
              onChange={onChange}
              disabled={isLoading}
            />
          </div>
          <div className={styles.btnContainer}>
            <FalseButton btnType='secondary' text='Register' />
            <Button btnType='primary' text='Login' href='/login' />
          </div>
        </form>
      </ContentPadding>
    </LayoutWrapper>
  );
};
export default Register;
