import { useState } from "react";
import LikeList from "./likelist/likelist";
import MyPost from "./mypost/mypost";
import MyProfile from "./myprofile/my_profile";

export default function MyPage() {
  const [selectTab, setSelectTab] = useState(1);
  const SelectedComponent = () => {
    switch (selectTab) {
      case 1:
        return <MyPost />;
      case 2:
        return <LikeList />;
      case 3:
        return <MyProfile />;
      default:
        return 1;
    }
  };

  return (
    <div>
      내 페이지임.
      <div>
        <button
          onClick={() => {
            setSelectTab(1);
          }}
        >
          작성한 글
        </button>
        <button
          onClick={() => {
            setSelectTab(2);
          }}
        >
          찜한 목록
        </button>
        <button
          onClick={() => {
            setSelectTab(3);
          }}
        >
          내 프로필
        </button>
      </div>
      {/* 선택된 숫자에 따라 해당하는 컴포넌트를 렌더링합니다. */}
      {selectTab && SelectedComponent()}
      <div></div>
    </div>
  );
}
