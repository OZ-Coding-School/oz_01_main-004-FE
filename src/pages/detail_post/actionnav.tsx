import { useState } from "react";
import { CgMoreVerticalO } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../api/axios";
import styles from "./actionnav.module.css";

export default function ActionNav() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();

  //   const closeDropdown = () => setIsOpen(false);

  //   const dropdownRef = useOutsideRef(closeDropdown);
  const handleModifyClick = async () => {
    navigate(`/writePost/modify/${id}/`);
  };

  const handleDeleteClick = async () => {
    try {
      const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
      if (!confirmDelete) return;

      await instance.delete(`recipes/detail/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      console.log("Recipe deleted successfully");
      navigate("/");
    } catch (error) {
      console.error("delete error", error);
    }
  };

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
          <li onClick={() => handleModifyClick}>수정</li>
          <li onClick={() => handleDeleteClick}>삭제</li>
        </ul>
      )}
    </div>
  );
}
