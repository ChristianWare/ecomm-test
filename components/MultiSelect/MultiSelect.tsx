"use client";

import { useState } from "react";
import styles from "./MultiSelect.module.css";
import { CollectionType } from "@/interfaces";
import Close from "../../public/icons/close.svg";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: CollectionType[];
  onChange: (value: CollectionType) => void;
  onRemove: (value: CollectionType) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const selectables = collections.filter(
    (collection) => !value.includes(collection)
  );

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    const collection = collections.find((col) => col._id === id);
    if (collection && !value.some((val) => val._id === id)) {
      onChange(collection);
    }
    setInputValue("");
  };

  const handleRemove = (collection: CollectionType) => {
    onRemove(collection);
  };

  return (
    <>
      <div className={styles.labelInputBox}>
        <select
          className={styles.input}
          value={inputValue}
          onChange={handleSelect}
          onFocus={() => setInputValue("")} // Clear input value on focus
        >
          <option value='' disabled>
            {placeholder}
          </option>
          {selectables.map((collection) => (
            <option key={collection._id} value={collection._id}>
              {collection.title}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.badgeContainer}>
        {value.map((collection) => (
          <span key={collection._id} className={styles.badge}>
            {collection.title}
            <button
              type='button'
              className={styles.badgeCloseBtn}
              onClick={() => handleRemove(collection)}
            >
              <Close width={25} height={25} className={styles.icon} />
            </button>
          </span>
        ))}
      </div>
    </>
  );
};

export default MultiSelect;
