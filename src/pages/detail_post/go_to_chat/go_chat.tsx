import instance from "../../../api/axios";

export const goToChat = async (
  memberId: (string | null)[],
  writerNickName: string,
) => {
  try {
    await instance.post("chat/chatrooms/", {
      name: `${writerNickName} 채팅방`,
      participant: memberId,
    });
    alert("채팅방이 생성 되었습니다");
  } catch (error) {
    console.error("채팅방 생성 실패", error);
  }
};
