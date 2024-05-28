import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { FaBowlRice } from "react-icons/fa6";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../api/axios";
import convertToKoreanTime from "../../hooks/make_korean_date";
import ActionNav from "./actionnav";
import Comments from "./comments/comments";
import styles from "./index.module.css";

export default function DetailPost() {
  const [getAllData, setGetAllData]: any = useState([]);
  const [getUserData, setGetUser]: any = useState([]);
  const [foodIngredient, setFoodIngredient] = useState("");
  const navigate = useNavigate();
  const [foodType, setFoodType] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);
  //처음 데이터 받기
  const fetchData = async () => {
    try {
      const response = await instance.get(`recipes/detail/${id}`);
      setGetAllData(response.data.recipe);
      setGetUser(response.data.recipe.user);
      setFoodIngredient(
        response.data.recipe.food_ingredient.food_ingredient_name,
      );
      setFoodType(response.data.recipe.food_type.food_type_name);
    } catch (error) {
      console.error("받기 실패", error);
    }
  };

  function GoToChat() {
    alert(`채팅방 생성 시 ${getUserData.id}를 입력해주세요`);
    navigate("/chat");
  }
  //찜하기 보내기
  const mountLike = async () => {
    try {
      const response = await instance.post(
        `favorite/detail/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      alert(response.data.message);
    } catch (error) {
      console.error("찜하기 실패", error);
    }
  };

  //찜하기 삭제
  const unMountLike = async () => {
    try {
      const response = await instance.delete(`favorite/detail/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error("찜하기 실패", error);
    }
  };

  //html 게시물 react로 변환하기
  const renderContent = (content: string) => {
    if (content) {
      return parse(content, {
        replace: (domNode) => {
          if (domNode.type === "tag" && domNode.name === "img") {
            return (
              <img
                src={domNode.attribs.src}
                alt=""
                style={{ width: "100%", height: "auto" }}
              />
            );
          }
        },
      });
    }
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.postContainer}>
        <div className={styles.imgBox}>
          <img
            src={getAllData.thumbnail}
            alt=""
            style={{ width: "80vw", height: "30vh", objectFit: "cover" }}
          />
        </div>
        <div className={styles.funcSection}>
          <div className={styles.FuncBox}>
            <div className={styles.nicknameBlock}>
              {getUserData.profile_image && (
                <img
                  src={getUserData.profile_image}
                  alt=""
                  style={{
                    width: "30px",
                    height: "30px",
                    boxSizing: "border-box",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
              <div>{getUserData.nickname}</div>
            </div>

            <div className={styles.chatBox} onClick={GoToChat}>
              <BsChatDots
                style={{ width: "24px", height: "28px", paddingBottom: "3px" }}
              ></BsChatDots>
              <div>채팅하기</div>
            </div>
            <div>{convertToKoreanTime(getAllData.created_at)}</div>
            <div>
              <ActionNav />
            </div>
          </div>
          <div className={styles.likeBox}>
            {/* <BiSolidBowlRice style={{ width: "30px", height: "35px" }} /> */}
            <button className={styles.commentButton} onClick={mountLike}>
              찜하기
            </button>
            <button className={styles.commentButton} onClick={unMountLike}>
              찜하기 취소
            </button>
          </div>
        </div>
        <div className={styles.chatNumbers}>
          <div>
            <FaBowlRice style={{ width: "20px", height: "15px" }} />{" "}
            {getAllData.favorites_count}
          </div>
          <div>
            <IoChatboxEllipsesOutline
              style={{ width: "20px", height: "15px" }}
            />
            {getAllData.comments_count}
          </div>
        </div>
        <div className={styles.ContentsBox}>
          <div className={styles.postTitle}>{getAllData.title}</div>
          <div className={styles.postContent}>
            {renderContent(getAllData.content)}
          </div>
          <div className={styles.tagSectionContainer}>
            <div>종류</div>
            <div className={styles.tagType}>
              <div className={styles.tag}>{foodType}</div>
            </div>
          </div>
          <div className={styles.tagSectionContainer}>
            <div>재료</div>
            <div className={styles.tagType}>
              <div className={styles.tag}>{foodIngredient}</div>
            </div>
          </div>
          <div className={styles.tagSectionContainer}>
            <div>레벨</div>
            <div className={styles.tagType}>
              <div className={styles.tag}>{getAllData.level}</div>
            </div>
          </div>
        </div>

        {/* 여기서 잠깐! */}
        <div className={styles.CommentContainer}>
          <div className={styles.oneCommentBox}>
            <div style={{ fontSize: "20px", fontWeight: "500" }}>
              댓글 {getAllData.comments_count}
            </div>
            <Comments />
          </div>
        </div>
      </div>
    </div>
  );
}
