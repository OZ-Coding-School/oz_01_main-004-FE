import { useContext, useEffect, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/authuser";
import { UserContextType } from "../../type/user";
import Button from "../Button/Button";
import SearchBar from "../searchbar/searchbar";
import NevMypage from "./loginmypage/nevmypage";
import logoutHandler from "./logout_handler";
import styles from "./nav.module.css";

export default function Nav(): JSX.Element {
  const { userInfo, setUserInfo } = useContext(UserContext) as UserContextType;
  const [isLogin, setIsLogin] = useState<boolean>(
    userInfo?.access ? true : false,
  );
  const navigate = useNavigate();
  const [, setSearchValue] = useState("");
  //검색제출
  // function submitSearch(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   navigate(`community/${searchValue}/1/1/1/1`);
  // }

  useEffect(() => {
    userInfo == null ? setIsLogin(false) : setIsLogin(true);
  }, [userInfo]);

  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.navContainer}>
          <div className={styles.logoContainer}>
            <Link
              to="/"
              className={styles.logo}
              onClick={() => {
                setSearchValue("");
              }}
            >
              <img
                className={styles.logoImg}
                src="https://cookbap-bucket.s3.ap-northeast-2.amazonaws.com/cookbap/main/cookbap_main_logo.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className={styles.searchBox}>
            <SearchBar />
          </div>
          <div className={styles.rightContent}>
            <div className={styles.rightbox}>
              <Link
                to="/community"
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
                    logoutHandler().then(() => {
                      setUserInfo(null);
                      setSearchValue("");
                      navigate("/login");
                    });
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
              )}
              <Button
                size="sm"
                variant="primary"
                onClick={() => navigate("/writePost")}
              >
                글쓰기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
