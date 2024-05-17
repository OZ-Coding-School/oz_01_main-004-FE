import { ChangeEvent, FormEvent, useState } from "react";
import instance from "../../../api/axios";
import styles from "../index.module.css";
export default function CreateChat() {
  const [roomName, setRoomName] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<number[]>([]);

  const myId = localStorage.getItem("id");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await instance.post(
        "chat/chatrooms/",
        {
          name: roomName,
          participant: memberId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        },
      );
      console.log("룸생성 성공", response.data);
    } catch (error) {
      console.error("룸생성 실패", error);
      console.log(roomName, memberId);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRoomName(value === "" ? null : value);
  };

  return (
    <div>
      <form className={styles.createRoomForm} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="채팅방 이름"
          value={roomName == null ? "" : roomName}
          onChange={handleInputChange}
        />
        {/* <input type="number" placeholder="첫째 채팅멤버ID" />
        <input type="number" placeholder="둘째 채팅멤버ID" /> */}
        <button className={styles.createRoomSubmit}>생성</button>
      </form>
    </div>
  );
}

//