import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import CreateChat from "./create_chat/create_chat";
import GetMyChatList from "./get_my_chat_list/get_chat_list";
import styles from "./index.module.css";

export default function Chat() {
  // const navigate = useNavigate();
  const myNickname = localStorage.getItem("nickname");
  // const [messages, setMessages] = useState<string[]>([]);
  const webSocket = useRef<WebSocket | null>(null);
  const webSocketUrl = `wss://cookbap.store/chatrooms/12/`;

  useEffect(() => {
    const connectWebSocket = () => {
      if (
        !webSocket.current ||
        webSocket.current.readyState === WebSocket.CLOSED
      ) {
        webSocket.current = new WebSocket(webSocketUrl);

        webSocket.current.onopen = () => {
          console.log("WebSocket 연결!");
        };

        webSocket.current.onclose = (event) => {
          console.log("WebSocket 연결 종료", event);
        };

        webSocket.current.onerror = (error) => {
          console.log("WebSocket 에러", error);
        };

        webSocket.current.onmessage = (event: MessageEvent) => {
          // setMessages((prev) => [...prev, event.data]);
          console.log("WebSocket 메시지 수신:", event.data);
        };
      }
    };

    connectWebSocket();

    return () => {
      if (webSocket.current) {
        webSocket.current.close();
        console.log("WebSocket 연결 해제");
      }
    };
  }, [webSocketUrl]);

  return (
    <div>
      <div className={styles.chatContainer}>
        <div className={styles.listChatBox}>
          <div className={styles.listContainer}>
            <div className={styles.myProfile}>
              <img src="/vite.svg" alt="" />
              <div className={styles.myNickname}>{myNickname}</div>
            </div>
            <GetMyChatList />
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
