import axios from "axios";
import { useLoadingStore } from "../../store/loading_store";

// Axios 인스턴스 생성
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
// Zustand 스토어에서 `setIsLoading` 함수 가져오기
const { setIsLoading } = useLoadingStore.getState(); // 상태 가져오기

// 요청 인터셉터
// instance.interceptors.request.use((config) => {
//   setIsLoading(true);
//   // 폼 데이터를 보낼 때만 Content-Type을 "multipart/form-data"로 설정
//   if (config.data instanceof FormData) {
//     config.headers["Content-Type"] = "multipart/form-data";
//   } else {
//     config.headers["Content-Type"] = "application/json";
//   }

//   // 액세스 토큰을 헤더에 추가
//   const accessToken = localStorage.getItem("access");
//   if (accessToken) {
//     config.headers["Authorization"] = `Bearer ${accessToken}`;
//   }
//   return config;
// });

// 응답 인터셉터
// instance.interceptors.response.use(
//   (response) => {
//     setIsLoading(false);
//     return response;
//   },
//   async (error) => {
//     setIsLoading(false);
//     if (error.response && error.response.status === 401) {
//       //ㅅ
//       // localStorage.removeItem("access");
//       const response = await instance.post("users/token-refresh/", {
//         refresh: localStorage.getItem("refresh"),
//       });
//       const newAccessToken = response.data.access;
//       localStorage.setItem("access", newAccessToken);
//     }
//   },
// );

instance.interceptors.response.use(
  (response) => {
    setIsLoading(false);
    return response;
  },
  async (error) => {
    setIsLoading(false);
    //에러처리

    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          try {
            const response = await instance.post("users/token-refresh/", {
              refresh: localStorage.getItem("refresh"),
            });
            const newAccessToken = response.data.access;
            localStorage.setItem("access", newAccessToken);
            // 원래 요청을 재시도합니다.
            error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return instance(error.config);
          } catch (refreshError) {
            console.error("토큰 갱신 실패:", refreshError);
            // 추가적인 에러 처리 (예: 사용자에게 로그인 요청)
            return Promise.reject(refreshError);
          }
          break;
        case 403:
          // console.error("403 Forbidden error:", error.response.data);
          alert("접근 권한이 없습니다.");
          break;
        case 402:
          // console.error("402 Payment Required error:", error.response.data);
          alert("결제가 필요합니다.");
          break;
        case 400:
          // console.error(`Error ${status}:`, error.response.data);
          break;
        default:
          // console.error(`Error ${status}:`, error.response.data);
          break;
      }
    } else if (error.request) {
      console.error("No response received:", error.request);
      alert("서버로부터 응답이 없습니다.");
    } else {
      console.error("Request setup error:", error.message);
      // alert("요청 설정 중 오류가 발생했습니다.");
    }

    return Promise.reject(error);
  },
);

export default instance;
