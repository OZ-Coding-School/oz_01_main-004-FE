import styles from "./likelist.module.css";
// import MealGrid from "../../../components/mealgrid/mealgrid";
import { useEffect, useState } from "react";
import styled from "styled-components";
import instance from "../../../api/axios";
import { Recipe } from "../../../components/mealgrid/type";
import Postcard from "../../../components/postcard/postcard";
import useFavoriteStatus from "../../../hooks/use_favoriestatus";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const LikeList: React.FC = () => {
  const [likeList, setLikeList] = useState<Recipe[]>([]);
  const { favoriteStates } = useFavoriteStatus();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLikeList = async (page: number) => {
    try {
      const response = await instance.get("/favorite/list/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        params: {
          page: page,
        },
      });

      console.log(response.data, "응답확인");
      const data = response.data;

      if (data && data.results) {
        const updatedLikeList = data.results.map((item: any) => ({
          ...item.recipe,
          is_favorite: true,
        }));

        setLikeList(updatedLikeList);
        console.log(data.results, "여기favorite_list");
        setTotalPages(Math.ceil(response.data.count / 12));
      }
    } catch (error) {
      console.error("Error fetching like list:", error);
    }
  };

  useEffect(() => {
    fetchLikeList(page);
  }, [page]);

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
      </div>
    </div>
  );
};

const PostGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: center;
`;

export default LikeList;
