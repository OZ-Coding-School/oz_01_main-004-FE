import { useEffect, useRef, useState } from "react";
import { useChatContext } from "../../context/chatuser";
import { Message } from "../../type/chat";
import CreateChatRoom from "./create_chatroom/create_chatroom";
import GetMessagesOfChatroom from "./get_messages_of_chatroom/get_messages_of_chatroom";
import GetMyChatList from "./get_my_chat_list/get_chat_list";
import styles from "./index.module.css";
import PostChat from "./post_chat/post_chat";

export default function Chat() {
  const [getMessages, setGetMessages] = useState<Message[]>([]);
  const myNickname = localStorage.getItem("nickname");
  const { chatUser } = useChatContext();
  const webSocket = useRef<WebSocket | null>(null);
  const webSocketUrl = import.meta.env.VITE_WEBSOCKET_URL + `${chatUser}/`;
  //무한스크롤 변수
  const [pageNum, setPageNum] = useState<number>(2);

  // 웹소켓 연결
  useEffect(() => {
    if (
      !webSocket.current ||
      webSocket.current.readyState === WebSocket.CLOSED
    ) {
      webSocket.current = new WebSocket(webSocketUrl);
      webSocket.current.onopen = () => {
        console.log(`WebSocket 연결! 방번호 : ${chatUser}`);

        if (webSocket.current) {
          webSocket.current.onmessage = (event: MessageEvent) => {
            console.log("메시지 수신:", event.data, `방아이디 ${chatUser}`);
            const messageData = JSON.parse(event.data);
            const newMessage = {
              content: messageData.content,
              sender: messageData.sender,
              senderNickname: messageData.sender.nickname,
              createdAt: messageData.created_at,
            };
            setGetMessages((prev) => [...prev, newMessage]);
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

    return () => {
      // clearTimeout(timeoutId);
      if (webSocket.current) {
        webSocket.current.close();
        console.log("WebSocket 연결 해제");
      }
    };
  }, [chatUser, webSocketUrl]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.listChatBox}>
        <div className={styles.listContainer}>
          <div className={styles.myProfile}>
            <img src="/vite.svg" alt="" />
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
          <PostChat webSocket={webSocket} />
        </div>
      </div>
    </div>
  );
}
