import { useContext, useEffect, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../api/axios";
import UserContext from "../../context/authuser";
import Button from "../Button/Button";
import styles from "./nav.module.css";

export default function Nav(): JSX.Element {
  const { userInfo, setUserInfo }: any = useContext(UserContext);
  const [isLogin, setIsLogin] = useState<boolean>(
    userInfo?.access ? true : false,
  );
  const navigate = useNavigate();

  useEffect(() => {
    userInfo == null ? setIsLogin(false) : setIsLogin(true);
  }, [userInfo]);

  //자동 로그아웃 구현
  useEffect(() => {
    let timeoutId: number;

    function resetTimeout() {
      clearTimeout(timeoutId);
      if (isLogin) {
        // isLogin이 true인 경우에만 타임아웃 설정
        timeoutId = setTimeout(() => {
          setIsLogin(false);
          logoutHandler();
        }, 13 * 24 * 60 * 1000); // 30분 후에 로그아웃됩니다.
      }
    }
    resetTimeout();
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keydown", resetTimeout);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keydown", resetTimeout);
    };
  }, [isLogin]);

  const logoutHandler = async () => {
    try {
      // const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");

      if (!refresh) {
        throw new Error("리프레쉬 토큰 없음");
      }
      const response = await instance.post(
        "users/sign-out/",
        {
          refresh,
        },
        // {
        //   headers: {
        //     Authorization: `Bearer ${access}`,
        //     "Content-Type": "application/json",
        //   },
        // },
      );
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("nickname");
      localStorage.removeItem("id");
      alert(response.data.message);
      setUserInfo(null);
      navigate("/login");
    } catch (error) {
      alert("로그아웃 실패");
    }
  };

  return (
    <div>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          CookBap
        </Link>
        <div>
          <div className={styles.searchBox}>
            <input className={styles.searchBar}></input>
          </div>
        </div>
        <div className={styles.rightContent}>
          <Link to="/community" className={styles.community}>
            커뮤니티
          </Link>
          <BsChatDots
            className={styles.chat}
            style={{ width: "25px", height: "50px" }}
            onClick={() => {
              navigate("/chat");
            }}
          />
          {isLogin ? (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                logoutHandler();
              }}
            >
              로그아웃
            </Button>
          ) : (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                navigate("/login");
              }}
            >
              로그인
            </Button>
          )}
          <Button size="sm" variant="primary">
            글쓰기
          </Button>
          {/* <Link to="/postWrite"></Link> */}
        </div>
      </div>
    </div>
  );
}