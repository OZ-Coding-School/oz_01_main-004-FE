import axios from "axios";
import { useLoadingStore } from "../../store/loading_store";
import { getNewAccessToken } from "./get_new_access";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Zustand 스토어에서 `setIsLoading` 함수 가져오기
const { setIsLoading } = useLoadingStore.getState(); // 상태 가져오기

// 요청 인터셉터
instance.interceptors.request.use((config) => {
  // 요청을 보내기 전에 로딩 상태를 true로 변경
  setIsLoading(true);
  const accessToken = localStorage.getItem("access");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    config.withCredentials = true;
  }

  // 폼 데이터를 보낼 때만 Content-Type을 "multipart/form-data"로 설정
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    // 그 외의 경우에는 "application/json"을 사용
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    // 응답이 성공적일 경우 로딩 상태를 false로 변경
    setIsLoading(false);
    return response;
  },
  (error) => {
    setIsLoading(false);
    if (error.response) {
      // 서버가 응답을 반환했지만 상태 코드가 2xx 범위에 있지 않음
      const status = error.response.status;
      if (status === 401) {
        getNewAccessToken();
        // console.error("401 Unauthorized error:", error.response.data);
      } else if (status === 403) {
        console.error("403 Forbidden error:", error.response.data);
        alert("접근 권한이 없습니다.");
      } else if (status === 402) {
        // 402 Payment Required 에러 처리
        console.error("402 Payment Required error:", error.response.data);
        alert("결제가 필요합니다.");
      } else {
        // 그 외의 에러 처리
        console.error(`Error ${status}:`, error.response.data);
        // alert(`오류가 발생했습니다: ${status}`);
      }
    } else if (error.request) {
      // 요청이 이루어졌으나 서버로부터 응답이 없었음
      console.error("No response received:", error.request);
      alert("서버로부터 응답이 없습니다.");
    } else {
      // 요청을 설정하는 중에 오류가 발생함
      console.error("Request setup error:", error.message);
      alert("요청 설정 중 오류가 발생했습니다.");
    }
    return Promise.reject(error);
  },
);

export default instance;
