import { useState } from "react";
import styled from "styled-components";
import styles from "./index.module.css";
import LikeList from "./likelist/likelist";
import MyPost from "./mypost/mypost";
import Myprofile from "./myprofile/myprofile";

export default function MyPage() {
  const [selectTab, setSelectTab] = useState(1);

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
        <button className={styles.leaveBtn}>회원탈퇴</button>
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
