"use client";

import { useSyncExternalStore } from "react";
import { formatDate, formatFullDate, formatRelativeTime } from "@/lib/formatTime";

// 현재 시각은 브라우저에서만 읽고, 1분마다 갱신합니다.
let cachedNow: number | null = null;

function subscribe(onChange: () => void) {
  const timer = window.setInterval(() => {
    cachedNow = Date.now();
    onChange();
  }, 60 * 1000);

  return () => window.clearInterval(timer);
}

function getSnapshot() {
  cachedNow ??= Date.now();
  return cachedNow;
}

// 서버(미리 렌더링)에서는 현재 시각을 쓰지 않습니다.
function getServerSnapshot() {
  return null;
}

export type RelativeTimeProps = {
  /** ISO 형식의 날짜 문자열입니다. */
  dateTime: string;
  className?: string;
};

export default function RelativeTime({ dateTime, className = "" }: RelativeTimeProps) {
  const now = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <time dateTime={dateTime} title={formatFullDate(dateTime)} className={className}>
      {now === null ? formatDate(dateTime) : formatRelativeTime(dateTime, now)}
    </time>
  );
}
