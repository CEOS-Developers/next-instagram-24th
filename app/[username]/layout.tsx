import ProfileHeader from "./_components/ProfileHeader";

export default function ProfileLayout({ children }: LayoutProps<"/[username]">) {
  return (
    <>
      <ProfileHeader />
      {children}
    </>
  );
}
