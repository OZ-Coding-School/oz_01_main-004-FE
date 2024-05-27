import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import instance from "../../../api/axios";
import Postcard from "../../../components/postcard/postcard";
import useFavoriteStatus from "../../../hooks/usefavoriestatus";
import styles from "./postlist.module.css";
import { Recipe } from "./recipelist.type";

const PostList = () => {
  const [searchParams] = useSearchParams();
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { favoriteStates } = useFavoriteStatus();

  const foodTypeId = searchParams.get("food_type");
  const foodIngredientId = searchParams.get("food_ingredient");
  const Level = searchParams.get("level");
  const searchQuery = searchParams.get("search");

  const fetchAllRecipes = async () => {
    let fetchedRecipes: Recipe[] = [];
    let currentPage = 1;
    let hasNextPage = true;

    try {
      while (hasNextPage) {
        const response = await instance.get(
          `recipes/list/?page=${currentPage}`,
        );
        const data = response.data.results;
        fetchedRecipes = [...fetchedRecipes, ...data];
        hasNextPage = response.data.next !== null;
        currentPage++;
      }
      setAllRecipes(fetchedRecipes);
      setTotalPages(Math.ceil(fetchedRecipes.length / 16));
      filterRecipes(fetchedRecipes, page);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  useEffect(() => {
    filterRecipes(allRecipes, page);
  }, [page, foodTypeId, foodIngredientId, Level, searchQuery]);

  const filterRecipes = (recipes: Recipe[], page: number) => {
    const filtered = recipes.filter(
      (recipe) =>
        matchFoodType(recipe) &&
        matchFoodIngredient(recipe) &&
        matchDifficulty(recipe) &&
        matchSearchQuery(recipe),
    );
    setDisplayedRecipes(filtered.slice((page - 1) * 16, page * 16));
  };

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

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className={styles.listContainer}>
        {displayedRecipes.length > 0 ? (
          displayedRecipes.map((recipe) => (
            <Postcard
              key={recipe.id}
              recipe={recipe}
              isFavorite={favoriteStates[recipe.id] || false}
            />
          ))
        ) : (
          <>
            <p>배고픈 현지 : 레시피 없으니까 너가 등록해!</p>
          </>
        )}
      </div>
      <div className={styles.ButtonContainer}>
        <button
          className={styles.MoveBtn}
          onClick={handlePreviousPage}
          disabled={page <= 1}
        >
          <IoIosArrowBack color="#fff" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={
              index + 1 === page ? styles.activePageButton : styles.Button
            }
          >
            {index + 1}
          </button>
        ))}
        <button
          className={styles.MoveBtn}
          onClick={handleNextPage}
          disabled={page >= totalPages}
        >
          <IoIosArrowForward color="#fff" />
        </button>
      </div>
    </>
  );
};

export default PostList;
