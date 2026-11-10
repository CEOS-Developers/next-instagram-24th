import Button from "@/components/ui/Button";

export type ProfileActionsProps = {
  isFollowing: boolean;
  onToggleFollow: () => void;
};

export default function ProfileActions({
  isFollowing,
  onToggleFollow,
}: ProfileActionsProps) {
  return (
    <Button
      variant={isFollowing ? "secondary" : "primary"}
      aria-pressed={isFollowing}
      onClick={onToggleFollow}
    >
      {isFollowing ? "팔로잉" : "팔로우"}
    </Button>
  );
}
