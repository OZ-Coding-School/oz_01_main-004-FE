import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { BiBowlRice } from "react-icons/bi";
import { BsChatDots } from "react-icons/bs";
import { PiChatTextBold } from "react-icons/pi";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../api/axios";
import convertToKoreanTime from "../../hooks/make_korean_date";
import ActionNav from "./actionnav";
import Comments from "./comments/comments";
import { goToChat } from "./go_to_chat/go_chat";
import styles from "./index.module.css";

export default function DetailPost() {
  const [getAllData, setGetAllData]: any = useState([]);
  const [getUserData, setGetUser]: any = useState([]);
  const [foodIngredient, setFoodIngredient] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const [foodType, setFoodType] = useState("");
  const [writerUserId, setWriterUserId] = useState("");
  const [writerNickName, setWriterNickName] = useState("");
  const myUserId = localStorage.getItem("id") ? localStorage.getItem("id") : "";
  const memberId = [myUserId, writerUserId];
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
      setWriterUserId(String(response.data.recipe.user.id));
      setWriterNickName(response.data.recipe.user.nickname);
      setIsFavorite(response.data.recipe.is_favorite);
    } catch (error) {
      console.error("받기 실패", error);
    }
  };

  function handleGoToChatFromDetailPost() {
    window.confirm("채팅을 시작 하시겠습니까?");
    memberId && goToChat(memberId, writerNickName);
    navigate("/chat");
  }
  //찜하기 보내기
  const mountLike = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
    };
    try {
      await instance.post(`favorite/detail/${id}/`, config);
      alert("냠냠 찜하기 완료!");
      window.location.reload();
    } catch (error) {
      alert("이미 찜했습니다!");
    }
  };

  //찜하기 삭제
  const unMountLike = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        "Content-Type": "application/json",
      },
    };
    try {
      await instance.delete(`favorite/detail/${id}/`, config);
      alert("찜하기 삭제 완료!");
      window.location.reload();
    } catch (error) {
      console.error("찜하기삭제 실패!", error);
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
            style={{ width: "60vw", height: "40vh", objectFit: "cover" }}
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
                    width: "25px",
                    height: "25px",
                    boxSizing: "border-box",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              )}
              <div>{getUserData.nickname}</div>
            </div>

            <div
              className={styles.chatBox}
              onClick={handleGoToChatFromDetailPost}
            >
              <BsChatDots
                style={{ width: "16px", height: "16px", paddingBottom: "3px" }}
              ></BsChatDots>
              <div className={styles.chattext}>채팅하기</div>
            </div>
            <div className={styles.Day}>
              {convertToKoreanTime(getAllData.created_at)}
            </div>
            {writerUserId === myUserId ? (
              <div>
                <ActionNav />
              </div>
            ) : null}
          </div>
          <div className={styles.likeBox}>
            {/* <BiSolidBowlRice style={{ width: "30px", height: "35px" }} /> */}
            <BiBowlRice style={{ width: "16px", height: "16px" }} />
            {isFavorite ? (
              <button className={styles.pickButton} onClick={unMountLike}>
                찜하기 취소
              </button>
            ) : (
              <button className={styles.pickButton} onClick={mountLike}>
                찜하기
              </button>
            )}
          </div>
        </div>
        <div className={styles.chatNumbers}>
          <div>
            <BiBowlRice style={{ width: "12px", height: "12px" }} />{" "}
            {getAllData.favorites_count}
          </div>
          <div>
            <PiChatTextBold style={{ width: "12px", height: "12px" }} />
            {getAllData.comments_count}
          </div>
        </div>
        <div className={styles.ContentsBox}>
          <div className={styles.postTitle}>{getAllData.title}</div>
          <div className={styles.postContent}>
            {renderContent(getAllData.content)}
          </div>
          <div className={styles.tagSectionContainer}>
            <div className={styles.Text}>종류</div>
            <div className={styles.tagType}>
              <div className={styles.tag}>{foodType}</div>
            </div>
          </div>
          <div className={styles.tagSectionContainer}>
            <div className={styles.Text}>재료</div>
            <div className={styles.tagType}>
              <div className={styles.tag}>{foodIngredient}</div>
            </div>
          </div>
          <div className={styles.tagSectionContainer}>
            <div className={styles.Text}>레벨</div>
            <div className={styles.tagType}>
              <div className={styles.tag}>{getAllData.level}</div>
            </div>
          </div>
        </div>

        {/* 여기서 잠깐! */}
        <div className={styles.CommentContainer}>
          <div>
            <div className={styles.oneCommentBox}>
              댓글
              <div className={styles.CommentText}>
                {getAllData.comments_count}
              </div>
            </div>
            <Comments />
          </div>
        </div>
      </div>
    </div>
  );
}
