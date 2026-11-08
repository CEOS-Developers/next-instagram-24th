# Next Instagram

Next.js의 App Router를 사용해 Instagram의 홈 피드, 사용자 프로필과 게시물 상세 화면을 구현한
CEOS 24기 프론트엔드 5주차 클론 코딩 프로젝트입니다.

- [5주차 과제 안내](docs/assignment-week5.md)

## 사용한 기술 스택

| 구분 | 기술 |
| --- | --- |
| 프레임워크 | Next.js (App Router) |
| UI 라이브러리 | React, React DOM |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS |
| 상태 관리 및 저장 | React Hooks, localStorage |
| 아이콘 | Lucide React, SVG |
| 코드 검사 | ESLint |

## 구현 기능

- [x] 개발 환경 설정 (Next.js, React, TypeScript, Tailwind CSS, ESLint)
- [x] App Router를 활용한 파일 기반 라우팅 및 동적 라우팅 구현
- [x] Server Component와 Client Component 구분
- [x] 공통 UI를 재사용 가능한 컴포넌트로 분리
- [x] 홈 피드 및 추천 계정 목록 구현
- [x] 내 프로필과 다른 사용자 프로필 구현
- [x] 프로필 게시물 그리드 및 화면 너비에 따른 4열 또는 3열 배치
- [x] 게시물 상세 페이지와 상세 모달 구현
- [x] 프로필과 게시물 상세 페이지 간 이동
- [x] 여러 사진 전환 및 PC 모달의 이전·다음 게시물 이동
- [x] Esc 키 및 바깥 영역 클릭으로 상세 모달 닫기
- [x] 게시물 좋아요 및 좋아요 취소, 개수 반영
- [x] 댓글 작성 및 목록 반영, 내 댓글 수정·삭제
- [x] 게시물 저장과 취소, 내 프로필의 저장됨 탭 구현
- [x] 팔로우와 언팔로우, 관련 숫자와 추천 목록 반영
- [x] localStorage를 통한 상태 저장 및 복원
- [x] PC 사이드바와 모바일 상단 헤더, 하단 메뉴, favicon 적용

사용자와 게시물은 목데이터를 사용하며, 로그인 및 서버 API 연동은 구현하지 않았습니다.
좋아요, 댓글, 저장, 팔로우 상태는 현재 브라우저에 저장됩니다.
스토리 조회와 새 게시물 작성은 구현 범위에서 제외했습니다.

## 파일 구조

레포 루트 기준의 주요 파일입니다.

```text
next-instagram-24th/
├── docs/
│   └── assignment-week5.md      # 5주차 과제 안내글
├── public/
│   └── images/                   # 게시물 사진
├── src/
│   ├── app/
│   │   ├── layout.tsx            # 공통 레이아웃과 모달 슬롯
│   │   ├── page.tsx              # 홈 피드
│   │   ├── globals.css            # Tailwind 및 전역 스타일
│   │   ├── icon.svg               # 앱 아이콘
│   │   ├── [username]/page.tsx   # 사용자 프로필
│   │   ├── posts/[id]/page.tsx   # 게시물 상세 페이지
│   │   └── @modal/
│   │       ├── default.tsx        # 모달 슬롯 기본 화면
│   │       ├── page.tsx           # 홈 이동 시 모달 닫기
│   │       ├── [...catchAll]/page.tsx # 다른 경로 이동 시 모달 닫기
│   │       └── (.)posts/[id]/page.tsx # 목록 위에 표시하는 상세 모달
│   ├── components/
│   │   ├── Sidebar.tsx           # PC 사이드바와 너비 전환
│   │   ├── SidebarMenu.tsx       # 사이드바 메뉴와 현재 경로 표시
│   │   ├── MobileNavigation.tsx  # 모바일 상단 헤더와 하단 메뉴
│   │   ├── HomeIcon.tsx          # 홈 메뉴의 선택 상태 아이콘
│   │   ├── FeedPost.tsx          # 홈 피드 게시물 UI
│   │   ├── FeedComments.tsx      # 댓글 개수와 최근 댓글 표시
│   │   ├── FeedRecommendation.tsx # 미팔로우 계정의 추천 표시
│   │   ├── ProfileHeader.tsx     # 프로필 정보와 팔로우 버튼
│   │   ├── ProfilePosts.tsx      # 게시물과 저장된 게시물 그리드
│   │   ├── ProfileTabs.tsx       # 프로필 게시물 분류 탭
│   │   ├── ProfileSuggestions.tsx # 추천 계정 목록과 팔로우
│   │   ├── PostDetails.tsx       # 페이지와 모달의 공통 상세 UI
│   │   ├── PostModal.tsx         # 상세 모달 표시와 닫기
│   │   ├── PostGallery.tsx       # 여러 사진 전환
│   │   ├── PostPhoto.tsx         # 공통 게시물 이미지
│   │   ├── PostActions.tsx       # 좋아요, 댓글, 저장 버튼
│   │   ├── PostDiscussion.tsx    # 본문과 댓글 목록, 입력 영역
│   │   ├── PostDate.tsx          # 게시 날짜와 연도 표시
│   │   ├── CommentForm.tsx       # 댓글 입력과 등록
│   │   └── CommentItem.tsx       # 댓글 표시와 수정, 삭제 메뉴
│   ├── data/
│   │   ├── profiles.ts          # 사용자 정보와 현재 사용자
│   │   └── posts.ts             # 게시물 정보와 사용자별 조회
│   └── hooks/
│       ├── useFollowing.ts      # 팔로우 상태 저장 및 변경
│       └── usePostInteractions.ts # 게시물 상호작용 상태 관리
├── package.json                 # 의존성 및 실행 명령
├── next.config.ts               # Next.js 및 빌드 설정
├── tsconfig.json                # TypeScript 설정
└── eslint.config.mjs            # 코드 검사 규칙
```

## 실행 방법

레포 루트에서 실행합니다. 별도의 환경 변수 설정은 필요하지 않습니다.

```bash
npm ci
npm run dev
```

실행 후 터미널에 표시된 로컬 주소로 접속합니다. 기본 주소는 [http://localhost:3000](http://localhost:3000)입니다.

| 명령 | 용도 |
| --- | --- |
| `npm run build` | 타입 검사 및 배포용 빌드 |
| `npm run lint` | 코드 규칙 검사 |
| `npm run start` | 빌드 결과 실행 (`npm run build` 후 실행) |
