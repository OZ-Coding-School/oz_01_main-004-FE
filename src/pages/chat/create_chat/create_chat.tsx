import { ChangeEvent, FormEvent, useState } from "react";
import instance from "../../../api/axios";
import styles from "../index.module.css";
export default function CreateChat() {
  const [roomName, setRoomName] = useState<string | null>(null);
  const [memberId] = useState<number[]>([8]);

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
      alert("채팅방이 개설되었습니다.");
      window.location.reload();
    } catch (error) {
      console.error("룸생성 실패", error);
    }
  };
  //수정 더 필요함. (빌드를 위해 serMemberId 함수를 썼을 뿐임.)
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
        <button className={styles.createRoomSubmit}>생성</button>
      </form>
    </div>
  );
}

//
