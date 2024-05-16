import instance from "./axios";

export const getNewAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh");
  try {
    const response = await instance.post("users/token-refresh/", {
      refresh: refreshToken,
    });
    localStorage.setItem("access", response.data.access);
  } catch (error) {
    console.error("Refresh token error:", error);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    alert("토큰 삭제합니다.");
    throw error;
  }
};
