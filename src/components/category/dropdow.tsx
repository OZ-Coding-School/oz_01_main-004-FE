import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import styles from "./dropdown.module.css";

interface DropdownProps {
  selectFood: string;
  selectoption: { id: string; name: string; img: string }[];
}

const Dropdown: React.FC<DropdownProps> = ({ selectFood, selectoption }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [selectedfoodType, setSelectedfoodType] = useState<string>(selectFood);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const onClickfoodType = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    setSelectedfoodType(value);
    toggleDropdown();
  };

  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown}>
        {selectedfoodType}
        <BsChevronDown />
      </button>
      {isDropdownOpen && (
        <ul>
          {selectoption.map((item) => (
            <li key={item.id}>
              <button value={item.name} onClick={onClickfoodType}>
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
