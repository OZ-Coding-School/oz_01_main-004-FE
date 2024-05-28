import { useEffect, useState } from "react";
import { BiBowlRice, BiSolidBowlRice } from "react-icons/bi";
import styled from "styled-components";
import instance from "../../../api/axios";

interface FavoriteProps {
  id: number;
  isFavoriteInitially?: boolean;
  onClick?: (isFavorite: boolean) => void;
}

const Favorite = ({
  id,
  isFavoriteInitially = false,
  onClick,
}: FavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitially);

  useEffect(() => {
    setIsFavorite(isFavoriteInitially);
  }, [isFavoriteInitially]);

  const mountLike = async () => {
    try {
      const response = await instance.post(
        `favorite/detail/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      alert(response.data.message);
    } catch (error) {
      console.error("찜하기 실패", error);
    }
  };

  //찜하기 삭제
  const unMountLike = async () => {
    try {
      const response = await instance.delete(`favorite/detail/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("찜하기 실패", error);
    }
  };

  const handleClick = async () => {
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
  color: #747474;
  width: 28px;
  height: 28px;
`;
