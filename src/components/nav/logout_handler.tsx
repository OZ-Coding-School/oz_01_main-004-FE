import { NavigateFunction } from "react-router-dom";
import instance from "../../api/axios";
import { AuthData } from "../../type/user";

export default async function logoutHandler(
  navigate: NavigateFunction,
  setUserInfo: React.Dispatch<React.SetStateAction<AuthData>>,
  isLogin: boolean,
) {
  if (isLogin) {
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
      setUserInfo(null);
      navigate("/login");
    } catch (error) {
      alert("로그아웃 실패");
    }
  }
}
