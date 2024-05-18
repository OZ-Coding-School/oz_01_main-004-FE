export default function setAuthDataToLocalStorage(data: {
  refresh: string;
  access: string;
  user: { nickname: string; id: string };
}) {
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  localStorage.setItem("nickname", data.user.nickname);
  localStorage.setItem("id", data.user.id);
  return data;
}
