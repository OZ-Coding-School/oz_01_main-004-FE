import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../api/axios";

export default function KakaoRedirect() {
  const navigate = useNavigate();
  // const code = window.location.search;

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
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("nickname", response.data.user.nickname);
      alert(response.data.message);
      window.location.href = "/";
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

  // if (code) {
  //   loginWithKakao();
  // } else {
  //   console.error("코드가 없습니다.");
  //   alert("잘못된 접근입니다.");
  //   navigate("/login");
  // }

  return <div>카카오 로그인중입니다.</div>;
}
