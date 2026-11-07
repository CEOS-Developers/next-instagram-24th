export type PostImage = {
  src: string;
  alt: string;
};

export type Post = {
  id: string;
  authorUsername: string;
  title: string;
  images: [PostImage, ...PostImage[]];
};

export const posts: Post[] = [
  {
    id: "1",
    authorUsername: "jxx_gro_ovy",
    title: "무대 위에서",
    images: [
      { src: "/images/my_02.jpg", alt: "푸른 조명 아래 기타를 연주하는 모습" },
    ],
  },
  {
    id: "2",
    authorUsername: "jxx_gro_ovy",
    title: "음악을 들으며 걷던 날",
    images: [
      { src: "/images/my_05.jpg", alt: "헤드셋을 착용하고 걷는 강변 풍경" },
    ],
  },
  {
    id: "3",
    authorUsername: "jxx_gro_ovy",
    title: "도쿄의 밤",
    images: [
      { src: "/images/film_5.jpg", alt: "나무 조명 사이로 보이는 도쿄타워" },
      { src: "/images/film_4.jpg", alt: "아래에서 올려다본 도쿄타워" },
    ],
  },
  {
    id: "4",
    authorUsername: "jxx_gro_ovy",
    title: "꽃이 있는 자리",
    images: [
      { src: "/images/my_01.jpg", alt: "그림 액자 옆에 놓인 보라색과 흰색 꽃" },
    ],
  },
  {
    id: "5",
    authorUsername: "jxx_gro_ovy",
    title: "오타루에서",
    images: [
      { src: "/images/film_3.jpg", alt: "오타루 도로 끝에 보이는 바다" },
      { src: "/images/film_2.jpg", alt: "창고 건물이 늘어선 오타루 운하" },
    ],
  },
  {
    id: "6",
    authorUsername: "jxx_gro_ovy",
    title: "성북천 벚꽃",
    images: [
      { src: "/images/my_10.jpg", alt: "성북천 위로 활짝 핀 벚꽃" },
    ],
  },
  {
    id: "7",
    authorUsername: "film_archive",
    title: "봄의 산책",
    images: [
      { src: "/images/film_1.jpg", alt: "벚꽃과 나무 사이로 흐르는 공원의 개울" },
    ],
  },
  {
    id: "8",
    authorUsername: "film_archive",
    title: "산책 중 만난 사슴",
    images: [
      { src: "/images/my_03.jpg", alt: "나무 그늘 아래 서 있는 사슴" },
    ],
  },
  {
    id: "9",
    authorUsername: "film_archive",
    title: "창밖의 고양이",
    images: [
      { src: "/images/my_04.jpg", alt: "햇빛이 드는 창문 밖에 앉은 고양이" },
    ],
  },
  {
    id: "10",
    authorUsername: "film_archive",
    title: "운하를 따라",
    images: [
      { src: "/images/film_2.jpg", alt: "오타루 운하와 산책로의 풍경" },
    ],
  },
  {
    id: "11",
    authorUsername: "live.archive",
    title: "무대 가까이에서",
    images: [
      { src: "/images/live_1.jpg", alt: "스포트라이트 아래 노래하는 공연 무대" },
    ],
  },
  {
    id: "12",
    authorUsername: "live.archive",
    title: "푸른 조명으로 가득한 밤",
    images: [
      { src: "/images/live_2.jpg", alt: "푸른 조명으로 물든 공연장과 관객석" },
    ],
  },
  {
    id: "13",
    authorUsername: "live.archive",
    title: "공연이 끝난 뒤",
    images: [
      { src: "/images/live_3.jpg", alt: "공연 종료 후 밴드와 관객이 함께 나온 스크린" },
    ],
  },
  {
    id: "14",
    authorUsername: "live.archive",
    title: "공연을 기다리며",
    images: [
      { src: "/images/live_4.jpg", alt: "공연장 앞에서 들고 있는 검정치마 공연 티켓" },
    ],
  },
];
