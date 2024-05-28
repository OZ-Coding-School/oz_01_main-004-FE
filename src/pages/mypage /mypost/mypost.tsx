import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../../api/axios";
import Button from "../../../components/Button/Button";
import { Recipe } from "../../../components/mealgrid/type";
import Postcard from "../../../components/postcard/postcard";
import styles from "./mypost.module.css";

const MyPost: React.FC = () => {
  const [posts, setPosts] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  const fetchMyPostList = async () => {
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
      });
      console.log(response.data, "응답확인");

      if (response.data && response.data.results) {
        setPosts(response.data.results);
        console.log(response.data.results, "여기 list");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // const handleModifyClick = async (id: number) => {
  //   navigate(`/detailPost/modify/${id}/`);
  // };
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
        // const response = await instance.put(
        //   `/recipes/detail/${id}/`,
        //   {},
        //   {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   },
        // );
        // console.log(response.data.recipe, "수정 API 응답 확인");
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
      console.log("Recipe deleted successfully");

      fetchMyPostList();
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };
  useEffect(() => {
    fetchMyPostList();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {posts.map((post) => (
          <div key={post.id} className={styles.post}>
            <PostGrid>
              {posts.map((recipe) => (
                <Postcard key={recipe.id} recipe={recipe} />
              ))}
            </PostGrid>
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
