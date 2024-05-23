import { useEffect, useState } from "react";
import instance from "../../../api/axios";
import { useChatContext } from "../../../context/chatuser";
import styles from "../index.module.css";
export default function GetMyChatList() {
  const [chatData, setChatData]: any = useState([]);

  const { chatUser, setChatUser } = useChatContext();
  const [, setIsChatRoomVisible] = useState(false);

  useEffect(() => {
    getList();
  }, []);

  async function getList() {
    try {
      const response = await instance.get("chat/chatrooms/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      setChatData(response.data.results);

      // console.log(response.data);
    } catch (error) {
      alert("가져오기 실패");
    }
  }

  const handleChatRoomToggle = (i: number) => {
    if (chatUser === null) {
      setChatUser(chatData[i].id);
      console.log(chatData[i].id);
      console.log(chatUser);
      setIsChatRoomVisible(true);
    } else {
      setChatUser(null);
      setIsChatRoomVisible(false);
    }
  };

  return (
    <div>
      {Array.isArray(chatData) &&
        chatData.map(function (e: any, i: number) {
          return (
            <div
              className={styles.chatList}
              key={i}
              onClick={() => {
                handleChatRoomToggle(i);
              }}
            >
              <div className={styles.chatImg}>
                <img
                  style={{ width: "50px" }}
                  src={
                    e.participant_data[1].profile_image !== null
                      ? e.participant_data[1].profile_image
                      : "/mypage/basicprofile.png"
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
            </div>
          );
        })}
    </div>
  );
}
