import Button from "@/components/ui/Button";

export type ProfileActionsProps = {
  isFollowing: boolean;
  onToggleFollow: () => void;
  onMessage?: () => void;
};

export default function ProfileActions({
  isFollowing,
  onToggleFollow,
  onMessage,
}: ProfileActionsProps) {
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
