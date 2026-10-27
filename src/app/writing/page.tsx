"use client";

import Link from "next/link";
import { blogPosts } from "@/data/blogPosts";

export default function WritingPage() {
  return (
    <div className="animate-blur-in space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Writing
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Thoughts on development, systems, and building in public.
        </p>
      </header>

      <ul className="divide-y divide-white/10">
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={post.externalUrl ?? `/writing/${post.slug}`}
              target={post.externalUrl ? "_blank" : undefined}
              rel={post.externalUrl ? "noopener noreferrer" : undefined}
              className="group block py-5 transition-colors"
            >
              <h2 className="text-base font-medium group-hover:text-foreground md:text-lg">
                {post.title}
              </h2>
              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                {post.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
