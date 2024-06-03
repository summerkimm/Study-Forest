const CurrentDateTime = () => {
  const now = new Date();

  // 날짜를 YYYY-MM-DD 형식으로 포맷팅
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");

  // 시간을 HH:MM 형식으로 포맷팅
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "오후" : "오전";
  hours = hours % 12;
  hours = hours ? hours : 12; // 0이면 12로 변경

  // 결과 문자열 조합
  const formattedDate = `${year}-${month}-${date}`;
  const formattedTime = `${ampm} ${hours}:${minutes}`;

  return `${formattedDate} ${formattedTime}`;
};

export default CurrentDateTime;
