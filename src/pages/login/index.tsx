import { FormEvent, useContext, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import UserContext from "../../context/authuser";
import styles from "./index.module.css";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const { setUserInfo }: any = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.redirectedFrom?.pathname || "/";

  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&prompt=select_account`;

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // console.log(location);

  function setAuthDataToLocalStorage(data: {
    refresh: string;
    access: string;
    user: { nickname: string };
  }) {
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    localStorage.setItem("nickname", data.user.nickname);
    return data;
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await instance.post("users/sign-in/", {
        email,
        password,
      });
      const { access, refresh } = response.data;
      const { nickname } = response.data.user;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("nickname", nickname);
      const userData = setAuthDataToLocalStorage({
        refresh: refresh,
        access: access,
        user: {
          nickname: nickname,
        },
      });
      setUserInfo(userData);
      alert(response.data.message);
      navigate(from);
    } catch (error) {
      alert("유효하지 않은 계정입니다.");
    }
  };
  //로그인 유무 확인
  //   const isLogin = !!localStorage.getItem("refreshToken");
  //   if (isLogin) {
  //     return <Navigate to="/" replace />;
  //   }

  const hndleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.logo}>(CookBap)</div>
        <form
          className={styles.loginForm}
          name="login-form"
          onSubmit={handleSubmit}
        >
          <Input
            inputSize="sm"
            variant="primary"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <div>
            <Input
              inputSize="sm"
              variant="primary"
              type={showPassword ? "text" : "password"}
              placeholder="Password "
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <Button size="sm" variant="primary" value="Login" type="submit">
            로그인
          </Button>
        </form>
        <div className={styles.bottomContents}>
          <div onClick={hndleKakaoLogin}>
            <img src="/kakao_login/ko/kakao_login_medium_wide.png"></img>
          </div>
          <div className={styles.linkContainer}>
            <Link to="/signup" className={styles.linkButton}>
              회원가입
            </Link>
            <Link to="/signup" className={styles.linkButton}>
              비밀번호 찾기
            </Link>
            <Button size="sm" variant="primary" onClick={toggleShowPassword}>
              {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
            </Button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
