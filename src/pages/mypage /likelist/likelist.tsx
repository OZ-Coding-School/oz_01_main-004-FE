import styles from "./likelist.module.css";
// import MealGrid from "../../../components/mealgrid/mealgrid";
import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../../../api/axios";
import { Recipe } from "../../../components/mealgrid/type";
import Postcard from "../../../components/postcard/postcard";
import useFavoriteStatus from "../../../hooks/use_favoriestatus";

const LikeList: React.FC = () => {
  const [likeList, setLikeList] = useState<Recipe[]>([]);
  const { favoriteStates } = useFavoriteStatus();
  const fetchLikeList = async () => {
    try {
      const response = await instance.get("/favorite/list/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      const data = response.data;

      if (data && data.favorite_list) {
        const updatedLikeList = data.favorite_list.map((innerArray: any) => ({
          ...innerArray.recipe,
          is_favorite: true,
        }));

        setLikeList(updatedLikeList);
      }
    } catch (error) {
      console.error("Error fetching like list:", error);
    }
  };

  useEffect(() => {
    fetchLikeList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <PostGrid>
          {likeList.map((recipe) => (
            <Postcard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favoriteStates[recipe.id] || false}
            />
          ))}
        </PostGrid>
      </div>
    </div>
  );
};

const PostGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: flex-start;
`;

export default LikeList;
