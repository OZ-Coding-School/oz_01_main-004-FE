import { FormEvent, useContext, useEffect, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/authuser";
import { UserContextType } from "../../type/user";
import Button from "../Button/Button";
import NevMypage from "./loginmypage/nevmypage";
import logoutHandler from "./logout_handler";
import styles from "./nav.module.css";

export default function Nav(): JSX.Element {
  const { userInfo, setUserInfo } = useContext(UserContext) as UserContextType;
  const [isLogin, setIsLogin] = useState<boolean>(
    userInfo?.access ? true : false,
  );
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  //검색제출
  function submitSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate(`community/${searchValue}/1/1/1/1`);
  }

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
          logoutHandler(navigate, setUserInfo, isLogin);
        }, 13 * 24 * 60 * 60 * 1000); // 13일 뒤에 로그아웃됩니다.
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

  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.mainContainer}>
          <div className={styles.navContainer}>
            <div>
              <Link
                to="/"
                className={styles.logo}
                onClick={() => {
                  setSearchValue("");
                }}
              >
                CookBap
              </Link>
            </div>
            <div>
              <div className={styles.searchBox}>
                <form onSubmit={submitSearch}>
                  <input
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                    className={styles.searchBar}
                  ></input>
                </form>
              </div>
            </div>
            <div className={styles.rightContent}>
              <Link
                to="/community/"
                onClick={() => {
                  setSearchValue("");
                }}
                className={styles.community}
              >
                커뮤니티
              </Link>
              <BsChatDots
                className={styles.chat}
                style={{ width: "25px", height: "50px" }}
                onClick={() => {
                  navigate("/chat");
                  setSearchValue("");
                }}
              />
              {isLogin ? (
                <NevMypage
                  onClick={() => {
                    logoutHandler(navigate, setUserInfo, isLogin);
                    setSearchValue("");
                  }}
                />
              ) : (
                <button
                  className={styles.login}
                  onClick={() => {
                    navigate("/login");
                    setSearchValue("");
                  }}
                >
                  로그인
                </button>
                // <Button
                //   size="sm"
                //   variant="secondary"
                //   onClick={() => {
                //     navigate("/login");
                //     setSearchValue("");
                //   }}
                // >
                //   로그인
                // </Button>
              )}
              <Button size="sm" variant="primary">
                글쓰기
              </Button>
              {/* <Link to="/postWrite"></Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
