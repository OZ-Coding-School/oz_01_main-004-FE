import Dropdown from "../../components/category/dropdow";
import FoodIngredient from "../../components/category/foodingredient";
import FoodType from "../../components/category/foodtype";
import Mealgrid from "../../components/mealgrid/mealgrid";
import SelectBox from "../../components/selectbox/selectbox";
import TagButton from "../../components/tagbutton/tagbutton";
import styles from "./community.module.css";

export default function Community() {
  const sortOptions = [
    { label: "최신순", value: "newest" },
    { label: "인기순", value: "popular" },
  ];

  return (
    <>
      <div className={styles.maincontainer}>
        <h1>찾을 음식을 선택해 보세요</h1>
        <div className={styles.categoryBox}>
          <Dropdown selectFood="종류별" selectoption={FoodType} />
          <Dropdown selectFood="재료별" selectoption={FoodIngredient} />
        </div>
        <div className={styles.filtercontainer}>
          <TagButton />

          <div className={styles.selectBox}>
            <SelectBox options={sortOptions} />
          </div>
        </div>
        <div>
          <div className={styles.cardcontainer}>
            <div>
              <Mealgrid sortBy="favorites" />
            </div>
            <div>
              <Mealgrid sortBy="favorites" />
            </div>
            <div>
              <Mealgrid sortBy="favorites" />
            </div>
            <div>
              <Mealgrid sortBy="favorites" />
            </div>
          </div>
          {/* 여기까지 한묶음 4개 더 필요  */}
        </div>
      </div>
    </>
  );
}
