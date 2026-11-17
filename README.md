# Next Instagram

Next.js의 App Router를 사용해 Instagram의 홈 피드, 사용자 프로필과 게시물 상세 화면을 구현한
CEOS 24기 프론트엔드 5·6주차 클론 코딩 프로젝트입니다.
5주차에 만든 화면과 상호작용을 바탕으로, 6주차에는 무한 스크롤과 내 소개글 편집을 추가했습니다.

- [5주차 과제 안내](docs/assignment-week5.md)
- [6주차 과제 안내](docs/assignment-week6.md)
- [6주차 Review Questions 답변](docs/week6-review-questions.md)
- [배포 링크](https://next-instagram-24th.vercel.app/)

## 역할 분담

### 6주차

| 팀원 | 담당 작업 |
| --- | --- |
| [백규민(@baek-32)](https://github.com/baek-32) | Intersection Observer 기반 홈 피드 무한 스크롤, 내 프로필 소개글 편집, 최종 문서 정리와 과제 제출 |
| [홍진우(@j2nooh)](https://github.com/j2nooh) | 이미지 로딩 Skeleton UI, 사진 더블클릭·더블탭 좋아요와 하트 효과, 내 게시물별 좋아요 수 숨김·해제 |

### 5주차 기반 작업

| 팀원 | 담당 작업 |
| --- | --- |
| [홍진우(@j2nooh)](https://github.com/j2nooh) | Next.js 초기 설정과 Vercel 배포, 사용자 프로필과 게시물 그리드, 게시물 상세 페이지와 모달 구현, 게시물 좋아요/댓글/저장 기능 구현, 팔로우 상태가 프로필과 홈 추천 목록에 반영되도록 연결 |
| [백규민(@baek-32)](https://github.com/baek-32) | 홈 피드 카드와 추천 계정 영역, 데스크톱 사이드바와 모바일 하단 내비게이션 구현, 홈 피드에 좋아요와 저장 상태 연결, 작성자 프로필과 게시물 상세로 이동하는 링크 및 현재 메뉴 표시 추가 |

6주차 기능은 기능별 브랜치에서 작업한 뒤 PR을 통해 `submit/week6`에 병합했습니다. 제출 문서는 같은 브랜치에서 정리하고 CEOS 원본 저장소에 최종 제출합니다.

## 사용한 기술 스택

| 구분 | 기술 |
| --- | --- |
| 프레임워크 | Next.js (App Router) |
| UI 라이브러리 | React |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS |
| 상태 관리 및 저장 | React Hooks, localStorage |
| 아이콘 | Lucide React, React Icons, SVG |
| 코드 검사 | ESLint |

## 구현 기능

### 5주차 필수 요건

- [x] App Router로 프로젝트를 구성하고 사용자와 게시물에 동적 경로 적용
- [x] 아바타와 게시물 상세 등 공통 UI를 재사용 가능한 컴포넌트로 분리
- [x] 내 프로필과 다른 사용자 프로필 구현
- [x] 게시물 상세 화면과 3열 또는 4열 프로필 그리드 구현
- [x] 프로필에서 게시물 상세로 이동하고, 상세 화면에서 작성자 프로필로 이동

### 5주차 선택 요건 및 추가 기능

- [x] 댓글 작성, 답글, 댓글 좋아요와 내 댓글 삭제
- [x] 게시물 저장과 취소, 내 프로필의 저장됨 탭
- [x] 팔로우와 언팔로우, 프로필의 팔로워 및 팔로우 수와 홈 추천 목록 갱신
- [x] 홈 피드, 데스크톱 사이드바와 모바일 하단 내비게이션
- [x] 게시물 좋아요와 취소, 프로필 그리드에 좋아요 및 댓글 수 표시
- [x] 여러 사진의 가로 전환, 상세 모달 닫기와 데스크톱에서 이전·다음 게시물 이동

사용자와 게시물은 목데이터로 구성했습니다. 좋아요, 댓글, 저장, 팔로우와 내 소개글은 `localStorage`에 저장되어 같은 브라우저에서 새로고침해도 유지됩니다.

### 6주차 추가 기능

- [x] 첫 이미지가 로딩되는 동안 피드 카드 형태의 Skeleton 표시 — [PR #9](https://github.com/j2nooh/next-instagram-24th/pull/9)
- [x] 사진 더블클릭·더블탭으로 좋아요와 하트 효과 표시 — [PR #10](https://github.com/j2nooh/next-instagram-24th/pull/10)
- [x] 내 게시물별 좋아요 수 숨김·해제 — [PR #11](https://github.com/j2nooh/next-instagram-24th/pull/11)
- [x] Intersection Observer로 홈 피드를 나누어 불러오고 추가 로딩에 Skeleton 표시 — [PR #12](https://github.com/j2nooh/next-instagram-24th/pull/12)
- [x] `/accounts/edit`에서 내 소개글 수정·제출·취소, 150자 제한과 브라우저 내 저장 — [PR #13](https://github.com/j2nooh/next-instagram-24th/pull/13)

## 6주차 Sprint

6주차 미션을 하나의 Sprint로 진행합니다. 목표는 기존 게시물 상호작용을 유지하면서 홈 피드의 점진적 로딩과 내 소개글 편집을 완성하는 것입니다. 제출 마감은 **2026년 11월 18일 수요일 14:00**입니다.

### Backlog

| 우선순위 | 작업 | 담당 | 상태 |
| --- | --- | --- | --- |
| 필수 | Intersection Observer 무한 스크롤, 중복 요청 방지와 마지막 페이지 처리 | 백규민 | 완료 · PR #12 병합 |
| 필수 | 피드 이미지 로딩 Skeleton | 홍진우 | 완료 · PR #9 병합 |
| 합의한 기능 | 별도 프로필 편집 페이지에서 소개글 제출·취소 | 백규민 | 완료 · PR #13 병합 |
| 추가 개선 | 사진 더블클릭·더블탭 좋아요와 하트 효과 | 홍진우 | 완료 · PR #10 병합 |
| 추가 개선 | 내 게시물별 좋아요 수 숨김·해제 | 홍진우 | 완료 · PR #11 병합 |
| 필수 | 6주차 README, Review Questions와 기술 회고 정리 | 백규민 | 작성 완료 |
| 통합 | 기능별 PR을 `submit/week6`에 병합 | 백규민·홍진우 | 완료 · PR #9–13 병합 |
| 검증 | 무한 스크롤·소개글 편집 PR의 Vercel 배포 확인 | 백규민 | 완료 · PR #12·13 |
| 검증 | 통합 브랜치의 Vercel 빌드와 로컬 기본 경로 확인 | 백규민 | 완료 · 홈 첫 3개와 편집 페이지 200 응답 |
| 제출 | 공개 배포에 6주차 반영과 CEOS 원본 저장소 최종 제출 | 백규민 | 공개 배포 갱신·제출 대기 |

### 회고

- **기존 구현 재사용:** 게시물 ID와 상호작용 저장 구조를 유지해 피드 목록을 나눠도 좋아요·댓글·저장 상태를 그대로 연결했습니다. 다섯 가지 개선 기능을 기능별 PR로 나누어 `submit/week6`에 통합했습니다.
- **로딩 상태 구분:** 이미지 로딩과 다음 목록 로딩은 발생 시점이 달라 각각 상태를 관리하고 같은 Skeleton을 재사용했습니다. 첫 3개는 서버에서 렌더링하고 이후 목록만 비동기로 추가했습니다.
- **프로필 편집 흐름:** 실제 Instagram 화면을 참고해 별도 설정 페이지로 구성했습니다. 제출할 때 저장하고 취소할 때 입력을 버리며, 브라우저 저장소 접근을 훅으로 분리했습니다.
- **검증과 다음 개선:** 기능별 UI와 Vercel 배포를 확인하고, 통합 브랜치 배포 확인과 원본 저장소 제출을 별도 단계로 관리했습니다. 실제 API를 연결할 때는 서버의 페이지 조회와 캐싱을 추가할 수 있습니다.

### 확인한 동작

- 홈 피드가 3개 → 6개 → 8개로 추가되고 마지막 페이지 안내가 표시되는 것을 확인했습니다.
- 소개글의 제출·취소, 150자 제한, 줄바꿈 저장·새로고침 유지와 내용 비우기를 확인했습니다.
- 소개글의 서버 렌더링, HTML 이스케이프, 잘못된 저장값과 저장소 접근 오류 처리는 격리된 코드 검사에서 확인했습니다.
- 무한 스크롤과 소개글 편집 PR, 통합 커밋의 Vercel 배포 성공을 확인했습니다.
- 통합 코드의 로컬 홈에서 처음 3개 게시물과 `/accounts/edit`의 정상 응답을 확인했습니다.

현재 공개 배포 주소는 홈 게시물 8개를 한 번에 표시하고 `/accounts/edit`는 404를 반환합니다. 공개 배포가 6주차 통합 코드를 가리키도록 갱신한 뒤 CEOS 원본 저장소에 최종 제출해야 합니다.

## 파일 구조

```text
next-instagram-24th/
├── public/
│   └── images/                  # 게시물 사진
├── docs/
│   ├── assignment-week5.md      # 5주차 과제 안내
│   ├── assignment-week6.md      # 6주차 과제 안내
│   └── week6-review-questions.md # 6주차 기술 설명
├── src/
│   ├── app/
│   │   ├── layout.tsx           # 공통 레이아웃과 모달 슬롯
│   │   ├── page.tsx             # 홈 피드
│   │   ├── globals.css          # 전역 스타일
│   │   ├── icon.svg             # 브라우저 탭 아이콘
│   │   ├── [username]/page.tsx  # 사용자 프로필
│   │   ├── accounts/edit/page.tsx # 내 프로필 편집 페이지
│   │   ├── posts/[id]/page.tsx  # 게시물 상세 페이지
│   │   └── @modal/              # 목록 위에 표시하는 게시물 상세 모달
│   ├── components/
│   │   ├── Avatar.tsx           # 공통 아바타
│   │   ├── layout/              # 사이드바와 하단 내비게이션
│   │   ├── feed/                # 피드 목록, Skeleton과 추천 계정
│   │   ├── profile/             # 프로필 정보, 편집 폼, 탭과 그리드
│   │   │   └── ProfileEditForm.tsx # 소개글 제출·취소 폼
│   │   └── post/                # 게시물 상세, 사진 전환과 댓글
│   ├── data/
│   │   ├── profiles.ts          # 사용자 정보와 현재 사용자
│   │   ├── posts.ts             # 게시물과 사용자별 조회
│   │   └── feed.ts              # 피드 페이지 계산과 비동기 목 조회
│   └── hooks/
│       ├── useFollowing.ts      # 홈과 프로필에서 공유하는 팔로우 상태
│       ├── useProfileBio.ts     # 내 소개글 저장과 구독
│       └── usePostInteractions.ts # 좋아요, 댓글과 저장 상태
└── package.json                 # 의존성 및 실행 명령
```

## 실행 방법

저장소 루트에서 실행합니다. 별도의 환경 변수 설정은 필요하지 않습니다.

```bash
npm ci
npm run dev
```

실행 후 터미널에 표시된 주소로 접속합니다. 기본 주소는 [localhost:3000](http://localhost:3000)입니다.

| 명령 | 용도 |
| --- | --- |
| `npm run build` | 타입 검사 및 배포용 빌드 |
| `npm run lint` | 코드 규칙 검사 |
| `npx tsc --noEmit --incremental false` | 파일 생성 없이 타입 검사 |
| `npm run start` | 빌드 결과 실행 |
