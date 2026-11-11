import { redirect } from "next/navigation";
import { myPageHref } from "@/app/_lib/profile";

export default function Home() {
  redirect(myPageHref);
}