import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../../../api/axios";
import setAuthDataToLocalStorage from "../set_auth_to_local/set_auth_to_local";

export default function KakaoRedirect() {
  const navigate = useNavigate();
  // const code = window.location.search;
  const location = useLocation();
  const from = location?.state?.redirectedFrom?.pathname || "/";

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
      // console.log(response.data);
      // 예를 들어, 토큰을 로컬 스토리지에 저장하고 메인 페이지로 이동
      setAuthDataToLocalStorage;
      alert(response.data.message);
      window.location.href = from;
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
