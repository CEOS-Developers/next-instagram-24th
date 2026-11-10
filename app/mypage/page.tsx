import { redirect } from "next/navigation";
import { myPageHref } from "../_lib/profile";

export default function MyPageIndex() {
  redirect(myPageHref);
}
