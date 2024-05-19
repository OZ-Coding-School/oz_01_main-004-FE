import { Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/nav/nav";
import AuthProvider from "./context/authuser";
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

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="/oauth2/redirect" element={<KakaoRedirect />}></Route>
          <Route
            path="/community/:search/:type/:ingredient/:level/:page"
            element={<Community />}
          ></Route>
          <Route path="/detailPost/:id" element={<DetailPost />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
          <Route path="/findPassword" element={<FindPassword />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/chat" element={<Chat />}></Route>
            <Route path="/myPage" element={<MyPage />}></Route>
            <Route path="/writePost" element={<WritePost />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
