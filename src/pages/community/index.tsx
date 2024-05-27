import { useEffect, useState } from "react";
import instance from "../../api/axios";
import SelectBox from "../../components/selectbox/selectbox";
import { FoodIngredients, FoodTypes } from "./fooddata.api";
import styles from "./index.module.css";
import PostList from "./postlist/postlist";
import { RecipeResponse } from "./postlist/recipelist.type";
import QueryStringDropdown from "./querystring/querystringdropdown";
import QueryTagButton from "./querystring/querytagbutton";

export default function Community() {
  const sortOptions = [{ label: "최신순", value: "newest" }];

  const [foodType, setfoodType] = useState([]);
  const [foodIngredient, setfoodIngredient] = useState([]);
  const [recipes, setRecipes] = useState<RecipeResponse | null>(null);

  const count = recipes?.count || 0;

  const RecipeData = async () => {
    try {
      const response = await instance.get("recipes/list/");

      setRecipes(response.data);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    const FoodData = async () => {
      try {
        const foodTypes = await FoodTypes();
        setfoodType(foodTypes);
        const foodIngredients = await FoodIngredients();
        setfoodIngredient(foodIngredients);

        RecipeData();
      } catch (error) {
        console.error("Error:", error);
      }
    };
    FoodData();
  }, []);

  return (
    <div className={styles.maincontainer}>
      <h1>찾을 음식을 선택해 보세요</h1>
      <div className={styles.categoryBox}>
        <QueryStringDropdown
          selectFood="food_type"
          selectoption={foodType}
          defaultLabel="종류별"
        />
        <QueryStringDropdown
          selectFood="food_ingredient"
          selectoption={foodIngredient}
          defaultLabel="재료별"
        />
      </div>
      <div className={styles.filtercontainer}>
        <QueryTagButton />
        <div className={styles.selectBox}>
          <SelectBox options={sortOptions} />
        </div>
      </div>
      <div>
        <p>
          총 <span>{count}</span>개의 레시피가 있습니다.
        </p>
      </div>
      <div className={styles.postList}>
        <PostList />
      </div>
      <div></div>
    </div>
  );
}
