"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

function renderInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  const regex =
    /(\*\*[^*]+\*\*|\*[^*]+\*|\bhttps?:\/\/[^\s]+|\n)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > currentIndex) {
      parts.push(text.substring(currentIndex, match.index));
    }

    const matchedText = match[0];

    if (matchedText.startsWith("**") && matchedText.endsWith("**")) {
      parts.push(
        <strong key={match.index} className="font-semibold text-foreground">
          {renderInlineMarkdown(matchedText.slice(2, -2))}
        </strong>,
      );
    } else if (matchedText.startsWith("*") && matchedText.endsWith("*")) {
      parts.push(
        <em key={match.index} className="italic">
          {renderInlineMarkdown(matchedText.slice(1, -1))}
        </em>,
      );
    } else if (matchedText === "\n") {
      parts.push(<br key={match.index} />);
    } else if (matchedText.startsWith("http")) {
      parts.push(
        <a
          key={match.index}
          href={matchedText}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/30 underline-offset-2 hover:decoration-white/60"
        >
          {matchedText}
        </a>,
      );
    }

    currentIndex = match.index + matchedText.length;
  }

  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function ArticleBody({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="animate-blur-in space-y-4">
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to writing
        </Link>
        <p className="text-muted-foreground">This article doesn&apos;t exist.</p>
      </div>
    );
  }

  return (
    <div className="animate-blur-in space-y-8">
      <Link
        href="/writing"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Writing
      </Link>

      <article className="space-y-6">
        {post.image && (
          <div className="overflow-hidden rounded-2xl border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="m-0 h-auto w-full object-cover"
            />
          </div>
        )}
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {post.title}
        </h1>
        <div className="space-y-4 text-[15px] leading-relaxed text-muted-foreground">
          {post.content.split("\n\n").map((block, index) => {
            const trimmedBlock = block.trim();

            if (trimmedBlock.startsWith("## ")) {
              return (
                <h2
                  key={index}
                  className="pt-2 text-xl font-semibold text-foreground"
                >
                  {trimmedBlock.replace("## ", "")}
                </h2>
              );
            }

            if (trimmedBlock.startsWith("• ")) {
              return (
                <div key={index} className="flex gap-2">
                  <span>•</span>
                  <p>{renderInlineMarkdown(trimmedBlock.replace("• ", ""))}</p>
                </div>
              );
            }

            if (/^\d+\.\s/.test(trimmedBlock)) {
              const listMatch = trimmedBlock.match(/^(\d+)\.\s(.+)/);
              if (listMatch) {
                return (
                  <div key={index} className="flex gap-2">
                    <span className="font-medium text-foreground">
                      {listMatch[1]}.
                    </span>
                    <p>{renderInlineMarkdown(listMatch[2])}</p>
                  </div>
                );
              }
            }

            if (trimmedBlock.startsWith("IMAGE: ")) {
              const imageUrl = trimmedBlock.replace("IMAGE: ", "").trim();
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-2xl border border-white/10"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt="Article visual"
                    className="m-0 h-auto w-full object-cover"
                  />
                </div>
              );
            }

            return <p key={index}>{renderInlineMarkdown(trimmedBlock)}</p>;
          })}
        </div>
      </article>
    </div>
  );
}
