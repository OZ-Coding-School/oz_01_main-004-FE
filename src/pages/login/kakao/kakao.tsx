import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../api/axios";
import { UserContext } from "../../../context/authuser";
import { UserContextType } from "../../../type/user";
import setAuthDataToLocalStorage from "../set_auth_to_local/set_auth_to_local";

export default function KakaoRedirect() {
  const navigate = useNavigate();
  const getBeforeLoginPage = sessionStorage.getItem("beforeLogin");
  const from = getBeforeLoginPage ? getBeforeLoginPage : "/";
  const { setUserInfo } = useContext(UserContext) as UserContextType;
  const code = new URL(window.location.href).searchParams.get("code");

  const loginWithKakao = async () => {
    try {
      const response = await instance.post(
        "users/kakao/sign-in/",
        { code: code },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      const { access, refresh } = response.data;
      const { nickname, id } = response.data.user;
      setAuthDataToLocalStorage;
      const userData = setAuthDataToLocalStorage({
        refresh: refresh,
        access: access,
        nickname: nickname,
        id: id,
      });
      setUserInfo(userData);
      alert(response.data.message);
      navigate(`${from}`);
      setTimeout(function () {
        sessionStorage.removeItem("beforeLogin");
      }, 3 * 60 * 1000);
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패. 다시 시도해주세요.");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (code) {
      loginWithKakao();
    }
  }, []);

  return <div>카카오 로그인중입니다.</div>;
}
