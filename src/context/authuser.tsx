import { createContext, useState } from "react";
import getAuthDataFromLocalStorage from "../pages/login/get_auth_from_local/get_auth_from_local";
import { AuthData } from "../type/user";

// const UserContext = createContext<UserContextType | null>(null);
// export default UserContext;

export const UserContext = createContext<{
  userInfo: AuthData | null;
  setUserInfo: React.Dispatch<React.SetStateAction<AuthData | null>>;
}>({
  userInfo: null,
  setUserInfo: () => {},
});
// AuthProvider를 생성합니다.
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // useState 훅을 사용하여 상태를 관리합니다.
  const [userInfo, setUserInfo] = useState<AuthData | null>(
    getAuthDataFromLocalStorage(),
  );

  return (
    // UserContext.Provider를 사용하여 전역 상태를 설정합니다.
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
