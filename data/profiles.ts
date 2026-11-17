import { defaultUsername, profileImage } from "@/app/_lib/profile";

export const diaryProfile = {
  username: "minihompy",
  name: "미니홈피 백업",
  avatar: "/images/diary-profile.webp",
  followers: 120,
  following: 300,
} as const;

export const profiles = [
  {
    username: "film_notes",
    name: "필름 노트",
    avatar: "/posts/film/la-la-land.webp",
    followers: 84,
    following: 53,
  },
  {
    username: "slow_walks",
    name: "느린 산책",
    avatar: "/posts/landscape/park-walk.webp",
    followers: 61,
    following: 42,
  },
  diaryProfile,
  {
    username: defaultUsername,
    name: defaultUsername,
    avatar: profileImage,
    followers: 120,
    following: 300,
  },
] as const;

export type MockProfile = (typeof profiles)[number];

export function getProfile(username: string) {
  return profiles.find((profile) => profile.username === username);
}
