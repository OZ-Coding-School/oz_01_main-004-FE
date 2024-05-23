import { createContext, useContext, useState } from "react";

// UserContext 타입 정의
interface chatContextType {
  chatUser: number | null;
  setChatUser: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ChatContext = createContext<chatContextType>({
  chatUser: null,
  setChatUser: () => {},
});
// AuthProvider를 생성합니다.
export default function ChatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useState 훅을 사용하여 상태를 관리합니다.
  const [chatUser, setChatUser] = useState<number | null>(null);

  return (
    <ChatContext.Provider value={{ chatUser, setChatUser }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return useContext(ChatContext);
};
