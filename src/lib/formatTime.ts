const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

/** 인스타그램처럼 경과 시간을 짧게 표시합니다. 예: "5분", "3시간", "2일", "11주" */
export function formatRelativeTime(isoDate: string, now: number): string {
  const elapsed = Math.max(0, now - new Date(isoDate).getTime());

  if (elapsed < MINUTE) return "방금 전";
  if (elapsed < HOUR) return `${Math.floor(elapsed / MINUTE)}분`;
  if (elapsed < DAY) return `${Math.floor(elapsed / HOUR)}시간`;
  if (elapsed < WEEK) return `${Math.floor(elapsed / DAY)}일`;
  return `${Math.floor(elapsed / WEEK)}주`;
}

const dateFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  month: "long",
  day: "numeric",
});

const fullDateFormatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "Asia/Seoul",
  dateStyle: "long",
});

/** 현재 시각과 상관없이 항상 같은 결과를 냅니다. 예: "11월 9일" */
export function formatDate(isoDate: string): string {
  return dateFormatter.format(new Date(isoDate));
}

/** 마우스를 올렸을 때 보여줄 전체 날짜입니다. 예: "2026년 11월 9일" */
export function formatFullDate(isoDate: string): string {
  return fullDateFormatter.format(new Date(isoDate));
}
