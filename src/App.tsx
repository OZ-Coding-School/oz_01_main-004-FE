import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Nav from "./components/nav/nav";
import UserContext from "./context/authuser";
import Chat from "./pages/chat";
import Community from "./pages/community";
import DetailPost from "./pages/detail_post";
import FindPassword from "./pages/find_password/find_password";
import Login from "./pages/login";
import KakaoRedirect from "./pages/login/kakao/kakao";
import Main from "./pages/main";
import MyPage from "./pages/mypage ";
import SignUp from "./pages/sign_up";
import WritePost from "./pages/write_post";
import PrivateRoute from "./privateroute/privateroute";
import { AuthData } from "./type/user";

//유저 정보 들어오는 곳
function getAuthDataFormLocalStorage(): AuthData {
  let isAuth = true;
  const result = {
    nickname: localStorage.getItem("nickname"),
    refresh: localStorage.getItem("refresh"),
    access: localStorage.getItem("access"),
  };

  Object.keys(result).forEach((key) => {
    if (result[key as keyof AuthData] === null) {
      isAuth = false;
    }
  });

  return isAuth ? result : null;
}

function App() {
  const [userInfo, setUserInfo] = useState<AuthData>(
    getAuthDataFormLocalStorage(),
  );

  return (
    <div className="App">
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="/oauth2/redirect" element={<KakaoRedirect />}></Route>
          <Route path="/community/:id" element={<Community />}></Route>
          <Route path="/detailPost/:id" element={<DetailPost />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/findPassword" element={<FindPassword />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/myPage" element={<MyPage />}></Route>
            <Route path="/writePost" element={<WritePost />}></Route>
          </Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
