import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import instance from "../../../api/axios";
import Postcard from "../../../components/postcard/postcard";
import styles from "./postlist.module.css";
import { Recipe } from "./recipelist.type";

const PostList = () => {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);

  const foodTypeId = searchParams.get("food_type");
  const foodIngredientId = searchParams.get("food_ingredient");
  const Level = searchParams.get("level");
  const searchQuery = searchParams.get("search");

  const RecipeData = async () => {
    try {
      // const response = await instance.get("recipes/list/?page=2");
      const response = await instance.get(`recipes/list/?page=${page}`);
      console.log(response.data);
      setRecipes(response.data.results);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    RecipeData();
  }, [page]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // 필터링 함수들
  const matchFoodType = (recipe: any) =>
    !foodTypeId || recipe.food_type.id.toString() === foodTypeId;
  const matchFoodIngredient = (recipe: any) =>
    !foodIngredientId ||
    recipe.food_ingredient.id.toString() === foodIngredientId;
  const matchDifficulty = (recipe: any) => !Level || recipe.level === Level;
  const matchSearchQuery = (recipe: any) => {
    const query = searchQuery ? searchQuery.toLowerCase() : "";
    return (
      !searchQuery ||
      recipe.title.toLowerCase().includes(query) ||
      recipe.content.toLowerCase().includes(query)
    );
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      matchFoodType(recipe) &&
      matchFoodIngredient(recipe) &&
      matchDifficulty(recipe) &&
      matchSearchQuery(recipe),
  );

  return (
    <>
      <div className={styles.listContainer}>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <Postcard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <>
            <p>레시피 없으니까 너가 등록해!</p>
          </>
        )}
      </div>
      <div>
        <button onClick={handlePreviousPage} disabled={page <= 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </>
  );
};

export default PostList;
