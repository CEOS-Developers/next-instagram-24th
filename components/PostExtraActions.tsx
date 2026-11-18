import Image from "next/image";

const actions = [
  { label: "댓글", icon: "/icons/comment.svg" },
  { label: "리포스트", icon: "/icons/repost.svg" },
  { label: "보내기", icon: "/icons/message.svg" },
];

export default function PostExtraActions() {
  return (
    <>
      {actions.map(({ label, icon }) => (
        <button
          key={label}
          type="button"
          disabled
          aria-label={label}
          className="disabled:cursor-not-allowed"
        >
          <Image src={icon} alt="" width={24} height={24} className="dark:invert" />
        </button>
      ))}
    </>
  );
}