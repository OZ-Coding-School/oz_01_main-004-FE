import { ChangeEvent, FormEvent, useState } from "react";
import instance from "../../../api/axios";
import styles from "../index.module.css";
export default function CreateChat() {
  const [roomName, setRoomName] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<number[]>([]);

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
  const handleRoomName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRoomName(value === "" ? null : value);
  };
  const handleMemberId = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const ids = value.split(",").map((id) => parseInt(id.trim(), 10));
    setMemberId(ids);
  };

  return (
    <div>
      <form className={styles.createRoomForm} onSubmit={handleSubmit}>
        <div className={styles.createFormCenter}>
          <input
            style={{ width: "200px", height: "30px" }}
            type="text"
            placeholder="채팅방 이름"
            value={roomName == null ? "" : roomName}
            onChange={handleRoomName}
          />
          <div>
            <input
              style={{ width: "200px", height: "30px" }}
              type="text"
              placeholder="유저ID ex)1,2,3"
              onChange={handleMemberId}
            />
          </div>
          <button className={styles.createRoomSubmit}>생성</button>
        </div>
      </form>
    </div>
  );
}
