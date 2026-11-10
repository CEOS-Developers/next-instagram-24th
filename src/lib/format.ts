// 화면 표시용 포맷 함수

// "2026년 11월 7일" 형태로 표시
// 서버/클라이언트 결과가 달라지지 않도록 시간대를 서울로 고정합니다.
// ("3시간 전" 같은 상대 시간은 현재 시각에 따라 결과가 바뀌어 서버 렌더링과 어긋나기 쉬워서 쓰지 않음)
const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  year: "numeric",
  month: "long",
  day: "numeric",
});

export function formatDate(iso: string) {
  return dateFormatter.format(new Date(iso));
}

// 1284 → "1,284", 15200 → "1.5만"
export function formatCount(count: number) {
  if (count >= 10000) {
    return `${(count / 10000).toFixed(1).replace(/\.0$/, "")}만`;
  }
  return count.toLocaleString("ko-KR");
}
