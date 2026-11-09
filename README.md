# Next Instagram

Next.js의 App Router를 사용해 Instagram의 홈 피드, 사용자 프로필과 게시물 상세 화면을 구현한
CEOS 24기 프론트엔드 5주차 클론 코딩 프로젝트입니다.

- [5주차 과제 안내](docs/assignment-week5.md)
- [배포 링크](https://next-instagram-24th.vercel.app/)

## 역할 분담

| 팀원 | 담당 작업 |
| --- | --- |
| [홍진우(@j2nooh)](https://github.com/j2nooh) | Next.js 초기 설정과 Vercel 배포, 사용자 프로필과 게시물 그리드, 게시물 상세 페이지와 모달 구현, 게시물 좋아요/댓글/저장 기능 구현, 팔로우 상태가 프로필과 홈 추천 목록에 반영되도록 연결 |
| [백규민(@baek-32)](https://github.com/baek-32) | 홈 피드 카드와 추천 계정 영역, 데스크톱 사이드바와 모바일 하단 내비게이션 구현, 홈 피드에 좋아요와 저장 상태 연결, 작성자 프로필과 게시물 상세로 이동하는 링크 및 현재 메뉴 표시 추가 |

기능별 브랜치에서 작업한 뒤 PR을 통해 `submit/week5`에 변경 사항을 합칩니다.

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

### 필수 요건

- [x] App Router로 프로젝트를 구성하고 사용자와 게시물에 동적 경로 적용
- [x] 아바타와 게시물 상세 등 공통 UI를 재사용 가능한 컴포넌트로 분리
- [x] 내 프로필과 다른 사용자 프로필 구현
- [x] 게시물 상세 화면과 3열 또는 4열 프로필 그리드 구현
- [x] 프로필에서 게시물 상세로 이동하고, 상세 화면에서 작성자 프로필로 이동

### 선택 요건 및 추가 기능

- [x] 댓글 작성, 답글, 댓글 좋아요와 내 댓글 삭제
- [x] 게시물 저장과 취소, 내 프로필의 저장됨 탭
- [x] 팔로우와 언팔로우, 프로필의 팔로워 및 팔로우 수와 홈 추천 목록 갱신
- [x] 홈 피드, 데스크톱 사이드바와 모바일 하단 내비게이션
- [x] 게시물 좋아요와 취소, 프로필 그리드에 좋아요 및 댓글 수 표시
- [x] 여러 사진의 가로 전환, 상세 모달 닫기와 데스크톱에서 이전·다음 게시물 이동

사용자와 게시물은 목데이터로 구성했습니다. 좋아요, 댓글, 저장과 팔로우 상태는 `localStorage`에 저장되어 같은 브라우저에서 새로고침해도 유지됩니다.

## 파일 구조

```text
next-instagram-24th/
├── public/
│   └── images/                  # 게시물 사진
├── docs/
│   └── assignment-week5.md      # 5주차 과제 안내
├── src/
│   ├── app/
│   │   ├── layout.tsx           # 공통 레이아웃과 모달 슬롯
│   │   ├── page.tsx             # 홈 피드
│   │   ├── globals.css          # 전역 스타일
│   │   ├── icon.svg             # 브라우저 탭 아이콘
│   │   ├── [username]/page.tsx  # 사용자 프로필
│   │   ├── posts/[id]/page.tsx  # 게시물 상세 페이지
│   │   └── @modal/              # 목록 위에 표시하는 게시물 상세 모달
│   ├── components/
│   │   ├── Avatar.tsx           # 공통 아바타
│   │   ├── layout/              # 사이드바와 하단 내비게이션
│   │   ├── feed/                # 홈 게시물과 추천 계정
│   │   ├── profile/             # 프로필 정보, 아이콘 탭과 그리드
│   │   └── post/                # 게시물 상세, 사진 전환과 댓글
│   ├── data/
│   │   ├── profiles.ts          # 사용자 정보와 현재 사용자
│   │   └── posts.ts             # 게시물과 사용자별 조회
│   └── hooks/
│       ├── useFollowing.ts      # 홈과 프로필에서 공유하는 팔로우 상태
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
| `npm run start` | 빌드 결과 실행 |
