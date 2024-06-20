import instance from "../../api/axios";

export default async function logoutHandler() {
  // const { setIsIssue } = useIssueStore.getState();
  try {
    const refresh = localStorage.getItem("refresh");
    await instance.post("users/sign-out/", {
      refresh,
    });
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("nickname");
    localStorage.removeItem("id");
    alert("로그아웃 되었습니다.");
  } catch (error) {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("nickname");
    localStorage.removeItem("id");
    console.log("강제삭제");
    location.reload();
  }
}
