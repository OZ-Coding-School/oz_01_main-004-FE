import { useEffect, useState } from "react";
import { BiBowlRice, BiSolidBowlRice } from "react-icons/bi";
import styled from "styled-components";
import instance from "../../../api/axios";

interface FavoriteProps {
  id: number;
  authorId: number; // 작성자 ID를 위한 새로운 속성
  isFavoriteInitially?: boolean;
  onClick?: (isFavorite: boolean) => void;
}

const Favorite = ({
  id,
  authorId, // 작성자 ID를 가져옵니다
  isFavoriteInitially = false,
  onClick,
}: FavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitially);
  const currentUserId = parseInt(localStorage.getItem("id") || "0"); // 현재 로그인된 사용자 ID를 가져옵니다

  useEffect(() => {
    setIsFavorite(isFavoriteInitially);
  }, [isFavoriteInitially]);

  const mountLike = async () => {
    try {
      await instance.post(
        `favorite/detail/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      alert("냠냠 찜하기 완료!");
    } catch (error) {
      console.error("찜하기 실패", error);
      setIsFavorite(false);
    }
  };

  const unMountLike = async () => {
    try {
      await instance.delete(`favorite/detail/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      alert("찜 삭제 완료!");
    } catch (error) {
      console.error("찜하기 실패", error);
      setIsFavorite(true);
    }
  };

  const handleClick = async () => {
    if (currentUserId === authorId) {
      alert("내가 작성한 게시물은 찜할 수 없습니다.");
      return;
    }

    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    if (onClick) {
      onClick(newFavoriteState);
    }

    if (newFavoriteState) {
      await mountLike();
    } else {
      await unMountLike();
    }
  };

  return (
    <Div
      className="favorite"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {isFavorite ? <StyledFavorite /> : <StyledBowlRice />}
    </Div>
  );
};

export default Favorite;

const Div = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgba(255, 255, 255, 0.7);
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;

const StyledFavorite = styled(BiSolidBowlRice)`
  color: #ff5454;
  width: 28px;
  height: 28px;
`;

const StyledBowlRice = styled(BiBowlRice)`
  color: #999999;
  width: 28px;
  height: 28px;
`;
