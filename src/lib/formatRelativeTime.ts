const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

/*
 * 게시 시각을 인스타그램 피드처럼 짧은 상대 시간으로 바꾼다.
 * 예: "방금", "5분", "3시간", "2일", "2주", 4주가 넘으면 "10월 23일"
 */
export default function formatRelativeTime(value: string, now = Date.now()) {
  const date = new Date(value);
  const diff = now - date.getTime();

  if (diff < MINUTE) return '방금';
  if (diff < HOUR) return `${Math.floor(diff / MINUTE)}분`;
  if (diff < DAY) return `${Math.floor(diff / HOUR)}시간`;
  if (diff < WEEK) return `${Math.floor(diff / DAY)}일`;
  if (diff < 4 * WEEK) return `${Math.floor(diff / WEEK)}주`;

  const sameYear = date.getFullYear() === new Date(now).getFullYear();
  return new Intl.DateTimeFormat('ko-KR', {
    timeZone: 'Asia/Seoul',
    ...(sameYear ? {} : { year: 'numeric' }),
    month: 'long',
    day: 'numeric',
  }).format(date);
}
