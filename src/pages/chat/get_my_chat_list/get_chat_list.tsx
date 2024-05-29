import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import instance from "../../../api/axios";
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
      const response = await instance.get("chat/chatrooms/");
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
    try {
      await instance.delete(`chat/chatrooms/${chatUser}/leave/${myId}/`);
      window.confirm("정말 채팅방을 나가시겠습니까?");
      alert("채팅방을 나갔습니다");
      getList();
    } catch (error) {
      alert("채팅방을 누르고 삭제해주세요");
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
                    src={
                      e.participant_data[0].profile_image !== null &&
                      e.participant_data[0].profile_image !== undefined
                        ? e.participant_data[1].profile_image
                        : "/mypage/basicProfile.jpg"
                    }
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
