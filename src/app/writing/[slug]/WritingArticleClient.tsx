"use client";

import ArticleBody from "@/components/writing/ArticleBody";

export default function WritingArticleClient({ slug }: { slug: string }) {
  return <ArticleBody slug={slug} />;
}
