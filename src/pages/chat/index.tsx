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
          console.log(response.data.messages, "채팅목록 불러오기");
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
          console.log(`WebSocket 연결 종료`, event);
        };

        webSocket.current.onerror = (error) => {
          console.log("WebSocket 에러", error);
        };
      }
    };
    console.log(setGetMessages);
    const timeoutId = setTimeout(connectWebSocket, 2000);

    return () => {
      clearTimeout(timeoutId);
      if (webSocket.current) {
        webSocket.current.close();
        console.log("WebSocket 연결 해제");
      }
    };
  }, [chatUser, webSocketUrl]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
      const messageData = JSON.stringify({
        type: "text",
        content: message,
        sender: localStorage.getItem("id"),
        room: chatUser,
      });
      webSocket.current.send(messageData);
      setMessage(""); // 입력 필드를 초기화합니다.
      console.log(`메시지 전송: ${messageData}`);
    } else {
      console.error("웹소켓 연결이 되어 있지 않습니다.");
    }
  };

  return (
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
        <div className={styles.messageContainer}>
          {Array.isArray(getMessages) &&
            getMessages.map((msg, index) => (
              <div key={index} className={styles.message}>
                {msg}
              </div>
            ))}
        </div>
        <form className={styles.postChatContainer} onSubmit={handleSubmit}>
          <Input
            type="text"
            inputSize="sm"
            variant="primary"
            style={{ width: "90%" }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
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
  );
}
