"use client";

import styles from "./FalseButton.module.css";

interface Props {
  text: any;
  btnType: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: any;
  type?: "button" | "submit" | "reset"; // Add type prop
}

const FalseButton = ({ text, btnType, onClick, disabled, type = "button" }: Props) => {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn} ${styles[btnType]}`}
        disabled={disabled}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};
export default FalseButton;
