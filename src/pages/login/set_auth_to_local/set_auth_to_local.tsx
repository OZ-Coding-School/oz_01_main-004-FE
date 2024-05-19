export default function setAuthDataToLocalStorage(data: {
  refresh: string;
  access: string;
  nickname: string;
  id: string;
}) {
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  localStorage.setItem("nickname", data.nickname);
  localStorage.setItem("id", data.id);
  return data;
}
