import { useLoadingStore } from "../../store/loading_store";
import instance from "./axios";

export const getNewAccessToken = async () => {
  const { setIsLoading } = useLoadingStore.getState(); // 상태 가져오기
  try {
    const response = await instance.post("users/token-refresh/", {
      refresh: localStorage.getItem("refresh"),
    });
    const newAccessToken = response.data.access;
    localStorage.setItem("access", newAccessToken);
    setIsLoading(false);
    return newAccessToken;
  } catch (error) {
    console.error("Refresh token error:", error);
    await instance.post("users/sign-out/", {
      refresh: localStorage.getItem("refresh"),
    });
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("id");
    localStorage.removeItem("nickname");
    alert("토큰 삭제합니다.");
    throw error;
  }
};
