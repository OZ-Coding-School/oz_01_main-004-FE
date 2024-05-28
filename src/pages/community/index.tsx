import { useEffect, useState } from "react";
import SelectBox from "../../components/selectbox/selectbox";
import { FoodIngredients, FoodTypes } from "./fooddata.api";
import styles from "./index.module.css";
import PostList from "./postlist/postlist";
// import RePostList from "./postlist/postlist";
import QueryStringDropdown from "./querystring/querystringdropdown";
import QueryTagButton from "./querystring/querytagbutton";

export default function Community() {
  const sortOptions = [{ label: "최신순", value: "newest" }];

  const [foodType, setfoodType] = useState([]);
  const [foodIngredient, setfoodIngredient] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0); // 필터링된 레시피 개수 상태

  useEffect(() => {
    const FoodData = async () => {
      try {
        // 병렬로 데이터를 가져옴
        const [foodTypes, foodIngredients] = await Promise.all([
          FoodTypes(),
          FoodIngredients(),
        ]);
        setfoodType(foodTypes);
        setfoodIngredient(foodIngredients);
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
          총 <span>{filteredCount}</span>개의 레시피가 있습니다.
        </p>
      </div>
      <div className={styles.postList}>
        <PostList setFilteredCount={setFilteredCount} />
      </div>
      <div></div>
    </div>
  );
}
