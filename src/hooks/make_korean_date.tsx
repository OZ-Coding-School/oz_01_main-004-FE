//한국날짜 , 년부터
export default function convertToKoreanTime(utcDateTime: string | undefined) {
  // "T"를 제거하여 UTC 형식의 문자열로 변환
  if (utcDateTime) {
    const utcTimeWithoutT = utcDateTime.replace("T", " ");

    // UTC 시간을 JavaScript의 Date 객체로 변환
    const utcTime = new Date(utcTimeWithoutT);

    // +9시간을 더하여 한국 시간으로 변환
    const koreanTime = new Date(utcTime.getTime() + 9 * 60 * 60 * 1000);

    // 한국 시간의 년, 월, 일, 시, 분을 가져옴
    const koreanYear = koreanTime.getFullYear();
    const koreanMonth = koreanTime.getMonth() + 1; // 월은 0부터 시작하므로 1을 더함
    const koreanDay = koreanTime.getDate();
    const koreanHour = koreanTime.getHours();
    const koreanMinute = koreanTime.getMinutes();

    // 한국 시간을 문자열로 표시
    const koreanTimeString = `${koreanYear}-${koreanMonth}-${koreanDay} ${koreanHour}:${koreanMinute}`;
    return koreanTimeString;
  }
}

//날짜 , 시간까지만
export function noneYearToKorean(dateString: string) {
  const date = new Date(dateString);
  // const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  // const seconds = String(date.getSeconds()).padStart(2, "0");

  // 한국 날짜 포맷으로 문자열 생성
  return `${month}-${day} ${hours}:${minutes}`;
}
