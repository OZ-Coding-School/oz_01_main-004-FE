import axios from "axios";
import { useIssueStore, useLoadingStore } from "../../store/loading_store";
import logoutHandler from "../components/nav/logout_handler";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Zustand 스토어에서 `setIsLoading` 함수 가져오기
const { setIsLoading } = useLoadingStore.getState(); // 상태 가져오기
const { setIsIssue } = useIssueStore.getState();

instance.interceptors.response.use(
  (response) => {
    setIsLoading(false);
    return response;
  },
  async (error) => {
    setIsLoading(false);
    // 에러 처리
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          localStorage.removeItem("access");
          const access = localStorage.getItem("access");
          if (access) {
            try {
              const response = await instance.post("users/token-refresh/", {
                refresh: localStorage.getItem("refresh"),
              });
              const newAccessToken = response.data.access;
              // 원래 요청을 재시도합니다.
              // 새 토큰으로 원래 요청을 업데이트하고 다시 시도합니다.
              localStorage.setItem("access", newAccessToken);
              error.config.headers[
                "Authorization"
              ] = `Bearer ${newAccessToken}`;
              return instance(error.config);
            } catch {
              logoutHandler();
              setIsIssue(true);
            }
          }
          break;
        case 403:
          console.error("403 Forbidden error:", error.response.data);
          alert("접근 권한이 없습니다.");
          break;
        case 402:
          console.error("402 Payment Required error:", error.response.data);
          alert("결제가 필요합니다.");
          break;
        case 400:
          console.error(`Error ${status}:`, error.response.data);
          break;
        default:
          console.error(`Error ${status}:`, error.response.data);
          break;
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
      alert("서버로부터 응답이 없습니다.");
    } else {
      console.error("Request setup error:", error.message);
      alert("요청 설정 중 오류가 발생했습니다.");
    }

    return Promise.reject(error);
  },
);

export default instance;
