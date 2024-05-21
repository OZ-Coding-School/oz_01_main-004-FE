import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../api/axios";
import { UserContext } from "../../context/authuser";
import { UserContextType } from "../../type/user";
import styles from "./index.module.css";
import LikeList from "./likelist/likelist";
import MyPost from "./mypost/mypost";
import Myprofile from "./myprofile/myprofile";

export default function MyPage() {
  const [selectTab, setSelectTab] = useState(1);
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext) as UserContextType;
  const [isLogin] = useState<boolean>(userInfo?.access ? true : false);
  const logout = () => {
    try {
      const refresh = localStorage.getItem("refresh");
      instance.post("users/sign-out/", { refresh });
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("nickname");
      localStorage.removeItem("id");
      setUserInfo(null);
      navigate("/");
    } catch (error) {
      alert("실패");
    }
  };

  const SelectedComponent = () => {
    switch (selectTab) {
      case 1:
        return <Myprofile />;
      case 2:
        return <LikeList />;
      case 3:
        return <MyPost />;
      default:
        return 1;
    }
  };

  async function handleDelete(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      instance
        .delete("users/detail/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        })
        .then(() => {
          localStorage.removeItem("access");
          alert("그동안 이용해주셔서 감사합니다.");
          logout();
          navigate("/");
        })
        .catch((err) => alert(err.response.data.message));
    } else {
      alert("요청이 안감");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerLeft}>
        <MypageBtn
          className={`${styles.mypageButton} ${
            selectTab === 1 ? "active" : ""
          }`}
          onClick={() => setSelectTab(1)}
        >
          내 프로필
        </MypageBtn>
        <MypageBtn
          className={`${styles.mypageButton} ${
            selectTab === 2 ? "active" : ""
          }`}
          onClick={() => setSelectTab(2)}
        >
          찜한 목록
        </MypageBtn>
        <MypageBtn
          className={`${styles.mypageButton} ${
            selectTab === 3 ? "active" : ""
          }`}
          onClick={() => setSelectTab(3)}
        >
          작성한 글
        </MypageBtn>
        <button className={styles.leaveBtn} onClick={handleDelete}>
          회원탈퇴
        </button>
      </div>
      <div className={styles.containerRight}>
        {/* 선택된 숫자에 따라 해당하는 컴포넌트를 렌더링합니다. */}
        {selectTab && SelectedComponent()}
      </div>
    </div>
  );
}

const MypageBtn = styled.button`
  width: 100px;
  border: 0;
  background-color: transparent;
  margin: 25px 0 0 150px;
  font-size: 1rem;
  cursor: pointer;

  &:active,
  &:focus,
  &.active {
    font-weight: 700;
  }
`;
