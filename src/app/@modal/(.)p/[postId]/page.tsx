import { Suspense } from "react";
import PostDetail from "@/components/post/PostDetail";
import PostDialog from "@/components/post/PostDialog";

async function Content({ params }: PageProps<"/p/[postId]">) {
  return <PostDetail postId={(await params).postId} />;
}

export default function ModalPage(props: PageProps<"/p/[postId]">) {
  return <PostDialog><Suspense fallback={<p>불러오는 중…</p>}><Content {...props} /></Suspense></PostDialog>;
}
