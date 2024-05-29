import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useChatContext } from "../../context/chatuser";
import { Message } from "../../type/chat";
import CreateChatRoom from "./create_chatroom/create_chatroom";
import GetMessagesOfChatroom from "./get_messages_of_chatroom/get_messages_of_chatroom";
import GetMyChatList from "./get_my_chat_list/get_chat_list";
import styles from "./index.module.css";

export default function Chat() {
  const [getMessages, setGetMessages] = useState<Message[]>([]);
  const myNickname = localStorage.getItem("nickname");
  const { chatUser } = useChatContext();
  const webSocket = useRef<WebSocket | null>(null);
  const webSocketUrl = import.meta.env.VITE_WEBSOCKET_URL + `${chatUser}/`;

  const [pageNum, setPageNum] = useState<number>(2);
  const [message, setMessage] = useState<string>("");
  const myId = localStorage.getItem("id");

  // 웹소켓 연결
  useEffect(() => {
    if (webSocket.current) {
      webSocket.current.close();
    }

    const newWebSocket = new WebSocket(webSocketUrl);
    webSocket.current = newWebSocket;

    newWebSocket.onopen = () => {
      console.log(`WebSocket 연결! 방번호 : ${chatUser}`);
    };

    newWebSocket.onmessage = (event: MessageEvent) => {
      console.log("메시지 수신:", event.data, `방아이디 ${chatUser}`);
      const messageData = JSON.parse(event.data);
      const newMessage = {
        content: messageData.message.content,
        sender: messageData.message.sender_data.sender,
        senderNickname: messageData.message.sender_data.nickname,
        createdAt: messageData.message.created_at,
      };

      setGetMessages((prev) => {
        // 배열에 같은 createdAt을 가진 메시지가 있는지 확인합니다.
        const isDuplicate = prev.some(
          (message) => message.createdAt === newMessage.createdAt,
        );
        // 중복이 아니면 newMessage를 추가합니다.
        if (!isDuplicate) {
          return [newMessage, ...prev];
        }
        // 중복이면 이전 상태를 그대로 반환합니다.
        return prev;
      });
      console.log(getMessages);
    };

    newWebSocket.onclose = (event) => {
      console.log(`WebSocket 연결 종료`, event);
    };

    newWebSocket.onerror = (error) => {
      console.log("WebSocket 에러", error);
    };

    return () => {
      // clearTimeout(timeoutId);
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
        sender: myId,
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
            <img style={{ width: "60px" }} src="/chat/chatProfile.png" alt="" />
            <div className={styles.myNickname}>{myNickname}</div>
          </div>
          <div className={styles.leftContainer}>
            <GetMyChatList />
            <CreateChatRoom />
          </div>
        </div>

        {/* 채팅내역 , 채팅 보내기 */}
        <div className={styles.rightContainer}>
          <GetMessagesOfChatroom
            getMessages={getMessages}
            setGetMessages={setGetMessages}
            pageNum={pageNum}
            setPageNum={setPageNum}
          />
          {/* <PostChat webSocket={webSocket} /> */}
          {/* PostChat 나중에 변동사항 없으면 삭제 할 것 */}
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
    </div>
  );
}
