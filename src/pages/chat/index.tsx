import { FormEvent, useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useChatContext } from "../../context/chatuser";
import CreateChat from "./create_chat/create_chat";
import GetMyChatList from "./get_my_chat_list/get_chat_list";
import styles from "./index.module.css";

export default function Chat() {
  // const navigate = useNavigate();
  const [message, setMessage] = useState<string>("");
  const [getMessages, setGetMessages] = useState<string[]>([]);
  const myNickname = localStorage.getItem("nickname");
  const { chatUser } = useChatContext();
  const webSocket = useRef<WebSocket | null>(null);
  const webSocketUrl = import.meta.env.VITE_WEBSOCKET_URL + `${chatUser}/`;

  useEffect(() => {
    if (chatUser !== null) {
      console.log(chatUser);
      const fetchMessages = async () => {
        try {
          const response = await instance.get(`chat/chatrooms/${chatUser}/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          });
          setGetMessages(response.data.messages);
          console.log(response.data.messages);
        } catch (error) {
          console.error("이전 메시지를 불러오는 중 에러 발생:", error);
        }
      };

      fetchMessages();
    }
  }, [chatUser]);

  useEffect(() => {
    const connectWebSocket = () => {
      if (
        !webSocket.current ||
        webSocket.current.readyState === WebSocket.CLOSED
      ) {
        webSocket.current = new WebSocket(webSocketUrl);
        webSocket.current.onopen = () => {
          console.log(`WebSocket 연결! 방번호 : ${chatUser}`);

          if (webSocket.current) {
            webSocket.current.onmessage = (event: MessageEvent) => {
              console.log("WebSocket 메시지 수신:", event.data);
              setGetMessages((prev: string[]) => [...prev, event.data]);
            };
          }
        };

        webSocket.current.onclose = (event) => {
          console.log(`ebSocket 연결 종료`, event);
        };

        webSocket.current.onerror = (error) => {
          console.log("WebSocket 에러", error);
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
  }, [chatUser]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = message;
    const sender = localStorage.getItem("id");
    const room = chatUser;
    const Data = { content: content, sender: sender, room: room };
    try {
      await instance.post("chat/chatmessages/", Data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      console.log("채팅 보내기 성공");
    } catch (error) {
      alert("유효하지 않은 계정입니다.");
      console.log(Data);
    }
  };

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
          {/* <div className={styles.messageContainer}>
            {getMessages.map((msg, index) => (
              <div key={index} className={styles.message}>
                {msg}
              </div>
            ))}
          </div> */}

          {/* 여기서부터 채팅 입력칸 */}
          <form className={styles.postChatContainer} onSubmit={handleSubmit}>
            <Input
              inputSize="sm"
              variant="primary"
              style={{ width: "90%" }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
  );
}
