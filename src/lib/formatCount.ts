/*
 * 숫자를 인스타그램처럼 짧게 바꾼다.
 * 예: 660 → "660", 1000 → "1천", 1250 → "1.2천", 15000 → "1.5만"
 */
export default function formatCount(count: number) {
  const short = (value: number) => String(Math.floor(value * 10) / 10);

  if (count < 1000) return String(count);
  if (count < 10000) return `${short(count / 1000)}천`;
  if (count < 100000000) return `${short(count / 10000)}만`;
  return `${short(count / 100000000)}억`;
}
