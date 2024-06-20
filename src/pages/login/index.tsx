import { FormEvent, useContext, useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import instance from "../../api/axios";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { UserContext } from "../../context/authuser";
import { UserContextType } from "../../type/user";
import styles from "./index.module.css";
import setAuthDataToLocalStorage from "./set_auth_to_local/set_auth_to_local";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(false);
  const { setUserInfo } = useContext(UserContext) as UserContextType;
  const location = useLocation();
  const navigate = useNavigate();

  //로그인 전 왔던 페이지
  const from = location?.state?.redirectedFrom?.pathname || "/";
  //카카오 관련
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&prompt=select_account`;
  //패스워드 보여주기
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setEyeIcon(!eyeIcon);
  };
  //로그인 폼 제출
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await instance.post("users/sign-in/", {
        email,
        password,
      });
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
      alert("로그인 되었습니다.");
      navigate(from);
      setTimeout(function () {
        sessionStorage.removeItem("beforeLogin");
      }, 10000);
    } catch (error) {
      alert("유효하지 않은 계정입니다.");
    }
  };
  //카톡 로그인 하면으로 보내기
  const hndleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };
  useEffect(() => {
    sessionStorage.setItem("beforeLogin", from);
    const isToken = !!localStorage.getItem("access");
    if (isToken) {
      navigate(from);
    }
  }, []);

  return (
    <div className={styles.bodyContainer}>
      <div className={styles.loginContainer}>
        <div className={styles.logo}>
          <img
            className={styles.logoImg}
            src="https://cookbap-bucket.s3.ap-northeast-2.amazonaws.com/cookbap/main/cookbap_main_logo.png"
            alt="logo"
          />
        </div>
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

          <PasswordInputContainer>
            <Input
              inputSize="sm"
              variant="primary"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <EyeIcon
              onClick={toggleShowPassword}
              as={eyeIcon ? IoMdEye : IoMdEyeOff}
            />
          </PasswordInputContainer>

          <Button size="sm" variant="primary" value="Login" type="submit">
            로그인
          </Button>
        </form>
        <div className={styles.bottomContents}>
          <div className={styles.linkContainer}>
            <Link to="/findPassword" className={styles.linkButton}>
              비밀번호 찾기
            </Link>
            <Link to="/signup" className={styles.linkButton}>
              회원가입
            </Link>
          </div>

          <div></div>
        </div>
      </div>
      <div className={styles.snsLogin}>
        <div className={styles.line}></div>
        <div className={styles.snsText}>SNS</div>
        <div className={styles.kakaoButton} onClick={hndleKakaoLogin}>
          <img
            style={{ cursor: "pointer", width: "300px", height: "44.67px" }}
            src="/kakao_login/ko/kakao_login_large_wide.png"
          ></img>
        </div>
      </div>
    </div>
  );
}

const PasswordInputContainer = styled.div`
  position: relative;
`;
const EyeIcon = styled(IoMdEyeOff)`
  position: absolute;
  top: 48%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;
