//user가 로그인하면 들어오는 정보
export type AuthData = {
  nickname: string | null;
  refresh: string | null;
  access: string | null;
  id: number | string | null;
} | null;
//로그인 할 때 getItem (위에껀 빌 수 있을 때 , 밑은 무조건 있을 때)
export type getAuthData = {
  nickname: string;
  refresh: string;
  access: string;
};

export type setUserInfoType =
  React.Dispatch<React.SetStateAction<AuthData> | null>;
//UserContext의 타입
export interface UserContextType {
  userInfo: AuthData | null;
  setUserInfo: React.Dispatch<React.SetStateAction<AuthData> | null>;
}
