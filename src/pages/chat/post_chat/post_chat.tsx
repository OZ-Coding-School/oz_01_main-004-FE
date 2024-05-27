import React, { FormEvent, useState } from "react";

import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { useChatContext } from "../../../context/chatuser";
import styles from "../index.module.css";

interface PostChatProps {
  webSocket: React.RefObject<WebSocket>;
}

export default function PostChat({ webSocket }: PostChatProps) {
  const [message, setMessage] = useState<string>("");
  const myId = localStorage.getItem("id");
  const { chatUser } = useChatContext();

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
  );
}
