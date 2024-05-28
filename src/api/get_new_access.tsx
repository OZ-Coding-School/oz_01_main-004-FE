import instance from "./axios";

export const getNewAccessToken = async () => {
  try {
    const response = await instance.post("users/token-refresh/", {
      refresh: localStorage.getItem("refresh"),
    });
    const newAccessToken = response.data.access;
    localStorage.setItem("access", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Refresh token error:", error);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("id");
    localStorage.removeItem("nickname");
    // alert("토큰 삭제합니다.");
    throw error;
  }
};
