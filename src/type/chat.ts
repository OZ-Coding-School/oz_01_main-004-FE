export interface Message {
  content: string;
  sender: string;
  senderNickname?: string;
  createdAt: string;
}

export interface HandleSubmitProps {
  webSocket: React.MutableRefObject<WebSocket | null>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  myId: string | null;
  chatUser: string | null;
}

export interface getMessagesProps {
  getMessages: Message[];
  setGetMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export interface GetMessagesOfChatroomProps {
  getMessages: Message[];
  setGetMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  pageNum: number;
  setPageNum: React.Dispatch<React.SetStateAction<number>>;
}
