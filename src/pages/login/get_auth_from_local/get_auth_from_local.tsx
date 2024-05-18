import { AuthData } from "../../../type/user";

export default function getAuthDataFromLocalStorage(): AuthData | null {
  let isAuth = true;
  const result = {
    id: localStorage.getItem("id"),
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
