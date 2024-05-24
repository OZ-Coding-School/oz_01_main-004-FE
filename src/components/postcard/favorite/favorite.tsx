import { useState } from "react";
import { BiBowlRice, BiSolidBowlRice } from "react-icons/bi";
import styled from "styled-components";

const Favorite = ({ isFavoriteInitially = false, onClick }: any) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitially);

  const handleClick = () => {
    setIsFavorite(!isFavorite);
    if (onClick) {
      onClick(!isFavorite);
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
  width: 32px;
  height: 32px;
`;

const StyledBowlRice = styled(BiBowlRice)`
  color: #747474;
  width: 32px;
  height: 32px;
`;
