"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/data";
import TechStack from "@/components/about/TechStack";
import GitHubActivity from "@/components/about/GitHubActivity";
import { PillButton } from "@/components/ui/pill-button";
import { FaGithub } from "react-icons/fa";

const aboutPoints = [
  `Hi! I'm ${profile.name}, a software developer who's always ready to explore new things, build real-world projects, and continuously sharpen my DSA skills.`,
  "I'm available for freelance and internship opportunities. If you need a committed developer to build or improve your product, feel free to connect.",
  "Learning with passion and love — I care about shipping useful products with clean, dependable code.",
];

export default function AboutPage() {
  return (
    <div className="animate-blur-in space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          About
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          A bit about how I build, what I&apos;m learning, and the tech I use.
        </p>
      </header>

      <ul className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-[15px]">
        {aboutPoints.map((point) => (
          <li key={point} className="flex gap-3">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      <TechStack />

      <GitHubActivity />

      <div className="space-y-3 rounded-2xl border border-white/10 bg-zinc-900/40 p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Connect
          </p>
          <PillButton href={profile.github} external className="py-1.5 text-xs">
            <FaGithub className="h-3.5 w-3.5" />
            View profile
            <ArrowUpRight className="h-3 w-3 opacity-60" />
          </PillButton>
        </div>
        <Link
          href={`mailto:${profile.email}`}
          className="text-sm font-medium underline decoration-white/20 underline-offset-4 hover:decoration-white/50"
        >
          {profile.email}
        </Link>
      </div>
    </div>
  );
}
