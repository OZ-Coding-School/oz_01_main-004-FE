import FoodIngredient from "../../components/category/foodingredient";
import FoodType from "../../components/category/foodtype";
import SelectBox from "../../components/selectbox/selectbox";
import styles from "./index.module.css";
import PostList from "./postlist/postlist";
import QueryStringDropdown from "./querystring/querystringdropdown";
import QueryTagButton from "./querystring/querytagbutton";

export default function Community() {
  const sortOptions = [
    { label: "최신순", value: "newest" },
    { label: "인기순", value: "popular" },
  ];

  return (
    // <Router>
    <div className={styles.maincontainer}>
      <h1>찾을 음식을 선택해 보세요</h1>
      <div className={styles.categoryBox}>
        <QueryStringDropdown
          selectFood="food_type"
          selectoption={FoodType}
          defaultLabel="종류별"
        />
        <QueryStringDropdown
          selectFood="food_ingredient"
          selectoption={FoodIngredient}
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
        <PostList />
      </div>
    </div>
    // </Router>
  );
}
