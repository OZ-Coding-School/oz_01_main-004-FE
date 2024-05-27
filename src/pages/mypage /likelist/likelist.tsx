import styles from "./likelist.module.css";
import MealGrid from "../../../components/mealgrid/mealgrid";
import { useEffect, useState } from "react";
import instance from "../../../api/axios";
import { Recipe } from "../../../components/mealgrid/type";

const LikeList: React.FC = () => {
  const [likeList, setLikeList] = useState<Recipe[]>([]);

  const fetchLikeList = async () => {
    try {
      const response = await instance.get("/favorite/list/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      console.log(response.data, "응답확인");
      const data = response.data;

      if (data && data.favorite_list) {
        const updatedLikeList = data.favorite_list.map((innerArray: any) => ({
          ...innerArray.recipe,
          is_favorite: true,
        }));

        setLikeList(updatedLikeList);
        console.log(data.favorite_list, "여기favorite_list");
      }
    } catch (error) {
      console.error("Error fetching like list:", error);
    }
  };

  useEffect(() => {
    fetchLikeList();
  }, []);

  return (
    // <div className={styles.container}>
    //   {likeList.map((item) => (
    //     <StyledLink key={item.id} to={`/detailPost/${item.id}`}>
    //       <div className={styles.grid}>
    //         <MealGrid meals={likeList} />
    //       </div>
    //     </StyledLink>
    //   ))}
    // </div>

    <div className={styles.container}>
      <div className={styles.grid}>
        <MealGrid meals={likeList} />
      </div>
    </div>
  );
};

export default LikeList;
