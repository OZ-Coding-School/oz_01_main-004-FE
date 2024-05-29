import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../../api/axios";
import Button from "../../../components/Button/Button";
import { Recipe } from "../../../components/mealgrid/type";
import Postcard from "../../../components/postcard/postcard";
import styles from "./mypost.module.css";

const MyPost: React.FC = () => {
  const [posts, setPosts] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchMyPostList = async (page: number) => {
    try {
      const token = localStorage.getItem("access");
      if (!token) {
        console.error("User not logged in");
        return;
      }

      const response = await instance.get("/recipes/my/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page: page,
        },
      });

      if (response.data && response.data.results) {
        setPosts(response.data.results);

        setTotalPages(Math.ceil(response.data.count / 12));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleEdit = async (id: number) => {
    const confirmEdit = window.confirm("수정하시겠습니까?");
    if (confirmEdit) {
      const token = localStorage.getItem("access");
      if (!token) {
        console.error("User not logged in");
        return;
      }
      try {
        navigate(`/detailPost/modify/${id}/`);
      } catch (error) {
        console.error("Error editing recipe:", error);
      }
    }
  };

  const handleDelete = async (recipe_id: number) => {
    try {
      const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
      if (!confirmDelete) return;

      await instance.delete(`recipes/detail/${recipe_id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      fetchMyPostList(page);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  useEffect(() => {
    fetchMyPostList(page);
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
          {posts.map((post) => (
            <div key={post.id} className={styles.post}>
              <Postcard key={post.id} recipe={post} />
              <div className={styles.buttonGroup}>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(post.id)}
                >
                  수정
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleDelete(post.id)}
                >
                  삭제
                </Button>
              </div>
            </div>
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

export default MyPost;
