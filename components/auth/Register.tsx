"use client";

import { useRegisterMutation } from "../../redux/api/authApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import ButtonLoader from "../layout/ButtonLoader";
import styles from "./Login.module.css";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import ContentPadding from "../ContentPadding/ContentPadding";
import FalseButton from "../FalseButton/FalseButton";
import Button from "../Button/Button";
import { useForm, SubmitHandler } from "react-hook-form";

type RegisterInputs = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>();
  const router = useRouter();
  const [registerUser, { isLoading, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error?.data?.errMessage);
    }

    if (isSuccess) {
      router.push("/login");
      toast.success("Account Registered. You can login now");
    }
  }, [error, isSuccess, router]);

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    if (data.name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }
    await registerUser(data);
  };

  return (
    <LayoutWrapper>
      <ContentPadding>
        <h1 className={styles.heading}>New User Register</h1>
        <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.lableInputBox}>
            <label htmlFor='name_field' className='form-label'>
              Full Name
            </label>
            <input
              type='text'
              id='name_field'
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              disabled={isLoading}
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>

          <div className={styles.lableInputBox}>
            <label className='form-label' htmlFor='email_field'>
              Email
            </label>
            <input
              type='email'
              id='email_field'
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              disabled={isLoading}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          <div className={styles.lableInputBox}>
            <label className='form-label' htmlFor='password_field'>
              Password
            </label>
            <input
              type='password'
              id='password_field'
              {...register("password", { required: "Password is required" })}
              disabled={isLoading}
            />
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>

          <div className={styles.btnContainer}>
            <FalseButton
              btnType='primaryii'
              text={isLoading ? "Loading..." : "Register"}
            />
            <Button btnType='primary' text='Login' href='/login' />
          </div>
        </form>
      </ContentPadding>
    </LayoutWrapper>
  );
};
export default Register;
