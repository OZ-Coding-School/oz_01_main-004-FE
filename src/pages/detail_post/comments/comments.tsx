import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../../api/axios";
import Input from "../../../components/Input/Input";
import { noneYearToKorean } from "../../../hooks/make_korean_date";
import { allCommentData, commentData } from "../../../type/comments";
import styles from "../index.module.css";

export default function Comments() {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  const [getComments, setGetComments] = useState<allCommentData | null>(null);
  const [editedComment, setEditedComment] = useState("");
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const nickName = localStorage.getItem("nickname");
  // const myId: string | null = localStorage.getItem("id");

  const fetchComments = async () => {
    try {
      const response = await instance.get(`comments/list/${id}/`);
      //   console.log(response.data, "댓글수임");
      setGetComments(response.data.comment_list);
      // console.log(response.data.comment_list);
    } catch (error) {
      console.error("받기 실패", error);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const commentsSubmit = async (e: any) => {
    e.preventDefault();
    if (comment) {
      try {
        const response = await instance.post(
          `comments/list/${id}/`,
          { content: comment },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
              // "Content-Type": "application/json",
            },
          },
        );
        setGetComments((prevComments) => [
          response.data.comment,
          ...(prevComments || []),
        ]);
        alert("댓글이 성공적으로 등록되었습니다.");
        // console.log(response.data.comment.user);
        setComment("");
      } catch (error) {
        console.error("댓글 보내기 실패", error);
      }
    } else {
      alert("내용을 입력해주세요");
    }
  };

  const putComments = async (e: any) => {
    e.preventDefault();
    if (editedComment) {
      try {
        await instance.put(
          `comments/detail/${editCommentId}/`,
          { content: editedComment },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
              // "Content-Type": "application/json",
            },
          },
        );
        // alert(response.data.message);
        setEditCommentId(null);

        // 상태에서 댓글을 업데이트
        setGetComments(
          (prevComments) =>
            prevComments?.map((comment) =>
              comment.id === editCommentId
                ? { ...comment, content: editedComment }
                : comment,
            ) || null,
        );
        setEditedComment("");
      } catch (error) {
        console.error("댓글 보내기 실패", error);
      }
    } else {
      alert("수정할 내용을 입력하세요");
    }
  };

  const confirmDelete = (e: number) => {
    // 사용자에게 삭제 여부를 확인하는 경고창을 표시합니다.
    const isConfirmed = window.confirm("정말로 이 댓글을 삭제하시겠습니까?");
    // 사용자가 확인을 선택하면 삭제를 진행합니다.
    if (isConfirmed) {
      handleDelete(e);
    }
  };

  const handleDelete = async (e: number) => {
    try {
      // 삭제 요청을 보냅니다.
      const response = await instance.delete(`comments/detail/${e}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      fetchComments();
      alert(response.data.message);
    } catch (error) {
      console.error("댓글 삭제 실패", error);
    }
  };

  return (
    <div>
      <div className={styles.inputBox}>
        <form onSubmit={commentsSubmit}>
          <Input
            inputSize="md"
            variant="primary"
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
            style={{ width: "75vw" }}
          />
          <button type="submit" className={styles.commentSubmit}>
            입력
          </button>
        </form>
      </div>
      {/* 커멘트 박스 */}
      {getComments !== null &&
        getComments.map((getComment: commentData) => (
          <div key={getComment.id} className={styles.getCommentBox}>
            <div className={styles.commentLeftBox}>
              <img
                style={{
                  width: "50px",
                  height: "50px",
                  boxSizing: "border-box",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={
                  getComment.user.profile_image
                    ? getComment.user.profile_image
                    : "/images/nopicture.png"
                }
                alt=""
              />
              <div className={styles.commentLeftData}>
                <div className={styles.userNick}>
                  {getComment.user.nickname}
                </div>

                {editCommentId === getComment.id ? (
                  // 수정 모드일 때는 입력 상자를 보여줌
                  <Input
                    style={{ width: "45vw" }}
                    inputSize="sm"
                    variant="primary"
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                ) : (
                  // 수정 모드가 아닐 때는 댓글 내용을 보여줌
                  <div>{getComment.content}</div>
                )}
              </div>
            </div>
            <div className={styles.commentRightBox}>
              <div className={styles.dateBox}>
                {noneYearToKorean(getComment.updated_at)}
              </div>
              {getComment.user.nickname === nickName ? (
                <div className={styles.rightFuncBox}>
                  {editCommentId === getComment.id ? (
                    // 수정 모드일 때는 수정 완료 버튼을 보여줌

                    <form onSubmit={putComments}>
                      <button className={styles.commentButton} type="submit">
                        완료
                      </button>
                    </form>
                  ) : (
                    // 수정 모드가 아닐 때는 수정 버튼을 보여줌

                    <button
                      className={styles.commentButton}
                      onClick={() => setEditCommentId(getComment.id)}
                    >
                      수정
                    </button>
                  )}
                  {editCommentId === getComment.id ? (
                    <button
                      className={styles.commentButton}
                      onClick={() => {
                        setEditCommentId(null);
                        setEditedComment("");
                      }}
                    >
                      취소
                    </button>
                  ) : (
                    <button
                      className={styles.commentButton}
                      onClick={() => {
                        confirmDelete(getComment.id);
                      }}
                    >
                      삭제
                    </button>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        ))}
    </div>
  );
}
