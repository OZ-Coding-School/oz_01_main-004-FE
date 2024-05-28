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
  setIsLoading(true);
  //getNewAccessToken 리프레쉬토큰을 받아올 떄 헤더에 실어줘야하는데, 그로직이 안된다.
  //getNewAccessToken에서 진행한 것을 헤더에 담아줘야 한다.
  // 폼 데이터를 보낼 때만 Content-Type을 "multipart/form-data"로 설정
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  } else {
    config.headers["Content-Type"] = "application/json";
  }

  // 액세스 토큰을 헤더에 추가
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    setIsLoading(false);
    return response;
  },
  async (error) => {
    setIsLoading(false);

    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await getNewAccessToken();

        // 새로운 액세스 토큰으로 헤더를 업데이트
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        // 원래 요청을 새로운 토큰으로 재시도
        return instance(originalRequest);
      } catch (tokenRefreshError) {
        // 토큰 갱신 에러 처리
        const refresh = localStorage.getItem("refresh");
        await instance.post("users/sign-out/", {
          refresh,
        });
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("nickname");
        localStorage.removeItem("id");
        alert("오류로 인해 로그아웃 되었습니다. 다시 입장해주세요");
        console.error("Token refresh error:", tokenRefreshError);
        return Promise.reject(tokenRefreshError);
      }
    }
    //에러처리
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 403:
          console.error("403 Forbidden error:", error.response.data);
          alert("접근 권한이 없습니다.");
          break;
        case 402:
          console.error("402 Payment Required error:", error.response.data);
          alert("결제가 필요합니다.");
          break;
        case 400:
          // alert("내가 작성할 게시물을 찜할 수 없습니다.");
          alert(error.response.data.message);
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
