import type { FeedPage, Post, PostWithAuthor } from "@/types/post";
import { diaryProfile, getProfile } from "@/data/profiles";

const posts: Post[] = [
  {
    id: "1",
    authorId: "demo",
    images: [
      { src: "/posts/1-1.jpeg", alt: "먼직귀: 먼가 직장다니고 귀신 들린거.." },
    ],
    caption: "먼직귀: 먼가 직장다니고 귀신 들린거..",
    likes: 155,
    createdAt: "2025-12-25",
  },
  {
    id: "2",
    authorId: "demo",
    images: [
      { src: "/posts/2-1.jpeg", alt: "나애 일상" },
      { src: "/posts/2-2.jpeg", alt: "나애 일상" },
    ],
    caption: "나애 일상",
    likes: 123,
    createdAt: "2025-08-10",
  },
  {
    id: "3",
    authorId: "demo",
    images: [
      { src: "/posts/3-1.jpeg", alt: "나애 꿈" },
      { src: "/posts/3-2.jpeg", alt: "나애 꿈" },
    ],
    caption: "나애 꿈",
    likes: 102,
    createdAt: "2025-06-29",
  },
  {
    id: "4",
    authorId: "demo",
    images: [
      { src: "/posts/4-1.jpeg", alt: "요즘 내 정신상태 헤헤" },
    ],
    caption: "요즘 내 정신상태 헤헤",
    likes: 88,
    createdAt: "2025-05-20",
  },
  {
    id: "11",
    authorId: "film_notes",
    images: [
      { src: "/posts/film/project-hail-mary.webp", alt: "우주선 안에 거꾸로 떠 있는 인물이 담긴 프로젝트 헤일메리 포스터" },
      { src: "/posts/film/the-odyssey.webp", alt: "불길 속 목마와 병사가 담긴 오디세이 포스터" },
    ],
    caption: "큰 화면으로 보고 싶은 두 편. 한 편은 우주 한복판, 한 편은 트로이의 목마 앞. 포스터만 봐도 앞자리보다 가운데 자리를 잡아야 할 것 같다.",
    likes: 155,
    createdAt: "2026-11-16",
  },
  {
    id: "12",
    authorId: "film_notes",
    images: [
      { src: "/posts/film/hope.webp", alt: "어두운 숲 사이로 말을 타고 달리는 인물들이 담긴 호프 포스터" },
    ],
    caption: "〈호프〉 포스터의 숲은 한참 들여다보게 된다. 나무는 빽빽한데 말은 화면 밖으로 튀어나갈 것 같은 게 좋다.",
    likes: 123,
    createdAt: "2026-11-12",
  },
  {
    id: "13",
    authorId: "film_notes",
    images: [
      { src: "/posts/film/the-kings-warden.webp", alt: "기와 대문 아래 두 사람이 나란히 서 있는 왕과 사는 남자 포스터" },
    ],
    caption: "〈왕과 사는 남자〉. 같은 문 아래 서 있는데 한 사람은 활짝 웃고 한 사람은 꼿꼿하다. 둘이 어떤 이야기를 나눌지 궁금해지는 포스터.",
    likes: 102,
    createdAt: "2026-11-08",
  },
  {
    id: "14",
    authorId: "film_notes",
    images: [
      { src: "/posts/film/la-la-land.webp", alt: "보랏빛 밤하늘과 가로등 아래 두 사람이 포옹하는 라라랜드 포스터" },
    ],
    caption: "저녁 하늘이 보라색이면 괜히 〈라라랜드〉 음악을 튼다. 다시 볼 때마다 좋아하는 장면이 하나씩 늘어나는 영화.",
    likes: 88,
    createdAt: "2026-11-03",
  },
  {
    id: "5",
    authorId: "slow_walks",
    images: [
      { src: "/posts/landscape/park-walk.webp", alt: "소나무 사이로 햇빛이 들고 두 사람이 산책로를 걷는 풍경" },
      { src: "/posts/landscape/quiet-street.webp", alt: "파란 하늘 아래 전신주와 빨간 신호등이 늘어선 한적한 도로" },
    ],
    caption: "걸음을 멈췄던 두 순간. 소나무 사이로 해가 들어왔을 때, 그리고 차 한 대 없는 길에서 빨간불을 기다릴 때.",
    likes: 46,
    createdAt: "2026-11-15",
  },
  {
    id: "6",
    authorId: "slow_walks",
    images: [
      { src: "/posts/landscape/coastal-sunset.webp", alt: "노을 진 바다와 암석 해안이 비치는 차량 사이드미러" },
      { src: "/posts/landscape/underwater-light.webp", alt: "얕은 바닷물 아래 모래에 일렁이는 햇빛" },
    ],
    caption: "바다에서 주워온 빛 두 장. 돌아가는 차에선 노을이 사이드미러까지 따라왔고, 물속에선 햇살이 모래 위에 줄무늬를 만들었다.",
    likes: 38,
    createdAt: "2026-11-06",
  },
  {
    id: "7",
    authorId: diaryProfile.username,
    images: [
      { src: "/posts/diary/headphones.webp", alt: "길가에서 헤드폰을 쓴 인물 사진과 음악에 관한 글" },
      { src: "/posts/diary/music-player.webp", alt: "음악 플레이어를 손에 든 인물 사진과 옛 미니홈피 글" },
      { src: "/posts/diary/late-night-music.webp", alt: "눈을 감고 헤드폰을 한쪽 귀에 댄 인물 사진과 음악에 관한 글" },
    ],
    caption: "미니홈피 BGM 고르느라 한 시간 쓰던 사람들 여기 모여요. 세 장 다 재생 버튼 누르기 직전 표정이 유난히 진지해서 좋음.",
    likes: 73,
    createdAt: "2026-11-17",
  },
  {
    id: "8",
    authorId: diaryProfile.username,
    images: [
      { src: "/posts/diary/anime-pose.webp", alt: "손가락 없는 장갑을 낀 손으로 한쪽 눈을 가린 애니메이션 인물" },
      { src: "/posts/diary/winter-scene.webp", alt: "눈을 감고 검은 모자 챙을 잡은 인물의 드라마 장면" },
    ],
    caption: "왜 이렇게 한쪽 눈 가리는 포즈가 멋있어 보였을까. 애니 한 장, 겨울 드라마 한 장. 저장 폴더가 의외로 취향에 충실하다.",
    likes: 58,
    createdAt: "2026-11-13",
  },
  {
    id: "9",
    authorId: diaryProfile.username,
    images: [
      { src: "/posts/diary/mirror-selfie.webp", alt: "디지털카메라와 하늘색 가방을 든 거울 셀카" },
    ],
    caption: "디카 들고 찍은 거울 셀카에는 꼭 얼굴보다 카메라가 먼저 보임. 하늘색 가방까지 그 시절 사진첩 느낌 그대로.",
    likes: 41,
    createdAt: "2026-11-09",
  },
  {
    id: "10",
    authorId: diaryProfile.username,
    images: [
      { src: "/posts/diary/living-room.webp", alt: "냄비와 음료병을 앞에 두고 방바닥에 편하게 누운 사람들" },
    ],
    caption: "바닥에 앉아 냄비째 나눠 먹고 아무 말 없이 뒹굴던 밤. 제대로 찍은 단체 사진보다 이런 한 컷이 더 오래 남더라.",
    likes: 49,
    createdAt: "2026-11-04",
  },
];

export function getPosts(authorId?: string): Post[] {
  return authorId === undefined ? posts : posts.filter((post) => post.authorId === authorId);
}

export function getPost(id: string): Post | undefined {
  return posts.find((post) => post.id === id);
}


const PAGE_SIZE = 5;

// 피드 한 페이지: 최신순으로 offset번째부터 5개 + 작성자 정보 붙이기
export function getFeedPage(offset: number): FeedPage {
  const feed = [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const page = feed.slice(offset, offset + PAGE_SIZE);

  const pagePosts: PostWithAuthor[] = [];
  for (const post of page) {
    const author = getProfile(post.authorId);
    if (author) pagePosts.push({ ...post, author });
  }

  const nextOffset = offset + PAGE_SIZE < feed.length ? offset + PAGE_SIZE : null;
  return { posts: pagePosts, nextOffset };
}