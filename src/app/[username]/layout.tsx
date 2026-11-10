import { Suspense, type ReactNode } from "react";

// 프로필 화면(children) 위에 게시물 상세 모달(@modal)을 함께 그립니다.
// 모달 슬롯은 URL 값을 기다려야 해서 Suspense로 감싸야 프로필 화면이 막히지 않습니다.
export default function UsernameLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      {children}
      <Suspense fallback={null}>{modal}</Suspense>
    </>
  );
}
