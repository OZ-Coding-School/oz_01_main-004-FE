//user가 로그인하면 들어오는 정보
export type AuthData = {
  nickname: string | null;
  refresh: string | null;
  access: string | null;
} | null;
//로그인 할 때 getItem (위에껀 빌 수 있을 때 , 밑은 무조건 있을 때)
export type getAuthData = {
  nickname: string;
  refresh: string;
  access: string;
};
//UserContext의 타입
export interface UserContextType {
  userInfo: AuthData | null;
  setUserInfo: React.Dispatch<React.SetStateAction<AuthData> | null>;
}

//회원가입시 들어가는 정보
export interface IFormInput {
  email: string;
  password1: string;
  password2: string;
  nickname: string;
  first_name: string;
  last_name: string;
  nationality: string;
  phone: string;
  date_of_birth: Date;
  profession: string;
}

//마이페이지 수정시 필요한 정보
export interface MyInfoInput {
  email: string;
  nickname: string;
  password1: string;
  password2: string;
  nationality: string;
  first_name: string;
  last_name: string;
  phone: string;
  date_of_birth: string;
  profession: string;
  profile_image: null;
  date_joined: string;
}
