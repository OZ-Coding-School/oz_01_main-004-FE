import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import CreateChat from "./create_chat/create_chat";
import styles from "./index.module.css";

export default function Chat() {
  return (
    <div>
      <div className={styles.chatContainer}>
        <div className={styles.listChatBox}>
          <div className={styles.listContainer}>
            <div className={styles.myProfile}>
              <img src="/vite.svg" alt="" />
              <div className={styles.myNickname}>내 닉네임</div>
            </div>

            <div className={styles.chatList}>
              <div className={styles.chatImg}>
                <img src="/vite.svg" alt="" />
              </div>
              <div className={styles.chatNameBox}>
                <div className={styles.chatUser}>이름</div>
                <div className={styles.chatContent}>
                  안녕하세요 대충 채팅이름임
                </div>
              </div>
            </div>
            <CreateChat />
          </div>
          {/* 남이 보내는 채팅 */}
          <div className={styles.detailContainer}>
            <div>
              <div className={styles.leftChatBox}>
                <img src="/vite.svg" alt="" />
                <div className={styles.leftOneChatBox}>chatBox</div>
              </div>
            </div>
            {/* 내가 보내는채팅 */}
            <div>
              <div className={styles.rightChatBox}>
                <div className={styles.rightOneChatBox}>chatBox</div>
              </div>
            </div>
            {/* 여기서부터 채팅 입력칸 */}

            <form className={styles.postChatContainer}>
              <Input
                inputSize="sm"
                variant="primary"
                style={{ width: "90%" }}
              ></Input>
              <Button
                variant="primary"
                type="submit"
                size="sm"
                style={{ width: "10%", height: "45px" }}
              >
                전송
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
