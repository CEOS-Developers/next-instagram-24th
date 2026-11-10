import type { Post } from "@/types/post";

// 이미지 파일은 public/images/에서 관리합니다.
// 메시는 저장된 사진을, 호날두는 레이아웃 확인용 샘플 이미지를 사용합니다.
export const posts: Post[] = [
  {
    id: "post-1",
    authorId: "user-1",
    imageUrl: "/images/goatnaldo.png",
    imageAlt: "호날두 동상",
    caption: "3날두",
    likeCount: 32,
    isLikedByMe: false,
    createdAt: "2026-11-09T03:00:00Z",
  },
  {
    id: "post-2",
    authorId: "user-1",
    imageUrl: "/images/kitinaldo.png",
    imageAlt: "고양날두",
    extraImages: [
      { url: "/images/kitinaldo2.png", alt: "고양날두2" },
    ],
    caption: "냥 이치니산 냥 아리가또~",
    likeCount: 7642,
    isLikedByMe: false,
    createdAt: "2026-11-08T06:00:00Z",
  },
  {
    id: "post-3",
    authorId: "user-1",
    imageUrl: "/images/sonnaldo.png",
    imageAlt: "날두주니어1",
    caption: "부전자전",
    extraImages: [
      { url: "/images/sonnaldo2.jpeg", alt: "날두주니어2" },
    ],
    likeCount: 21,
    isLikedByMe: true,
    createdAt: "2026-11-06T09:30:00Z",
  },
  {
    id: "post-4",
    authorId: "user-1",
    imageUrl: "/images/horangnaldo.jpeg",
    imageAlt: "호랑날두",
    caption: "siuuuuuuuuuuu",
    likeCount: 57,
    isLikedByMe: false,
    createdAt: "2026-11-04T11:00:00Z",
  },
  {
    id: "post-10",
    authorId: "user-2",
    imageUrl: "/images/messi-celebration.png",
    imageAlt:
      "아르헨티나 유니폼 상의를 걷어 올리고 고개를 젖힌 채 세리머니하는 메시",
    extraImages: [
      {
        url: "/images/messi-dolphin.png",
        alt: "바다에서 돌고래의 지느러미를 잡고 웃는 메시",
      },
      {
        url: "/images/messi-escort.png",
        alt: "붉은 베레모를 쓴 경호원들 사이로 이동하는 메시",
      },
    ],
    caption:
      "여행을 떠나기 전, 바다에서 돌고래와 함께 수영하며 즐거운 시간을 보냈습니다. 그리고 여행 중에는 경호원들과 함께 안전하게 이동하며 다양한 경험을 했습니다. 이번 여행은 정말 잊지 못할 추억이 될 것 같습니다.",
    likeCount: 512,
    isLikedByMe: true,
    createdAt: "2026-11-07T10:00:00Z",
  },
  {
    id: "post-11",
    authorId: "user-2",
    imageUrl: "/images/funnymessi.png",
    imageAlt: "잔디를 배경으로 활짝 웃는 메시",
    caption: "안녕~",
    likeCount: 347,
    isLikedByMe: false,
    createdAt: "2026-11-02T06:30:00Z",
  },
  {
    id: "post-12",
    authorId: "user-2",
    imageUrl: "/images/mylove.png",
    imageAlt: "간식을 든 두 사람이 장난스러운 표정으로 함께 찍은 셀카",
    caption: "오늘은 사랑하는 사람과 함께한 즐거운 하루였습니다!",
    likeCount: 689,
    isLikedByMe: false,
    createdAt: "2026-10-26T09:15:00Z",
  },
  {
    id: "post-13",
    authorId: "user-2",
    imageUrl: "/images/thegoat.png",
    imageAlt:
      "손을 내민 메시와 무릎을 꿇은 호날두 사이로 빛이 나는 합성 이미지",
    caption: "더럽게 수고했다. 마이 베스트 삐에로",
    likeCount: 1010,
    isLikedByMe: false,
    createdAt: "2026-10-20T08:30:00Z",
  },
];
