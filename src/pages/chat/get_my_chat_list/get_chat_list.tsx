import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import instance from "../../../api/axios";
import { headers, onlyAccessHeaders } from "../../../api/header";
import { useChatContext } from "../../../context/chatuser";
import styles from "../index.module.css";
export default function GetMyChatList() {
  const [chatData, setChatData]: any = useState([]);

  const { chatUser, setChatUser } = useChatContext();
  const [, setIsChatRoomVisible] = useState(false);
  const myId = localStorage.getItem("id");

  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    try {
      const response = await instance.get("chat/chatrooms/", onlyAccessHeaders);
      setChatData(response.data.results);
    } catch (error) {
      // alert("가져오기 실패");
    }
  }

  const handleSelectChatRoomToggle = (i: number) => {
    if (chatUser === null) {
      setChatUser(chatData[i].id);

      setIsChatRoomVisible(true);
    } else {
      setChatUser(null);
      setIsChatRoomVisible(false);
    }
  };
  async function handleLeaveChatRoom() {
    if (chatUser !== null) {
      try {
        await instance.delete(
          `chat/chatrooms/${chatUser}/leave/${myId}/`,
          headers,
        );
        window.confirm("정말 채팅방을 나가시겠습니까?");
        alert("채팅방을 나갔습니다");
        getList();
      } catch (error) {
        alert("채팅방 나가기 오류");
        setChatUser(null);
      }
    } else {
      setChatUser(null);
      alert("채팅방을 눌러야 삭제됩니다.");
      alert("채팅방이 연결했습니다.");
    }
  }

  return (
    <div className={styles.chatListContainer}>
      {Array.isArray(chatData) &&
        chatData.map(function (e: any, i: number) {
          return (
            <div className={styles.chatListBox} key={i}>
              <div
                className={
                  chatUser == e.id ? styles.checkedRoom : styles.chatList
                }
                key={e.id}
                onClick={() => {
                  handleSelectChatRoomToggle(i);
                }}
              >
                <div className={styles.chatImg}>
                  <img
                    style={{
                      width: "50px",
                      height: "50px",
                      boxSizing: "border-box",
                      borderRadius: "50%",
                    }}
                    src={e.participant_data[0].profile_image}
                    alt=""
                  />
                </div>
                <div className={styles.chatNameBox}>
                  <div className={styles.chatContent}>{e.name}</div>
                  <div className={styles.chatUser}>
                    {e.participant_data[0].nickname}
                  </div>
                </div>
                {/* 나가기버튼 */}
                <FaSignOutAlt
                  onClick={() => {
                    handleLeaveChatRoom();
                  }}
                  style={{
                    width: "20px",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}
