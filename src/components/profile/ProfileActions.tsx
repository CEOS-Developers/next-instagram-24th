import Button from "@/components/ui/Button";

export type ProfileActionsProps = {
  isOwnProfile: boolean;
  isFollowing: boolean;
  onToggleFollow: () => void;
  onMessage?: () => void;
};

export default function ProfileActions({
  isOwnProfile,
  isFollowing,
  onToggleFollow,
  onMessage,
}: ProfileActionsProps) {
  if (isOwnProfile) {
    return (
      <div className="grid w-full grid-cols-2 gap-2">
        {/* 프로필 편집과 보관함 화면은 추후 연결합니다. */}
        <Button variant="secondary" size="md" className="w-full">
          프로필 수정
        </Button>
        <Button variant="secondary" size="md" className="w-full">
          보관함 보기
        </Button>
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
      <Button
        variant={isFollowing ? "secondary" : "primary"}
        size="md"
        className="w-full"
        aria-pressed={isFollowing}
        onClick={onToggleFollow}
      >
        {isFollowing ? "팔로잉" : "팔로우"}
      </Button>
      <Button
        variant="secondary"
        size="md"
        className="w-full"
        onClick={onMessage}
      >
        메시지 보내기
      </Button>
    </div>
  );
}
