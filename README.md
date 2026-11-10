# Next Instagram

CEOS 24기 프론트엔드 5주차 과제로, Next.js App Router를 사용해 인스타그램의 프로필과 게시물 상세 화면을 모바일 기준으로 구현했습니다.

- [5주차 과제 안내](docs/assignment-week5.md)
- [배포 링크](https://next-instagram-24th-theta.vercel.app/)

## 👥 팀원 및 역할
| 이름 | 역할 |
|---|---|
| 이상민 | 공통 UI (하단 내비게이션), 프로필 페이지 (헤더, 프로필 정보, 탭), 배포 |
| 이상빈 | 게시물 목데이터, 게시물 그리드, 게시물 상세 페이지, 이슈/PR 템플릿 |

## 🛠 기술 스택
| 구분 | 기술 |
|---|---|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 |
| 패키지 매니저 | pnpm |
| 배포 | Vercel |

## ✅ 구현 기능
- [x] App Router로 프로젝트 생성
- [x] 공통 UI 컴포넌트 분리 (BottomNav)
- [x] 프로필 페이지 (`/[username]`)
- [x] 게시물 그리드 (3열, 3:4 비율)
- [x] 게시물 상세 페이지 (`/p/[postId]`)
- [x] 프로필 ↔ 게시물 상세 페이지 이동
- [x] 없는 게시물 404 처리

## 📁 폴더 구조
```
app/
├── [username]/      # 프로필 페이지
│   └── _components/ # 프로필에서만 쓰는 컴포넌트
├── p/[postId]/      # 게시물 상세 페이지
└── layout.tsx       # 공통 레이아웃 (BottomNav)
components/          # 공통 컴포넌트
data/                # 목데이터
types/               # 타입 (도메인별)
public/              # 이미지, 아이콘
docs/                # 과제 안내
```

## 📏 컨벤션

### Branch
- `feature/작업내용`, `docs/작업내용`
- master에 직접 push하지 않고 PR로 머지

### Commit
| 타입 | 설명 |
|---|---|
| feat | 새로운 기능 |
| fix | 버그 수정 |
| style | 스타일 수정 |
| refactor | 리팩토링 |
| docs | 문서 수정 |
| chore | 설정, 파일 추가 등 |

### Issue / PR
- 이슈 제목: `Feat: 기능설명`
- PR 제목은 커밋 메시지 형식, 본문에 `Close #이슈번호`
- 리뷰 → Approve → 머지 → 브랜치 삭제

### Code
- 컴포넌트 파일은 PascalCase (`PostGrid.tsx`)
- import는 `@/` 절대경로 사용
- 타입은 도메인별로 분리 (`types/post.ts`)

## ▶️ 실행 방법
```bash
pnpm install
pnpm dev
```
[localhost:3000](http://localhost:3000)으로 접속