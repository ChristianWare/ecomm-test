"use client";

import { signOut, useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./Login.module.css";
import LayoutWrapper from "../LayoutWrapper/LayoutWrapper";
import ContentPadding from "../ContentPadding/ContentPadding";
import FalseButton from "../FalseButton/FalseButton";
import Button from "../Button/Button";
import Visibility from "../../public/icons/visibility.svg";
import { useForm, SubmitHandler } from "react-hook-form";

type LoginInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const { data: session } = useSession();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async ({ email, password }) => {
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Logged in Successfully!");
      router.replace("/");
    }
  };

  const logoutHandler = () => {
    signOut();
    toast.success("Logged Out");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <>
      <LayoutWrapper>
        <ContentPadding>
          <h1 className={styles.heading}>Login</h1>
          <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
            {session ? (
              <>
                <p>you are now logged in</p>
                <hr />
                <Link href='/' onClick={logoutHandler}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <div className={styles.lableInputBox}>
                  <label htmlFor='email_field'> Email </label>
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
                    disabled={loading}
                  />
                  {errors.email && (
                    <span className={styles.error}>{errors.email.message}</span>
                  )}
                </div>

                <div className={styles.lableInputBox}>
                  <label htmlFor='password_field'> Password </label>
                  <div className={styles.passwordWrapper}>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id='password_field'
                      {...register("password", {
                        required: "Password is required",
                      })}
                      disabled={loading}
                    />
                    <Visibility
                      className={styles.visibilityIcon}
                      onClick={togglePasswordVisibility}
                      width={25}
                      height={25}
                    />
                  </div>
                  {errors.password && (
                    <span className={styles.error}>
                      {errors.password.message}
                    </span>
                  )}
                </div>

                <div className={styles.btnContainer}>
                  <FalseButton
                    btnType='primaryii'
                    disabled={loading}
                    text={loading ? "Loading..." : "Login"}
                  />
                  <Button
                    btnType='primary'
                    text='Forgot password'
                    href='/password/forgot'
                  />
                </div>

                <div>
                  <span className={styles.newUser}>New User?</span>
                  <Link href='/register' className={styles.link}>
                    Register Here
                  </Link>
                </div>
              </>
            )}
          </form>
        </ContentPadding>
      </LayoutWrapper>
    </>
  );
};
export default Login;
