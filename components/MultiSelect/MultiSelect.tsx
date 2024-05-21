"use client";

import { useState } from "react";
import styles from "./MultiSelect.module.css";
import { CollectionType } from "@/interfaces";

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
  const [open, setOpen] = useState(false);

  const selectables = collections.filter(
    (collection) => !value.includes(collection)
  );

  const handleSelect = (id: string) => {
    const collection = collections.find((col) => col._id === id);
    if (collection) {
      onChange(collection);
    }
    setInputValue("");
    setOpen(false);
  };

  const handleRemove = (collection: CollectionType) => {
    onRemove(collection);
  };

  return (
    <div className={styles.multiSelectContainer}>
      <div className={styles.inputContainer}>
        {value.map((collection) => (
          <span key={collection._id} className={styles.badge}>
            {collection.title}
            <button
              type='button'
              className={styles.removeButton}
              onClick={() => handleRemove(collection)}
            >
              x
            </button>
          </span>
        ))}
        <div className={styles.labelInputBox}>
          <input
            className={styles.input}
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
          />
        </div>
      </div>
      {open && (
        <div className={styles.dropdown}>
          {selectables.map((collection) => (
            <div
              key={collection._id}
              className={styles.dropdownItem}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(collection._id)}
            >
              {collection.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
