import { useEffect, useState } from "react";
import { BiBowlRice } from "react-icons/bi";
import instance from "../../api/axios";
import useFavoriteStatus from "../../hooks/use_favoriestatus";
import styles from "./index.module.css";

interface FavoriteButtonProps {
  recipeId: number;
  writerUserId: string;
  myUserId: string | null;
}

const FavoriteButton = ({
  recipeId,
  writerUserId,
  myUserId,
}: FavoriteButtonProps) => {
  const { favoriteStates } = useFavoriteStatus();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (favoriteStates && favoriteStates[recipeId] !== undefined) {
      setIsFavorite(favoriteStates[recipeId]);
    }
  }, [favoriteStates, recipeId]);

  const mountLike = async () => {
    if (writerUserId === myUserId) {
      alert("내가 작성한 게시물은 찜할 수 없습니다.");
      return;
    }
    try {
      await instance.post(`favorite/detail/${recipeId}/`);
      alert("냠냠 찜하기 완료!");
      setIsFavorite(true);
    } catch (error) {
      alert("이미 찜했습니다!");
    }
  };

  const unMountLike = async () => {
    try {
      await instance.delete(`favorite/detail/${recipeId}/`);
      alert("찜하기 삭제 완료!");
      setIsFavorite(false);
    } catch (error) {
      console.error("찜하기 삭제 실패!", error);
    }
  };

  return (
    <div className={styles.likeBox}>
      <BiBowlRice style={{ width: "16px", height: "16px" }} />
      {isFavorite ? (
        <button className={styles.pickButton} onClick={unMountLike}>
          찜하기 취소
        </button>
      ) : (
        <button className={styles.pickButton} onClick={mountLike}>
          찜하기
        </button>
      )}
    </div>
  );
};

export default FavoriteButton;
