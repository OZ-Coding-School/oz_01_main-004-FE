import { useState } from "react";
import styles from "./tagbutton.module.css";

interface TagButtonProps {
  tags: string[];
  onSelect: (tag: string | null) => void; // 선택된 태그를 처리하는 함수
}

const TagButton = ({ tags, onSelect }: TagButtonProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (value: string) => {
    const newValue = selected === value ? null : value;
    setSelected(newValue);
    onSelect(newValue);
  };

  return (
    <div className={styles.container}>
      {tags.map((item) => (
        <button
          key={item}
          className={`${styles.button} ${
            selected === item ? styles.clickbutton : styles.basebutton
          }`}
          onClick={(e) => {
            e.preventDefault();
            handleClick(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default TagButton;
