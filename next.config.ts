import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  // next/image 로 picsum.photos 이미지를 불러오기 위한 허용 목록
  // (picsum 은 fastly.picsum.photos 로 리다이렉트하므로 둘 다 허용)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/seed/**" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
    ],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
