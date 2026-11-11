# 6주차 과제: next-instagram-24th

<br>

# 서론

안녕하세요 🙌🏻 24기 프론트엔드 운영진 **이승연**입니다.

지난 5주차 미션에서는 Next.js의 App Router를 활용하여 Instagram의 주요 화면을 구현하고, Server Component와 Client Component의 차이 및 파일 시스템 기반 라우팅에 대해 학습했습니다.

이번 6주차 미션에서는 **Next.js를 활용하여 Instagram에서 구현하고 싶은 기능을 자유롭게 개발**하고, **Intersection Observer API를 활용한 무한 스크롤**을 구현해보고자 합니다❗️

또한 **Agile 방법론을 바탕으로 팀의 개발 과정을 계획하고 관리**하며, README를 통해 프로젝트의 구현 결과와 협업 과정을 문서화하는 연습도 진행합니다.

지난 미션이 주어진 요구사항을 구현하는 데 집중했다면, 이번 미션에서는 팀원들과 함께 구현할 기능을 직접 선정하고, 작업의 우선순위를 설정하며, 개발 과정을 주도적으로 관리해보는 것이 목표입니다.

각 팀이 본격적인 프로젝트를 준비하거나 진행하고 있는 만큼, 이번 미션에서 경험한 기술적 의사결정과 협업 방식을 실제 팀 프로젝트에도 적극적으로 활용해보셨으면 좋겠습니다!

과제를 진행하다가 막히는 부분이 있더라도 우선 스스로 공부하고 찾아보며 해결해보는 과정을 권장드립니다. 다만 미션과 관련해 운영진의 도움이 필요하다면 언제든 프론트엔드 카카오톡 및 팀별 멘토에게 질문을 남겨주세요!

<br>

# 과제

## 🎯 목표

- **Next.js**를 활용하여 원하는 기능을 직접 설계하고 구현합니다.
- **Intersection Observer API**의 동작 원리를 이해하고 무한 스크롤을 구현합니다.
- **Agile 방법론**의 핵심 개념을 이해하고 Sprint 기반의 협업 과정을 경험합니다.
- 팀원 간 역할을 분담하고 Backlog를 활용하여 작업의 우선순위와 진행 상황을 관리합니다.
- **README.md**를 작성하여 프로젝트의 주요 기능, 구현 결과 및 개발 과정을 문서화합니다.

## 📅 기한

- **2026년 11월 18일 수요일 14:00까지**

## 💬 Review Questions

- Intersection Observer API를 활용한 무한 스크롤의 구현 방식과 구현 과정에서 고려한 사항에 대해 설명해주세요.
- 5주차 →  6주차 과제로 발전시키는 과정에서 중점적으로 고려한 사항과 그 이유를 작성해주세요.

## 💡 필수 요건

- 팀별로 **5주차 프로젝트에 이어** Instagram에서 구현하고 싶은 기능을 자유롭게 선정합니다.
- 기존 기능을 그대로 반복하기보다는 **새로운 기능이나 개선 사항을 하나 이상 포함**해주세요.
- **무한 스크롤 구현**: Intersection Observer API를 활용하여 자유롭게 선정한 기능에 포함하여 구현하거나 별도의 피드 및 게시물 목록에서 구현합니다.
- **Skeleton UI 구현**: 데이터 로딩 중 실제 콘텐츠와 유사한 형태의 Skeleton UI를 표시하고, 로딩 완료 후 콘텐츠로 전환합니다.
- 이번 **6주차 미션을 하나의 Sprint로 진행**합니다.
- 프로젝트의 **GitHub Repository에 팀별로 README.md**를 작성합니다. 아래 3가지는 **필수사항**입니다.
    - 프로젝트 소개 및 주요 기능
    - 팀원별 역할 및 담당 기능
    - Sprint 목표, Backlog 및 회고

## ✅ 선택 요건

- 실제 외부 API를 연동하여 데이터를 처리합니다.
- TanStack Query의 useInfiniteQuery를 활용하여 무한 스크롤의 데이터 페칭과 캐싱을 관리합니다.
- PR 템플릿 및 코드 리뷰 규칙을 작성하고 적용합니다.
- 이 외에도 추가하고 싶은 기능이나 개선 사항이 있다면 자유롭게 구현해 주세요!

<br>

# 링크 및 참고자료
- [Next.js - use-client](https://nextjs.org/docs/app/api-reference/directives/use-client)
- [intersection Observer API 알아보기](https://www.youtube.com/watch?v=iZhq7I42uaI)
- [intersection Observer API 블로그 포스팅](https://www.heropy.dev/p/ydKoQO)
- [Tanstack Query - Infinite Queries 공식 문서](https://tanstack.com/query/latest/docs/framework/react/reference/functions/useInfiniteQuery)
- [Tanstack Query를 활용한 무한 스크롤 적용](https://oliveyoung.tech/2023-10-04/useInfiniteQuery-scroll/)
- [해외 숙소 리스트 성능 개선기-반쪽짜리 ssr에서 완벽한 인피니트 스크롤까지](https://techblog.gccompany.co.kr/%ED%95%B4%EC%99%B8-%EC%88%99%EC%86%8C-%EB%A6%AC%EC%8A%A4%ED%8A%B8-%EC%84%B1%EB%8A%A5-%EA%B0%9C%EC%84%A0%EA%B8%B0-%EB%B0%98%EC%AA%BD%EC%A7%9C%EB%A6%AC-ssr%EC%97%90%EC%84%9C-%EC%99%84%EB%B2%BD%ED%95%9C-%EC%9D%B8%ED%94%BC%EB%8B%88%ED%8A%B8-%EC%8A%A4%ED%81%AC%EB%A1%A4%EA%B9%8C%EC%A7%80-1ef7c7962dae) 
- [애자일 방법론](https://www.redhat.com/ko/topics/devops/what-is-agile-methodology)
- [더 나은 UX를 위한 스켈레톤 UI 만들기](https://ui.toast.com/weekly-pick/ko_20201110)
- [성능 최적화](https://ui.toast.com/fe-guide/ko_PERFORMANCE)
- [react-intersection-observer 라이브러리](https://react-intersection-observer.vercel.app/?path=/docs/intro--docs)
