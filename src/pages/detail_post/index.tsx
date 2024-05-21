import { BsChatDots } from "react-icons/bs";
import Input from "../../components/Input/Input";
import styles from "./index.module.css";
export default function DetailPost() {
  return (
    <div className={styles.detailContainer}>
      <div className={styles.postContainer}>
        <div className={styles.imgBox}>
          <img
            src="/vite.svg"
            alt=""
            style={{ width: "80vw", height: "30vh" }}
          />
        </div>
        <div className={styles.funcSection}>
          <div className={styles.FuncBox}>
            <div className={styles.nicknameBlock}>
              <img src="/vite.svg" alt="" />
              <div>나는 현지</div>
            </div>

            <div className={styles.chatBox}>
              <BsChatDots
                style={{ width: "24px", height: "28px", paddingBottom: "3px" }}
              ></BsChatDots>
              <div>채팅하기</div>
            </div>
            <div>2024.01.01</div>
            <div>Icons</div>
          </div>
          <div>찜하기</div>
        </div>
        <div className={styles.chatNumbers}>조회수 그런거</div>
        <div className={styles.ContentsBox}>
          <div className={styles.postContent}>글</div>
          <div className={styles.tagSectionContainer}>
            <div>종류</div>
            <div className={styles.tagType}>
              <div className={styles.tag}>다이어트</div>
            </div>
          </div>
          <div className={styles.tagSectionContainer}>
            <div>재료</div>
            <div className={styles.tagType}>
              <div className={styles.tag}>다이어트</div>
            </div>
          </div>
          <div className={styles.tagSectionContainer}>
            <div>태그</div>
            <div className={styles.tagType}>
              <div className={styles.tag}>다이어트</div>
            </div>
          </div>
        </div>
        <div className={styles.CommentContainer}>
          <div className={styles.oneCommentBox}>
            <div>댓글 3</div>
            <div className={styles.inputBox}>
              <Input
                inputSize="md"
                variant="primary"
                type="text"
                style={{ width: "75vw" }}
              />
              <button className={styles.commentSubmit}>입력</button>
            </div>
            {/* 커멘트 박스 */}
            <div className={styles.getCommentBox}>
              <div className={styles.commentLeftBox}>
                <img src="/public/vite.svg" alt="" />
                <div className={styles.commentLeftData}>
                  <div className={styles.userNick}>나는채원</div>
                  <div>오오! 잘보고 갑니다!</div>
                </div>
              </div>
              <div className={styles.commentRightBox}>
                <div>2024.01.01</div>
                <div className={styles.rightFuncBox}>
                  <div>수정</div>
                  <div>삭제</div>
                </div>
              </div>
            </div>
            {/* 커멘트 박스 */}
            <div className={styles.getCommentBox}>
              <div className={styles.commentLeftBox}>
                <img src="/public/vite.svg" alt="" />
                <div className={styles.commentLeftData}>
                  <div className={styles.userNick}>나는채원</div>
                  <div>오오! 잘보고 갑니다!</div>
                </div>
              </div>
              <div className={styles.commentRightBox}>
                <div>2024.01.01</div>
                <div className={styles.rightFuncBox}>
                  <div>수정</div>
                  <div>삭제</div>
                </div>
              </div>
            </div>
            {/* 커멘트 박스 */}
            <div className={styles.getCommentBox}>
              <div className={styles.commentLeftBox}>
                <img src="/public/vite.svg" alt="" />
                <div className={styles.commentLeftData}>
                  <div className={styles.userNick}>나는채원</div>
                  <div>오오! 잘보고 갑니다!</div>
                </div>
              </div>
              <div className={styles.commentRightBox}>
                <div>2024.01.01</div>
                <div className={styles.rightFuncBox}>
                  <div>수정</div>
                  <div>삭제</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
