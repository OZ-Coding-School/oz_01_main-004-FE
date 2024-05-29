import { ChangeEvent, FormEvent, useState } from "react";
import instance from "../../../api/axios";
import styles from "../index.module.css";
export default function CreateChatRoom() {
  const [roomName, setRoomName] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<number[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await instance.post("chat/chatrooms/", {
        name: roomName,
        participant: memberId,
      });
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
    <div className={styles.createRoomContainer}>
      <form className={styles.createRoomForm} onSubmit={handleSubmit}>
        <div className={styles.createFormCenter}>
          <input
            style={{
              width: "200px",
              height: "30px",
              borderRadius: "8px",
              border: "1px solid gray",
            }}
            type="text"
            placeholder="채팅방 이름"
            value={roomName == null ? "" : roomName}
            onChange={handleRoomName}
          />
          <div>
            <input
              style={{
                width: "200px",
                height: "30px",
                borderRadius: "8px",
                border: "1px solid gray",
              }}
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
