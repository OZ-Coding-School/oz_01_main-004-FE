import { useState } from "react";
import { IoEllipsisVerticalCircle } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import instance from "../../api/axios";
import useOutsideRef from "../../hooks/use_outsideref";
import styles from "./actionnav.module.css";

export default function ActionNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  const closeDropdown = () => setIsOpen(false);

  const dropdownRef = useOutsideRef(closeDropdown);

  const handleModifyClick = () => {
    const token = localStorage.getItem("access");
    if (!token) {
      console.error("not logged");
      return;
    }
    try {
      navigate(`/detailPost/modify/${id}/`);
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleDeleteClick = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      console.error("not logged");
      return;
    }

    try {
      const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
      if (!confirmDelete) return;

      await instance.delete(`recipes/detail/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (error) {
      console.error("delete error", error);
    }
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        style={{ border: "none", background: "none" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <OptionIcon />
      </button>
      {isOpen && (
        <ul>
          <li>
            <button onClick={handleModifyClick}>수정</button>
          </li>
          <li>
            <button onClick={handleDeleteClick}>삭제</button>
          </li>
        </ul>
      )}
    </div>
  );
}

const OptionIcon = styled(IoEllipsisVerticalCircle)`
  width: 24px;
  height: 24px;
  color: rgb(33, 38, 41);
`;
