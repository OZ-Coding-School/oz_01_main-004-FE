import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav/\bnav";
import UserContext from "./context/authuser";
import Community from "./pages/community";
import DetailPost from "./pages/detail_post";
import Login from "./pages/login";
import Main from "./pages/main";
import MyInfo from "./pages/myinfo";
import SignUp from "./pages/sign_up";
import WritePost from "./pages/write_post";
import { AuthData } from "./type/user";

//유저 정보 들어오는 곳
function getAuthDataFormLocalStorage(): AuthData {
  let isAuth = true;
  const result = {
    nickname: localStorage.getItem("nickname"),
    refreshToken: localStorage.getItem("refreshToken"),
    accessToken: localStorage.getItem("accessToken"),
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
          <Route path="myInfo" element={<MyInfo />}></Route>
          <Route path="community:/id" element={<Community />}></Route>
          <Route path="detailPost/:id" element={<DetailPost />}></Route>
          <Route path="writePost/:id" element={<WritePost />}></Route>
          <Route path="signUp" element={<SignUp />}></Route>
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
