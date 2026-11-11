/*
 * 배열을 무작위 순서로 섞은 새 배열을 돌려준다. (Fisher–Yates 셔플)
 * 원본 배열은 바꾸지 않는다.
 */
export default function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
