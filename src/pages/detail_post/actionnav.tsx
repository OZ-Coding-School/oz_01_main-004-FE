import { useState } from "react";
import { CgMoreVerticalO } from "react-icons/cg";
import styles from "./actionnav.module.css";

export default function ActionNav() {
  const [isOpen, setIsOpen] = useState(false);

  //   const closeDropdown = () => setIsOpen(false);

  //   const dropdownRef = useOutsideRef(closeDropdown);

  return (
    <div className={styles.container}>
      <button
        style={{ border: "none", background: "none" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <CgMoreVerticalO size={18} />
      </button>
      {isOpen && (
        <ul>
          <li>수정</li>
          <li>삭제</li>
        </ul>
      )}
    </div>
  );
}
