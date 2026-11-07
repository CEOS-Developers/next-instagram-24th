export type Profile = {
  username: string;
  displayName: string;
  bio: string;
  followers: number;
  following: number;
};

export const currentUser = {
  username: "jxx_gro_ovy",
  followingUsernames: ["film_archive"],
};

export const profiles: Profile[] = [
  {
    username: "jxx_gro_ovy",
    displayName: "홍진우",
    bio: "",
    followers: 422,
    following: 462,
  },
  {
    username: "film_archive",
    displayName: "필름 아카이브",
    bio: "",
    followers: 84,
    following: 31,
  },
  {
    username: "live.archive",
    displayName: "",
    bio: "나의 인디 플리, 공연 직관 기록",
    followers: 56,
    following: 42,
  },
];
