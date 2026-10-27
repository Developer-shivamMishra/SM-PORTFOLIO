import { redirect } from "next/navigation";
import { blogPosts } from "@/data/blogPosts";
import WritingArticleClient from "./WritingArticleClient";

export default async function WritingArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (post?.externalUrl) {
    redirect(post.externalUrl);
  }

  return <WritingArticleClient slug={slug} />;
}
