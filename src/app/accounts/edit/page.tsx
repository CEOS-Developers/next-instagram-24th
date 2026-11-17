import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProfileEditForm from "@/components/profile/ProfileEditForm";
import { currentUser, profiles } from "@/data/profiles";

export const metadata: Metadata = {
  title: "프로필 편집 • Instagram",
};

export default function EditProfilePage() {
  const profile = profiles.find((item) => item.username === currentUser.username);
  if (!profile) notFound();

  return <ProfileEditForm profile={profile} />;
}
