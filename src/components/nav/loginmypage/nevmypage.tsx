import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { Link } from "react-router-dom";
import useOutsideRef from "../../../hooks/useoutsideref";
import styles from "./nevmypage.module.css";

const NevMypage = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  //외부 클릭하면 드롭다운 닫는 함수임
  const closeDropdown = () => setIsOpen(false);

  //훅 사용 외부클릭 감지 하면 closeDropdown 실행
  const dropdownRef = useOutsideRef(closeDropdown);

  const nickname = localStorage.getItem("nickname");
  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)}>
        {nickname}
        <TiArrowSortedDown />
      </button>
      {isOpen && (
        <ul>
          <li>
            <Link to="/mypage" className={styles.link}>
              마이페이지
            </Link>
          </li>
          <li>
            <button {...props}>로그아웃</button>
          </li>
        </ul>
      )}
    </div>
  );
};
export default NevMypage;
