import { useEffect, useState } from "react";
import { AiFillCaretUp } from "react-icons/ai";
import instance from "../../../api/axios";
import Button from "../../../components/Button/Button";
import { useChatContext } from "../../../context/chatuser";
import { GetMessagesOfChatroomProps } from "../../../type/chat";
import styles from "../index.module.css";

export default function GetMessagesOfChatroom({
  getMessages,
  setGetMessages,
  pageNum,
  setPageNum,
}: GetMessagesOfChatroomProps) {
  const { chatUser } = useChatContext();
  const myNickname = localStorage.getItem("nickname");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (chatUser !== null) {
      fetchMessages();
    }
  }, [chatUser]);

  //현재 채팅목록 받기
  const fetchMessages = async () => {
    try {
      const response = await instance.get(`chat/chatrooms/${chatUser}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      const fetchedMessages = response.data.messages.results.map(
        (msg: any) => ({
          content: msg.content,
          sender: msg.sender,
          senderNickname: msg.sender_data.nickname,
          createdAt: msg.created_at,
        }),
      );
      setGetMessages(fetchedMessages);
    } catch (error) {
      console.error("이전 메시지를 불러오는 중 에러 발생:", error);
    }
  };
  //이전 채팅목록 받기
  const fetchPreviousMessages = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await instance.get(
        `chat/chatrooms/${chatUser}/?page=${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      const fetchedMessages = response.data.messages.results.map(
        (msg: any) => ({
          content: msg.content,
          sender: msg.sender,
          senderNickname: msg.sender_data.nickname,
          createdAt: msg.created_at,
        }),
      );
      setGetMessages((prevMessages) => [...fetchedMessages, ...prevMessages]);
      setPageNum((prevPageNum) => prevPageNum + 1);
    } catch (error) {
      console.error("이전 메시지를 불러오는 중 에러 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.messageContainer}>
      <div className={styles.scrollButtonContainer}>
        <Button
          style={{ width: "50px", height: "30px" }}
          size="sm"
          variant="secondary"
          onClick={fetchPreviousMessages}
        >
          <AiFillCaretUp style={{ width: "30px", height: "40px" }} />
        </Button>
      </div>
      {Array.isArray(getMessages) &&
        getMessages
          .slice()
          .sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
          )
          .map((msg, index) => (
            <div
              key={index}
              className={
                msg.senderNickname === myNickname
                  ? styles.myOneChatBox
                  : styles.otherOneChatBox
              }
            >
              <div className={styles.smallChatBox}>
                {msg.senderNickname === myNickname ? (
                  <>
                    <div className={styles.myMessageTimestamp}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </div>
                    <div className={styles.myMessageContent}>{msg.content}</div>
                  </>
                ) : (
                  <>
                    <strong>{msg.senderNickname}</strong>:
                    <div className={styles.otherMessageContent}>
                      {msg.content}
                    </div>
                    <div className={styles.otherMessageTimestamp}>
                      {new Date(msg.createdAt).toLocaleString()}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
    </div>
  );
}
