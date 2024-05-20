"use client";

import { useState } from "react";
import styles from "./MultiText.module.css";
import Close from "../../public/icons/close.svg";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string[]) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = (item: string) => {
    if (item && !value.includes(item)) {
      onChange([...value, item]);
      setInputValue("");
    }
  };

  const removeTag = (item: string) => {
    onChange(value.filter((tag) => tag !== item));
  };

  return (
    <>
      <div className={styles.labelInputBox}>
        <input
          className={styles.input}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag(inputValue);
            }
          }}
        />
      </div>
      <div className={styles.tagContainer}>
        {value.map((tag, index) => (
          <span key={index} className={styles.tag}>
            {tag}
            <button
              type='button'
              onClick={() => removeTag(tag)}
              className={styles.tagCloseBtn}
            >
              <Close width={25} height={25} className={styles.icon} />
            </button>
          </span>
        ))}
      </div>
    </>
  );
};
export default MultiText;
