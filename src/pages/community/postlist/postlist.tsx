import { useSearchParams } from "react-router-dom";
import styles from "./postlist.module.css";
import { Recipe } from "./recipelist";
import RecipeList from "./recipelist_mock";

const PostList = () => {
  const [searchParams] = useSearchParams();
  const foodTypeId = searchParams.get("food_type");
  const foodIngredientId = searchParams.get("food_ingredient");
  const Level = searchParams.get("level");

  const matchFoodType = (recipe: Recipe) =>
    !foodTypeId || recipe.food_type.id.toString() === foodTypeId;
  const matchFoodIngredient = (recipe: Recipe) =>
    !foodIngredientId ||
    recipe.food_ingredient.id.toString() === foodIngredientId;
  const matchDifficulty = (recipe: Recipe) => !Level || recipe.level === Level;

  const filteredRecipes = RecipeList.filter(
    (recipe) =>
      matchFoodType(recipe) &&
      matchFoodIngredient(recipe) &&
      matchDifficulty(recipe),
  );

  return (
    <div className={styles.listContainer}>
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <div key={recipe.id} className={styles.recipeCard}>
            <img src={recipe.thumbnail} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <p>{recipe.content}</p>
            <p>{recipe.user.nickname}</p>
          </div>
        ))
      ) : (
        <p>레시피 없으니까 너가 등록해보세요!</p>
      )}
    </div>
  );
};

export default PostList;
