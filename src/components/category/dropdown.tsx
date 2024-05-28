import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import useOutsideRef from "../../hooks/use_outsideref";
import styles from "./dropdown.module.css";

interface DropdownProps {
  options: { id: number; name: string; img: string }[];
  defaultLabel: string;
  onSelect?: (item: { id: number; name: string; img: string }) => void;
}

const Dropdown = ({
  options,
  defaultLabel,
  onSelect = () => {},
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(defaultLabel);

  const handleSelect = (item: { id: number; name: string; img: string }) => {
    setSelected(item.name);
    onSelect(item); // 부모 컴포넌트로 값(데이터)을 전달할 수 있음!
    setIsOpen(false);
  };
  //외부 클릭하면 드롭다운 닫는 함수임
  const closeDropdown = () => setIsOpen(false);

  //훅 사용 외부클릭 감지 하면 closeDropdown 실행
  const dropdownRef = useOutsideRef(closeDropdown);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.preventDefault(); // 기본 동작 막기
          setIsOpen(!isOpen);
        }}
      >
        {selected}
        <BsChevronDown />
      </button>
      {isOpen && (
        <ul>
          {options.map((item) => (
            <li key={item.id}>
              <button onClick={() => handleSelect(item)}>
                <img src={item.img} alt={item.name} />
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
