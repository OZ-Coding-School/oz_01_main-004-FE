import styles from "./mypost.module.css";
import MealGrid from "../../../components/mealgrid/mealgrid";
import { useEffect, useState } from "react";
import instance from "../../../api/axios";
import { Recipe } from "../../../components/mealgrid/type";
import Button from "../../../components/Button/Button";

const MyPost: React.FC = () => {
  const [posts, setPosts] = useState<Recipe[]>([]);

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
  const handleEdit = async (id: number) => {
    const confirmEdit = window.confirm("수정하시겠습니까?");
    if (confirmEdit) {
      const token = localStorage.getItem("access");
      if (!token) {
        console.error("User not logged in");
        return;
      }
      try {
        const response = await instance.put(
          `/recipes/detail/${id}/`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response.data.recipe, "수정 API 응답 확인");
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
            <MealGrid meals={[post]} />
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

export default MyPost;
