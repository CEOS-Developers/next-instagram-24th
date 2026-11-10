// 앱 안에서 페이지를 이동한 횟수를 기억 (새로고침하거나 주소로 바로 들어오면 0부터 다시 시작)
// 게시물 닫기 버튼이 "뒤로 가기"를 해도 되는지(=앱 안의 이전 화면이 있는지) 판단할 때 사용합니다.
// window.history.length 는 빈 탭이나 다른 사이트 기록까지 세기 때문에 쓰지 않습니다.
let visits = 0;
let lastPath: string | null = null;

export function markVisit(pathname: string) {
  if (pathname === lastPath) return;
  lastPath = pathname;
  visits += 1;
}

export function hasInAppHistory() {
  return visits > 1;
}
