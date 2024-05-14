import { FormEvent, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
// import UserContext from "../../context/authuser";
import styles from "./index.module.css";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  //   const { userInfo, setUserInfo }: any = useContext(UserContext);
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  //   function setAuthDataToLocalStorage(data: {
  //     refreshToken: string;
  //     accessToken: string;
  //     user: { nickname: string };
  //   }) {
  //     localStorage.setItem("accessToken", data.accessToken);
  //     localStorage.setItem("refreshToken", data.refreshToken);
  //     localStorage.setItem("nickname", data.user.nickname);
  //     return data;
  //   }

  //핸들서브밋 만들어야 함
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

      alert(response.data.message);
      navigate("/");
    } catch (error) {
      alert("유효하지 않은 계정입니다.");
    }
  };
  //로그인 유무 확인
  //   const isLogin = !!localStorage.getItem("refreshToken");
  //   if (isLogin) {
  //     return <Navigate to="/" replace />;
  //   }

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

          <Button size="sm" variant="primary" value="Login" type="submit">
            로그인
          </Button>
          <Button size="sm" variant="secondary" onClick={toggleShowPassword}>
            {showPassword ? <IoMdEye /> : <IoMdEyeOff />}
          </Button>
        </form>

        <div>
          <div className={styles.etcContainer}>
            <Link to="/" className={styles.linkButton}>
              아이디/비밀번호 찾기{" "}
            </Link>
            <Link to="/signup" className={styles.linkButton}>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
