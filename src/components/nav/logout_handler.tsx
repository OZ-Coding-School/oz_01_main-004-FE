import instance from "../../api/axios";

export default async function logoutHandler() {
  try {
    const refresh = localStorage.getItem("refresh");

    if (!refresh) {
      throw new Error("리프레쉬 토큰 없음");
    }
    await instance.post("users/sign-out/", {
      refresh,
    });
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("nickname");
    localStorage.removeItem("id");
    alert("로그아웃 되었습니다.");
  } catch (error) {
    alert("로그아웃 실패");
  }
}
