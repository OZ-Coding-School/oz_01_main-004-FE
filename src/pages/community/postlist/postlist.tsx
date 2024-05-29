import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import instance from "../../../api/axios";
import Postcard from "../../../components/postcard/postcard";
import useFavoriteStatus from "../../../hooks/use_favoriestatus";
import styles from "./postlist.module.css";
import { Recipe } from "./recipelist.type";

const PostList = ({ setFilteredCount }: any) => {
  const [searchParams] = useSearchParams();
  const [displayedRecipes, setDisplayedRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { favoriteStates } = useFavoriteStatus();

  const foodTypeId = searchParams.get("food_type");
  const foodIngredientId = searchParams.get("food_ingredient");
  const Level = searchParams.get("level");
  const searchQuery = searchParams.get("search");

  const AllRecipes = async (page: number) => {
    try {
      const response = await instance.get(`recipes/list/`, {
        params: {
          page: page,
          search: searchQuery,
          food_type: foodTypeId,
          food_ingredient: foodIngredientId,
          level: Level,
        },
      });

      const data = response.data?.results || [];
      if (data.length === 0 && page > 1) {
        // 현재 페이지에 데이터가 없는 경우 첫 페이지로 이동
        setPage(1);
      } else {
        setDisplayedRecipes(data);
        setTotalPages(Math.ceil(response.data.count / 16));
        setFilteredCount(response.data.count);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        // 404 오류가 발생하면 첫페이지 이동
        setPage(1);
      } else {
        console.error("error", error);
      }
    }
  };

  useEffect(() => {
    AllRecipes(page);
  }, [searchQuery, foodTypeId, foodIngredientId, Level, page]);

  useEffect(() => {}, [searchParams]);

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
